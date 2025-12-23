package com.example.RescueProject.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        // 1. Chỉ xử lý nếu có Token VÀ Token bắt đầu bằng "Bearer "
        if (jwt != null && jwt.startsWith("Bearer ")) {
            // Cắt chuỗi an toàn sau khi đã kiểm tra
            jwt = jwt.substring(7);

            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                // Token sai hoặc hết hạn -> Ném lỗi 403
                throw new BadCredentialsException("Invalid token or token expired");
            }
        }

        // Nếu không có token (jwt == null) hoặc không phải Bearer -> Cho qua.
        // Spring Security ở AppConfig sẽ quyết định xem request không token này có được
        // phép vào hay không.
        // Vì /ws/** đã set permitAll(), nên nó sẽ đi qua an toàn.
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Bỏ qua bộ lọc JWT đối với các đường dẫn này để tăng tốc và tránh lỗi
        String path = request.getServletPath();
        return path.startsWith("/auth") || // Login/Signup
                path.startsWith("/ws"); // QUAN TRỌNG: Bỏ qua check token lúc bắt tay WebSocket
    }
}
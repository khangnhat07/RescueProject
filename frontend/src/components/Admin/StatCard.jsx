const StatCard = ({ label, value, icon, colorClass }) => (
  <div className="col-6 col-md-3">
    <div className="card stat-card bg-white p-3 h-100 border-0 shadow-sm">
      <div className="d-flex justify-content-between">
        <div>
          <h6 className={`text-muted text-uppercase fw-bold mb-1`} style={{ fontSize: '0.65rem' }}>{label}</h6>
          <h2 className={`fw-bolder text-${colorClass} mb-0`}>{value}</h2>
        </div>
        <div className={`icon-box bg-${colorClass} bg-opacity-10 text-${colorClass} d-none d-sm-flex`}>
          <i className={`fas ${icon}`}></i>
        </div>
      </div>
    </div>
  </div>
);
export default StatCard;
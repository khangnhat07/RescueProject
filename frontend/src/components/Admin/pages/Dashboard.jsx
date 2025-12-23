import React from 'react';
import Layout from '../Layout';
import StatCard from '../StatCard';
import SosTable from './SosTable';

const Dashboard = () => {
  return (
    <div>
      <div className="row g-3 mb-4">
        <StatCard label="Gấp" value="05" icon="fa-exclamation-triangle" colorClass="danger" />
        <StatCard label="Đang cứu" value="12" icon="fa-ambulance" colorClass="primary" />
        <StatCard label="Xong" value="48" icon="fa-check-double" colorClass="success" />
        <StatCard label="Lực lượng" value="8/15" icon="fa-users" colorClass="dark" />
      </div>
    
      <SosTable />
    </div>
  );
};
export default Dashboard;
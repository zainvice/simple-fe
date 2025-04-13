import React from 'react';
import {
  Users,
  ShieldCheck,
  Clock,
  ClipboardList,
  Star,
  UserCheck,
  Ticket,
  Activity
} from 'lucide-react';
import ClipLoader from 'react-spinners/ClipLoader';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-2xl flex flex-col justify-center items-center text-center shadow-md p-6 flex items-center hover:shadow-xl transition-shadow">
    <div className={`bg-${color}-100 p-4 rounded-full`}>
      <Icon className={`text-${color}-500`} size={28} />
    </div>
    <div className='flex flex-col w-full mt-2 justify-center items-center'>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-[#1EBDB8]">{value}</p>
    </div>
  </div>
);

const AdminDashboard = ({ loading }) => {

  const stats = {
    totalUsers: 1720,
    totalProviders: 215,
    verifiedProviders: 193,
    pendingVerifications: 22,
    totalAppointments: 879,
    totalReviews: 540,
    ticketsOpen: 18,
    ticketsClosed: 76,
    activeSessions: 41
  };

  return (
    <div className="p-6 mt-8 mx-2 lg:mx-8 bg-white shadow-sm rounded-[10px] min-h-[84%] overflow-y-auto">
      <h2 className="text-3xl font-bold text-[#1EBDB8] text-center mb-6">Dashboard</h2>

      {loading ? (
        <div className="flex w-full h-full justify-center py-20 items-center">
          <ClipLoader color={'#1EBDB8'} size={50} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          <StatCard icon={Activity} title="Active Sessions" value={stats.activeSessions} color="orange" />
          <StatCard icon={Users} title="Users Registered" value={stats.totalUsers} color="cyan" />
          <StatCard icon={UserCheck} title="Providers Registered" value={stats.totalProviders} color="green" />
          <StatCard icon={ShieldCheck} title="Verified Providers" value={stats.verifiedProviders} color="blue" />
          <StatCard icon={Clock} title="Pending Verifications" value={stats.pendingVerifications} color="yellow" />
          <StatCard icon={ClipboardList} title="Appointments Booked" value={stats.totalAppointments} color="purple" />
          <StatCard icon={Star} title="Total Reviews" value={stats.totalReviews} color="pink" />
          <StatCard icon={Ticket} title="Support Tickets Open" value={stats.ticketsOpen} color="red" />
          <StatCard icon={Ticket} title="Support Tickets Closed" value={stats.ticketsClosed} color="emerald" />

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

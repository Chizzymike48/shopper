// src/pages/admin/Dashboard.jsx
import { Users, ShoppingBag, DollarSign, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import Badge from '../../components/Shared/Badge';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Shared/Card';
import { 
  systemMetrics, 
  platformStats, 
  userActivity, 
  systemAlerts,
  supportTickets 
} from '../../data/Admin';

export default function Dashboard() {
  const openTickets = supportTickets.filter(t => t.status === 'open').length;
  const unacknowledgedAlerts = systemAlerts.filter(a => !a.acknowledged);

  const stats = [
    {
      title: 'Total Users',
      value: platformStats.totalUsers.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Revenue',
      value: `$${(platformStats.totalRevenue / 1000).toFixed(1)}K`,
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Orders',
      value: platformStats.totalOrders.toLocaleString(),
      change: '+8.7%',
      icon: ShoppingBag,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Active Merchants',
      value: platformStats.activeMerchants,
      change: '+5.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor platform health and performance</p>
      </div>

      {/* System Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-900 mb-2">
                {unacknowledgedAlerts.length} Unacknowledged Alert{unacknowledgedAlerts.length > 1 ? 's' : ''}
              </h3>
              <div className="space-y-2">
                {unacknowledgedAlerts.map(alert => (
                  <div key={alert.id} className="text-sm text-red-800">
                    <span className="font-medium">{alert.title}:</span> {alert.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                  <span className="text-sm font-semibold text-gray-900">{systemMetrics.cpu}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${systemMetrics.cpu > 80 ? 'bg-red-500' : systemMetrics.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${systemMetrics.cpu}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                  <span className="text-sm font-semibold text-gray-900">{systemMetrics.memory}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${systemMetrics.memory > 80 ? 'bg-red-500' : systemMetrics.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${systemMetrics.memory}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Disk Usage</span>
                  <span className="text-sm font-semibold text-gray-900">{systemMetrics.disk}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${systemMetrics.disk > 80 ? 'bg-red-500' : systemMetrics.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${systemMetrics.disk}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{systemMetrics.uptime}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-blue-600">{systemMetrics.avgResponseTime}ms</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-purple-600">{systemMetrics.activeUsers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold text-orange-600">{systemMetrics.errorRate}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity (24h)</CardTitle>
            <CardDescription>Active users throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-1">
              {userActivity.map((data, index) => {
                const maxUsers = Math.max(...userActivity.map(d => d.users));
                const height = (data.users / maxUsers) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        {data.users} users
                      </div>
                    </div>
                    {index % 4 === 0 && (
                      <p className="text-xs text-gray-600 mt-1">{data.hour}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Tickets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Recent customer support requests</CardDescription>
              </div>
              {openTickets > 0 && (
                <Badge variant="danger">{openTickets} Open</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.slice(0, 5).map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm">{ticket.id}</p>
                      <Badge variant={
                        ticket.priority === 'high' ? 'danger' :
                        ticket.priority === 'medium' ? 'warning' : 'default'
                      }>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={
                        ticket.status === 'open' ? 'danger' :
                        ticket.status === 'in_progress' ? 'info' :
                        ticket.status === 'resolved' ? 'success' : 'default'
                      }>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900 font-medium truncate">{ticket.subject}</p>
                    <p className="text-xs text-gray-600">{ticket.userName}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>Key platform metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="text-lg font-bold text-gray-900">{platformStats.conversionRate}%</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Avg Order Value</span>
                <span className="text-lg font-bold text-gray-900">${platformStats.avgOrderValue}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Active Products</span>
                <span className="text-lg font-bold text-gray-900">{platformStats.activeProducts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm text-gray-600">Active Users (24h)</span>
                <span className="text-lg font-bold text-gray-900">{platformStats.activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-600">Active Merchants</span>
                <span className="text-lg font-bold text-gray-900">{platformStats.activeMerchants}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
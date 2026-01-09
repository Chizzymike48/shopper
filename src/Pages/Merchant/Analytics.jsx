// src/pages/merchant/Analytics.jsx
import { TrendingUp, ShoppingCart, Users, DollarSign, Calendar } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Shared/Card';
import { Select } from '../../components/Shared/Input';
import { salesData, topProducts, orders } from '../../data/orders';
import { useState } from 'react';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('14days');

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.userId)).size;
  const avgOrderValue = totalRevenue / totalOrders;

  // Calculate category breakdown
  const categoryRevenue = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!categoryRevenue[item.name]) {
        categoryRevenue[item.name] = 0;
      }
      categoryRevenue[item.name] += item.price * item.quantity;
    });
  });

  const topCategories = Object.entries(categoryRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your store's performance</p>
        </div>
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          options={[
            { value: '7days', label: 'Last 7 days' },
            { value: '14days', label: 'Last 14 days' },
            { value: '30days', label: 'Last 30 days' },
            { value: '90days', label: 'Last 90 days' },
          ]}
          className="w-48"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-2">↑ 12.5% from last period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
              <p className="text-sm text-green-600 mt-2">↑ 8.3% from last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-sm text-green-600 mt-2">↑ 5.2% from last period</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Order Value</p>
              <p className="text-3xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
              <p className="text-sm text-red-600 mt-2">↓ 2.1% from last period</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Daily revenue for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between gap-2">
              {salesData.map((data, index) => {
                const maxSales = Math.max(...salesData.map(d => d.sales));
                const height = (data.sales / maxSales) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-colors cursor-pointer relative"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-3 py-2 rounded whitespace-nowrap z-10">
                        <div className="font-semibold">${data.sales}</div>
                        <div className="text-gray-300">{data.orders} orders</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products by Revenue</CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => {
                const maxRevenue = Math.max(...topProducts.map(p => p.revenue));
                const percentage = (product.revenue / maxRevenue) * 100;

                return (
                  <div key={product.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">${product.revenue.toFixed(2)}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Category</CardTitle>
          <CardDescription>Top performing categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topCategories.map(([category, revenue], index) => {
              const colors = [
                'bg-blue-500',
                'bg-green-500',
                'bg-purple-500',
                'bg-orange-500',
                'bg-pink-500',
              ];

              return (
                <div key={category} className="text-center">
                  <div className={`w-full h-32 ${colors[index]} rounded-lg flex items-center justify-center mb-3 text-white`}>
                    <div>
                      <p className="text-3xl font-bold">${revenue.toFixed(0)}</p>
                      <p className="text-sm opacity-90 mt-1">Revenue</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900 text-sm truncate">{category}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    New order <span className="font-bold">{order.id}</span> from {order.customerName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
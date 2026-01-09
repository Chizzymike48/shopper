// src/pages/admin/Audit.jsx
import { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { auditLogs } from '../../data/Admin';
import Button from '../../components/Shared/Button';
import Input, { Select } from '../../components/Shared/Input';
import Badge from '../../components/Shared/Badge';
import Card from '../../components/Shared/Card';
import toast from 'react-hot-toast';

export default function Audit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter.toUpperCase());
    const matchesRole = roleFilter === 'all' || log.userRole === roleFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    return matchesSearch && matchesAction && matchesRole && matchesStatus;
  });

  const handleExport = () => {
    toast.success('Audit logs exported successfully');
  };

  const actionTypes = [
    'LOGIN',
    'ORDER',
    'PRODUCT',
    'PAYMENT',
    'USER',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Track all system activities and user actions</p>
        </div>
        <Button onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
          Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Events</p>
            <p className="text-3xl font-bold text-gray-900">{auditLogs.length}</p>
          </div>
        </Card>
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Successful</p>
            <p className="text-3xl font-bold text-green-600">
              {auditLogs.filter(l => l.status === 'success').length}
            </p>
          </div>
        </Card>
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Failed</p>
            <p className="text-3xl font-bold text-red-600">
              {auditLogs.filter(l => l.status === 'failed').length}
            </p>
          </div>
        </Card>
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Today</p>
            <p className="text-3xl font-bold text-blue-600">
              {auditLogs.filter(l => 
                new Date(l.timestamp).toDateString() === new Date().toDateString()
              ).length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Actions' },
              ...actionTypes.map(type => ({
                value: type.toLowerCase(),
                label: type.charAt(0) + type.slice(1).toLowerCase()
              }))
            ]}
          />
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'shopper', label: 'Shopper' },
              { value: 'merchant', label: 'Merchant' },
              { value: 'admin', label: 'Admin' },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'success', label: 'Success' },
              { value: 'failed', label: 'Failed' },
            ]}
          />
        </div>
      </Card>

      {/* Audit Logs Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <p className="text-gray-900">
                        {new Date(log.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.userName}</p>
                      {log.userRole && (
                        <Badge variant={
                          log.userRole === 'admin' ? 'danger' :
                          log.userRole === 'merchant' ? 'primary' :
                          'success'
                        } className="mt-1">
                          {log.userRole}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-md truncate">
                      {log.details}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-600">
                      {log.ipAddress}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={log.status === 'success' ? 'success' : 'danger'}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">No audit logs found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setActionFilter('all');
              setRoleFilter('all');
              setStatusFilter('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {filteredLogs.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredLogs.length} of {auditLogs.length} logs
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
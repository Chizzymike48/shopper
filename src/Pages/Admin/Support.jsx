// src/pages/admin/Support.jsx
import { useState } from 'react';
import { Search, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { supportTickets, systemAlerts } from '../../data/Admin';
import Button from '../../components/Shared/Button';
import Input, { Select } from '../../components/Shared/Input';
import Badge from '../../components/Shared/Badge';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Shared/Card';
import toast from 'react-hot-toast';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssign = (_ticketId) => {
    toast.success('Ticket assigned successfully');
  };

  const handleResolve = (_ticketId) => {
    toast.success('Ticket marked as resolved');
  };

  const handleAcknowledgeAlert = (_alertId) => {
    toast.success('Alert acknowledged');
  };

  const openTickets = supportTickets.filter(t => t.status === 'open').length;
  const inProgressTickets = supportTickets.filter(t => t.status === 'in_progress').length;
  const unacknowledgedAlerts = systemAlerts.filter(a => !a.acknowledged);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Support & Alerts</h1>
        <p className="text-gray-600 mt-1">Manage customer support tickets and system alerts</p>
      </div>

      {/* System Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <Card className="border-l-4 border-l-red-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-red-900">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  System Alerts ({unacknowledgedAlerts.length})
                </div>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {unacknowledgedAlerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={
                          alert.type === 'error' ? 'danger' :
                          alert.type === 'warning' ? 'warning' : 'info'
                        }>
                          {alert.type}
                        </Badge>
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      </div>
                      <p className="text-sm text-gray-700">{alert.message}</p>
                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAcknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
            <p className="text-3xl font-bold text-gray-900">{supportTickets.length}</p>
          </div>
        </Card>
        <Card hover className="border-l-4 border-l-red-500">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Open</p>
            <p className="text-3xl font-bold text-red-600">{openTickets}</p>
          </div>
        </Card>
        <Card hover className="border-l-4 border-l-blue-500">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{inProgressTickets}</p>
          </div>
        </Card>
        <Card hover>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Resolved</p>
            <p className="text-3xl font-bold text-green-600">
              {supportTickets.filter(t => t.status === 'resolved').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'open', label: 'Open' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
            ]}
            className="w-40"
          />
          <Select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Priority' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
            className="w-40"
          />
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} hover>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                ticket.status === 'open' ? 'bg-red-100' :
                ticket.status === 'in_progress' ? 'bg-blue-100' :
                'bg-green-100'
              }`}>
                {ticket.status === 'resolved' ? (
                  <CheckCircle className={`w-6 h-6 text-green-600`} />
                ) : ticket.status === 'in_progress' ? (
                  <Clock className={`w-6 h-6 text-blue-600`} />
                ) : (
                  <MessageSquare className={`w-6 h-6 text-red-600`} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {ticket.subject}
                      </h3>
                      <Badge variant={
                        ticket.priority === 'high' ? 'danger' :
                        ticket.priority === 'medium' ? 'warning' : 'default'
                      }>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={
                        ticket.status === 'open' ? 'danger' :
                        ticket.status === 'in_progress' ? 'info' :
                        'success'
                      }>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{ticket.userName}</span> ({ticket.userEmail}) • {ticket.id}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3">{ticket.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Category: <strong className="text-gray-900">{ticket.category}</strong></span>
                    <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>Replies: <strong className="text-gray-900">{ticket.replies}</strong></span>
                    {ticket.assignedTo && (
                      <span>Assigned to: <strong className="text-gray-900">{ticket.assignedTo}</strong></span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {ticket.status !== 'resolved' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAssign(ticket.id)}
                        >
                          Assign to Me
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleResolve(ticket.id)}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success('View ticket details')}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <Card className="text-center py-16">
            <p className="text-gray-600 mb-4">No tickets found</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setPriorityFilter('all');
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
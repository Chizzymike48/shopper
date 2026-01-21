// src/data/admin.js

// System Health Metrics
export const systemMetrics = {
  cpu: 45.2,
  memory: 62.8,
  disk: 38.5,
  network: 125.6, // MB/s
  uptime: 99.98,
  activeUsers: 1247,
  totalRequests: 45823,
  errorRate: 0.12,
  avgResponseTime: 145, // ms
};

// Audit Logs
export const auditLogs = [
  {
    id: 1,
    timestamp: '2024-12-23T10:15:00Z',
    userId: 1,
    userName: 'John Doe',
    userRole: 'shopper',
    action: 'ORDER_PLACED',
    details: 'Order ORD-001 created',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: 2,
    timestamp: '2024-12-23T10:10:00Z',
    userId: 3,
    userName: 'Alex Johnson',
    userRole: 'merchant',
    action: 'PRODUCT_UPDATED',
    details: 'Product "Smart Watch Pro" inventory updated',
    ipAddress: '192.168.1.105',
    status: 'success',
  },
  {
    id: 3,
    timestamp: '2024-12-23T10:05:00Z',
    userId: 2,
    userName: 'Jane Smith',
    userRole: 'shopper',
    action: 'LOGIN',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.102',
    status: 'success',
  },
  {
    id: 4,
    timestamp: '2024-12-23T10:00:00Z',
    userId: null,
    userName: 'Unknown',
    userRole: null,
    action: 'LOGIN_FAILED',
    details: 'Failed login attempt for user@test.com',
    ipAddress: '192.168.1.150',
    status: 'failed',
  },
  {
    id: 5,
    timestamp: '2024-12-23T09:55:00Z',
    userId: 3,
    userName: 'Alex Johnson',
    userRole: 'merchant',
    action: 'PRODUCT_CREATED',
    details: 'New product "Wireless Mouse" added',
    ipAddress: '192.168.1.105',
    status: 'success',
  },
  {
    id: 6,
    timestamp: '2024-12-23T09:50:00Z',
    userId: 1,
    userName: 'John Doe',
    userRole: 'shopper',
    action: 'PAYMENT_PROCESSED',
    details: 'Payment of $260.67 processed',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
];

// Support Tickets
export const supportTickets = [
  {
    id: 'TKT-001',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    subject: 'Order not received',
    category: 'delivery',
    priority: 'high',
    status: 'open',
    createdAt: '2024-12-22T14:30:00Z',
    updatedAt: '2024-12-23T09:15:00Z',
    assignedTo: 'Support Agent 1',
    description: 'I placed an order 5 days ago but haven\'t received it yet. Order ID: ORD-001',
    replies: 2,
  },
  {
    id: 'TKT-002',
    userId: 2,
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    subject: 'Product defect',
    category: 'product',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2024-12-21T10:00:00Z',
    updatedAt: '2024-12-22T16:20:00Z',
    assignedTo: 'Support Agent 2',
    description: 'The headphones I received have a manufacturing defect in the left speaker.',
    replies: 5,
  },
  {
    id: 'TKT-003',
    userId: 3,
    userName: 'Alex Johnson',
    userEmail: 'merchant@example.com',
    subject: 'Payment not received',
    category: 'payment',
    priority: 'high',
    status: 'open',
    createdAt: '2024-12-23T08:00:00Z',
    updatedAt: '2024-12-23T08:00:00Z',
    assignedTo: 'Support Agent 1',
    description: 'Haven\'t received payment for 3 orders from last week.',
    replies: 0,
  },
  {
    id: 'TKT-004',
    userId: 1,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    subject: 'How to track my order?',
    category: 'general',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-12-20T12:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
    assignedTo: 'Support Agent 3',
    description: 'I can\'t find where to track my order.',
    replies: 3,
  },
];

// System Alerts
export const systemAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Memory Usage',
    message: 'Memory usage is at 62.8%. Consider scaling up.',
    timestamp: '2024-12-23T10:20:00Z',
    acknowledged: false,
  },
  {
    id: 2,
    type: 'error',
    title: 'Payment Gateway Timeout',
    message: '3 payment requests timed out in the last hour.',
    timestamp: '2024-12-23T09:45:00Z',
    acknowledged: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'Database Backup Completed',
    message: 'Daily database backup completed successfully.',
    timestamp: '2024-12-23T03:00:00Z',
    acknowledged: true,
  },
  {
    id: 4,
    type: 'warning',
    title: 'API Rate Limit Approaching',
    message: 'User john@example.com approaching rate limit (450/500 requests).',
    timestamp: '2024-12-23T10:15:00Z',
    acknowledged: false,
  },
];

// Platform Statistics
export const platformStats = {
  totalUsers: 15234,
  activeUsers: 8967,
  totalMerchants: 523,
  activeMerchants: 412,
  totalProducts: 12456,
  activeProducts: 11203,
  totalOrders: 45823,
  totalRevenue: 1247893.45,
  avgOrderValue: 27.23,
  conversionRate: 3.42,
};

// User Activity (last 24 hours)
export const userActivity = [
  { hour: '00:00', users: 145 },
  { hour: '01:00', users: 98 },
  { hour: '02:00', users: 67 },
  { hour: '03:00', users: 52 },
  { hour: '04:00', users: 78 },
  { hour: '05:00', users: 134 },
  { hour: '06:00', users: 256 },
  { hour: '07:00', users: 445 },
  { hour: '08:00', users: 678 },
  { hour: '09:00', users: 892 },
  { hour: '10:00', users: 1023 },
  { hour: '11:00', users: 1156 },
  { hour: '12:00', users: 1247 },
  { hour: '13:00', users: 1189 },
  { hour: '14:00', users: 1098 },
  { hour: '15:00', users: 967 },
  { hour: '16:00', users: 856 },
  { hour: '17:00', users: 934 },
  { hour: '18:00', users: 1012 },
  { hour: '19:00', users: 978 },
  { hour: '20:00', users: 823 },
  { hour: '21:00', users: 712 },
  { hour: '22:00', users: 534 },
  { hour: '23:00', users: 312 },
];

// Platform Settings
export const platformSettings = {
  siteName: 'Thecla Store',
  siteUrl: 'https://shophub.com',
  supportEmail: 'support@shophub.com',
  maintenanceMode: false,
  allowNewRegistrations: true,
  requireEmailVerification: true,
  minPasswordLength: 8,
  sessionTimeout: 30, // minutes
  maxLoginAttempts: 5,
  orderAutoCancel: 72, // hours
  defaultCurrency: 'USD',
  defaultLanguage: 'en',
  taxRate: 9, // percentage
  freeShippingThreshold: 50,
  commissionRate: 10, // percentage for merchant sales
};

export const getAuditLogsByUserId = (userId) => {
  return auditLogs.filter(log => log.userId === userId);
};

export const getTicketsByStatus = (status) => {
  return supportTickets.filter(ticket => ticket.status === status);
};

export const getUnacknowledgedAlerts = () => {
  return systemAlerts.filter(alert => !alert.acknowledged);
};

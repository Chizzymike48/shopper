// src/data/orders.js

export const orderStatuses = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const orders = [
  {
    id: 'ORD-001',
    userId: 1,
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: orderStatuses.DELIVERED,
    items: [
      {
        productId: 1,
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      },
      {
        productId: 4,
        name: 'Yoga Mat Premium',
        quantity: 2,
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      },
    ],
    subtotal: 229.97,
    tax: 20.70,
    shipping: 10.00,
    total: 260.67,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    orderDate: '2024-12-15T10:30:00Z',
    deliveryDate: '2024-12-18T14:20:00Z',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-002',
    userId: 1,
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    status: orderStatuses.SHIPPED,
    items: [
      {
        productId: 6,
        name: 'Running Shoes Ultra',
        quantity: 1,
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      },
    ],
    subtotal: 119.99,
    tax: 10.80,
    shipping: 0.00,
    total: 130.79,
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    paymentMethod: 'PayPal',
    orderDate: '2024-12-20T09:15:00Z',
    estimatedDelivery: '2024-12-24T12:00:00Z',
    trackingNumber: 'TRK987654321',
  },
  {
    id: 'ORD-003',
    userId: 2,
    customerName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    status: orderStatuses.PROCESSING,
    items: [
      {
        productId: 3,
        name: 'Smart Watch Pro',
        quantity: 1,
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      },
      {
        productId: 8,
        name: 'Mechanical Keyboard RGB',
        quantity: 1,
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
      },
    ],
    subtotal: 459.98,
    tax: 41.40,
    shipping: 15.00,
    total: 516.38,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    orderDate: '2024-12-21T14:22:00Z',
    estimatedDelivery: '2024-12-26T12:00:00Z',
  },
];

// Merchant analytics data
export const salesData = [
  { date: '2024-12-01', sales: 1250, orders: 15 },
  { date: '2024-12-02', sales: 1890, orders: 22 },
  { date: '2024-12-03', sales: 2340, orders: 28 },
  { date: '2024-12-04', sales: 1560, orders: 18 },
  { date: '2024-12-05', sales: 2100, orders: 25 },
  { date: '2024-12-06', sales: 2890, orders: 34 },
  { date: '2024-12-07', sales: 3200, orders: 38 },
  { date: '2024-12-08', sales: 1780, orders: 21 },
  { date: '2024-12-09', sales: 2450, orders: 29 },
  { date: '2024-12-10', sales: 2780, orders: 33 },
  { date: '2024-12-11', sales: 2100, orders: 25 },
  { date: '2024-12-12', sales: 1950, orders: 23 },
  { date: '2024-12-13', sales: 2650, orders: 31 },
  { date: '2024-12-14', sales: 3100, orders: 37 },
];

export const topProducts = [
  { id: 6, name: 'Running Shoes Ultra', sales: 156, revenue: 18714.44 },
  { id: 3, name: 'Smart Watch Pro', sales: 89, revenue: 26699.11 },
  { id: 1, name: 'Wireless Bluetooth Headphones', sales: 78, revenue: 10139.22 },
  { id: 8, name: 'Mechanical Keyboard RGB', sales: 67, revenue: 10719.33 },
  { id: 2, name: 'Organic Cotton T-Shirt', sales: 134, revenue: 4018.66 },
];

export const getOrderById = (orderId) => {
  return orders.find(o => o.id === orderId);
};

export const getUserOrders = (userId) => {
  return orders.filter(o => o.userId === userId);
};
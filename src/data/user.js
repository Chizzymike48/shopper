// src/data/users.js

export const userRoles = {
  SHOPPER: 'shopper',
  MERCHANT: 'merchant',
  ADMIN: 'admin',
};

export const users = [
  {
    id: 1,
    email: 'john@example.com',
    password: 'password123', // In real app, this would be hashed
    firstName: 'John',
    lastName: 'Doe',
    role: userRoles.SHOPPER,
    phone: '+1234567890',
    avatar: 'https://i.pravatar.cc/150?img=12',
    addresses: [
      {
        id: 1,
        isDefault: true,
        label: 'Home',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      {
        id: 2,
        isDefault: false,
        label: 'Office',
        street: '456 Business Blvd',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'USA',
      },
    ],
    wishlist: [3, 5, 7], // Product IDs
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: userRoles.SHOPPER,
    phone: '+1234567891',
    avatar: 'https://i.pravatar.cc/150?img=5',
    addresses: [
      {
        id: 1,
        isDefault: true,
        label: 'Home',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
      },
    ],
    wishlist: [1, 2, 8],
    createdAt: '2024-03-20T14:30:00Z',
  },
  {
    id: 3,
    email: 'merchant@example.com',
    password: 'password123',
    firstName: 'Alex',
    lastName: 'Johnson',
    role: userRoles.MERCHANT,
    phone: '+1234567892',
    avatar: 'https://i.pravatar.cc/150?img=8',
    businessName: 'Tech Store Pro',
    businessAddress: {
      street: '789 Commerce St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    createdAt: '2023-11-10T08:00:00Z',
  },
  {
    id: 4,
    email: 'admin@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: userRoles.ADMIN,
    phone: '+1234567893',
    avatar: 'https://i.pravatar.cc/150?img=10',
    createdAt: '2023-01-15T08:00:00Z',
  },
];

export const getUserByEmail = (email) => {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const getUserById = (id) => {
  return users.find(u => u.id === id);
};

export const authenticateUser = (email, password) => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};
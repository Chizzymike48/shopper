// src/utils/mockEmail.js
// Simple mock email sender that records sent emails to localStorage (for demo/testing)
export function sendOrderEmail(to, order) {
  const sent = JSON.parse(localStorage.getItem('mockEmails') || '[]');
  const email = {
    id: `email-${Date.now()}`,
    to,
    subject: `Order Confirmation - ${order.id}`,
    body: `Thank you for your order. Order ID: ${order.id}\nTotal: $${order.total}\nItems: ${order.items.length}`,
    timestamp: new Date().toISOString(),
  };
  sent.unshift(email);
  localStorage.setItem('mockEmails', JSON.stringify(sent.slice(0, 50)));
  // also log to console for developer visibility
   
  console.info('Mock email sent', email);
  return email;
}

export function getMockEmails() {
  return JSON.parse(localStorage.getItem('mockEmails') || '[]');
}

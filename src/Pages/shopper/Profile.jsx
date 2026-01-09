// src/pages/shopper/Profile.jsx
import { useState } from 'react';
import { User, MapPin, Save } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import Card from '../../components/Shared/Card';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateProfile, addPaymentMethod, removePaymentMethod } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Saved payment form
  const [cardNumber, setCardNumber] = useState('');
  const [cardLabel, setCardLabel] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!cardNumber.trim()) return toast.error('Enter card number');
    const last4 = cardNumber.replace(/\s+/g, '').slice(-4);
    addPaymentMethod({ label: cardLabel || `Card •••• ${last4}`, last4 });
    setCardNumber('');
    setCardLabel('');
    toast.success('Payment method saved');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>
            {!editing && (
              <Button variant="outline" onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!editing}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!editing}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
                required
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            {editing && (
              <div className="flex gap-3 mt-6">
                <Button type="submit" leftIcon={<Save className="w-4 h-4" />}>
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      firstName: user?.firstName || '',
                      lastName: user?.lastName || '',
                      email: user?.email || '',
                      phone: user?.phone || '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </Card>

        {/* Saved Addresses */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
            </div>
            <Button variant="outline">Add New</Button>
          </div>

          {user?.addresses && user.addresses.length > 0 ? (
            <div className="space-y-4">
              {user.addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {address.isDefault && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded mb-2">
                          Default
                        </span>
                      )}
                      <h3 className="font-semibold text-gray-900 mb-1">{address.label}</h3>
                      <p className="text-sm text-gray-600">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zipCode}<br />
                        {address.country}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              No saved addresses yet. Add one for faster checkout!
            </p>
          )}
        </Card>

        {/* Account Settings */}
        <Card>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <Button variant="outline" fullWidth className="justify-start">
              Change Password
            </Button>
            <Button variant="outline" fullWidth className="justify-start">
              Email Preferences
            </Button>
            <Button variant="outline" fullWidth className="justify-start text-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Saved Payments */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Saved Payment Methods</h2>
            <span className="text-sm text-gray-500">Stored locally (mock)</span>
          </div>

          {user?.savedPayments && user.savedPayments.length > 0 ? (
            <div className="space-y-3">
              {user.savedPayments.map((pm) => (
                <div key={pm.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold">{pm.label}</p>
                    <p className="text-sm text-gray-600">•••• {pm.last4}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Use</Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => { removePaymentMethod(pm.id); toast.success('Removed'); }}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No saved payment methods yet.</p>
          )}

          <form onSubmit={handleAddPayment} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Card Number"
                name="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
              />
              <Input
                label="Label"
                name="cardLabel"
                value={cardLabel}
                onChange={(e) => setCardLabel(e.target.value)}
                placeholder="Personal Visa"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <Button type="submit">Save Payment</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
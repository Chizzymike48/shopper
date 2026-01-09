// src/Pages/Admin/Settings.jsx
import { useState } from 'react';
import { Save, Globe, Mail, Lock, DollarSign, Settings as SettingsIcon } from 'lucide-react';
import { platformSettings } from '../../data/Admin';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import Input, { Select } from '../../components/Shared/Input';
import toast from 'react-hot-toast';

export default function Settings() {
  const [settings, setSettings] = useState(platformSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success('Settings saved successfully!');
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(platformSettings);
    setHasChanges(false);
    toast.success('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform-wide settings and preferences</p>
        </div>
        <div className="flex gap-3">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic platform configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Site Name"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              required
            />
            <Input
              label="Site URL"
              value={settings.siteUrl}
              onChange={(e) => handleChange('siteUrl', e.target.value)}
              required
            />
            <Select
              label="Default Language"
              value={settings.defaultLanguage}
              onChange={(e) => handleChange('defaultLanguage', e.target.value)}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
              ]}
            />
            <Select
              label="Default Currency"
              value={settings.defaultCurrency}
              onChange={(e) => handleChange('defaultCurrency', e.target.value)}
              options={[
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'GBP', label: 'British Pound (GBP)' },
              ]}
            />
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Enable Maintenance Mode
              </span>
            </label>
            <p className="text-xs text-gray-600 mt-1 ml-6">
              When enabled, the platform will be inaccessible to regular users
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email notifications</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Support Email"
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleChange('supportEmail', e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure authentication and security</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Minimum Password Length"
              type="number"
              value={settings.minPasswordLength}
              onChange={(e) => handleChange('minPasswordLength', parseInt(e.target.value))}
              min={6}
              max={32}
            />
            <Input
              label="Session Timeout (minutes)"
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
              min={5}
              max={1440}
            />
            <Input
              label="Max Login Attempts"
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleChange('maxLoginAttempts', parseInt(e.target.value))}
              min={3}
              max={10}
            />
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.allowNewRegistrations}
                onChange={(e) => handleChange('allowNewRegistrations', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Allow New User Registrations
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Require Email Verification
              </span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Commerce Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle>Commerce Settings</CardTitle>
              <CardDescription>Configure pricing and payments</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tax Rate (%)"
              type="number"
              value={settings.taxRate}
              onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
              min={0}
              max={100}
              step={0.1}
            />
            <Input
              label="Free Shipping Threshold ($)"
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) => handleChange('freeShippingThreshold', parseFloat(e.target.value))}
              min={0}
            />
            <Input
              label="Commission Rate (%)"
              type="number"
              value={settings.commissionRate}
              onChange={(e) => handleChange('commissionRate', parseFloat(e.target.value))}
              min={0}
              max={100}
              step={0.1}
              helperText="Platform commission on merchant sales"
            />
            <Input
              label="Order Auto-Cancel (hours)"
              type="number"
              value={settings.orderAutoCancel}
              onChange={(e) => handleChange('orderAutoCancel', parseInt(e.target.value))}
              min={1}
              helperText="Cancel unpaid orders after this time"
            />
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Advanced system configuration</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Changing system settings may affect platform performance. 
                Please consult with your technical team before making changes.
              </p>
            </div>

            <Button variant="outline" fullWidth>
              Clear Cache
            </Button>
            <Button variant="outline" fullWidth>
              Rebuild Search Index
            </Button>
            <Button variant="outline" fullWidth>
              Run Database Backup
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes Banner */}
      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 lg:pl-64 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="font-medium">You have unsaved changes</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} className="bg-white text-blue-600 hover:bg-gray-100">
                Discard
              </Button>
              <Button onClick={handleSave} className="bg-blue-800 hover:bg-blue-900 text-white">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
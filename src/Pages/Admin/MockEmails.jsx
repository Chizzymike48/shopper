// src/pages/admin/MockEmails.jsx
import { useEffect, useState } from 'react';
import Card from '../../components/Shared/Card';
import Button from '../../components/Shared/Button';
import { getMockEmails } from '../../utils/mockEmail';

export default function MockEmails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    setEmails(getMockEmails());
  }, []);

  const handleClear = () => {
    localStorage.removeItem('mockEmails');
    setEmails([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mock Emails</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setEmails(getMockEmails())}>Refresh</Button>
          <Button variant="danger" onClick={handleClear}>Clear All</Button>
        </div>
      </div>

      {emails.length === 0 ? (
        <Card className="text-center py-12">No mock emails found.</Card>
      ) : (
        <div className="space-y-4">
          {emails.map((e) => (
            <Card key={e.id} className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">To: <span className="font-medium text-gray-900">{e.to}</span></p>
                  <p className="text-sm text-gray-500">Sent: <span className="font-medium text-gray-900">{new Date(e.timestamp).toLocaleString()}</span></p>
                  <h3 className="mt-3 font-semibold text-gray-900">{e.subject}</h3>
                  <pre className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{e.body}</pre>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

# Mock Emails & Express Checkout (Developer)

This project includes a simple mock email sender used for demo/testing of order confirmation flows.

How it works

- Mock emails are stored in `localStorage` under the key `mockEmails`.
- The express/one-click checkout flow uses the mock email sender to simulate sending a confirmation email and stores the email in `localStorage`.

Viewing mock emails

- Start the app in development.
- Open the Admin -> Mock Emails page at `/admin/mock-emails` (visible in development builds) to view and clear stored mock emails.

Manual cleanup

To clear stored mock emails from the browser console:

```js
localStorage.removeItem('mockEmails')
```

Notes

- This is a front-end only mock used for demos and testing. For production, integrate with a real email provider (SendGrid, SES, Mailgun) and send real transactional emails from the server.

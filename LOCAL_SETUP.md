# Propics website — local setup

## Open in VS Code

1. Open the folder `propics-website` in VS Code.
2. Open the integrated terminal.
3. Copy `.env.example` to `.env.local`.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown in the terminal.

## Notifications (Gmail)

Every Book Demo, Start Trial, and Contact submission is addressed to
`NOTIFICATION_EMAIL` / `BOOKING_NOTIFY_EMAIL`, defaulting to
`propicsksa@gmail.com`.

The public footer still shows the brand address `info@propics.co`. Form and API
leads do not use that inbox.

## Connect Gmail and Google Calendar

Sending is not silent: without a webhook the APIs return HTTP 503 (or a
demo-mode success if `BOOKING_DEV_MODE=true`). The one env var still required
to deliver mail is `GOOGLE_APPS_SCRIPT_URL`.

1. Sign in to `propicsksa@gmail.com` and open Google Apps Script.
2. Create a project and paste `google-apps-script/Code.gs`.
3. Deploy it as a Web App, executing as the account owner and allowing access to anyone.
4. Paste its Web App URL into `GOOGLE_APPS_SCRIPT_URL` in `.env.local`.
5. Change `BOOKING_DEV_MODE` to `false`, then restart the local server.

Redeploy the Apps Script when `Code.gs` changes so trial and contact leads
are emailed (calendar events stay Book Demo only).

Book Demo: emails the Propics inbox, emails the client, and creates a one-hour
Google Calendar event (Sunday week-start on the site is unchanged).

Start Trial and Contact: email the Propics inbox only — no calendar event.

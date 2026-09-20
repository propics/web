# Propics website — local setup

## Open in VS Code

1. Open the folder `propics-website` in VS Code.
2. Open the integrated terminal.
3. Copy `.env.example` to `.env.local`.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the local URL shown in the terminal.

## Connect Gmail and Google Calendar

1. Sign in to `propicsksa@gmail.com` and open Google Apps Script.
2. Create a project and paste `google-apps-script/Code.gs`.
3. Deploy it as a Web App, executing as the account owner and allowing access to anyone.
4. Paste its Web App URL into `GOOGLE_APPS_SCRIPT_URL` in `.env.local`.
5. Change `BOOKING_DEV_MODE` to `false`, then restart the local server.

Every valid booking will email the Propics inbox, email the client, create a one-hour Google Calendar event, invite the client, and provide calendar reminders according to the Google Calendar defaults.

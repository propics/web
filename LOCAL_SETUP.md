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
`propicsksa@gmail.com,z.dally@propics.sa` (comma-separated; both inboxes).

The public footer still shows the brand address `info@propics.co`. Form and API
leads do not use that inbox.

## Connect Gmail and Google Calendar

Sending is not silent: without a webhook the APIs return HTTP 503 (or a
demo-mode success if `BOOKING_DEV_MODE=true`). The one env var still required
to deliver mail is `GOOGLE_APPS_SCRIPT_URL`.

1. Sign in to `propicsksa@gmail.com` and open Google Apps Script.
2. Create a project (or open the existing one) and **replace** `Code.gs` with
   the full contents of `google-apps-script/Code.gs`.
3. Deploy → **Manage deployments** → the existing Web App → pencil →
   **New version** (keep the same URL). Execute as the account owner; who has
   access = Anyone.
4. The first run after a paste will ask for Calendar + Gmail permissions —
   authorize them as `propicsksa@gmail.com`.
5. Paste the Web App URL into `GOOGLE_APPS_SCRIPT_URL` in `.env.local`.
6. Change `BOOKING_DEV_MODE` to `false`, then restart the local server.

Book Demo: emails every notify address and the client with a `propics-demo.ics`
(`METHOD:REQUEST`) attachment — that is what puts the booking on
`z.dally@propics.sa` and the client calendar. It also creates a **30-minute**
event on **Propics Ksa** (falls back to the account default / primary). Google
Calendar guest invites are best-effort only (`Calendar.Events.insert` /
`patch` + `sendUpdates: 'all'`). Enable them in Apps Script with
**Services (+) → Google Calendar API → Add**. Do not rely on `addGuest()`.
Sunday week-start on the site is unchanged.

Optional: in Google Calendar, share **Propics Ksa** with `z.dally@propics.sa`
(permission: **See all event details**) so they can also open the organizer
copy. ICS is still required; sharing is extra.

Start Trial and Contact: email the Propics inbox only — no calendar event, no ICS.

The team email lists each recipient as `ics sent|fail` and
`google invite ok|fail`, plus the calendar name/id and whether the event was
created, so a missed calendar can be diagnosed without guessing.

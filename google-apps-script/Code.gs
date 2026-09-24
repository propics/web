/**
 * Propics website webhook — paste this entire file into Apps Script, then
 * Deploy → Manage deployments → the existing Web App → Edit → New version.
 * Keep the same Web App URL. Execute as: Me (propicsksa@gmail.com).
 * Who has access: Anyone.
 *
 * Book Demo: 30-minute event on "Propics Ksa" (fallback: default/primary),
 *            calendar invites to every notify inbox + the client,
 *            + team email + client email.
 * Start Trial / Contact: team email only (no calendar).
 */
// MailApp.sendEmail({ to }) accepts a comma-separated list unchanged.
const DEFAULT_TEAM_EMAIL = 'propicsksa@gmail.com,z.dally@propics.sa';
const PREFERRED_CALENDAR_NAMES = ['Propics Ksa', 'Propics KSA', 'Propics'];
const DEFAULT_DURATION_MINUTES = 30;

function inbox(data) {
  var requested = String((data && (data.notifyEmail || data.NOTIFICATION_EMAIL)) || '').trim();
  return requested || DEFAULT_TEAM_EMAIL;
}

function parseEmailList() {
  var seen = {};
  var out = [];
  var i;
  for (i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    var parts = [];
    if (value == null || value === '') continue;
    if (Object.prototype.toString.call(value) === '[object Array]') {
      parts = value;
    } else {
      var raw = String(value).trim();
      if (raw.charAt(0) === '[') {
        try { parts = JSON.parse(raw); } catch (ignore) { parts = raw.split(/[,;]+/); }
      } else {
        parts = raw.split(/[,;]+/);
      }
    }
    var j;
    for (j = 0; j < parts.length; j++) {
      var email = String(parts[j] || '').trim().toLowerCase();
      if (!email || seen[email] || !/^\S+@\S+\.\S+$/.test(email)) continue;
      seen[email] = true;
      out.push(email);
    }
  }
  return out;
}

function field(value) {
  return value == null || value === '' ? '-' : String(value);
}

function pad2(n) {
  return (n < 10 ? '0' : '') + n;
}

function to24Hour(hour, minute, meridiem) {
  var h = parseInt(hour, 10);
  var m = parseInt(minute, 10);
  if (meridiem === 'PM' && h < 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return pad2(h) + ':' + pad2(isNaN(m) ? 0 : m);
}

/** Site slots look like "11:00 - 11:30 AM" or "2:00 - 2:30 عصرا". */
function parseSlotRange(dateStr, slot, startTime, endTime, durationMinutes) {
  var minutes = parseInt(durationMinutes, 10);
  if (!minutes || minutes < 1) minutes = DEFAULT_DURATION_MINUTES;

  function atRiyadh(hhmm) {
    return new Date(String(dateStr) + 'T' + hhmm + ':00+03:00');
  }

  function normalizeClock(hhmm) {
    var p = String(hhmm).trim().split(':');
    return pad2(parseInt(p[0], 10)) + ':' + pad2(parseInt(p[1] || '0', 10));
  }

  if (startTime && /^\d{1,2}:\d{2}$/.test(String(startTime).trim())) {
    var start = atRiyadh(normalizeClock(startTime));
    var end = endTime && /^\d{1,2}:\d{2}$/.test(String(endTime).trim())
      ? atRiyadh(normalizeClock(endTime))
      : new Date(start.getTime() + minutes * 60 * 1000);
    if (isNaN(start.getTime())) throw new Error('Invalid startTime ' + startTime);
    if (isNaN(end.getTime()) || end <= start) end = new Date(start.getTime() + minutes * 60 * 1000);
    return {start: start, end: end};
  }

  var raw = String(slot || '').trim();
  var meridiem = '';
  if (/\bPM\b|مساء|عصرا|ظهرا/i.test(raw)) meridiem = 'PM';
  else if (/\bAM\b|صباح/i.test(raw)) meridiem = 'AM';

  var times = raw.match(/(\d{1,2}):(\d{2})/g) || [];
  if (!times.length && /^\d{1,2}:\d{2}$/.test(raw)) times = [raw];
  if (!times.length) throw new Error('Could not parse demo slot: ' + raw);

  var sp = times[0].split(':');
  var startParsed = atRiyadh(to24Hour(sp[0], sp[1], meridiem));
  var endParsed;
  if (times[1]) {
    var epp = times[1].split(':');
    endParsed = atRiyadh(to24Hour(epp[0], epp[1], meridiem));
  } else {
    endParsed = new Date(startParsed.getTime() + minutes * 60 * 1000);
  }
  if (isNaN(startParsed.getTime())) throw new Error('Invalid slot start: ' + raw);
  if (isNaN(endParsed.getTime()) || endParsed <= startParsed) {
    endParsed = new Date(startParsed.getTime() + minutes * 60 * 1000);
  }
  return {start: startParsed, end: endParsed};
}

function resolveCalendar() {
  var i;
  var named;
  for (i = 0; i < PREFERRED_CALENDAR_NAMES.length; i++) {
    try {
      named = CalendarApp.getCalendarsByName(PREFERRED_CALENDAR_NAMES[i]);
      if (named && named.length) return named[0];
    } catch (ignore) {}
  }
  try {
    var all = CalendarApp.getAllCalendars();
    for (i = 0; i < all.length; i++) {
      var nm = String(all[i].getName() || '').toLowerCase();
      if (nm.indexOf('propics') !== -1) return all[i];
    }
  } catch (ignore2) {}
  try {
    return CalendarApp.getDefaultCalendar();
  } catch (ignore3) {}
  try {
    return CalendarApp.getCalendarById('primary');
  } catch (ignore4) {}
  return null;
}

function calendarLabel(calendar) {
  if (!calendar) return 'none';
  var name = '';
  var id = '';
  try { name = calendar.getName(); } catch (ignore) {}
  try { id = calendar.getId(); } catch (ignore2) {}
  return (name || 'unnamed') + (id ? ' [' + id + ']' : '');
}

function formatRange(start, end) {
  var tz = 'Asia/Riyadh';
  return (
    Utilities.formatDate(start, tz, 'yyyy-MM-dd h:mm a') +
    ' – ' +
    Utilities.formatDate(end, tz, 'h:mm a') +
    ' (Riyadh)'
  );
}

function findExistingEvent(calendar, start, end, title) {
  try {
    var events = calendar.getEvents(start, end);
    var i;
    for (i = 0; i < events.length; i++) {
      if (events[i].getTitle() === title) return events[i];
    }
  } catch (ignore) {}
  return null;
}

function guestEmailsOnEvent(event) {
  var seen = {};
  try {
    var guests = event.getGuestList(true);
    var i;
    for (i = 0; i < guests.length; i++) {
      var email = String(guests[i].getEmail() || '').trim().toLowerCase();
      if (email) seen[email] = true;
    }
  } catch (ignore) {}
  return seen;
}

function addGuestsQuietly(event, emails) {
  var notes = [];
  var already = guestEmailsOnEvent(event);
  var i;
  for (i = 0; i < emails.length; i++) {
    var email = emails[i];
    if (already[email]) {
      notes.push(email + ' already invited');
      continue;
    }
    try {
      event.addGuest(email);
      already[email] = true;
      notes.push(email + ' added');
    } catch (err) {
      notes.push(email + ' failed: ' + err);
    }
  }
  return notes;
}

function sendGuestInvites(calendar, event, emails) {
  if (!emails.length) return 'no guests';
  try {
    if (typeof Calendar !== 'undefined' && Calendar.Events && Calendar.Events.patch) {
      var apiId = String(event.getId() || '').split('@')[0];
      Calendar.Events.patch(
        {attendees: emails.map(function (email) { return {email: email}; })},
        calendar.getId(),
        apiId,
        {sendUpdates: 'all'}
      );
      return 'invites sent (Calendar API)';
    }
  } catch (apiErr) {
    return 'Calendar API send failed: ' + apiErr;
  }
  return 'guests added; invites send on createEvent(sendInvites) only';
}

function createDemoEvent(calendar, title, start, end, description, guests) {
  var createdWithInvites = false;
  var event = null;
  var sendNote = '';
  if (guests.length) {
    try {
      event = calendar.createEvent(title, start, end, {
        description: description,
        guests: guests.join(','),
        sendInvites: true,
      });
      createdWithInvites = true;
      sendNote = 'invites sent';
    } catch (inviteCreateErr) {
      sendNote = 'sendInvites create failed: ' + inviteCreateErr;
    }
  }
  if (!event) {
    event = calendar.createEvent(title, start, end, {description: description});
  }
  return {event: event, createdWithInvites: createdWithInvites, sendNote: sendNote};
}

function bookDemo(data, team) {
  var range = parseSlotRange(
    data.date,
    data.time || data.slot,
    data.startTime,
    data.endTime,
    data.durationMinutes
  );
  var title = 'Propics Demo — ' + field(data.company);
  var description = [
    'Name: ' + field(data.name),
    'Email: ' + field(data.email),
    'Phone: ' + field(data.phone),
    'Company: ' + field(data.company),
    'Notes: ' + field(data.notes),
    'Slot: ' + field(data.time || data.slot),
  ].join('\n');

  var clientEmail = String(data.email || '').trim().toLowerCase();
  var notifyGuests = parseEmailList(data.notifyEmails, data.notifyEmail, team, DEFAULT_TEAM_EMAIL);
  var calendar = resolveCalendar();
  var calInfo = calendarLabel(calendar);

  var guests = [];
  var seenGuest = {};
  var i;
  for (i = 0; i < notifyGuests.length; i++) {
    var notifyEmail = notifyGuests[i];
    if (notifyEmail === clientEmail) continue;
    if (seenGuest[notifyEmail]) continue;
    seenGuest[notifyEmail] = true;
    guests.push(notifyEmail);
  }
  if (clientEmail && /^\S+@\S+\.\S+$/.test(clientEmail) && !seenGuest[clientEmail]) {
    seenGuest[clientEmail] = true;
    guests.push(clientEmail);
  }

  var eventStatus = 'not created';
  var inviteStatus = 'skipped';
  var guestStatus = guests.length ? guests.join(', ') : 'none';

  if (!calendar) {
    eventStatus = 'failed: no writable calendar (looked for Propics Ksa / default)';
  } else {
    try {
      var event = findExistingEvent(calendar, range.start, range.end, title);
      if (event) {
        eventStatus = 'already existed on ' + calInfo;
        var addNotes = addGuestsQuietly(event, guests);
        inviteStatus = sendGuestInvites(calendar, event, guests) + ' | ' + addNotes.join('; ');
      } else {
        var created = createDemoEvent(calendar, title, range.start, range.end, description, guests);
        event = created.event;
        eventStatus = 'created on ' + calInfo;
        if (created.createdWithInvites) {
          inviteStatus = created.sendNote + ' (' + guests.join(', ') + ')';
        } else {
          var fallbackNotes = addGuestsQuietly(event, guests);
          inviteStatus = (created.sendNote || 'added after create') + ' | ' + fallbackNotes.join('; ');
        }
      }
    } catch (calErr) {
      eventStatus = 'failed: ' + calErr;
    }
  }

  var when = formatRange(range.start, range.end);
  MailApp.sendEmail({
    to: team,
    subject: 'New website demo booking — ' + field(data.company),
    htmlBody:
      '<h2>New Propics demo booking</h2>' +
      '<p><b>Name:</b> ' + field(data.name) + '</p>' +
      '<p><b>Email:</b> ' + field(data.email) + '</p>' +
      '<p><b>Phone:</b> ' + field(data.phone) + '</p>' +
      '<p><b>Company:</b> ' + field(data.company) + '</p>' +
      '<p><b>Date:</b> ' + when + '</p>' +
      '<p><b>Calendar:</b> ' + calInfo + '</p>' +
      '<p><b>Event:</b> ' + eventStatus + '</p>' +
      '<p><b>Guests:</b> ' + guestStatus + '</p>' +
      '<p><b>Invite:</b> ' + inviteStatus + '</p>' +
      '<p><b>Notes:</b> ' + field(data.notes) + '</p>',
  });
  try {
    if (clientEmail) {
      MailApp.sendEmail({
        to: data.email,
        subject: 'Your Propics demo is confirmed',
        htmlBody:
          '<h2>Thank you, ' + field(data.name) + '</h2>' +
          '<p>Your Propics demo is booked for ' + when + '.</p>' +
          '<p>We look forward to meeting you.</p>',
      });
    }
  } catch (clientErr) {
    // Team mail already sent; do not fail the webhook.
  }

  return {ok: true, calendar: calInfo, event: eventStatus, guests: guestStatus, invite: inviteStatus};
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok: true, service: 'propics-leads'})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var source = String(data.source || '');
    var team = inbox(data);

    if (source.indexOf('free-trial') !== -1) {
      MailApp.sendEmail({
        to: team,
        subject: 'New website free trial request — ' + field(data.company || data.name),
        htmlBody:
          '<h2>New Propics free trial request</h2>' +
          '<p><b>Source:</b> ' + field(source) + '</p>' +
          '<p><b>User type:</b> ' + field(data.userType) + '</p>' +
          '<p><b>Name:</b> ' + field(data.name) + '</p>' +
          '<p><b>Email:</b> ' + field(data.email) + '</p>' +
          '<p><b>Phone:</b> ' + field(data.phone) + '</p>' +
          '<p><b>Company:</b> ' + field(data.company) + '</p>' +
          '<p><b>Company phone:</b> ' + field(data.companyPhone) + '</p>' +
          '<p><b>Notify:</b> ' + team + '</p>',
      });
      return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
    }

    if (source.indexOf('contact') !== -1) {
      MailApp.sendEmail({
        to: team,
        subject: 'New website contact message — ' + field(data.name),
        htmlBody:
          '<h2>New Propics contact message</h2>' +
          '<p><b>Source:</b> ' + field(source) + '</p>' +
          '<p><b>Name:</b> ' + field(data.name) + '</p>' +
          '<p><b>Email:</b> ' + field(data.email) + '</p>' +
          '<p><b>Phone:</b> ' + field(data.phone) + '</p>' +
          '<p><b>Message:</b> ' + field(data.message) + '</p>' +
          '<p><b>Notify:</b> ' + team + '</p>',
      });
      return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
    }

    var result = bookDemo(data, team);
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    try {
      var fallback = {};
      try { fallback = JSON.parse(e.postData.contents); } catch (ignore) {}
      MailApp.sendEmail({
        to: inbox(fallback),
        subject: 'Propics website booking error',
        htmlBody: '<p>' + String(error) + '</p><pre>' + field(e && e.postData && e.postData.contents) + '</pre>',
      });
    } catch (mailErr) {}
    return ContentService.createTextOutput(JSON.stringify({ok: false, message: String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}

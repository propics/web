/**
 * Propics website webhook — paste this entire file into Apps Script, then
 * Deploy → Manage deployments → the existing Web App → Edit → New version.
 * Keep the same Web App URL. Execute as: Me (propicsksa@gmail.com).
 * Who has access: Anyone.
 *
 * Optional (Google invite, best-effort — ICS is the reliable path):
 *   Services (+) → Google Calendar API → Add
 *   (Advanced Calendar service: Calendar.Events.insert / patch + sendUpdates)
 *
 * Book Demo: 30-minute event on "Propics Ksa", ICS invite to every notify
 *            inbox + the client, optional Google attendee invite.
 * Start Trial / Contact: team email only (no calendar, no ICS).
 */
var DEFAULT_TEAM_EMAIL = 'propicsksa@gmail.com,z.dally@propics.sa';
var ORGANIZER_EMAIL = 'propicsksa@gmail.com';
var PREFERRED_CALENDAR_NAMES = ['Propics Ksa', 'Propics KSA', 'Propics'];
var DEFAULT_DURATION_MINUTES = 30;
var RIYADH_TZ = 'Asia/Riyadh';

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

  var startParsed = atRiyadh(to24Hour(times[0].split(':')[0], times[0].split(':')[1], meridiem));
  var endParsed;
  if (times[1]) {
    endParsed = atRiyadh(to24Hour(times[1].split(':')[0], times[1].split(':')[1], meridiem));
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
  return (
    Utilities.formatDate(start, RIYADH_TZ, 'yyyy-MM-dd h:mm a') +
    ' – ' +
    Utilities.formatDate(end, RIYADH_TZ, 'h:mm a') +
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

function icsEscape(value) {
  return String(value == null ? '' : value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function icsStamp(date, timezone, pattern) {
  return Utilities.formatDate(date, timezone, pattern);
}

function buildInviteIcs(opts) {
  var uid = opts.uid;
  var start = opts.start;
  var end = opts.end;
  var title = opts.title;
  var description = opts.description;
  var attendees = opts.attendees || [];
  var stamp = icsStamp(new Date(), 'UTC', "yyyyMMdd'T'HHmmss'Z'");
  // One DTSTART/DTEND only (RFC 5545). Local TZID + VTIMEZONE; not a second UTC pair.
  var dtStart = icsStamp(start, RIYADH_TZ, "yyyyMMdd'T'HHmmss");
  var dtEnd = icsStamp(end, RIYADH_TZ, "yyyyMMdd'T'HHmmss");
  var lines = [
    'BEGIN:VCALENDAR',
    'PRODID:-//Propics//Book Demo//EN',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Riyadh',
    'X-LIC-LOCATION:Asia/Riyadh',
    'BEGIN:STANDARD',
    'TZOFFSETFROM:+0300',
    'TZOFFSETTO:+0300',
    'TZNAME:+03',
    'DTSTART:19700101T000000',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    'UID:' + uid,
    'DTSTAMP:' + stamp,
    'DTSTART;TZID=Asia/Riyadh:' + dtStart,
    'DTEND;TZID=Asia/Riyadh:' + dtEnd,
    'SUMMARY:' + icsEscape(title),
    'DESCRIPTION:' + icsEscape(description),
    'LOCATION:Propics demo (Riyadh)',
    'ORGANIZER;CN=Propics:mailto:' + ORGANIZER_EMAIL,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'TRANSP:OPAQUE',
  ];
  var i;
  for (i = 0; i < attendees.length; i++) {
    lines.push(
      'ATTENDEE;CN=' + icsEscape(attendees[i]) +
      ';ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:' + attendees[i]
    );
  }
  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.join('\r\n');
}

function icsBlob(ics) {
  return Utilities.newBlob(ics, 'text/calendar; method=REQUEST; charset=UTF-8', 'propics-demo.ics');
}

function sendIcsEmail(to, subject, htmlBody, ics) {
  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: htmlBody,
    attachments: [icsBlob(ics)],
  });
}

function advancedCalendarAvailable() {
  return typeof Calendar !== 'undefined' && Calendar.Events && Calendar.Events.insert;
}

function findAdvancedEventId(calendarId, start, end, title) {
  if (!advancedCalendarAvailable() || !Calendar.Events.list) return '';
  try {
    var listed = Calendar.Events.list(calendarId, {
      timeMin: new Date(start.getTime() - 60 * 1000).toISOString(),
      timeMax: new Date(end.getTime() + 60 * 1000).toISOString(),
      singleEvents: true,
      maxResults: 20,
    });
    var items = listed && listed.items ? listed.items : [];
    var i;
    for (i = 0; i < items.length; i++) {
      if (items[i].summary === title && items[i].id) return items[i].id;
    }
  } catch (ignore) {}
  return '';
}

function tryGoogleInvites(calendar, start, end, title, description, attendees) {
  var results = {};
  var i;
  if (!attendees.length) return results;
  if (!calendar || !advancedCalendarAvailable()) {
    for (i = 0; i < attendees.length; i++) {
      results[attendees[i]] = 'fail: Calendar advanced service not enabled';
    }
    return results;
  }
  try {
    var calendarId = calendar.getId();
    var attendeeResources = [];
    for (i = 0; i < attendees.length; i++) {
      attendeeResources.push({email: attendees[i], responseStatus: 'needsAction'});
    }
    var resource = {
      summary: title,
      description: description,
      start: {dateTime: start.toISOString(), timeZone: RIYADH_TZ},
      end: {dateTime: end.toISOString(), timeZone: RIYADH_TZ},
      attendees: attendeeResources,
      organizer: {email: ORGANIZER_EMAIL, displayName: 'Propics'},
    };
    var existingId = findAdvancedEventId(calendarId, start, end, title);
    if (existingId && Calendar.Events.patch) {
      Calendar.Events.patch(resource, calendarId, existingId, {sendUpdates: 'all'});
    } else {
      Calendar.Events.insert(resource, calendarId, {sendUpdates: 'all'});
    }
    for (i = 0; i < attendees.length; i++) results[attendees[i]] = 'ok';
  } catch (err) {
    for (i = 0; i < attendees.length; i++) results[attendees[i]] = 'fail: ' + err;
  }
  return results;
}

function collectGuests(data, team) {
  var clientEmail = String(data.email || '').trim().toLowerCase();
  var notifyGuests = parseEmailList(data.notifyEmails, data.notifyEmail, team, DEFAULT_TEAM_EMAIL);
  var guests = [];
  var seen = {};
  var i;
  for (i = 0; i < notifyGuests.length; i++) {
    if (notifyGuests[i] === clientEmail || seen[notifyGuests[i]]) continue;
    seen[notifyGuests[i]] = true;
    guests.push(notifyGuests[i]);
  }
  if (clientEmail && /^\S+@\S+\.\S+$/.test(clientEmail) && !seen[clientEmail]) {
    guests.push(clientEmail);
  }
  return {clientEmail: clientEmail, guests: guests};
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

  var collected = collectGuests(data, team);
  var clientEmail = collected.clientEmail;
  var guests = collected.guests;

  var calendar = resolveCalendar();
  var calInfo = calendarLabel(calendar);
  var eventStatus = 'not created';

  if (!calendar) {
    eventStatus = 'failed: no writable calendar (looked for Propics Ksa / default)';
  } else {
    try {
      var existing = findExistingEvent(calendar, range.start, range.end, title);
      if (existing) {
        eventStatus = 'already existed on ' + calInfo;
      } else {
        calendar.createEvent(title, range.start, range.end, {description: description});
        eventStatus = 'created on ' + calInfo;
      }
    } catch (calErr) {
      eventStatus = 'failed: ' + calErr;
    }
  }

  var googleByEmail = tryGoogleInvites(calendar, range.start, range.end, title, description, guests);
  var uid =
    'propics-demo-' +
    icsStamp(range.start, 'UTC', "yyyyMMdd'T'HHmmss'Z'") +
    '-' +
    String(data.company || 'demo').toLowerCase().replace(/[^a-z0-9]+/g, '-') +
    '@propics.sa';
  var when = formatRange(range.start, range.end);
  var icsByEmail = {};
  var i;
  var lines = [];
  for (i = 0; i < guests.length; i++) {
    var email = guests[i];
    var isClient = email === clientEmail;
    var googleNote = googleByEmail[email] || 'fail: not attempted';
    var icsNote = 'fail';
    var recipientAttendees = [email];
    var g;
    for (g = 0; g < guests.length; g++) {
      if (guests[g] !== email) recipientAttendees.push(guests[g]);
    }
    var ics = buildInviteIcs({
      uid: uid,
      start: range.start,
      end: range.end,
      title: title,
      description: description,
      attendees: recipientAttendees,
    });
    try {
      if (isClient) {
        sendIcsEmail(
          email,
          'Your Propics demo is confirmed',
          '<h2>Thank you, ' + field(data.name) + '</h2>' +
            '<p>Your Propics demo is booked for ' + when + '.</p>' +
            '<p>Add the attached calendar invite if it does not appear automatically.</p>' +
            '<p>We look forward to meeting you.</p>',
          ics
        );
      } else {
        sendIcsEmail(
          email,
          'New website demo booking — ' + field(data.company),
          '<h2>New Propics demo booking</h2>' +
            '<p><b>Name:</b> ' + field(data.name) + '</p>' +
            '<p><b>Email:</b> ' + field(data.email) + '</p>' +
            '<p><b>Phone:</b> ' + field(data.phone) + '</p>' +
            '<p><b>Company:</b> ' + field(data.company) + '</p>' +
            '<p><b>Date:</b> ' + when + '</p>' +
            '<p><b>Calendar:</b> ' + calInfo + '</p>' +
            '<p><b>Event:</b> ' + eventStatus + '</p>' +
            '<p>Open the attached <b>propics-demo.ics</b> to add this booking to your calendar.</p>' +
            '<p><b>Notes:</b> ' + field(data.notes) + '</p>',
          ics
        );
      }
      icsNote = 'sent';
    } catch (icsErr) {
      icsNote = 'fail: ' + icsErr;
    }
    icsByEmail[email] = icsNote;
    lines.push(email + ' — ics ' + icsNote + '; google invite ' + googleNote);
  }

  var guestReport = lines.length ? lines.join('<br>') : 'none';
  var inviteStatus = lines.join(' | ') || 'none';

  try {
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
        '<p><b>Recipients:</b></p><p>' + guestReport + '</p>' +
        '<p><b>Notes:</b> ' + field(data.notes) + '</p>',
    });
  } catch (ignoreTeam) {}

  return {
    ok: true,
    calendar: calInfo,
    event: eventStatus,
    guests: guests.join(', '),
    invite: inviteStatus,
    ics: icsByEmail,
    google: googleByEmail,
    guestReport: guestReport,
  };
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

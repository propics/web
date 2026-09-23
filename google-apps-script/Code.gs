const DEFAULT_TEAM_EMAIL = 'propicsksa@gmail.com';
const CALENDAR_ID = 'primary';

function inbox(data) {
  var requested = String((data && (data.notifyEmail || data.NOTIFICATION_EMAIL)) || '').trim();
  return requested || DEFAULT_TEAM_EMAIL;
}

function field(value) {
  return value == null || value === '' ? '-' : String(value);
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

    var start = new Date(data.date + 'T' + data.time + ':00+03:00');
    var end = new Date(start.getTime() + 60 * 60 * 1000);
    var title = 'Propics Demo — ' + data.company;
    var description = [
      'Name: ' + data.name,
      'Email: ' + data.email,
      'Phone: ' + data.phone,
      'Company: ' + data.company,
      'Notes: ' + (data.notes || '-'),
    ].join('\n');
    CalendarApp.getCalendarById(CALENDAR_ID).createEvent(title, start, end, {
      description: description,
      guests: data.email,
      sendInvites: true,
    });
    MailApp.sendEmail({
      to: team,
      subject: 'New website demo booking — ' + data.company,
      htmlBody:
        '<h2>New Propics demo booking</h2>' +
        '<p><b>Name:</b> ' + data.name + '</p>' +
        '<p><b>Email:</b> ' + data.email + '</p>' +
        '<p><b>Phone:</b> ' + data.phone + '</p>' +
        '<p><b>Company:</b> ' + data.company + '</p>' +
        '<p><b>Date:</b> ' + data.date + ' ' + data.time + '</p>' +
        '<p><b>Notes:</b> ' + (data.notes || '-') + '</p>',
    });
    MailApp.sendEmail({
      to: data.email,
      subject: 'Your Propics demo is confirmed',
      htmlBody:
        '<h2>Thank you, ' + data.name + '</h2>' +
        '<p>Your Propics demo is booked for ' + data.date + ' at ' + data.time + ' (Riyadh time).</p>' +
        '<p>We look forward to meeting you.</p>',
    });
    return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, message: String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}

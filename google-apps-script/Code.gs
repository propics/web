const TEAM_EMAIL = 'propicsksa@gmail.com';
const CALENDAR_ID = 'primary';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const start = new Date(`${data.date}T${data.time}:00+03:00`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const title = `Propics Demo — ${data.company}`;
    const description = [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone}`, `Company: ${data.company}`, `Notes: ${data.notes || '-'}`].join('\n');
    CalendarApp.getCalendarById(CALENDAR_ID).createEvent(title, start, end, {description, guests:data.email, sendInvites:true});
    MailApp.sendEmail({to:TEAM_EMAIL,subject:`New website demo booking — ${data.company}`,htmlBody:`<h2>New Propics demo booking</h2><p><b>Name:</b> ${data.name}</p><p><b>Email:</b> ${data.email}</p><p><b>Phone:</b> ${data.phone}</p><p><b>Company:</b> ${data.company}</p><p><b>Date:</b> ${data.date} ${data.time}</p><p><b>Notes:</b> ${data.notes || '-'}</p>`});
    MailApp.sendEmail({to:data.email,subject:'Your Propics demo is confirmed',htmlBody:`<h2>Thank you, ${data.name}</h2><p>Your Propics demo is booked for ${data.date} at ${data.time} (Riyadh time).</p><p>We look forward to meeting you.</p>`});
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,message:String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}

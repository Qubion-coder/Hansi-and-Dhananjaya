const SPREADSHEET_ID = '152D7t7Qxp7xB-6Fq5QLJc98OP7RAxcxnRMGtWNTTSI0';

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  // If the sheet doesn't exist, create it and add the headers
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Format the header row for better visibility
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  
  return sheet;
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Parse incoming JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({ error: 'Invalid JSON payload' });
    }
    
    const type = data.type; // "rsvp" or "wishes"
    const timestamp = new Date();
    
    if (type === "rsvp") {
      const headers = ['Timestamp', 'Full Name', 'Number of Guests', 'Dietary Notes'];
      const rsvpSheet = getOrCreateSheet(spreadsheet, "RSVP", headers);
      
      const name = data.name || "";
      const guests = data.guests || "";
      const notes = data.notes || "";
      
      // Append row: Timestamp, Name, Guests, Notes
      rsvpSheet.appendRow([timestamp, name, guests, notes]);
      
    } else if (type === "wishes") {
      const headers = ['Timestamp', 'Name', 'Message'];
      const wishesSheet = getOrCreateSheet(spreadsheet, "Wishes", headers);
      
      const name = data.name || "";
      const message = data.message || "";
      
      // Append row: Timestamp, Name, Message
      wishesSheet.appendRow([timestamp, name, message]);
      
    } else {
      return createJsonResponse({ error: "Invalid type. Must be 'rsvp' or 'wishes'." });
    }
    
    return createJsonResponse({ success: true });
    
  } catch (error) {
    return createJsonResponse({ error: error.toString() });
  }
}

// Handle CORS Preflight (OPTIONS) requests
function doOptions(e) {
  return createJsonResponse({ success: true });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

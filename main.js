function openSpreadsheet(fileName) {
  var files = DriveApp.getFilesByName(fileName);
  
  if (!files.hasNext()) {
    Logger.log('找不到名為' + fileName + '的檔案');
    return;
  }

  var file = files.next();
  var spreadsheet = SpreadsheetApp.openById(file.getId());

  return spreadsheet;
}

function getZeroWasteItems(spreadsheet) {  
  // get first sheet
  var sheet = spreadsheet.getActiveSheet();
  
  // get range of data (ignore header)
  var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());

  // get all values from range
  var data = dataRange.getValues();
  
  var itemsArray = [];
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];

    var item = {
      name: row[0],         // 品項
      addedTime: row[1],    // 加入時間
      expiredTime: row[2],  // 過期時間
      count: row[3],        // 數量
      loc: row[4],          // 位置
      comment: row[5]       // 備註
    };
    
    itemsArray.push(item);
  }

  return itemsArray;
}

function getFirstRow(spreadsheet) {  
  const sheet = spreadsheet.getActiveSheet();

  // get first row
  const range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  return range.getValues()[0];
}

function getUTC8Date() {
    const utcDate = new Date(new Date().toUTCString());
    
    const offsetInMs = 8 * 60 * 60 * 1000;
    utcDate.setTime(utcDate.getTime() + offsetInMs);

    return utcDate;
}

function getRemainingMillisecond(item, now) {
  return item.expiredTime - now;
}

function dumpItem(item) {
  Logger.log("品項:" + item.name + ", 過期時間:" + item.expiredTime + ", 位置:" + item.loc);
}

function sendHtmlEmail(recipient, subject, htmlBody) {
  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    htmlBody: htmlBody
  });
}

function sendReport(expiredItems, expiredAfterDaysItems) {
  let tables = "";

  if (expiredItems.length > 0) {
    tables += composeHtmlTable("己過期", expiredItems);
  }

  if (expiredAfterDaysItems.length > 0) {
    tables += composeHtmlTable(EXPIRED_AFTER_DAYS + "天內過期", expiredAfterDaysItems);
  }

  if (tables.length > 0) {
    const htmlBody = composeHtmlEmail(tables);
    sendHtmlEmail(REPORT_RECIPIENTS_LIST.join(','), `${PROJECT_NAME}週報`, htmlBody);
  }
}

function genReport() {
  const spreadsheet = openSpreadsheet(ZERO_WASTE_SPREADSHEET_FILENAME);

  // check first row
  firstRow = getFirstRow(spreadsheet);

  if (!arraysEqual(firstRow, EXPECTED_SHEET_FORMAT)) {
    var errMsg = `Invalid sheet foramt
      Get:      ${firstRow}
      Expected: ${EXPECTED_SHEET_FORMAT}`;
    throw new Error(errMsg);
  }

  const items = getZeroWasteItems(spreadsheet);

  var expiredItems = [];
  var expiredAfterDaysItems = [];

  items.forEach(function(item) {
    // ignore empty expiredTime item
    if (item.expiredTime == '')
      return;

    const remainingMS = getRemainingMillisecond(item, getUTC8Date());
    if (remainingMS < 0) {
      expiredItems.push(item);
    } else if (remainingMS <= EXPIRED_AFTER_DAYS * 24 * 60 * 60 * 1000) {
      expiredAfterDaysItems.push(item);
    }
  });

  if (expiredItems.length > 0) {
    Logger.log("己過期");
    expiredItems.forEach(item => dumpItem(item));
  }

  if (expiredAfterDaysItems.length > 0) {
    Logger.log(EXPIRED_AFTER_DAYS + "天內過期");
    expiredAfterDaysItems.forEach(item => dumpItem(item));
  }
  
  sendReport(expiredItems, expiredAfterDaysItems);
}

function doGet() {
  output=HtmlService.createTemplateFromFile('index').evaluate();
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  return output;
}

function cache(c) {
  var cache = CacheService.getUserCache();
if(c){
  cache.put('Cache', c);
  return 'Completed'
} else   return cache.get('Cache')
}



function grab(v) {
  switch (v) {
    case 'author':return Session.getEffectiveUser().getEmail()
    case 'user':return Session.getActiveUser().getEmail()
    case 'getActiveUser':return Session.getActiveUser()
    case 'getUsername':return Session.getActiveUser().getUsername()
    case 'table':
      var data = SpreadsheetApp.getActive().getSheetByName("Statement").getRange("A:C").getValues().slice(1, SpreadsheetApp.getActive().getSheetByName("Statement").getLastRow());
      var table = "<table><thead><th>Name</th><th>Balance</th><th>Email</th></thead><tbody>";
      data.forEach(cells => table += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td></tr>`);
      return table + "</tbody></table>";
    case 'tableAndUser':
      var data = SpreadsheetApp.getActive().getSheetByName("Statement").getRange("A:C").getValues().slice(1, SpreadsheetApp.getActive().getSheetByName("Statement").getLastRow());
      var table = "<table><thead><th>Name</th><th>Balance</th><th>Email</th></thead><tbody>";
      data.forEach(cells => table += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td></tr>`);
      return [table + "</tbody></table>",Session.getActiveUser().getEmail()];
    default:return -1;
  }
}


function alive(arg){
    console.log(arg);
  return 'good job';
}
function sort(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getDataRange();
  var headerRows = 1; // Number of header rows
  var sortColumn = 2; // Column B
  range.offset(headerRows, 0, range.getNumRows() - headerRows).sort({ column: sortColumn, ascending: true });

}
function update(rows,receipt,sender,historyRecord) {
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var nameColumn = 1; // Column A
  var sumColumn = 2; // Column B
  var emailColumn = 3; // Column C

  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2, nameColumn, lastRow - 1, 3);
  var data = range.getValues();

  for (var i = 0; i < rows.length; i += 2) {
    var emailToFind = rows[i];
    var valueToSubtract = parseFloat(rows[i + 1]);

    for (var j = 0; j < data.length; j++) {
      if (data[j][emailColumn - 1] === emailToFind) {
        data[j][sumColumn - 1] = parseFloat( data[j][sumColumn - 1]) - valueToSubtract;
        break;
      }
    }
  }

  range.setValues(data);

  var range = sheet.getDataRange();
  range.offset(1, 0, range.getNumRows() - 1).sort({ column: 2, ascending: true });

  Logger.log("Data updated successfully.");
  MailApp.sendEmail({
    to: sender,
    subject: 'Lunch Balance Reciept',
    htmlBody: '<html>'+receipt+'</html>'
  });
SpreadsheetApp.getActiveSpreadsheet().getSheetByName("History").insertRowsBefore(2, 1).getRange(2, 1, 1, historyRecord.length).setValues([historyRecord]);

  return 'Update Successful!';
}
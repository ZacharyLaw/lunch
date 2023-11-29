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
      var data = SpreadsheetApp.getActive().getSheetByName("Statement").getRange("A:D").getValues().slice(1, SpreadsheetApp.getActive().getSheetByName("Statement").getLastRow());
      var table = "<table><thead><th>Name</th><th>Balance</th><th>Email</th><th>Admin</th></thead><tbody>";
      data.forEach(cells => table += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td><td>${cells[3]}</td></tr>`);
      return table + "</tbody></table>";
    case 'tableAndUser':return [grab('table'),grab('user')];
    default:return -1;
  }
}
function register(newuser,name){
   sheet = SpreadsheetApp.getActive().getSheetByName("Statement");
  sheet.appendRow([name,0,newuser])
 sheet.getRange("D" + sheet.getLastRow()).insertCheckboxes();
 sheet.getDataRange().offset(1, 0, sheet.getLastRow()- 1).sort([{ column: 2, ascending: true }]);
  return grab('table')
}

function alive(arg){
    console.log(arg);
  return 'good job';
}
function ChangeName(email,newname){
    var sheet = SpreadsheetApp.getActive().getSheetByName("Statement");
    var data = sheet.getDataRange().getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][2] === email) {
        sheet.getRange(i + 1, 1).setValue(newname);
        break;
      }
    }
}
function sort(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getDataRange().offset(1, 0, sheet.getLastRow()- 1).sort([{ column: 2, ascending: true }]);
}
function update(rows,receipt,sender,historyRecord) {
   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var nameColumn = 1; // Column A
  var sumColumn = 2; // Column B
  var emailColumn = 3; // Column C

  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2, nameColumn, lastRow - 1, 4);
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
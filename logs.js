
function onEdit(e) {
    var user = e.user;
    var cell = e.range.getA1Notation();
    var oldValue = e.oldValue;
    var newValue = e.value;
    var sheetName = e.source.getActiveSheet().getName();
    var logSheet = e.source.getSheetByName("Audit Log");
    if (sheetName!='Statement') return 
    if (cell=='G1' && sheetName=='Statement') return
    logSheet.insertRowsBefore(2,1).getRange(2, 1, 1, 7).setValues([[new Date(), user, "EDIT", sheetName, cell, oldValue, newValue]]);
    sync()
 }
  function onChange(e) {
    var user = e.user;
    var changeType = e.changeType;
    var sheetName = e.source.getSheetName();
    var logSheet = e.source.getSheetByName("Audit Log");
    if (sheetName!='Statement') return 
    if (changeType == "INSERT_ROW" ) {
      range=e.source.getActiveRange().getRow()+':'+e.source.getActiveRange().getEndRow()
      logSheet.insertRowsBefore(2,1).getRange(2, 1, 1,5).setValues([[new Date(), user,changeType, sheetName, range]]);
      sync()
    }
    else if (changeType == "REMOVE_ROW"){
      st=e.source.getActiveRange().getRow()
      en=e.source.getActiveRange().getEndRow()
      range=st+':'+en
      backup = SpreadsheetApp.openById('1yqBiHg5ZXXbm2ie62ZtanJ7P_O6Hzi-pLdN032fLInY').getSheetByName("Statement");
      old=backup.getRange(range).getValues()
      logSheet.insertRowsBefore(2,1).getRange(2,1,1,6).setValues([[new Date(),user,changeType,sheetName,range,old.join(',').replace(',,,,', ',')]]);
      sync()
    }
  }
  //https://docs.google.com/spreadsheets/d/1yqBiHg5ZXXbm2ie62ZtanJ7P_O6Hzi-pLdN032fLInY/edit?usp=sharing
  function sync() {
    var sourceSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var targetSpreadsheet = SpreadsheetApp.openById('1yqBiHg5ZXXbm2ie62ZtanJ7P_O6Hzi-pLdN032fLInY');
    var sheets = sourceSpreadsheet.getSheets();
    sheets.forEach(function(sheet) {
      var sheetName = sheet.getName();
      var targetSheet = targetSpreadsheet.getSheetByName(sheetName);
      if (!targetSheet) targetSheet = targetSpreadsheet.insertSheet(sheetName);
      targetSheet.clear();
      var values = sheet.getDataRange().getValues();
      targetSheet.getRange(1, 1, values.length, values[0].length).setValues(values);
    });
    Logger.log('Sync completed successfully.');
  }
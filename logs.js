
function onEdit(e) {
    var user = e.user;
    var cell = e.range.getA1Notation();
    var oldValue = e.oldValue;
    var newValue = e.value;
    var sheetName = e.source.getActiveSheet().getName();
    var logSheet = e.source.getSheetByName("Audit Log");
    if (sheetName!='Statement') return 
    if (cell=='G1' && sheetName=='Statement') return
    if (oldValue=='' && newValue=='') return
    if (oldValue=='' && newValue=='0.00') return
    logSheet.insertRowsBefore(2,1).getRange(2, 1, 1, 7).setValues([[new Date(), user, "EDIT", sheetName, cell, oldValue, newValue]]);
    sync()
 }
  function onChange(e) {
    console.log(JSON.stringify(e));
    try {
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
      if (JSON.stringify(old)=='[["","","","","","","",""]]') return
      logSheet.insertRowsBefore(2,1).getRange(2,1,1,6).setValues([[new Date(),user,changeType,sheetName,range,old.join(',').replace(',,,,', ',')]]);
      sync()
    }else if (changeType == "OTHER") sync()
  } catch (error) {  }
  }
  //https://docs.google.com/spreadsheets/d/1yqBiHg5ZXXbm2ie62ZtanJ7P_O6Hzi-pLdN032fLInY/edit?usp=sharing
  function sync() {
    var statement = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Statement")
    var targetSheet = SpreadsheetApp.openById('1yqBiHg5ZXXbm2ie62ZtanJ7P_O6Hzi-pLdN032fLInY').getSheetByName("Statement")
    targetSheet.clear();
    var values = statement.getDataRange().getValues();
    targetSheet.getRange(1, 1, values.length, values[0].length).setValues(values);
    Logger.log('Sync completed successfully.');
  }
var statement=SpreadsheetApp.getActive().getSheetByName("Statement")
var history=SpreadsheetApp.getActive().getSheetByName("History")
function doGet(req) {
  console.log(req)
  if(req.parameter.page=='ajax')
    return ContentService.createTextOutput(JSON.stringify({status: "success", "data": "my-data"})).setMimeType(ContentService.MimeType.JSON);
  if(req.parameter.page=='history')
    return html('history')
  else if(req.parameter.page=='validate')
    return html('validate')
  else if(req.parameter.page=='dev' && (grab('user')=='zacharylaw@peplink.com'||grab('user')=='stang@peplink.com'))
    return html('dev')
  else if (!req.parameter.name) 
    return html('index')
  else if (req.parameter.method){
    console.log('method',req.parameter.method)
    console.log('name',req.parameter.name)
    console.log('email',req.parameter.email)
    //register(req.parameter.email,req.parameter.name)
    return ContentService.createTextOutput(JSON.stringify({"Message":"You did it","Method":req.parameter.method,"Name":req.parameter.name,"Email":req.parameter.email,"error":false},null,2)).setMimeType(ContentService.MimeType.JSON)}
  else return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1 ,maximum-scale=1.0, user-scalable=no').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}
function html(filename){
  return HtmlService.createTemplateFromFile(filename).evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1 ,maximum-scale=1.0, user-scalable=no').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
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
    case 'lang':return Session.getActiveUserLocale()
    case 'author':return Session.getEffectiveUser().getEmail()
    case 'user':return Session.getActiveUser().getEmail()
    case 'getActiveUser':return Session.getActiveUser()
    case 'getUsername':return Session.getActiveUser().getUsername()
    case 'table':
      var data = statement.getRange("A:D").getValues().slice(1, statement.getLastRow());
      var table = "<table><thead><th>Name</th><th>Balance</th><th>Email</th><th>Admin</th><th></th></thead><tbody>";
      data.forEach(cells => table += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td><td>${cells[3]}</td><td></td></tr>`);
      return table + "</tbody></table>";
    case 'table2':
        var data = statement.getRange("A:D").getValues().slice(1, statement.getLastRow());
        var table = "<table><thead><th>Name</th><th>Balance</th><th>Email</th><th>Admin</th><th></th></thead><tbody>";
        data.forEach(cells => table += `<tr><td>${cells[0]}</td><td>${cells[1]}</td><td>${cells[2]}</td><td>${cells[3]}</td><td class="material-symbols-rounded">star</td></tr>`);
        return table + "</tbody></table>";
    case 'tableAndUser':return [grab('table'),grab('user')];
    case 'history':return JSON.stringify(history.getDataRange().getValues().slice(1),null)
    case 'dev': return ScriptApp.getService().getUrl().split('/').pop()
    default:return -1;
  }
}
function register(newuser,name){
   statement.appendRow([name,0,newuser])
   statement.getRange("D"+statement.getLastRow()).insertCheckboxes();
   statement.getDataRange().offset(1,0,statement.getLastRow()-1).sort([{column:2,ascending:true}]);
  return grab('table')
}
function ChangeName(email,newname){
    var data = statement.getDataRange().getValues();
    for (var i = 0; i < data.length; i++) {
      if (data[i][2] === email) {
        statement.getRange(i + 1, 1).setValue(newname);
        break;
      }
    }
}
function sort(){
  statement.getDataRange().offset(1, 0, sheet.getLastRow()- 1).sort([{ column: 2, ascending: true }]);
}
function update(rows,receipt,sender,historyRecord) {
  var nameColumn = 1; // Column A
  var sumColumn = 2; // Column B
  var emailColumn = 3; // Column C

  var lastRow = statement.getLastRow();
  var range = statement.getRange(2, nameColumn, lastRow - 1, 4);
  var data = range.getValues();

  for (var i = 0; i < rows.length; i += 2) {
    var emailToFind = rows[i];
    var valueToSubtract = parseFloat(rows[i + 1]);

    for (var j = 0; j < data.length; j++) {
      if (data[j][emailColumn - 1] === emailToFind) {
        data[j][sumColumn - 1] = (parseFloat(data[j][sumColumn - 1]) - valueToSubtract).toFixed(2);
        break;
      }
    }
  }

  range.setValues(data);

  var range = statement.getDataRange();
  range.offset(1, 0, range.getNumRows() - 1).sort({ column: 2, ascending: true });

  Logger.log("Data updated successfully.");
  MailApp.sendEmail({
    to: sender,
    subject: 'Lunch Balance Update',
    htmlBody: `<html>${receipt}</html>`
  });
history.insertRowsBefore(2, 1).getRange(2, 1, 1, historyRecord.length).setValues([historyRecord]);
validate()
  return 'Update Successful!';
}
function validate(){
  var range=statement.getRange('B2:B'+statement.getLastRow())
  range.setValues(range.getValues().map(r=>[parseFloat(r[0]).toFixed(2)]));
  var sum = statement.getRange("B2:B"+statement.getLastRow()).getValues().reduce(function(a, r) {return a + (r[0] || 0);}, 0);
  sum=parseFloat(sum)
  Logger.log("Sum of all employees statement is: " + sum.toFixed(2));
if (sum.toFixed(2) === 0) {
  console.log("The variable is 0");
} else if (String(sum.toFixed(2)) === '-0.00') {
  console.log("The variable is -0.00");
} else if (String(sum.toFixed(2)) === '0.00') {
  console.log("The variable is 0.00");
}
else{
    var table = "<br><table><tr><th>Name</th><th>Balance</th></br>";
    data=statement.getRange("A:B").getValues().slice(1,statement.getLastRow())
    data.forEach(cells => table += "<tr>" + cells.map(cell => "<td>" + cell + "</td>").join("") + "</tr>");
    if (false) return
    MailApp.sendEmail({
      to: 'mis@peplink.com',
      subject: 'Lunch Balance Warming (Sum≠0)',
      htmlBody: `<html><a href=https://sites.google.com/peplink.com/lunch>Lunch Balance Site</a><br>
      <a href="https://docs.google.com/spreadsheets/d/1pU4uWo6HQUNyoJ5C7ZLx-tJ1Pk0Vvxsmgc04hw0UWtw/edit?usp=sharing">Lunch Balance Google Sheet (Database)</a>
      <h1>Sum of all employees statement is ${sum.toFixed(2)}</h1><br><br>${table}</table></html>`
    });
  }

}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function P(user=Session.getActiveUser().getEmail(),obj){
  var uP = PropertiesService.getScriptProperties();
  var uPPs = uP.getProperty(user)
  if(JSON.stringify(uPPs)==='{}'||uPPs=='null'||obj=='null'||!uPPs||typeof uPPs == 'undefined')  {
    var P={};
    P.the='light'
    P.fav=[]
    uP.setProperty(user,JSON.stringify(P));
    return JSON.stringify(uP.getProperty(user))
  }
  else if(typeof obj==='undefined'){
    return JSON.stringify(uPPs);
  }
  else if(typeof obj==='string'){
    uP.setProperty(user,obj)
  }
  else{                  
    var P={};
    P.the='light'
    P.fav=[]  
    uP.setProperty(user,JSON.stringify(P))
    return JSON.stringify(uPPs);}
  uP.setProperty(user,obj)

}
function ajax(request) {
  console.log(request)
  var data = history.getDataRange().getValues();
  var draw = request.draw;
  var start = request.start;
  var length = request.length;
  var paginatedData = data.slice(start, start + length);
  var response = {
    'draw': draw,
    'recordsTotal': data.length,
    'recordsFiltered': data.length,
    'data': paginatedData
  };
  console.log(response)
  return ContentService.createTextOutput(JSON.stringify(response,null,2)).setMimeType(ContentService.MimeType.JSON);
}
function notdom(){
  
}

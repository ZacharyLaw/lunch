function WeeklySentEmail() {
  var table = "<html><body><br><table><tr><th>Name</th><th>Balance</th></br>";
  getData().forEach(cells => table += "<tr>" + cells.map(cell => "<td>" + cell + "</td>").join("") + "</tr>");
  table += "</table></body></html>";
  MailApp.sendEmail({
    to: "mis@peplink.com",
    subject: "Lunch Balance Sheet (Weekly Digest)",
    htmlBody: table
  });
  return true;
}

function getData() {
  return SpreadsheetApp.getActive().getSheetByName("Statement").getRange("A:B").getValues().slice(1, SpreadsheetApp.getActive().getSheetByName("Statement").getLastRow());
}

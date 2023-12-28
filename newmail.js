function newmail() {
    MailApp.sendEmail({
      to: 'zacharylaw@peplink.com',
      subject: 'Email Subject',
    htmlBody:  `<html style="-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <body style="font-family: Roboto, Helvetica, Arial, sans-serif;">
                    <h1 style="text-align: center;">Hello World</h1>
                    <a href="https://sites.google.com/peplink.com/lunch" style="text-decoration: none;color: black;"><h1 style="display: inline;margin-right: 3vw;" ><span class="material-symbols-outlined">wallet</span>&nbsp;Lunch Balance</h1></a>
                </body></html>`,
      from: 'mis@peplink.com'
    });
    return true
  }
function fetchAndTranslate() {
    var url = "https://code.jquery.com/jquery-3.6.0.min.js";
    
    // Load jQuery library
    var script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    
    // Load i18njs library
    var i18nScript = document.createElement("script");
    i18nScript.src = "http://i18njs.com/js/i18n.min.js";
    document.getElementsByTagName("head")[0].appendChild(i18nScript);
    
    // Fetch JSON data
    var jsonUrl = "/ja.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", jsonUrl, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        i18n.translator.add(jsonData);
        
        console.log(i18n("Yes")); // -> はい
        console.log(i18n("No")); // -> いいえ
      }
    };
    xhr.send();
  }
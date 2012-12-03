var ElectNext = (function(window, undefined) {
  
  var strip_ws = function(str_arr) {
    var i = 0;
    for(; i < str_arr.length; i+=1) {
      str_arr[i] = encodeURIComponent(str_arr[i].replace(/\n/,' ').replace(/\s+$/, ''));
    }
    return str_arr;
  };

  var scrape_page = function() {
    var body_text = document.body.innerText;
    return strip_ws(body_text.match(/[A-Z][a-z]+\s[A-Z][a-z]+\s/g));
  };
  
  
  return { 
    scrape_page: scrape_page
  };
})(window);

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    console.log('hERRROOOooo');
    sendResponse(ElectNext.scrape_page());
  });
}


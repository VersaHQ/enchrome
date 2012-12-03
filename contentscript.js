var ElectNext = (function(window, undefined) {
  
  var blacklist = ['Senate','Majority','Leader','Sen','House','Congress','Speaker'];
  
  var clean_matches = function(str_arr) {
    var i = 0;
    for(; i < str_arr.length; i+=1) {
      str_arr[i] = encodeURIComponent(str_arr[i].replace(/\W/g,' ').replace(/\n/,' ').replace(/\s+$/, ''));
    }
    return str_arr;
  };

  var scrape_page = function() {
    var blacklist_regex = new RegExp(blacklist.join('|'), "g");
    console.log(blacklist_regex);
    var body_text = document.body.innerText.replace(blacklist_regex,'');
    return clean_matches(body_text.match(/([A-Z][a-z]+(\s|\W)){2}/g));
  };
  
  
  return { 
    scrape_page: scrape_page
  };
})(window);

if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(ElectNext.scrape_page());
  });
}


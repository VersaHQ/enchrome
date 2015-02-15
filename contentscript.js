var ElectNext = (function(window, undefined) {
  
  var blacklist = ['President','Senate','Majority','Leader','Sen.','Minority','Congress','Speaker',
    'Governor','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
    'District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota',
    'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
    'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
    'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington',
    'West Virginia','Wisconsin','Wyoming'];
  var blacklist_regex = new RegExp(blacklist.join('|').replace(' ','\ '), 'g');
  
  // Good explanation: http://stackoverflow.com/questions/7653942/find-names-with-regular-expression
  var name_scanner_regex = /[A-Z]([a-z]+|\.)(?:\s+[A-Z]([A-Za-z]+|\.))/g;
  
  
  var clean_matches = function(str_arr) {
    var i = 0;
    for(; i < str_arr.length; i+=1) {
      str_arr[i] = encodeURIComponent(str_arr[i].replace(/\W/g,' ').replace(/\n/,' ').replace(/\s+$/, ''));
    }
    return str_arr;
  };

  var scrape_page = function() {
    //console.log(blacklist_regex);
    var body_text = document.body.innerText.replace(blacklist_regex,'');
    return clean_matches(body_text.match(name_scanner_regex));
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


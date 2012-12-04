var candidate_search = function(possibles, callback) {
  var url = 'http://electnext.com/api/v1/candidate_search.js?possibles[]=' + possibles.join('&possibles[]=');
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  console.log(url);
  request.onreadystatechange = function(ev) {
    var candidates;
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.responseText);
        candidates = JSON.parse(request.responseText);
        callback(candidates);
      } else {
        callback(null);
      }
    }
  };
  request.send(null);
};

var display_results = function(candidates) {
  var i = 0, results;
  results = document.getElementById("results");
  results.innerHTML = '';
  if(candidates) {
    for(; i < candidates.length; i+=1) {
      results.innerHTML += '<p>'+candidates[i].name+' '+(candidates[i].title || '')+'</p>';
    }
  } else {
    results.innerHTML = '<p>Couldn\'t find politicians...</p>';
  }
};


function scan() {
  var possibles = chrome.extension.getBackgroundPage().selected_possibles;
  if (possibles) candidate_search(possibles, display_results);
}
window.onload = scan;
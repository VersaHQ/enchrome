var candidate_search = function(possibles) {
  var url = 'http://electnext.dev/api/v1/candidate_search.js?possibles[]=' + possibles.join('&possibles[]=');
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  console.log(url);
  request.onreadystatechange = function(ev) {
    var i = 0, candidates, results;
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.responseText);
        candidates = JSON.parse(request.responseText);
        //callback(candidates);
        results = document.getElementById("results");
        results.innerHTML = '';
        for(; i < candidates.length; i+=1) {
          results.innerHTML += '<p>'+candidates[i].name+' '+candidates[i].title+'</p>';
        }
      } else {
        results.innerHTML = '<p>Couldn\'t find politicians...</p>';
        // callback(null);
      }
    }
  };
  request.send(null);
};



function scan() {
  var possibles = chrome.extension.getBackgroundPage().selected_possibles;
  if (possibles) candidate_search(possibles);
}
window.onload = scan;
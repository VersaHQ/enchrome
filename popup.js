var candidate_search = function(possibles) {
  var url = 'http://electnext.dev/api/v1/candidate_search.js?possibles[]=' + possibles.join('&possibles[]=');
  var request = new XMLHttpRequest();

  request.open('GET', url, true);
  console.log(url);
  request.onreadystatechange = function(ev) {
    var i = 0;
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log(request.responseText);
        var candidates = JSON.parse(request.responseText);
        //callback(candidates);
        var results = document.getElementById("results");
        for(; i < candidates.length; i+=1) {
          console.log('hello mutha fucka '+candidates[i].name);
          results.innerHTML += '<p>'+candidates[i].name+' '+candidates[i].title+'</p>';
        }
      } else {
        console.log("Couldn't find politicians...");
        callback(null);
      }
    }
  };
  request.send(null);
};



function scan() {
  var possibles = chrome.extension.getBackgroundPage().selected_possibles;
  console.log('LOOOK OVER HERE');
  
  if (possibles) candidate_search(possibles);
}
window.onload = scan;
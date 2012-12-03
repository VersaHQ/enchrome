var all_possibles = {};
var selected_possibles = null;
var selected_id = null;

function update_possibles(tabId) {
  chrome.tabs.sendRequest(tabId, {}, function(possibles) {
    console.log('22222222222222222222222222222222');
    console.log(possibles);
    all_possibles[tabId] = possibles;
    if (!possibles) {
      chrome.pageAction.hide(tabId);
    } else {
      chrome.pageAction.show(tabId);
      if (selected_id == tabId) {
        update_selected(tabId);
      }
    }
  });
}

function update_selected(tabId) {
  selected_possibles = all_possibles[tabId];
  if (selected_possibles) chrome.pageAction.setTitle({tabId:tabId, title:"Politician Scanner"});
}


chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    update_possibles(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId, info) {
  selected_id = tabId;
  update_selected(tabId);
});

// Ensure the current selected tab is set up.
chrome.tabs.getSelected(null, function(tab) {
  update_possibles(tab.id);
});

"use strict";

// first time installed code
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({data: ["*://evilzone.org/*"]}, function() {
      getUrls() 
    })
})

// cancels website request
function requestHandler(details) {
  return {cancel: true}
}

// chrome listener to block urls
function blockUrls(blockedUrls) {
  chrome.webRequest.onBeforeRequest.removeListener(requestHandler)
  chrome.webRequest.onBeforeRequest.addListener(
    requestHandler, 
    { urls: blockedUrls },
    ["blocking"]
  )
}

// gets list of urls from storage
function getUrls() {
  chrome.storage.sync.get("data", function(result) {
      var burl1 = result["data"];
      var str1 = burl1.toString();  
      var burl3= str1.split(",");
      console.log(burl3);
      console.log(burl3[1]);      
      //blockUrls(burl3);
      //alert(burl3[1]);
      var rv = {}; 
      for (var i = 0; i < burl3.length; ++i) 
      {
       rv[i] = burl3[i];
      }
      //Object.values(result["data"]));
      blockUrls(rv);
  })
}
// add listener for storage change
chrome.storage.onChanged.addListener(function() {
  getUrls()
})

// add listener for webrequest change
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  getUrls()
}, 
  {urls: []},
  ["blocking"]
)

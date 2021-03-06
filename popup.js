// popup.js

document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("data").innerText = items.data;
    }
  });
}

document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
 window.close();
}


document.getElementById("reset").onclick = function() {
document.getElementById("data").innerText = "";
chrome.storage.sync.clear();
chrome.storage.sync.set({data: ["evilzone.org/*"]}, function() {
      document.getElementById("data").innerText = "evilzone.org/*";
});
window.close();
}

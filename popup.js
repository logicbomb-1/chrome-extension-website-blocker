// popup.js

document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      var str1 = items.toString(); 
      var burl3 = str1.split(",");
      console.log(burl3[1]);
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

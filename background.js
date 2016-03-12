chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	
	if(request.action == "showButton"){
		
		var tabId = sender.tab.id;
		
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			if (changeInfo.status == "complete") {
				
				var url = changeInfo.url;

				if (tab.url.match(/(.*app\.hubspot\.com\/sales|contacts\/738721\/contact|contact-beta\/.*)/i)) {
				  chrome.tabs.sendMessage(tabId, "showTheAxiomButton");
				}
				
				if (tab.url.match(/(.*app\.hubspot\.com\/sales\/738721\/deal\/.*)/)) {
				  chrome.tabs.sendMessage(tabId, "showTheServiceFusionButton");
				}
			}
		});	
		
	}
	
	
	
	if(request.action == "sendGetRequest"){
		var url = request.url;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
				//can check xhr.responseText if needed
		  }
		}
		xhr.send();
	}
	
	
});


chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "confirmationPageAjax");
  port.onMessage.addListener(function(msg) {
    if (msg.action == "confirmationPageAjax"){
    	var url = msg.url;
			
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
			  if (xhr.readyState == 4) {
					var hubspotDealId = xhr.responseText;
					port.postMessage({hubspotDealId: hubspotDealId});
			  }
			}
			xhr.send();
    }
  });
});
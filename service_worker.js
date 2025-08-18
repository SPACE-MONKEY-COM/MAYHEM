chrome.runtime.onInstalled.addListener(details => {
	if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
		let v = 'b'+chrome.runtime.getManifest().version;


		chrome.tabs.create({url:`/extension/changelog.html?${v}`});
	}
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	switch (message.function) {
		case "sitesData":
			console.log('ss');
			let url = message.data.url;
			let title = message.data.title || '';
			let icon = message.data.icon;
			chrome.storage.local.get(function(r){
				let data = r.sitesData || [];

				data[0] = data[0] || [];
				data[1] = data[1] || [];				
				data[2] = data[2] || [];
				
				let sites = data[0];
				let site = data[1];
				let siteTitles = data[2];
				
				console.log(data);
				console.log(sites.indexOf(url))
				
				// siteTitles.push([data.])
				if(sites.indexOf(url) == -1){
					sites.push(url);
					site.push({url: url,title:title,icon:icon});
					
					chrome.storage.local.set({ 'sitesData': data});
				}else{
					
					console.log(site[sites.indexOf(url)])
					site[sites.indexOf(url)].icon = icon;
					chrome.storage.local.set({ 'sitesData': data});
				}

			});
			break;


			case "getPlaybackRate":
				chrome.storage.local.get(['playbackRate'], (r) => {
					let data = r || 1;

					sendResponse({data});
				});
				
				return true;
			break;
			case "setPlaybackRate":
				let data = message.data || 1;
				chrome.storage.local.set({ 'playbackRate': data});
			break;
		default:
			sendResponse({data: "Unknown action"});
			break;
	}
});




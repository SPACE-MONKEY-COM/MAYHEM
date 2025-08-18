
const GLOBAL = {
	id: chrome.runtime.id,
	version: chrome.runtime.getManifest().version,
	date: {
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		time: ["today", "tomorrow", "yesterday"]
	}
}

const settingsCookie = {
	view:{
		bookmarks: 0, 			// folder - A-z
		theme: "light", 		// Default
		style: 0,
	},
	searchEngine: 0,
	radio:{
		volume: 1,
		visability: 0
	},
}

function __SVG(name, fill){
	let svg;
	switch (name) {
		case "mainMonkey":
			 svg = `<svg fill="${fill}" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M21.5,7.5c0-5.5-4.5-7-9.5-7S2.5,2,2.5,7.5a2.906,2.906,0,0,0-2,3,3.972,3.972,0,0,0,2,3.5c0,5.5,2,9.5,9.5,9.5s9.5-4,9.5-9.5a3.972,3.972,0,0,0,2-3.5A2.906,2.906,0,0,0,21.5,7.5ZM12.005,21h-.012c-1.781,0-3.836-.481-4.662-2.2a.25.25,0,0,1,.291-.349A16.745,16.745,0,0,0,12,19a16.757,16.757,0,0,0,4.378-.55.25.25,0,0,1,.291.349C15.842,20.52,13.786,21,12.005,21Zm4.743-8.843a1,1,0,0,0-.606,1.3,11.293,11.293,0,0,1,.822,2.484.251.251,0,0,1-.156.271A13.485,13.485,0,0,1,12,17a13.5,13.5,0,0,1-4.808-.791.249.249,0,0,1-.156-.271,11.189,11.189,0,0,1,.822-2.484,1,1,0,0,0-.606-1.3,3.484,3.484,0,0,1-2.127-3.49A3.667,3.667,0,0,1,8.792,5h6.416a3.667,3.667,0,0,1,3.667,3.667A3.484,3.484,0,0,1,16.748,12.157Z"/><circle cx="9" cy="9" r="1.25"/><circle cx="15" cy="9" r="1.25"/><path d="M11.073,12.93a1,1,0,1,0-1.9.633l.25.75a1,1,0,1,0,1.9-.633Z"/><path d="M14.191,12.3a1,1,0,0,0-1.264.632l-.25.75a1,1,0,1,0,1.9.633l.25-.75A1,1,0,0,0,14.191,12.3Z"/>
				</svg>
				`
		break;
		case "x-circle":
			 svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
					</svg>`
		break;

		
	}
	return svg.trim();
}

function __FaviconURL(type, size, url){
	// var url = url.split('/')[2];
	// console.log(url)
	switch (type) {
		default:
			// return `https://www.google.com/s2/favicons?sz=${size}&domain=${url}`
		return	`chrome-extension://${GLOBAL.id}/_favicon/?size=${size}&showFallbackMonogram=&pageUrl=${url}`
		
		case 1:
		return `https://www.google.com/s2/favicons?sz=${size}&domain=${url}`
	}
}
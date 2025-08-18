var _date = {
	months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	time: ["today", "tomorrow", "yesterday"]
};

const http = {
    radio: ['https://uk2.streamingpulse.com/ssl/vcr1', 'http://retroserver.streamr.ru:8043/retro256.mp3', 'https://ep128.hostingradio.ru:8030/ep128']
}

var LOCAL = {
	blocks:{
		LB: document.getElementById('left-block'),
		CB:document.getElementById('center-block'),
		RB:document.getElementById('right-side-block'),
	},
	search: {
		input: document.getElementById('search-input'),
		ul: document.getElementById('search-results'),
		cleaner: document.getElementById('search-cleaner')

	},
	shortcuts:{
		btn:{
			add: document.getElementById('shortcut-link-add'),
			save: document.getElementById('shortcut-link-save'),
			remove: document.getElementById('shortcut-link-remove'),
		},
		sPage: document.getElementById('shortcuts-page'),
		styles: ['Compact', 'Large'],
		block: document.getElementById('shortcuts'),
		inputs: {
			title: document.getElementById('link-title'),
			position: document.getElementById('link-position'),
			url: document.getElementById('link-url'),
		},
		colors: ["E4717A", "7FB5B5", "7FC7FF", "9FE2BF", "77DD77", "5D9B9B", "3EB489", "5D9B9B", "A18594", "5D9B9B", "FFB28B", "ACE1AF", "AFDAFC", "FFBCAD", "9FE2BF","B39F7A"]
		// colors: ["FFD1DC","EFA94A","7FB5B5","5D9B9B","A18594","77DD77","FF7514","FF8C69","FF9BAA","FFB28B","FCE883","BEBD7F","C6DF90","99FF99","AFDAFC","FFF0F5","F5F5DC","E4717A","B39F7A","E6D690","EAE0C8","F2E8C9","F2DDC6","F5FFFA","3EB489","ACE5EE","A8E4A0","CCCCFF","FAE7B5","FFE4C4","FFDB8B","EEE8AA","FADADD","AFEEEE","ACB78E","DAD871","ECEABE","FFCF48","DCDCDC","A2A2D0","F9F8BB","FFC1CC","FFE5B4","FCD975","9ACEEB","E7C697","5F9EA0","F0DC82","EDD19C","FFBD88","FEE5AC","EFDECD","FFE4B5","9FE2BF","7FC7FF","FDDB6D","71BC78","EFCDB8","FCDD76","E5E4E2","FFEFD5","F5DEB3","DCD0FF","FFBCAD","F0E68C","ACE1AF","BADBAD","FAD6A5","EBC2AF","D8BFD8"],
	},
	history:{
		block: document.getElementById('historyList'),
		btn: {
			list: document.querySelectorAll('.history-request-btns'),
			history: document.getElementById('get-history'),
			youtube: document.getElementById('get-history-youtube'),
			recently: document.getElementById('get-history-recently'),
			cineb: document.getElementById('get-history-cineb'),
		},
	},
	radio:{
		nowPlay: '',
		volume: document.getElementById('radio-volume'),
		station: {
			VCR: http.radio[0],				// Classic
			RF: http.radio[1],		    // Retro Fm
			E: 	http.radio[2]			// Evropa +		
		},
		audio: new Audio(),
		status: 0,
		label: document.querySelectorAll('.radio-switch'), 
		block: document.getElementById('radio')
	},
	scroll: false,
	settings:{
		radio: document.querySelector('#view-satus li[switch=radio]'),
	}
};

const messageText = {
	historyBlock: {
		recentlyClosed: "Recently Closed",
		history: "History",
		request: "History on"
	}
};

const history = {
	block: document.getElementById('history'),
	ul: document.getElementById('historyList'),
	mouse: document.getElementById('historyvsb'),
	btn: {
		all: document.getElementById('get-all-history'),
		youtube: document.getElementById('get-youtube-history'),
		tabs: document.getElementById('get-last-tabs'),
		cineb: document.getElementById('get-cineb-history'),
		selected: document.getElementById('history-selected'),
	},
};

const news = {
	block: document.getElementById('news-blocks'),
	main: document.getElementById('news'),
	mouse: false,
	topics: document.querySelectorAll('.news-topics'),
	newsId: 0,
};

var inputs = {
	title: document.getElementById('link-title'),
	position: document.getElementById('link-position'),
	url: document.getElementById('link-url'),
};

var overlay = {
	body: document.getElementById('overlay'),
	closebtn: document.getElementById('overlay-close'),
};
var view = {
	shortcuts:{
		status: document.getElementById('view-shortcuts-status'),
	},
	bookmarks:{
		status: document.getElementById('view-bookmarks-status'),
	},
	history:{
		status: document.getElementById('view-history-status'),
	},
};
var switchDisplay = document.getElementById('switch');
var content = document.getElementById('center-block');

var bookmarks = {
	parent: document.getElementById('folderBg'),
	sortBtn: document.getElementById('bookmarks-sort'),
};

var radio = {
	stationSrc: [
		
	],
	songArtist: document.getElementById('artist'),
	songTitle: document.getElementById('title'),
	info: document.getElementById('radio-info'),
	stationId: 0,
	play: 0,
	
};

var settings = {
	status: 0,
	btn: document.getElementById('settings-btn'),
	menu: document.getElementById('settings'),
	ul: {
		bookmarks: document.querySelector('#view-satus li[switch=bookmarks]'),
		theme: document.querySelector('#view-satus li[switch=theme]'),
		search: document.querySelector('#view-satus li[switch=search]'),
		style: document.querySelector('#view-satus li[switch=style]'),
		
		a: document.querySelector('a'),
	}
};

var scrollStatus = 0;
var shortcutList = JSON.parse(localStorage.getItem('shortcuts'));

var lStorage = {
	settings: JSON.parse(localStorage.getItem('settings')),
};

// ############################################################################################### 
// 									CALL-FUNCTION
// ############################################################################################### 
if(lStorage.settings == null){
	firstRun();
};

shortcuts('display');
LOCAL.radio.volume.value = lStorage.settings.radio.volume * 100;
searchEngine();
getTopSites();
displayBokkmarks();
viewTheme(lStorage.settings.view.theme);


settings.ul.style.onclick = function(){
	let change; let view; 

	if(lStorage.settings.view.style == 1){
		change = 0;
	}else{
		change = 1;
	}

	lStorage.settings.view.style = change;
	localStorage.setItem('settings', JSON.stringify(lStorage.settings));
	LOCAL.shortcuts.block.innerText = '';
	shortcuts('display');

};


function searchEngine(s){

	let engine = [
		['q', 'https://www.google.com/search','Google'],
		['text','https://yandex.by/search/', 'Yandex'],
		['p','https://search.yahoo.com/search', 'Yahoo'],
		['q','https://www.bing.com/search', 'Bing'],
		['q','https://duckduckgo.com/', 'DuckDuckGo'],
	];

	let search = lStorage.settings.searchEngine;

	search = (search + 1) % engine.length;

	if(s == 1){
		lStorage.settings.searchEngine = search;
		localStorage.setItem('settings', JSON.stringify(lStorage.settings));
	}
	search = lStorage.settings.searchEngine;
	LOCAL.search.input.attributes.name.value = engine[search][0];
	LOCAL.blocks.CB.querySelector('form').action = engine[search][1];
	LOCAL.search.input.attributes.placeholder.value = `Search from ${engine[search][2]}`
	settings.ul.search.querySelector('span').innerText = engine[search][2];

}

settings.ul.search.onclick = function(){
	searchEngine(1)
}


// alert(LOCAL.search.input)


function viewTheme(s){
	let t = lStorage.settings.view.theme;
	settings.ul.theme.querySelector('span').innerText = t;
	settings.ul.theme.querySelector('span').style.textTransform = 'capitalize';
	let theme = t;


	document.documentElement.setAttribute('theme', t);

	if(s == 1){
		// alert(t)
		theme = theme === "light" ? "dark" : "light";
		lStorage.settings.view.theme = theme;
		localStorage.setItem('settings', JSON.stringify(lStorage.settings));
		viewTheme()
	}


	// switch (t) {
	// 	case 'dark':
	// 		// style = LOCAL.theme.dark;
			
	// 			theme = 'light';
	// 		break;
	// 	default:
	// 		style = LOCAL.theme.light;
	// 				theme = 'dark';
	// 		break;
	// }

	

	// Object.assign(document.documentElement,{
	// 	style: style
	// })
}

function radioVisability(){
	let span = LOCAL.settings.radio.querySelector('span');
	let visability = lStorage.settings.radio.visability;
	
	if(visability == 0){
		LOCAL.radio.block.style.display = 'none';
		span.innerText = 'Hiden';
		return visability = 1;
	}else{
		LOCAL.radio.block.style.display = 'grid';
		span.innerText = 'Visible'
		return visability = 0;
	};
}

radioVisability();

LOCAL.settings.radio.onclick = function(){
	lStorage.settings.radio.visability = radioVisability();
	localStorage.setItem('settings', JSON.stringify(lStorage.settings))
	radioVisability();
};







// ############################################################################################### 
// 									ONCLICK
// ############################################################################################### 
document.getElementById('link-changelog').href += "?b"+GLOBAL.version;
settings.btn.onclick = function(){
	if(settings.status == 0){
		settings.btn.style.transform = "rotate(45deg)";
		settings.menu.style.display = "flex";
		return settings.status = 1;
	}else{
		settings.btn.style.transform = "rotate(0deg)";
		settings.menu.style.display = "none";
		return settings.status = 0;
	}
};
settings.ul.theme.onclick = function(){
	settings.ul.theme.querySelector('span')
	let theme = lStorage.settings.view.theme;
	viewTheme(1);
};

settings.ul.bookmarks.onclick  = function(){
	var bookmarksView = JSON.parse(localStorage.getItem('settings')).view.bookmarks;
	if(bookmarksView == 0){
		document.querySelector('.folders').innerText = '';
		lStorage.settings.view.bookmarks = 1;
	}else{
		document.querySelector('.folders').innerText = '';
		lStorage.settings.view.bookmarks = 0;
	}
	localStorage.setItem('settings', JSON.stringify(lStorage.settings));
	displayBokkmarks();
};
LOCAL.shortcuts.btn.remove.onclick = function(){
	shortcuts('remove');
};
LOCAL.shortcuts.btn.save.onclick = function(){
	shortcuts('edit');
};

function shortcut_new_action(){


	document.getElementById('shortcut-link-create').onclick = function(){
		linkInputsClear();
		LOCAL.shortcuts.inputs.position.setAttribute("readonly", true);
		LOCAL.shortcuts.btn.add.style.display = 'flex';
		LOCAL.shortcuts.btn.save.style.display = 'none';
		LOCAL.shortcuts.btn.remove.style.display = 'none';
		overlayStatus(1);
	}

};
overlay.closebtn.onclick = function(){
	overlayStatus(0);
};

LOCAL.radio.volume.oninput = function(){
	let storage_settings = JSON.parse(localStorage.getItem('settings'));
	let volume = LOCAL.radio.volume.value * 0.01;
	LOCAL.radio.audio.volume = volume; 
	storage_settings.radio.volume = volume;
	localStorage.setItem("settings", JSON.stringify(storage_settings));

};

for (i = 0; i < LOCAL.radio.label.length; i++) {
	LOCAL.radio.label[i].addEventListener('click', function(e) {
			let volume = LOCAL.radio.volume.value * 0.01;
			let checked = document.querySelector('#radio input:checked').id.slice(13);
			let chosen = e.target.htmlFor.slice(13);
			console.log(checked, chosen);
			
			$('#radio label').removeClass("news-topics-active");
			LOCAL.radio.audio.src = '';

			if(checked == chosen && LOCAL.radio.status == 1){
				
				LOCAL.radio.audio.pause();
				return LOCAL.radio.status = 0, LOCAL.radio.nowPlay = '';
			}else{
				LOCAL.radio.audio.volume = LOCAL.radio.volume.value * 0.01;
				e.target.classList.add('news-topics-active');
				LOCAL.radio.audio.src = LOCAL.radio.station[chosen];
				LOCAL.radio.audio.play();
				
				LOCAL.radio.audio.src.volume = volume;
				return LOCAL.radio.status = 1, LOCAL.radio.nowPlay = chosen;
			};
	});
};


LOCAL.shortcuts.btn.add.onclick = function(){
	shortcuts('create');
};



// ############################################################################################### 
// 										FUNCTION's
// ############################################################################################### 



function GetRecentlyTabs(){
	chrome.sessions.getRecentlyClosed(function (result) {
		LOCAL.history.block.innerText = '';
		var list = [];
		for(var e in result){
			if(result[e].tab != undefined){
				var element = result[e].tab;
				if(element.url.split(':')[0] != 'chrome'){
					list.push({url: element.url, title: element.title});
				};
			}else{
				var elements = result[e].window.tabs;
				
					for (var e in elements){
						if(elements[e].url.split(':')[0] != 'chrome'){
							list.push({url: elements[e].url, title: elements[e].title});
						};
					};
				
			};
		};
		list = list.slice(0, 16);
		for(var e in list){
			var title = list[e].title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			$(`<a href="${list[e].url}"><li style="animation: fadeIn-bloks 0.3s forwards; animation-delay: ${e * 0.01}s;"><span class="date">x</span><img src="https://www.google.com/s2/favicons?sz=64&domain=${list[e].url}"><span class="title">${title}</span></li></a>`).appendTo(history.ul);
		};
		
	});
};

function hideAll(status){
	if(status == 1){
		let transform = 'translateY(-80px)';
		let transition = '.5s';

		LOCAL.blocks.CB.style.transform = transform;
		LOCAL.blocks.RB.style.transform = transform;
		LOCAL.blocks.LB.style.transform = transform;

		LOCAL.blocks.CB.style.transition = transition;
		LOCAL.blocks.RB.style.transition = transition;
		LOCAL.blocks.LB.style.transition = transition;

		LOCAL.blocks.CB.style.opacity = 0;
		LOCAL.blocks.RB.style.opacity = 0;
		LOCAL.blocks.LB.style.opacity = 0;

		bookmarks.parent.style.top = "";
		settings.btn.style.transform = "rotate(0deg)";
		settings.menu.style.display = "none";

		LOCAL.search.ul.innerText = '';
		LOCAL.search.cleaner.style.display = '';

		return settings.status = 0;
	}else{
		setTimeout(function(){
			LOCAL.blocks.CB.style.transition = '';
			LOCAL.blocks.RB.style.transition = '';
			LOCAL.blocks.LB.style.transition = '';
		}, 500);
		

		LOCAL.blocks.CB.style.transform = '';
		LOCAL.blocks.RB.style.transform = '';
		LOCAL.blocks.LB.style.transform = '';

		LOCAL.blocks.CB.style.opacity = '';
		LOCAL.blocks.RB.style.opacity = '';
		LOCAL.blocks.LB.style.opacity = '';
	};
};

function detectWeatherImg(data){
	var img = {
		"clear sky": 'bi-brightness-high',
		"overcast clouds": 'bi-clouds',
		"broken clouds": 'bi-cloud-sun',
		"few clouds": 'bi-cloud-sun',
		"scattered clouds": 'bi-cloud-sun',
		"light rain": 'bi-cloud-rain',
	};
	var Weatherimg = img[data];
	if(Weatherimg == undefined){
		var Weatherimg = 'bi-exclamation-octagon';
		console.log(data);
	}
	return Weatherimg;
};
function unixToDate(unix, format){
	if(format == 1){
		var a = new Date(unix);
	}else{
		var a = new Date(unix * 1000);
	};
	var hour = a.getHours();
	var min = a.getMinutes();
	if(hour < 10){
		hour = '0'+hour;
	};
	if(min < 10){
		min = '0'+min;
	};
	var date = {
		year: a.getFullYear(),
		month: _date.months[a.getMonth()],
		date: a.getDate(),
		hour: hour,
		min: min,
		day: 'Today',
		dayName: '',
	};
	now = new Date();
	if(date.date == now.getDate() + 1){
		date.day = "Tomorrow";
	};
	return date;	
}




function overlayStatus(overlayStatus){
	if(overlayStatus == 1){
		hideAll(1);
		LOCAL.scroll = true;
		overlay.body.style.display = 'flex';
		return overlayStatus = 0;
	}else{
		hideAll(0);
		LOCAL.scroll = false;
		overlay.body.style.display = 'none';
		return overlayStatus = 1;
	};
};
function linkInputsClear(){
	inputs.title.value = '';
	inputs.position.value = '';
	inputs.url.value = '';
};

function url_name(url){
	var position = url.split('.');
	
	if (position.length === 3) {
		title = position[1];
		switch (title) {
			case 'twitch':
				if(url.length > 22){
					title = position[2].slice(3);
				}else{
					title = position[1];
				};
				break;
			case 'google':
				title = position[0].split("/")[2];
				// console.log(title);
				break;
			case '':
				break;
			case '':
				break;
		};
		return title;
	}else if (position.length === 2) {
		var position = url.split('/');
		title = position[2];
		title = title.split('.')[0];
		return title;
	};
};


function shortcuts_action(){
	$('#shortcuts a').mousedown(function(ev){
		var shortcut_block = document.getElementById('shortcuts');
		while (i < shortcut_block.querySelectorAll('a').length) {
			shortcut_block.querySelectorAll('a')[i].setAttribute('index', i);
			i++;
		};


		var storage_shotcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
			
		var id = $(this).attr('index');
		// var position = $(this).attr('position');
		if(ev.which == 3){	
			console.log(id);
			console.log(storage_shotcuts[id]);

			LOCAL.shortcuts.inputs.position.removeAttribute("readonly");
			LOCAL.shortcuts.inputs;
			LOCAL.shortcuts.btn.save.setAttribute('index', id);
			LOCAL.shortcuts.btn.remove.setAttribute('index', id);

			LOCAL.shortcuts.btn.save.style.display = 'flex';
			LOCAL.shortcuts.btn.remove.style.display = 'flex';
			LOCAL.shortcuts.btn.add.style.display = 'none';
			overlayStatus(1);
			
			inputs.title.value = storage_shotcuts[id].title;
			inputs.url.value = storage_shotcuts[id].url;
			inputs.position.value = storage_shotcuts[id].position;
			// inputs.position.value = parseInt(shortcutList[id].position);
		};
	});
};

$('.request-btn').mousemove(function() {
	LOCAL.scroll = true;
});
$('.request-btn').mouseleave(function() {
	LOCAL.scroll = false;
});

function getTopSites(){
	chrome.topSites.get(function(r){
		let a = [];
		let domains = [];
		let list = `<span id="get-my-notes" class="history-request-btns">notes</span><span id="get-history" class="history-request-btns history-request-btns history-request-btn-active">History</span><span id="get-history-recently" class="history-request-btns">Recently</span>`;
		// for(e in r){
		// 	let domain = url_name(r[e].url);
		// 	if(!domains[domain]){
		// 		domains[domain] = [];
		// 	};
		// 	domains[domain].push(domain.slice(0,1).toUpperCase()+domain.slice(1));
		// };
		// for(let e in domains){
		// 	list += `<span id="get-history-${domains[e]}" class="history-request-btns">${domains[e]}</span>`
		// };
		$(list).appendTo('.request-btn');

		$('.history-request-btns').on( "click", function() {
			let request = this.id.split('-')[2];
			$('.history-request-btns').removeClass('history-request-btn-active');
			getSiteHistory(this);
		});
		
		getSiteHistory('','get-my-notes');
	});

};


function myNotes(){
	let notes = JSON.parse(localStorage.getItem('notes')) || 'That area is editable! Type something. :)' ;
	LOCAL.history.block.innerText = '';
	LOCAL.history.block.innerHTML = `<div id="my-notes" contenteditable=true>${notes}</div>`;
	let note_block = document.getElementById('my-notes');

	note_block.onpaste = function(e){
		e.preventDefault(); // Отменяем стандартное поведение вставки
		var pastedData = e.clipboardData.getData('text/plain'); // Получаем текст без стилей
		document.execCommand('insertText', false, pastedData); // Вставляем текст
	};
	$('#my-notes').mousemove(function() {
		LOCAL.scroll = true;
	});
	$('#my-notes').mouseleave(function() {
		LOCAL.scroll = false;
	});
	document.addEventListener('visibilitychange', function() {
		if (document.visibilityState === 'visible') {
			note_block.innerHTML = JSON.parse(localStorage.getItem('notes'));
		};
	});
	note_block.oninput = function(){
		const content = this.innerHTML;
		console.log(content);
		localStorage.setItem('notes', JSON.stringify(content));
	};
};



function getSiteHistory(element, id){
	$('.history-request-btns').removeClass('history-request-btn-active');
	
	let request;
	if(id != undefined){
		request = id.split('-')[2];
		document.getElementById(id).classList.add('history-request-btn-active');
	}else{
		request = element.id.split('-')[2];
		element.classList.add('history-request-btn-active');
	};

	switch (request) {
		case "recently":
			GetRecentlyTabs();
			break;
		case "notes":
			myNotes();
			break;
		default:
			getHistory(request);
			break;
	};
	
	// element.classList.add('history-request-btn-active');
}

LOCAL.history.btn.list.forEach(element => {
	element.onclick = function(){
		getSiteHistory(element);
	};
});

LOCAL.search.input.oninput = function(){
	searchOnNewTab(LOCAL.search.input.value);
};




LOCAL.search.cleaner.onclick = function(){
	LOCAL.search.ul.innerText = '';
	LOCAL.search.input.value = '';
	LOCAL.search.cleaner.style.display = '';
};

function searchOnNewTab(r){

	var q;
	let list = '';
	let length;
	let search = lStorage.settings.searchEngine;
	
	let engine = [
		['https://www.google.com/search','Google'],
		['https://suggest.sso.dzen.ru/suggest/suggest-ya.cgi?part=', 'Yandex'],
		['https://search.yahoo.com/search', 'Yahoo'],
		['https://www.bing.com/search', 'Bing'],
		['https://duckduckgo.com/ac/?q=', 'DuckDuckGo'],
	];


	console.log(r)
	
	axios.get(engine[search][0]+r)
	.then(function (response) {
		var data = response.data;

		if(r == ''){
			data = '';
			LOCAL.search.cleaner.style.display = '';
		};

		console.log(data)





		for(let i in data){
			switch (engine[search][1]) {
				case "DuckDuckGo":
						let phrase = data[i].phrase;
						list += `<a href="https://duckduckgo.com/?q=${phrase}"><li style="opacity: 1"><i class="bi bi-search"></i><span class="title">${phrase}</span></li></a>`;
					
				break;
				// case "Yandex":
				// 	var z =  data.match(/\[(.*?)\]/g)[0];;
				// 	// var z = [data.slice(14, -1)];
				// 	z = z.replace(/,\s*\]/g, ']');
				// 	console.log([z])
					
					
						
				// 		// let phrase = data[i].phrase;
				// 		list += `<a href="https://duckduckgo.com/?q=${phrase}"><li style="opacity: 1"><i class="bi bi-search"></i><span class="title">${phrase}</span></li></a>`;
					
				// break;
			};
		}
		length = data.length;
		

		chrome.history.search({
			text: '',
			maxResults: 5000,
			startTime: 0 
		}, function(results) {
				let filteredResults = results.filter(result => 
					result.title.toLowerCase().includes(r.toLowerCase()) || 
					result.url.toLowerCase().includes(r.toLowerCase())
				);
				console.log(length)


				let data = []; 
				let groupedResults = filteredResults.reduce((acc, result) => {
					// Проверяем, существует ли уже ключ с таким заголовком
					if (!acc[result.title]) {
						let d = {
							title: result.title,
							url: result.url,
							img:	__FaviconURL('',64,result.url),
							time: ''
						};
						data.push(d);
						acc[result.title] = []; // Если нет, создаем новый массив
					};
					return acc; // Возвращаем аккумулятор для следующей итерации
				}, {});
				list2 = '';

				data = data.slice(0, 7);
				if(r == ''){
					data = '';
					LOCAL.search.cleaner.style.display = '';
				};
				for(let i in data){
					var domain = data[i].url.split('/')[2];
					let title = data[i].title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
					list2 += `<a href="${data[i].url}"><li style="opacity: 1"><i class="bi bi-clock-history"></i><span class="title">${title} <span class="domain">${domain}</span></span><span>${data[i].time}</span></li></a>`;
				};
				
				LOCAL.search.ul.innerHTML = `<ul class="engineResults">
													<h2>${engine[search][1]} Results:</h2>
													${list}
												<ul>
												<ul>
												<h2>History:</h2>
													${list2}
												<ul>`;
		});

	})
	.catch(function (error) {
		console.log(error);
	});


	





	LOCAL.search.ul.style.top = LOCAL.search.input.offsetTop+60+'px';
	LOCAL.search.ul.style.width = LOCAL.search.input.offsetWidth+'px';
	LOCAL.search.cleaner.style.top = LOCAL.search.input.offsetTop+(15-2)+'px';
	LOCAL.search.cleaner.style.left = LOCAL.search.input.offsetWidth-40+'px';
	LOCAL.search.cleaner.style.display = 'block';

};



function getHistory(request){
	if(request == undefined){request = ''; requestText = messageText.historyBlock.history}else{
		requestText = `${messageText.historyBlock.request} ${request.split('.')[0]}`;
	};
	const historyItems = chrome.history.search({
		text: request,
		startTime: 5259600000
	}, function(results) {
		LOCAL.history.block.innerText = '';
		results = results.slice(0,18);
		for (var i in results){
			var title = results[i].title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
			var url = results[i].url;
			var lastVisitTime = results[i].lastVisitTime;
			var visitCount = results[i].visitCount;
			var time = unixToDate(lastVisitTime, 1);
			if(title == ''){
				title = url;
			};
			var domain = url.split('/')[2];
			var img = __FaviconURL('',64,url);
			
			var time = `${time.hour} : ${time.min}`;
			$(`<a href="${url}" title="Посещений: ${visitCount}"><li style="animation: fadeIn-bloks 0.3s forwards; animation-delay: ${i * 0.01}s;"><img src="${img}"><span class="title">${title} <span class="domain">${domain}</span></span><span class="date">${time}</span></li></a>`).appendTo(LOCAL.history.block);
		};
	});
};


function displayBokkmarks(){
	var BokkmarksTextLimit = 10;
	var bookmarksView = JSON.parse(localStorage.getItem('settings')).view.bookmarks;
	chrome.bookmarks.getTree(function(result) {
		var data = result[0]['children'][0]['children'];
		var folderds = $('.folders');
		var linkList = [];
		if(bookmarksView == 1){
			view.bookmarks.status.innerText = 'A-Z';
			for (var element in data){
				var folder = data[element].children;		
				if (folder != undefined) {
					for (var link in folder) {
						var link = folder[link];
						var linkData = {
							"title": link.title,
							"url": link.url
						};
						linkList.push(linkData);
					};
				} else {
					var link = data[element];
					var linkData = {
						"title": link.title,
						"url": link.url
					};
					linkList.push(linkData);
				};
			};
			linkList.sort(function(a, b) {
				return a.title.localeCompare(b.title);
			});
			
			var groupedLinks = {};
			for (var link of linkList) {
				var firstLetter = link.title.charAt(0).toUpperCase();
				if (!groupedLinks[firstLetter]) {
					groupedLinks[firstLetter] = [];
				};
				groupedLinks[firstLetter].push(link);
			};
			for (var letter in groupedLinks) {
				var links = groupedLinks[letter];
				var exportlink = '';
				for (var link of links) {
					var title = [link.title, ''];
					var url = link.url;
					if(title[0].length > BokkmarksTextLimit){
						title[1] = title[0].slice(0, BokkmarksTextLimit)+"...";
					}else{
						title[1] = title[0];
					};
					exportlink += `<a title="${title[0]}" href="${url}"><img src="chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${url}"><span>${title[1]}</span></a>`;
				};
				$(`<div class="folder"><div class="folder-title">${letter}</div><div class="folder-links">${exportlink}</div></div>`).appendTo('.folders');
			};
		};
		if(bookmarksView == 0){
			view.bookmarks.status.innerText = 'Folders';
			var smallList = '';
			for (var element in data){
			var folder = data[element].children;
			if(folder != undefined){
				var linkList = '';
				var folderTitle = data[element].title;
				for (link in folder){
					var link = folder[link];
					var url = link.url;
					var title = [link.title,''];
					if(title[0].length > BokkmarksTextLimit){
						title[1] = title[0].slice(0, BokkmarksTextLimit)+"...";
					}else{
						title[1] = title[0];
					};
					var linkList = linkList + `<a title="${title[0]}" href="${url}"><img src=chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${url}><span>${title[1]}</span></a>`;
				};
				$(`<div class="folder"><div class="folder-title">${folderTitle}</div><div class="folder-links">${linkList}</div></div>`).appendTo(folderds);
			}else{
				var link = data[element];
				var url = link.url;
				var title = [link.title,''];
				if(title[0].length > BokkmarksTextLimit){
					title[1] = title[0].slice(0, BokkmarksTextLimit)+"...";
				}else{
					title[1] = title[0];
				}
				var smallList = smallList + `<a title="${title[0]}" href="${url}"><img src=chrome-extension://${GLOBAL.id}/_favicon/?size=24&showFallbackMonogram=&pageUrl=${url}><span>${title[1]}</span></a>`;
			};
		};
		$(`<div class="folder"><div class="folder-title">All</div><div class="folder-links">${smallList}</div></div>`).prependTo('.folders');	
		};
	});
};

function restore(){
	var storage_shotcuts = JSON.parse(localStorage.getItem('shortcuts'));
	var list = [];
	var test = '';

	var colors = LOCAL.shortcuts.colors;

	

	for(let e in storage_shotcuts){
		var rand = Math.floor(Math.random() * colors.length);
		let data = {
			id: parseInt(e),
			title:storage_shotcuts[e].title, 
			url:storage_shotcuts[e].url,
			position: parseInt(e),
			color: colors[rand],
			
		};
		list.push(data);
	};
	// console.log(test)
	localStorage.setItem('shortcuts', JSON.stringify(list));
};

// restore();

// document.getElementById('oqweiqwoeiqeinnei').onclick = function(){
// 	var last = JSON.parse(localStorage.getItem('last'));
// 	localStorage.setItem('shortcuts', JSON.stringify(last));
// 	location.reload();
// }


function siteIcon(url, pos, c){
	let host = url.split('/')[2];
	
	let links = LOCAL.shortcuts.block.children;
	
	chrome.storage.local.get(function(r){	
		let img = links[pos].querySelector('img');
		let data = r.sitesData || [];
		let id = data[0] ? data[0].indexOf(host) : -1;

		if(id !== -1){
			let id = data[0].indexOf(host);
			img.src = data[1][id].icon;
			// console.log(data[0][id])
		}else{
			img.remove();
			let l = links[pos].children[0];
			


			if(lStorage.settings.view.style == 1){
			let t = links[pos].children[0].children[0].innerText;
				$(`<div style="background: #${c}" class="no-img">${t.slice(0,1)}</div>`).appendTo(l);
			}else{
				let t = links[pos].children[0].innerText;
				$(`<div style="background: #${c}" class="no-img">${t.slice(0,1)}</div>`).prependTo(links[pos]);
				// img.src = __FaviconURL(1,256, url);
				console.log(t)
			}
			
			
			// 
		}
	});
};






function shortcuts(action){
	var storage_shotcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
	var shortcut_block = LOCAL.shortcuts.block;
		switch (action) {
			case "display":
					let list = [];
					let view = lStorage.settings.view.style;
					var sort = storage_shotcuts;

					let limit = 36;
					let l = parseInt(sort.length) +1;
					let page = Math.ceil(l / limit);
					let vpv = parseInt(LOCAL.shortcuts.sPage.attributes.page.value); // page
					let vp = vpv * limit; // get
					LOCAL.shortcuts.sPage.style.display = 'none';
					if(view == 1){
						
						if(l > limit){
							let pages = '';
							for(var i = 0; i < page; i++){
								pages += `<div class="page" page="${i}">${i+1}</div>`;
							}
												
							LOCAL.shortcuts.sPage.innerHTML = pages;
							LOCAL.shortcuts.sPage.style.display = 'flex';
							var sort = storage_shotcuts.sort((a, b) => a.position - b.position);
							

							LOCAL.shortcuts.sPage.children[vpv].classList.add('active');
							// alert(vpv)
							// console.log(vpv, vpv+1, limit, vp)

							sort = sort.slice(vp,limit * (vpv+1));

							

							$('.page').click(function(e){
								LOCAL.shortcuts.sPage.attributes.page.value = this.attributes.page.value;
								console.log(LOCAL.shortcuts.sPage.attributes.page.value);
								LOCAL.shortcuts.block.innerText = '';
								shortcuts('display');
							});
						
							
						}sort
					}else{
						var sort = storage_shotcuts.sort((a, b) => a.position - b.position);
					}
					
					for(let e in sort){
						let url = sort[e].url;
						let title = sort[e].title;
						let id = sort[e].id;
						siteIcon(url, e, sort[e].color);
						if(title == ''){
							title = url_name(url);							
						};
						
						
						if(view == 1){
							
							list += `<a index=${id} position=${e} href=${url}><div class="shortcut"><img><div class="shortcut-title-block">${title}</div></div></a>`;
						}else{
							list += `<a index=${id} position=${e} href=${url}><img width=20px height=20px><span>${title}</span></a>`;
						}

					}
					if(view == 1){

						let s = 'display: ';
							if(page-1 != vpv && sort.length == limit){
								s += 'none;'
							}else{
								s += 'flex;'
							}

						LOCAL.shortcuts.block.classList = '';
						LOCAL.shortcuts.block.classList.add("shortcuts-grid-large");
						list += `<div style="${s}"  class="shortcut" id="shortcut-link-create"><i class="bi bi-plus-circle"></i><div class="shortcut-title-block">Create</div></div>`;
						
					}else{
						LOCAL.shortcuts.block.classList = '';
						LOCAL.shortcuts.block.classList.add("shortcuts-grid-small");
						list += '<div id="shortcut-link-create">+</div>';
					}
					settings.ul.style.querySelector('span').innerText = LOCAL.shortcuts.styles[view];
					$(list).prependTo(shortcut_block);
					shortcut_new_action();
					shortcuts_action();
					break;
			case 'create':
				// 
				var colors = LOCAL.shortcuts.colors;
				var rand = Math.floor(Math.random() * colors.length);

				
				// ДОБАВИТЬ ЦВЕТ ПРИ СОЗДАНИИ. 
				
				
				var title = inputs.title.value;
				var url = inputs.url.value.trim();
				if(url != null && url != ''){
					if(url.indexOf('http') == -1 && url.indexOf('https') == -1){
						url = `http://${url}`
					};
					let data = {
						id: parseInt(storage_shotcuts.length),
						title: title,
						url: url,
						position: parseInt(storage_shotcuts.length),
						color: colors[rand],

					};
					if(title == ''){
						title = url_name(url);
					};

					storage_shotcuts.push(data);
					localStorage.setItem('shortcuts', JSON.stringify(storage_shotcuts));
					// let img = __FaviconURL('',64,url)
					// shortcut_block.innerHTML += `
					// 	<a index=${storage_shotcuts.length} href=${url}>
					// 		<img src=${img}>
					// 		<span>${title}</span>
					// 	</a>
					// `;
					shortcut_block.innerText = '';
					shortcuts('display');
		
				};
				break;
			case 'remove':
				var id = LOCAL.shortcuts.btn.save.attributes.index.value;
				var link = document.querySelector(`#shortcut [index="${id}"]`);
				if (id >= 0 && id < storage_shotcuts.length) {
					storage_shotcuts.splice(id, 1);
					localStorage.setItem('shortcuts', JSON.stringify(storage_shotcuts));
				};
				var sort = storage_shotcuts.sort((a, b) => a.position - b.position);
				for (let e in sort){
					console.log(sort[e]);
					sort[e].id = parseInt(e);
					
				};
				localStorage.setItem('shortcuts', JSON.stringify(sort));
				shortcut_block.innerText = '';
				shortcuts('display');
				shortcuts_action();
				// link.remove();
				break;
			case 'edit':
				var id = LOCAL.shortcuts.btn.save.attributes.index.value; // Get id
				// var position = { // Get position [new, old]
				// 	now: inputs.position.value,
				// 	last: storage_shotcuts[id].position
				// }; 
				// if(position.last != position.now){
				// 	let links = document.querySelectorAll('#shortcut a');
				// 	console.log(links[position.now]);
				// 	if(position.now >= 0 && position.now <= storage_shotcuts.length && links[position.now] != undefined){
				// 		let cId = links[position.now].getAttribute('index'); // id элемента по месту
				// 		storage_shotcuts[id].position = position.now;
				// 		storage_shotcuts[cId].position = position.last;
				// 	};
				// 	if(position.now > storage_shotcuts.length || links[position.now] == undefined){
				// 		storage_shotcuts[id].position = position.now;
				// 	};
				// };

				var title = inputs.title.value;
				var url = inputs.url.value.trim();

				if(url != null && url != ''){
					storage_shotcuts[id].title = title;
					storage_shotcuts[id].url = url;
				};
				localStorage.setItem('shortcuts', JSON.stringify(storage_shotcuts));
				var sort = storage_shotcuts.sort((a, b) => a.position - b.position);
				for (let e in sort){
					console.log(sort[e])
					sort[e].id = parseInt(e);
				};
				shortcut_block.innerText = '';
				shortcuts('display');
				shortcuts_action();
				break;
			default:
				alert('shortcut(): Error!');
				break;
		}
		overlayStatus(0);
		linkInputsClear();
};

// function switchDisplayFun(status){
// 	var shortcut_block = document.getElementById('shortcut');
// 	var display = JSON.parse(localStorage.getItem('settings')).view.shortcuts;
// 	if(status != undefined){
// 		if(display == 0){
// 			lStorage.settings.view.shortcuts = 1;
// 		}else{
// 			// alert('CUT.\nif u want watch on GRID, change localstorage->settings->view->shortcuts->0')
// 			lStorage.settings.view.shortcuts = 0;
// 		};
// 	};
// 	localStorage.setItem('settings', JSON.stringify(lStorage.settings));
// 	display = lStorage.settings.view.shortcuts;
// 	if(display == 0){ // grid	
// 		view.shortcuts.status.innerText = 'Grid';
// 		// document.querySelector('.person').style.left = '-15%'; 
// 		shortcut_block.classList.remove('short-cut-flex');
// 		shortcut_block.classList.add('short-cut-grid');
// 	}else{ // flex
// 		view.shortcuts.status.innerText = 'Flex';
// 		shortcut_block.classList.remove('short-cut-grid');
// 		shortcut_block.classList.add('short-cut-flex');
// 		// document.querySelector('.person').style.left = '';
// 	};
// };


function firstRun(){
	
	localStorage.setItem('settings', JSON.stringify(settingsCookie));
	localStorage.setItem('news-cache', JSON.stringify(''));

	return lStorage.settings = settingsCookie;
};
function switchHistory(status){
	var GetHistoryView = JSON.parse(localStorage.getItem('settings')).view.history;
	var status = view.history.status;
	switch (GetHistoryView) {
		case 0:
			lStorage.settings.view.history = 1;
			// historyView();
			break;
		case 1:
			
			lStorage.settings.view.history = 0;
			// historyView();
			break;
		// case 2:
		// 	status.innerText = "On hover";
		// 	lStorage.settings.view.history = 2;
		// 	break;

	};
	console.log(lStorage.settings.view.history);
	localStorage.setItem('settings', JSON.stringify(lStorage.settings));
	
};




// ############################################################################################### 
// 										GLOBAL
// ############################################################################################### 

addEventListener("resize", (event) => {
	var width = document.body.clientWidth;
	document.documentElement.style.setProperty('--width', width);
});

window.onscroll = function(){
	window.scrollTo(0,0);
};

$('.request-btn')[0].addEventListener('wheel', function(event) {
	if (event.deltaY < 0){
		$('.request-btn')[0].scrollLeft -= 50;
	}else if (event.deltaY > 0){
		$('.request-btn')[0].scrollLeft += 50;
	};

});







window.addEventListener('wheel', function(event){

	var ScrollPos = document.getElementsByClassName('folders')[0].scrollTop;
	if(LOCAL.scroll == false){
		if (event.deltaY < 0)
		{
			if(ScrollPos == 0){
				setTimeout(function(){
					if(ScrollPos == 0){
						return scrollStatus = 1; 
					}
				},300);
				if(scrollStatus == 1){
					hideAll(0)
					bookmarks.parent.style.top = "";
					return scrollStatus = 0;
				};
			};
		}
		else if (event.deltaY > 0)
		{
			scrollStatus = 0;
			hideAll(1);
			bookmarks.parent.style.top = "0%";
		};
	}
});
$(document).keyup(function(e) {
	if (e.key === "Escape") { // escape key maps to keycode `27`
		hideAll(1)
		overlayStatus(0);
		return scrollStatus = 0, settings.status = 0 ;
   };
});
window.oncontextmenu = function (){
	return false;     // cancel default menu
};



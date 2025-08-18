const page = {
	url : location.host,
	href: location.href,
	origin: location.origin
}

var LOCAL = {
	pbspeed: 1,
	GPR:0,
	SPR: 0,
	musicVideo: 0,
}


// Sending the message

var ctrl = false; 

var keyboard = {
	LCtrl: {
		keyName: 'LCtrl',
		pressed: false,
	},
	LAlt:{
		keyName: 'LAlt',
		pressed: false,
	},
	17:{
		keyName: 'LCtrl',
		pressed: false,
	},
	18:{
		keyName: 'LAlt',
		pressed: false,
	},
	49:{
		keyName: '1',
		pressed: false,
	},
	50:{
		keyName: '2',
		pressed: false,
	}
}



document.onkeydown = function(e){
	hotkeyManeger(e, true);


	let k = e.keyCode;
	// if(k == 17){
	// 	keyboard.LCtrl.pressed = true; 
	// }
	// if(k == 18){
	// 	keyboard.LAlt.pressed = true; 
	// }
	// if()

	if (keyboard[18].pressed == true && (k >= 49 && k <= 52)) {
		try {
			document.querySelector('video').playbackRate = e.key;
		} catch (error) {
			console.log(error);
		}
	}
	// if(keyboard[18].pressed == true && k <= 49 && k >= 52){
	// if(keyboard[18].pressed == true && k == 49){
	// 	alert(e.key);
	// 	try{
	// 		document.querySelector('video').playbackRate = e.key;
	// 	} catch(error){
	// 		console.log(error)
	// 		alert('error');
	// 	}
	// }


	// if(keyboard[18].pressed == true && k == 49){
	// 	alert('');
		
		
	// }
	// if(keyboard.LAlt.pressed == true && k == 50){
	// 	try{
	// 		
	// 	} catch(error){
	// 		console.log(error)
	// 		alert('error');
	// 	}
	// }

	if(keyboard.LCtrl.pressed == true && k == 81){
		console.log(window.getSelection());
		let url = window.getSelection().baseNode.baseURI;

		let e = window.getSelection();
		// let text = window.getSelection().toString();

		// console.log(document.selection.createRange().htmlText);
		
		textHiglight(e, url);
	}
	// console.log(keyboard[18].pressed)
	// console.log(keyboard.LCtrl.keyName, keyboard.LCtrl.pressed)
	// console.log(keyboard.LAlt.keyName, keyboard.LAlt.pressed)
}
document.onkeyup = function(e){
	hotkeyManeger(e, false);
}

function hotkeyManeger(key, status){
	try{
		keyId = key.keyCode;
		keyboard[keyId].pressed = status;



		console.log(keyboard[keyId].keyName, keyboard[keyId].pressed);
		
	}catch(e){
		console.log(e);
		// alert('hotkeyManeger: error');
	}

	console.log(keyboard);



			// if(!keyboard[key]){
		// 	keyboard[key] = [];
		// 	keyboard[key] =	{
		// 		keyName: key.key,
		// 		pressed: status,
		// 	}
		// }else{
		// 	keyboard[key].pressed = status;
		// }
}


window.onload = function(){
	sitesData();

	switch (page.url) {
		case 'www.nytimes.com':
			nytimes();
			break;
		case 'www.imdb.com':
			imdb();
			break;
		case 'www.youtube.com':
				youtube();
				var observer = new MutationObserver(() => {
					youtube();
					LOCAL.GPR = 0;
				});
				observer.observe(document.body, { childList: true, subtree: true });
			break;
		case 'vk.com':
			vkBackground();
			var vk_observer = new MutationObserver(() => {
				vkBackground();
			});
			vk_observer.observe(document.body, { childList: true, subtree: true });
			break;
		case 'www.kinopoisk.ru':
			kinopoisk();
			var observer = new MutationObserver(() => {
				kinopoisk();
			});
			observer.observe(document.body, { childList: true, subtree: true });
			break;
		default:
			break;
	}
}




// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


function vkBackground(){
	let im = location.pathname.slice(1,3);
	let url = 'https://space-monkey-com.github.io/Ivan_Shishkin_-_%D0%A0%D0%BE%D0%B6%D1%8C_-_Google_Art_Project.jpg';

	if(im == "im"){
		let background = document.querySelector('.ThemeBackgroundRaster') || document.querySelector('.ConvoMain__themeWrapper');
		if(background != null){
			background.style.background = `url(${url})`;
			background.style.backgroundSize = "cover";
			background.style.backgroundPosition = "center";
		}
		
	}
}

function sitesData(){
	//  
	let ic = [];

	
	let pageTitle = document.querySelector('title').innerText;



	// let icon = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut-icon']") || document.querySelector("link[rel='shortcut icon']");
	let icons = document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon'] , link[rel='shortcut-icon']");
	
	let icon;
	if(icons.length == 1){
		icon = icons[0].href;
	}else{
		console.log(icons)
		for(var i = 0; i < icons.length; i++){
			if(icons[i] != null && icons[i].attributes.sizes != undefined){
				let sizes = parseInt(icons[i].attributes.sizes.value.split('x')[0]);
				if(sizes > 16 && sizes < 75){
					
					icon = icons[i].href;
					ic.push([[sizes, icon]])
				}
			}
		}
	}
	if(icon == undefined){
		icon = icons[0].href;
	}

	let title = document.querySelector('title');
	let url = page.url;
	console.log(ic)
	function convertImgToBase64(url, callback) {
		


		const img = new Image();
		img.crossOrigin = 'Anonymous'; 
		img.src = url;
		img.onload = function() {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if(url.split('.').pop() == 'svg'){
				img.width = 64;
				img.height = 64;
			}
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
			
			const dataURL = canvas.toDataURL('image/png'); 
			callback(dataURL);
		};
	}
	console.log(icon)
	
	if(page.origin+'/' == page.href && title != null && title.innerText != page.url){
		title = title.innerText.split(' ')[0];
	}
	convertImgToBase64(icon, function(base64Img) {
		const message = { function:'sitesData', data:{url: url, title: title, icon: base64Img, page:{title: pageTitle}}};
		chrome.runtime.sendMessage(message); 
		console.log(base64Img); 
	});


	
	
	
}



// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

function nytimes(){
	let clear = false;
	let block = document.querySelector('.meteredContent ');
	let content = block.innerHTML;
	var time = setInterval(function(){
		if(document.querySelector('.css-mcm29f') != null){
			document.querySelector('.css-mcm29f').style.overflowY = "scroll";
			document.querySelector('#gateway-content').style.display = "none";
			document.querySelector('.css-gx5sib').style.display = "none";
			block.innerHTML = content;
			clearInterval(time)
		}
	}, 100);
}

function textHiglight(e, url, pos, pos2){
	// let text = e.toString().trim();

	// console.log()

	// console.log(`%c${text}`, "color:red; font-size: 3em");
	// let parent = e.baseNode.parentElement;
	// let html = parent.innerHTML;
	// let txt = parent.innerText;

	// let pos1 = html.search(text)
	// test = [];
	// if(test[!url]){
	// 	test[url] = []; 
	// }
	// test[url] = []

	// test[url].push(txt);


	// console.log(test);


	// innerHTML.search
	// window.getSelection().anchorOffset
	// window.getSelection().focusOffset
	// parent.innerHTML = html.slice(0, pos1) + '<mark>' + txt.slice(pos1, text.length) + '</mark>' + txt.slice(text.length, txt.length);


	// parent.innerHTML = txt.slice(0, window.getSelection().anchorOffset) + '<mark>' + txt.slice(window.getSelection().anchorOffset, window.getSelection().focusOffset) + '</mark>' + txt.slice(window.getSelection().focusOffset, txt.length);

	// parent.innerHTML = `<mark>${html}</mark>`;

	// JSON.stringify(.)
	

}

// function inoriginal(){
// 	document.querySelector('body').classList.add('sub-off-inoriginal');
// 	let paly_btn = document.querySelector('.play-btn');
// 	document.querySelector('body').style.overflow = 'hidden';
// 	// paly_btn.onclick = function() {
// 		var subPrev = '';
// 		let area = document.querySelector('#playerjs');
		
// 		var video = document.querySelector('video');

		
// 		const getSub = setInterval(function(){
// 			var block = document.querySelector('#inoriginal-sub');

			
// 			if(block != undefined || block != null){
// 				let sub = document.querySelector('#pjs_playerjs_subtitle');	
// 				// if(sub == null){
// 				// 	block.style.opacity = 0;
// 				// }else{
// 				// 	block.style.opacity = 1;
// 				// }	
// 				if(sub != undefined || sub != null){
					
// 					sub.style.display = "none";
// 					console.log(sub.innerText);
// 					if(subPrev != sub.innerText && sub.innerText != ''){
// 						block = document.querySelector('#inoriginal-sub');
// 						let text = sub.innerText
// 						// if(text.find())
// 						console.log(sub.innerHTML);
// 						block.querySelector('span').innerText = text;
// 						// block.querySelector('span').innerHTML = sub.innerHTML;
						
// 						subPrev = sub.innerText;
// 					}
// 				}
// 			}else{
// 				$(`<div id="inoriginal-sub"><span></span></div>`).appendTo(area);
// 			}
// 		},100);

// 		video.onpause = function(){
// 			clearInterval(getSub);
// 		}
// 		video.onplay = function(){
// 			getSub;
// 		}
// 	// }
// }

function youtubeVideo(){
	if(LOCAL.GPR == 0 && LOCAL.musicVideo == 0){
		chrome.runtime.sendMessage({function: "getPlaybackRate"}, (r) => {
			let video = document.querySelector('video');
			let get = r.data.playbackRate;
			
			if(video.playbackRate == 1 || video.playbackRate == 2){
				if(video.playbackRate != r.data.playbackRate){
					video.playbackRate = r.data.playbackRate;
				}
				
			}
			LOCAL.pbspeed = r.data.playbackRate;
			LOCAL.SPR = 0;
			let bage = document.querySelector('#upload-info [aria-label="Official Artist Channel"]');
			if(bage != null){
				video.playbackRate = 1;
				return LOCAL.pbspeed = 2, LOCAL.musicVideo = 1;
			}
		});
		LOCAL.GPR = 1;

	}
	
	
	let i = setInterval(function(){
		let btns = document.querySelector('#top-row').querySelector('ytd-menu-renderer');
		if (btns != null){
			if(document.getElementById('SPACE-MONKEY-pip') == null || document.getElementById('SPACE-MONKEY-pip') == undefined){
				// alert(LOCAL.musicVideo);
				

					$(`<button title="Video: Playback speed" id="SPACE-MONKEY-playbackRate-2" class="SPACE-MONKEY-YOUTUBE-WATCH yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading"><div class="yt-spec-button-shape-next__button-text-content">X2</div></button>`).prependTo(btns);
				
				$(`<button title="Video: Picture in picture" id="SPACE-MONKEY-pip" class="SPACE-MONKEY-YOUTUBE-WATCH yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pip" viewBox="0 0 16 16">
						<path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
						<path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z"/>
					</svg></button>`).prependTo(btns);
				let video = document.querySelector('video');

				let b = document.querySelector('ytd-menu-renderer[has-flexible-items]');
				b.style.position = 'absolute';
				b.style.right = '0px';
				b.style.top = '36px';
				
				// alert(LOCAL.pbspeed)
				if(video.playbackRate != LOCAL.pbspeed && LOCAL.musicVideo == 0){
					video.playbackRate = LOCAL.pbspeed;
				}
				
				document.getElementById('SPACE-MONKEY-playbackRate-2').onclick = function(){
					// alert('s');
						if(video.playbackRate == 1){
							video.playbackRate = 2;
							chrome.runtime.sendMessage({function: "setPlaybackRate", data: 2}); 
							this.innerText = 'X1'
						}else{

							video.playbackRate = 1;
							chrome.runtime.sendMessage({function: "setPlaybackRate", data: 1}); 
							this.innerText = 'X2'
						}
				}
				document.getElementById('SPACE-MONKEY-pip').onclick = function(){
					if(document.pictureInPictureElement){
						document.exitPictureInPicture()
					}else{
						video.requestPictureInPicture();
					}
				}
				// console.clear()
			}else{
				clearInterval(i);
				if(LOCAL.SPR == 0){
					if(LOCAL.pbspeed == 1){
						x = 2;
					}else{
						x = 1;
					}
					if(LOCAL.musicVideo == 0){
						document.getElementById('SPACE-MONKEY-playbackRate-2').innerText = "X"+x;
					}else{
						document.getElementById('SPACE-MONKEY-playbackRate-2').style.display = 'none';
					}
					
					// alert(LOCAL.pbspeed);
					LOCAL.SPR = 1;
				}
				
			}
		}
	}, 100)
}



function youtube(){
	if(window.location.pathname == '/@LOVE-YOU-POTREBLAD'){
		// alert('ss');
		// let subscribers = document.querySelector('.page-header-view-model-wiz__page-header-content-metadata').children[2].children[0];
		// let text = subscribers.innerText.split(' ')[1];
		// subscribers.innerText = '315K '+text;
		// alert('s');

	}


	if(window.location.pathname == '/watch'){
		// let ad = document.querySelector('.ytp-ad-player-overlay-layout');
		// if(ad){
		// 	const video = document.querySelector('video');


		// 	video.currentTime = video.duration;


		// }else{
			youtubeVideo();
		// }
		

		
		
	};	
}
function imdb(){
	let block = document.querySelector('ul.ipc-metadata-list--dividers-all');
	let title = document.querySelector('.hero__primary-text').innerText;


	function create(){
		let include = `

		<li role="presentation" class="ipc-metadata-list__item" data-testid="title-pc-principal-credit">
		<span class="ipc-metadata-list-item__label ipc-metadata-list-item__label--btn" aria-label="See full cast and crew"
			aria-disabled="false">Watch on:</span>
		<div class="ipc-metadata-list-item__content-container">
				<ul class="ipc-inline-list ipc-inline-list--show-dividers ipc-inline-list--inline ipc-metadata-list-item__list-content baseAlt"
					role="presentation">
					<li role="presentation" class="ipc-inline-list__item">
						<a id="SPACE-MONKEY-cineb-rs" target="_blank" class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link" role="button" tabindex="0" aria-disabled="false" href="https://cineb.rs/search/${title.replaceAll(' ','-')}">Cineb.rs</a>
						
						
						
					</li>
					<li role="presentation" class="ipc-inline-list__item">
						<a target="_blank" class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link" role="button" tabindex="0" aria-disabled="false" href="http://seasonvar.ru/search?q=${title}">Seasonvar.ru</a>
					</li>
				</ul>
			</div>
		</li>` 
		$(include).prependTo(block)
	}
	
	let interval = setInterval(function(){
		if(document.getElementById('SPACE-MONKEY-cineb-rs') == null || document.getElementById('SPACE-MONKEY-cineb-rs') == undefined){
			create();
		}else{
			clearInterval(interval);
		}

	}, 100)



}
function kinopoisk(){
	let spam = document.querySelector('#click_area');
	if(spam != undefined){
		spam.remove();
	}


	console.log(0)
	let path = location.pathname;
	if(path.indexOf('film') != -1 || path.indexOf('series') != -1){
		if(document.getElementById('kpfr') == null || document.getElementById('kpfr') == undefined){
			console.log(1)
			let id = location.pathname.split('/')[2];
			let header = document.querySelector('h1');
			let content = header.innerHTML;
			let underTitle = $('div[class^=styles_title]')[0];

			// 
			

			let classList = 'style_button__Awsrq style_buttonSize52__MBeHC style_buttonPrimary__Qn_9l style_withIconLeft__USlpL';
			let originalTitle = document.querySelector('[data-tid="eb6be89"]').innerText;
			// rgba(31,31,31,.95)
			function create(bgC, c){
				// alert(window.getComputedStyle($('[class^=styles_kinopoiskRatingSnippet]')).backgroundColor)
				let include = `
				<div id="watch-outside">
						<button class="${classList}" style="background: ${bgC}; color:${c}" id="kpfr">Kpfr</button> 
						<button class="${classList}" style="background: ${bgC}; color:${c}" id="cineb-rs">Cineb.rs</button>
				</div>`;
				$(include).appendTo(underTitle)
			}
			
			while(true){
				let raitBtn = getComputedStyle(document.querySelector('[class^="styles_kinopoiskRatingSnippet"] button'));
				let color = raitBtn.color;
				let bgC = raitBtn.backgroundColor;
				
				if(document.getElementById('kpfr') == null && bgC != undefined || document.getElementById('kpfr') == undefined && bgC != undefined){
						create(bgC, color);
				}else{
					document.getElementById('kpfr').onclick = function(){
						window.open(`https://k1.kpfr.fun/?id=${id}&rd=kp&title=${header.innerText}`);
					}
					document.getElementById('cineb-rs').onclick = function(){
						window.open(`https://cineb.rs/search/${originalTitle.replaceAll(' ','-')}`, '_blank');
					}
					document.getElementById('seasonvar-ru').onclick = function(){
						window.open(`http://seasonvar.ru/search?q=${originalTitle}`, '_blank');
					}
					break;
				}
			}
		}
	}
}




// try{
// 	if(page.url == 'newdeaf.co' || page.url.split('.')[1] == 'newdeaf'){
// 		alert('s')
// 	}
// }catch(e){
// 	alert(e);
// }


		// case 'inoriginal.net':
		// 	// inoriginal();
		// 	console.log('s');
		// 	break;
		// default:
			
		// 	// if(page.url.indexOf('kpfr') != -1 && location.search.split('=')[1] != undefined){
		// 	// 	const params = new URLSearchParams(window.location.search);
		// 	// 	let id = params.get('id');
		// 	// 	let title = params.get('title') || '';
		// 	// 	let rd = params.get('rd') || '';

		// 	// 	let list = '';
		// 	// 	if(title != ''){
		// 	// 		list += `<a href=#>${title}</a>`
		// 	// 	}
		// 	// 	if(rd != ''){
		// 	// 		list += `<a href="https://www.kinopoisk.ru/film/${id}/">Назад на кинопоиск.</a>`;
		// 	// 		$(`<div id="back-to-kinopoisk">${list}</div>`).appendTo(document.body);
		// 	// 		setTimeout(function(){
		// 	// 			document.getElementById('back-to-kinopoisk').style.opacity = 0;
		// 	// 		}, 5000)
		// 	// 	}
		// 	// }
		// 	break;

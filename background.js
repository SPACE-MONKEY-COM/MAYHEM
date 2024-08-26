

// ФАЙЛ НЕ СЖИМАЛ ЧТОБЫ МОЖНО БЫЛО ПОСМОТРЕТЬ КАКИЕ ДАННЫЕ СОБИРАЕТ РАСШИРЕНИЕ  

const page = {
	url : location.host,
	href: location.href,
	origin: location.origin
}

var LOCAL = {
	pbspeed: 1,
	GPR:0,
	SPR: 0	
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
			// получить скорость
			youtube();

			var observer = new MutationObserver(() => {
				youtube();
				LOCAL.GPR = 0;
				
			});
			observer.observe(document.body, { childList: true, subtree: true });
			break;
		case 'www.kinopoisk.ru':
			kinopoisk();
			var observer = new MutationObserver(() => {
				kinopoisk();
			});
			observer.observe(document.body, { childList: true, subtree: true });
			break;
		default:
			if(page.url.indexOf('kpfr') != -1 && location.search.split('=')[1] != undefined){
				const params = new URLSearchParams(window.location.search);
				let id = params.get('id');
				let title = params.get('title') || '';
				let rd = params.get('rd') || '';

				let list = '';
				if(title != ''){
					list += `<a href=#>${title}</a>`
				}
				if(rd != ''){
					list += `<a href="https://www.kinopoisk.ru/film/${id}/">Назад на кинопоиск.</a>`;
					$(`<div id="back-to-kinopoisk">${list}</div>`).appendTo(document.body);
					setTimeout(function(){
						document.getElementById('back-to-kinopoisk').style.opacity = 0;
					}, 5000)
				}
			}
			break;
	}
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 

function sitesData(){
	let ic = [];

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
		const message = { function:'sitesData', data:{url: url, title: title, icon: base64Img}};
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

function youtube(){
	if(window.location.pathname == '/watch'){
		

		if(LOCAL.GPR == 0){
			chrome.runtime.sendMessage({function: "getPlaybackRate"}, (r) => {
				let video = document.querySelector('video');
				let get = r.data.playbackRate;
				
				if(video.playbackRate == 1 || video.playbackRate == 2){
					video.playbackRate = r.data.playbackRate;
				}
				
				
				LOCAL.pbspeed = r.data.playbackRate;
				LOCAL.SPR = 0;

				let bage = document.querySelector('#upload-info [aria-label="Official Artist Channel"]');
				if(bage != null){
					video.playbackRate = 1;
					return LOCAL.pbspeed = 2;
				}
			});
			
			LOCAL.GPR = 1;

		}
		let i = setInterval(function(){
			let btns = document.querySelector('#top-row').querySelector('ytd-menu-renderer');
			if (btns != null){
				if(document.getElementById('SPACE-MONKEY-playbackRate-2') == null || document.getElementById('SPACE-MONKEY-playbackRate-2') == undefined){
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
					video.playbackRate = LOCAL.pbspeed;
					document.getElementById('SPACE-MONKEY-playbackRate-2').onclick = function(){
					

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
						document.getElementById('SPACE-MONKEY-playbackRate-2').innerText = "X"+x;
						LOCAL.SPR = 1;
					}
					
				}
			}
		}, 100)
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
	console.log(0)
	let path = location.pathname;
	if(path.indexOf('film') != -1 || path.indexOf('series') != -1){
		if(document.getElementById('kpfr') == null || document.getElementById('kpfr') == undefined){
			console.log(1)
			let id = location.pathname.split('/')[2];
			let header = document.querySelector('h1');
			let content = header.innerHTML;
			let underTitle = document.querySelector('.styles_title__hTCAr') || document.querySelector('[data-tid="b0b97076"]');
			let classList = 'style_button__PNtXT style_buttonSize52__b5OBe style_buttonPrimary__ndPAb style_buttonLight____6ma style_withIconLeft___Myt9';
			let originalTitle = document.querySelector('[data-tid="eb6be89"]').innerText;

			function create(){
				let include = `
				<div id="watch-outside">
						<button class="${classList}" style="background: #f2f2f2" id="kpfr">Kpfr</button> 
						<button class="${classList}" style="background: #f2f2f2" id="cineb-rs">Cineb.rs</button>
						<button class="${classList}" style="background: #f2f2f2" id="seasonvar-ru">Seasonvar.ru</button>
				</div>`;
				$(include).appendTo(underTitle)
			}
			
			let interval = setInterval(function(){
				if(document.getElementById('kpfr') == null || document.getElementById('kpfr') == undefined){
					create();
				}else{
					clearInterval(interval);
					document.getElementById('kpfr').onclick = function(){
						window.open(`https://k1.kpfr.fun/?id=${id}&rd=kp&title=${header.innerText}`);
					}
					document.getElementById('cineb-rs').onclick = function(){
						window.open(`https://cineb.rs/search/${originalTitle.replaceAll(' ','-')}`, '_blank');
					}
					document.getElementById('seasonvar-ru').onclick = function(){
						window.open(`http://seasonvar.ru/search?q=${originalTitle}`, '_blank');
					}
				}

			}, 100)
		}
	}
}





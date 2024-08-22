const page = {
	url : location.host,
	href: location.href,
	origin: location.origin
}

window.onload = function(){

	switch (page.url) {
		case 'www.nytimes.com':
			nytimes();
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





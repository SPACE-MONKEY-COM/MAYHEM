
let page = window.location.pathname.split('/').pop().split('.')[0];

if(page == 'main'){
	var m = 0;

	var Emoji = [ '🙊', '🙈','🙉'];
	// var Emoji = '🐵🐒🙊🙉🙈';
	var background = document.getElementById('background');
	var monkeyEmoji = document.getElementById('monkeyEmoji');
	var mood = document.getElementById('mood');
	var monkeyMod = '';
	var audio = new Audio('sounds/22.mp3');
	audio.volume = 0.1;
	setInterval(function(){
		if(m == Emoji.length){
			m = 0;
		}
		audio.play();
		mood.innerText = Emoji[m];
		m++;
	}, 500)
	console.log(monkeyMod);

	
}else if(page == 'changelog'){
	// alert();	

	let hash = window.location.search.slice(1);
	let el = document.getElementById(hash);
	el.children[0].style.background = 'yellow';

	setTimeout(() => {
		el.children[0].style.background = '';
	}, 2000);
	
	let pos = el.offsetTop - 10;
	// window.scrollTo(0, pos);
	console.log(pos)
	setTimeout(() => {
		window.scrollTo(0, pos);
	}, 10);

}

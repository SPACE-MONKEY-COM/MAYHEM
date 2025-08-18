// getCourseCurrency();
// getWeather();

// document.getElementById('radio').style.display = 'grid';







function getWeather(){
	const weather = {
		mainblock: document.getElementById('weather'),
		h3: {
			time: document.getElementById('weather-3h').querySelector('.weather-at-time'),
			block: document.getElementById('weather-3h'),
			i: document.getElementById('weather-3h').querySelector('i'),
			w_n: document.getElementById('weather-3h').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-3h').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-3h').querySelector('.weather-sb-temp-min-max'),
		},
		h6: {
			time: document.getElementById('weather-6h').querySelector('.weather-at-time'),
			block: document.getElementById('weather-6h'),
			i: document.getElementById('weather-6h').querySelector('i'),
			w_n: document.getElementById('weather-6h').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-6h').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-6h').querySelector('.weather-sb-temp-min-max'),
		},
		h9: {
			time: document.getElementById('weather-9h').querySelector('.weather-at-time'),
			block: document.getElementById('weather-9h'),
			i: document.getElementById('weather-9h').querySelector('i'),
			w_n: document.getElementById('weather-9h').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-9h').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-9h').querySelector('.weather-sb-temp-min-max'),
		},
		h12: {
			time: document.getElementById('weather-12h').querySelector('.weather-at-time'),
			block: document.getElementById('weather-12h'),
			i: document.getElementById('weather-12h').querySelector('i'),
			w_n: document.getElementById('weather-12h').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-12h').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-12h').querySelector('.weather-sb-temp-min-max'),
		},
		h15: {
			time: document.getElementById('weather-15h').querySelector('.weather-at-time'),
			block: document.getElementById('weather-15h'),
			i: document.getElementById('weather-15h').querySelector('i'),
			w_n: document.getElementById('weather-15h').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-15h').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-15h').querySelector('.weather-sb-temp-min-max'),
		},
		now:{
			time: document.getElementById('weather-now').querySelector('.weather-at-time'),
			block: document.getElementById('weather-now'),
			i: document.getElementById('weather-now').querySelector('i'),
			w_n: document.getElementById('weather-now').querySelector('.weather-sb-name'),
			w_t:document.getElementById('weather-now').querySelector('.weather-sb-temp'),
			w_mm:document.getElementById('weather-now').querySelector('.weather-sb-temp-min-max'),
		},
	}
	var query = `http://api.openweathermap.org/data/2.5/forecast?id=629634&appid=b3114b6c5bd9ce025c06f79a022dc6f7&units=metric`;
	
	axios.get(query)
	.then(function (response) {
		response = response.data
		var time =  unixToDate(response.list[0].dt);
		// console.log(response)
		// weather.text.now.name.innerText = response.city.name;
		// weather.text.now.data.innerText = `${time.date} ${time.month}, ${time.hour}:${time.min}`;
		// weather.text.now.temp.innerText = "+" + Math.round(response.list[0].main.temp);
		// weather.text.now.temp_max.innerText = "+" + Math.round(response.list[0].main.temp_max);
		// weather.text.now.temp_min.innerText = "+" + Math.round(response.list[0].main.temp_min);
		
		var weatherName = response.list[0].weather[0].description;
		weather.mainblock.querySelector('i').classList.add(detectWeatherImg(weatherName));
		weather.mainblock.querySelector('i').title = weatherName;
		weather.mainblock.style.opacity = 1;

		
		var time = {
			now: unixToDate(response.list[0].dt),
			h3: unixToDate(response.list[1].dt),
			h6: unixToDate(response.list[2].dt),
			h9: unixToDate(response.list[3].dt),
			h12: unixToDate(response.list[4].dt),
			h15: unixToDate(response.list[5].dt),
		}
		weather.h3.w_t.innerText = '+'+Math.round(response.list[1].main.temp);
		var wT = {
			now: response.list[0].weather[0].description,
			h3: response.list[1].weather[0].description,
			h6: response.list[2].weather[0].description,
			h9: response.list[3].weather[0].description,
			h12: response.list[4].weather[0].description,
			h15: response.list[5].weather[0].description,
		};

		
		for(let i = 1; i < 6; i++){
			var block = 'h'+(i * 3);
			weather[block].block.style.animation = "fadeIn-bloks 0.3s forwards";
			weather[block].block.style.animationDelay = (i * 0.3)+'s';
		}
		
		weather.now.block.style.animation = "fadeIn-bloks 0.3s forwards";
		weather.now.time.innerText = `${time.now.day} at ${time.now.hour}:${time.now.min}`
		weather.now.i.title = wT.now;
		weather.now.i.classList.add(detectWeatherImg(wT.h6));
		weather.now.w_t.innerText = '+'+Math.round(response.list[0].main.temp);
		weather.now.i.title = response.list[0].weather[0].description;
		weather.now.w_mm.innerText = `Min: +${Math.round(response.list[0].main.temp_min)} / Max: +${Math.round(response.list[0].main.temp_max)}`;


		weather.h3.time.innerText = `${time.h3.day} at ${time.h3.hour}:${time.h3.min}`
		weather.h3.i.title = wT.h3;
		weather.h3.i.classList.add(detectWeatherImg(wT.h3));
		weather.h3.w_t.innerText = '+'+Math.round(response.list[1].main.temp);
		weather.h3.i.title = response.list[1].weather[0].description;
		weather.h3.w_mm.innerText = `Min: +${Math.round(response.list[1].main.temp_min)} / Max: +${Math.round(response.list[1].main.temp_max)}`;

		

		weather.h6.time.innerText = `${time.h6.day} at ${time.h6.hour}:${time.h6.min}`
		weather.h6.i.title = wT.h6;
		weather.h6.i.classList.add(detectWeatherImg(wT.h6));
		weather.h6.w_t.innerText = '+'+Math.round(response.list[2].main.temp);
		weather.h6.i.title = response.list[2].weather[0].description;
		weather.h6.w_mm.innerText = `Min: +${Math.round(response.list[2].main.temp_min)} / Max: +${Math.round(response.list[2].main.temp_max)}`;

		weather.h9.time.innerText = `${time.h9.day} at ${time.h9.hour}:${time.h9.min}`
		weather.h9.i.title = wT.h9;
		weather.h9.i.classList.add(detectWeatherImg(wT.h9));
		weather.h9.w_t.innerText = '+'+Math.round(response.list[3].main.temp);
		weather.h9.i.title = response.list[3].weather[0].description;
		weather.h9.w_mm.innerText = `Min: +${Math.round(response.list[3].main.temp_min)} / Max: +${Math.round(response.list[3].main.temp_max)}`;

		weather.h12.time.innerText = `${time.h12.day} at ${time.h12.hour}:${time.h12.min}`
		weather.h12.i.title = wT.h12;
		weather.h12.i.classList.add(detectWeatherImg(wT.h12));
		weather.h12.w_t.innerText = '+'+Math.round(response.list[4].main.temp);
		weather.h12.i.title = response.list[4].weather[0].description;
		weather.h12.w_mm.innerText = `Min: +${Math.round(response.list[4].main.temp_min)} / Max: +${Math.round(response.list[4].main.temp_max)}`;
		
		weather.h15.time.innerText = `${time.h15.day} at ${time.h15.hour}:${time.h15.min}`
		weather.h15.i.title = wT.h15;
		weather.h15.i.classList.add(detectWeatherImg(wT.h15));
		weather.h15.w_t.innerText = '+'+Math.round(response.list[5].main.temp);
		weather.h15.i.title = response.list[4].weather[0].description;
		weather.h15.w_mm.innerText = `Min: +${Math.round(response.list[5].main.temp_min)} / Max: +${Math.round(response.list[5].main.temp_max)}`;
	
	
	})
	.catch(function (error) {
		console.log(error);
	});
}
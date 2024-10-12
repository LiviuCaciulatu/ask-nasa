const root = document.getElementById("root");
const dateInput=document.getElementById("date-input")
const apiKey = "2HizkxK6yzXUImdeEjSfdIupsf5c4bDJiXEqx2Au";
const apiUrl = 'https://api.nasa.gov/planetary/apod';

function selectDay () {
	const date = dateInput.value;
	const url = `${apiUrl}?date=${date}&api_key=${apiKey}`;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			if (data.media_type === 'image') {
				const image = document.createElement('img');
				image.src = data.url;
				image.alt = data.title;

				const title = document.createElement('h2');
				title.textContent = data.title;

				const explanation = document.createElement('p');
				explanation.textContent = data.explanation;

				root.innerHTML = '';
				root.append(image, title, explanation);
			} else if (data.media_type === 'video') {
				const video = document.createElement('iframe');
				video.setAttribute('src', data.url);
				video.setAttribute('frameborder', '0');
				video.setAttribute('allowfullscreen', '');

				const title = document.createElement('h2');
				title.textContent = data.title;

				const explanation = document.createElement('p');
				explanation.textContent = data.explanation;

				root.innerHTML = '';
				root.append(video, title, explanation);
			}
		})
		.catch(error => console.error(error));
}
dateInput.addEventListener("change", selectDay);
selectDay()
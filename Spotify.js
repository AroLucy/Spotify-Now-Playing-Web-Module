function dataset() {
	(async () => {
		// Fetch Access Token from Auth.js and convert to JSON Object
		
		await fetch("/Auth.json").then(response => response.json())
			.then(data => {
				console.log(data);
				var auth = data.auth;

				// Fetch Currently Playing Data from Spotify and convert to JSON Object
				
				fetch("https://api.spotify.com/v1/me/player/currently-playing?market=GB", {
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + auth,
						"Content-Type": "application/json"
					}
				}).then((response) => {
					console.log(response.json().then(
						(data) => {

							// Declare data as now Play
							
							var LastTrack = document.getElementById("track").innerText
							let nowPlay = data;

							var Track = nowPlay.item.name;
							var Progress = nowPlay.progress_ms;

							// Check if the previous track fetched is the same as current track fetched
							
							if (LastTrack !== Track) {

								// Extract needed Data from nowPlay
								
								var Album = nowPlay.item.album.name;
								var Artist = nowPlay.item.artists[0].name;
								var AlbumArt = nowPlay.item.album.images[0].url;
								var Duration = nowPlay.item.duration_ms;
								var Preview = nowPlay.item.preview_url;

								// Apply new data to HTML elements 
								
								document.getElementById("track").innerText = Track;
								document.getElementById("album").innerText = Album;
								document.getElementById("artist").innerText = Artist;
								document.getElementById("art").src = AlbumArt;
								document.getElementById("length").max = Duration;
								document.getElementById("preview").src = Preview;
							};

							// Update progress bar with new time 
							
							document.getElementById("length").value = Progress;
						}
					));
				});
			})
	})();
}

function msToTime(duration) {
	var //milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		//hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

	//hours = (hours < 10) ? "0" + hours : hours;
	minutes = minutes//(minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds// + "." + milliseconds;
}

var bar = document.getElementById("progress")

dataset()

function update() {
	var timemax = msToTime(document.getElementById("length").max)
	var time = msToTime(document.getElementById("length").value)
	document.getElementById("progress").innerHTML = time
	document.getElementById("max").innerHTML = timemax
	dataset()
}


setInterval(update, 1000);

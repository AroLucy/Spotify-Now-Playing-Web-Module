async function GetData() {
	// Fetch Access Token from Auth.js and convert to JSON Object
		
	response = await fetch("/Auth.json")
	data = await response.json()
	auth = data.auth;

	response = await fetch("https://api.spotify.com/v1/me/player/currently-playing?market=GB", {
	    headers: {
	        Accept: "application/json",
		    Authorization: "Bearer " + auth,
	    	"Content-Type": "application/json"
	    }
    });
	nowPlay = await response.json()
};
async function SetData() {
	LastTrack = document.getElementById("track").innerText
    Track = nowPlay.item.name;
	Progress = nowPlay.progress_ms;

	// Check if the previous track fetched is the same as current track fetched
	if (LastTrack !== Track) {

		// Extract needed Data from nowPlay
								
		Album = nowPlay.item.album.name;
		Artist = nowPlay.item.artists[0].name;
		Duration = nowPlay.item.duration_ms;
		//
		//

		// Apply new data to HTML elements 
		
		document.getElementById("track").innerText = Track;
		document.getElementById("album").innerText = Album;
		document.getElementById("artist").innerText = Artist;
		document.getElementById("length").max = Duration;

		if (nowPlay.item.album.images[0] !== undefined) {
			document.getElementById("art").style.display = "block"
			AlbumArt = nowPlay.item.album.images[0].url;
			Preview = "https://open.spotify.com/embed/track/" + nowPlay.item.id;
			document.getElementById("preview").src = Preview;
			document.getElementById("art").src = AlbumArt;
		} else {
			document.getElementById("art").style.display = "none"
		}
	};
	// Update progress bar with new time 
							
    document.getElementById("length").value = Progress;
}
GetData()

function msToTime(duration) {
	seconds = Math.floor((duration / 1000) % 60),
	minutes = Math.floor((duration / (1000 * 60)) % 60)
	minutes = minutes
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	return minutes + ":" + seconds
}

async function update() {
	GetData()
	SetData()
	timemax = msToTime(Duration);
	time = msToTime(Progress);
	document.getElementById("progress").innerHTML = time
	document.getElementById("max").innerHTML = timemax
}

setInterval(update, 1000);

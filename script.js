document.addEventListener("DOMContentLoaded", function () {
	const userId = "813505445171298304";

	fetch(`https://api.lanyard.rest/v1/users/${userId}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				const userData = data.data;
				console.log(userData);

				const username = userData.discord_user.username;
				document.getElementById("username").textContent = username;

				const avatarUrl = `https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=128`;
				const profilePicture = document.getElementById("profile-picture");
				profilePicture.src = avatarUrl;

				const status = userData.discord_status;
				profilePicture.classList.remove(
					"status-online",
					"status-idle",
					"status-dnd",
					"status-offline"
				);
				if (status === "online") profilePicture.classList.add("status-online");
				else if (status === "idle") profilePicture.classList.add("status-idle");
				else if (status === "dnd") profilePicture.classList.add("status-dnd");
				else profilePicture.classList.add("status-offline");

				const activityText = document.getElementById("current-activity");
				const activityName = document.getElementById("activity-name");
				const activityData = document.getElementById("activity-data");
				const activityCover = document.getElementById("activity-cover");

				if (status === "online" || status === "dnd" || status === "idle") {
					activityText.classList.add("activity-active");
					activityText.classList.remove("non-activity-active");
					// spotify
					if (userData.activities && userData.activities.length > 0) {
						if (userData.activities[0].id === "custom") {
							const emoji = userData.activities[0].emoji;

							let emojiCover;
							if (emoji.animated)
								emojiCover = `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=96`;
							else emojiCover = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=96`;
							activityText.innerHTML = `<img id="custom-emoji" src="${emojiCover}" alt="emoji"> ${activityName.name}`;

							if (userData.activities.length > 2) {
								const activity = userData.activities[1];
								activityText.innerHTML = `<img id="custom-emoji" src="${emojiCover}">Ingame`;
								activityName.textContent = activity.name;
								activityData.textContent = activity.details || "";

								const albumCoverUrl = `https://dcdn.dstn.to/app-icons/${activity.application_id}?size=1024`;
								activityCover.src = albumCoverUrl;
								activityCover.style.display = "block";
							} else if (userData.listening_to_spotify && userData.spotify) {
								activityText.innerHTML = `<img id="custom-emoji" src="${emojiCover}">Listening to Spotify`;
								activityName.textContent = userData.spotify.song;
								activityData.textContent = userData.spotify.artist;

								const albumCoverUrl = userData.spotify.album_art_url;
								activityCover.src = albumCoverUrl;
								activityCover.style.display = "block";
							} else {
								activityText.innerHTML = `<img id="custom-emoji" src="${emojiCover}">Online`;
								activityName.textContent = "";
								activityData.textContent = "";
								activityCover.style.display = "none";
							}
						} else {
							if (userData.activities.length > 1) {
								const activity = userData.activities[1];
								activityText.textContent = `Ingame`;
								activityName.textContent = activity.name;
								activityData.textContent = activity.details || "";

								const albumCoverUrl = `https://dcdn.dstn.to/app-icons/${activity.application_id}?size=1024`;
								activityCover.src = albumCoverUrl;
								activityCover.style.display = "block";
							} else if (userData.listening_to_spotify && userData.spotify) {
								activityText.textContent = "Listening to Spotify";
								activityName.textContent = userData.spotify.song;
								activityData.textContent = userData.spotify.artist;

								const albumCoverUrl = userData.spotify.album_art_url;
								activityCover.src = albumCoverUrl;
								activityCover.style.display = "block";
							} else {
								const activity = userData.activities[0];
								activityText.textContent = "Ingame";
								activityName.textContent = activity.name;
								activityData.textContent = activity.details || "";

								const albumCoverUrl = `https://dcdn.dstn.to/app-icons/${activity.application_id}?size=1024`;
								activityCover.src = albumCoverUrl;
								activityCover.style.display = "block";
							}
						}
					} else {
						activityText.textContent = "Online";
						activityName.textContent = "";
						activityData.textContent = "";
						activityCover.style.display = "none";
					}
				} else {
					activityText.classList.add("non-activity-active");
					activityText.classList.remove("activity-active");
					activityText.textContent = "Offline";
					activityName.textContent = "";
					activityData.textContent = "";
					activityCover.style.display = "none";
				}
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
});

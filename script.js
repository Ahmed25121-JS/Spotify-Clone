console.log("lets write javascript");

async function getSongs(params) {
  let a = await fetch("http://127.0.0.1:3000/songs/");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  console.log(as);
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      console.log(element.href);
      // split is used on a string returns an array of 2 strings one before
      //  word specified and one after
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main(params) {
  // Get the list of all songs
  let songs = await getSongs();
  console.log(songs);

  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  console.log(songUl);
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `
              <li>
                <img class="invert" src="music.svg" alt="" />
                <div class="info">
                  <div>${song.replaceAll("%20", " ").replaceAll("(", "").replaceAll(")", "")}</div>
                  <div>Ahmed</div>
                </div>
                <div class="playnow">
                 <span>Play now</span> <img class="invert" src="play.svg" alt="" />
                </div>
              </li>`;
  }

  // Play the first song
  var audio = new Audio(songs[0]);
  audio.play();

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(audio.duration, audio.currentSrc, audio.currentTime);

    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}

main();

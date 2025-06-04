console.log("lets write javascript");
let currentSong= new Audio();
let songs;
let currfolder;


function formatTime(seconds) {
  // Calculate minutes and seconds
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Add leading zeros (e.g., 5 becomes "05")
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  return `${formattedMins}:${formattedSecs}`;
}



async function getSongs(folder) {
  currfolder =folder;
  let a = await fetch(`http://127.0.0.1:3000/${folder}`);
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  // console.log(as);
 songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      console.log(element.href);
      // split is used on a string returns an array of 2 strings one before
      //  word specified and one after
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }
  // Shows all the songs in the playlist
  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
    songUl.innerHTML=""
  console.log(songUl);
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `
              <li>
                <img class="invert" src="music.svg" alt="" />
                <div class="info">
                  <div>${song
                    .replaceAll("%20", " ")
                   }</div>
                  <div>Ahmed</div>
                </div>
                <div class="playnow">
                 <span>Play now</span> <img class="invert" src="play.svg" alt="" />
                </div>
              </li>`
  }
  
// Creating an array and then passing in the song to play music
 Array.from(
    document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  
  })
}
// http://127.0.0.1:3000/songs/(Look%20Out)%20She's%20America%20-%20Otis%20McDonald.mp3

const PlayMusic = (track,pause=true)=>{
  currentSong.src=`/${currfolder}/` + track
  if (!pause){
    currentSong.play()
   
      play.src ='pause.svg' 
  }
      document.querySelector('.songinfo').innerHTML =decodeURI(track )
      
      document.querySelector('.songtime').innerHTML ="00/00"
}

// Display all the albums on the page
async function displayAlbums(params) {
  let a = await fetch(`http://127.0.0.1:3000/songs/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  console.log(div);
 let anchors= div.getElementsByTagName('a')

let cardContainer = document.querySelector('.cardContainer')
 let array =Array.from(anchors)
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
if (e.href.includes("/songs")) {
let folder =e.href.split('/').slice(-2)[0]
  // Get the metadat of the folders
    let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`);
  let response = await a.json();
  cardContainer.innerHTML = cardContainer.innerHTML + `
   <div data-folder="cs" class="card">
              <div class="play">
                <div class="play-button-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <img
                src="/songs/${folder}/cover.jpg"
                alt=""
              />
              <h2>${response.title}</h2>
              <p>${response.description}</p>
            </div>
  
  
  `
  
}
 }

 
Array.from(document.getElementsByClassName('card')).forEach((card) => {
  card.addEventListener('click', async (event) => {
    // ✅ Use currentTarget to always get the .card element
    const folder = event.currentTarget.dataset.folder;
    console.log(folder);
    
    if (!folder) {
      console.error("No data-folder attribute found on card");
      return;
    }
    
    songs = await getSongs(`songs/${folder}`);
     // Check if songs are fetched correctly
  });
});
  
}
displayAlbums()





async function main(params) {
  
// Get the list of all the songs
 await getSongs(`songs/ncs`);
  console.log(songs);
  PlayMusic(songs[0],true)





// Attach an event listener to previos,play,next
// We can access id's directly we dont have to writedocument.getelementbyid
// ids are global variables
play.addEventListener('click',()=>{
  if (currentSong.paused) {
    currentSong.play()
    play.src ='pause.svg'
  } else {
    currentSong.pause()
    play.src="play.svg"
  }
})


// listen for timeuodate function 
currentSong.addEventListener("timeupdate",()=>{
 
  document.querySelector(".songtime").innerHTML =`
  ${formatTime(currentSong.currentTime)}/ ${formatTime(currentSong.duration) }`
 
  document.querySelector('.circle').style.left=(currentSong.currentTime/currentSong.duration) *100 + "%"
})

// Add an event listener to seekbar
document.querySelector(".seekbar").addEventListener('click',(e)=>{
let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 
console.log(percent)
document.querySelector('.circle').style.left = percent  + "%"
currentSong.currentTime=( currentSong.duration*percent) /100
})


// Add an event listener for hamburger
document.querySelector(".hamburger").addEventListener('click',()=>{
        document.querySelector('.left').style.left ="0" })

// Add an event listener for clising hamburger
document.querySelector(".close").addEventListener('click',()=>{
   document.querySelector('.left').style.left ="-110%" 
   
})

// add an evet listener to previous 
previous.addEventListener('click',()=>{
console.log("next"),
console.log(currentSong.src)
console.log(songs)
lastIndex = currentSong.src.split("/")
songplaying = lastIndex[lastIndex.length-1]
console.log(songplaying)
let index =(songs.indexOf(songplaying))
if (index <= songs.length-1) {
  PlayMusic(songs[index-1])
}



})

// add an event listener for next
next.addEventListener('click',()=>{
console.log("next"),
console.log(currentSong.src)
console.log(songs)
lastIndex = currentSong.src.split("/")
songplaying = lastIndex[lastIndex.length-1]
console.log(songplaying)
let index =(songs.indexOf(songplaying))
if (index < songs.length-1) {
  PlayMusic(songs[index+1])
}

})

// Add an event to volume
document.querySelector(".range").getElementsByTagName('input')[0].addEventListener('change',(e)=>{
  console.log("Setting volume to" ,e.target.value,"/100");
  currentSong.volume=parseInt(e.target.value)/100
  
})

// Load the playlist whenver card is clicked





}





main();


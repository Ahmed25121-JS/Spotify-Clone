console.log("lets write javascript");
let currentSong= new Audio();
let songs;


function formatTime(seconds) {
  // Calculate minutes and seconds
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  // Add leading zeros (e.g., 5 becomes "05")
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;

  return `${formattedMins}:${formattedSecs}`;
}



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
// http://127.0.0.1:3000/songs/(Look%20Out)%20She's%20America%20-%20Otis%20McDonald.mp3

const PlayMusic = (track,pause=true)=>{
  currentSong.src="/songs/" + track
  if (!pause){
    currentSong.play()
   
      play.src ='pause.svg' 
  }
      document.querySelector('.songinfo').innerHTML =decodeURI(track )
      
      document.querySelector('.songtime').innerHTML ="00/00"
}




// Get the list of all songs
async function main(params) {
  

 songs = await getSongs();
  console.log(songs);
  PlayMusic(songs[0],true)

  // Shows all the songs in the playlist
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
  // Attach an event listener to each song
  // After using getelementby tagsname we get an array of objects (or you can call it an array like object)
  // so Array.from is used to convert it into an actual array so we can use array methods on it
 // Inside your main() function, after setting songUl.innerHTML:

// Add a small delay to allow DOM to update
 Array.from(
    document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  
  })

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
  console.log(currentSong.currentTime,currentSong.duration)
  document.querySelector(".songtime").innerHTML =`
  ${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}
  `
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

// add an evet listener to previous and next
previous.addEventListener('click',(e)=>{
  console.log("previos")
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  console.log(songs,index)
  if (index-1 >= 0) {
    
 PlayMusic(songs[index-1])
  }
})

// add an event listener for next

next.addEventListener('click',(e)=>{
  console.log("next")
  console.log(currentSong.src)

  console.log(currentSong.src.split("/").slice(-1)[0])
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  console.log(songs,index)
  if ((index+1) > songs.length) {
    
 PlayMusic(songs[index+1])
  }

})






}





main();


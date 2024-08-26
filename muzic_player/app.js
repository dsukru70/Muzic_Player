const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector(".music-details .title");
const singer = document.querySelector(".music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const audio = document.querySelector("#audio"); // 'audio' elementini seçiyoruz
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volum-bar");
const ul = document.querySelector("ul");

const player = new MusicOynatici(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusiclistesi (player.musicList);
});

function displayMusic(music) {
    if (title && singer && image && audio) { 
        title.innerText = music.getName();
        singer.innerText = music.singer;
        image.src = "/img/" + music.img;
        audio.src = "/mp3/" + music.file;
    } else {
        console.error("HTML elementleri bulunamadı.");
    }
};

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playling");
    isMusicPlay ? pauseMusic() : playMusic();
});



prev.addEventListener("click", () => {
    player.prevMusic();
});

function prevMusic(){
    player.previous();
    let music = player.getMusic();
    displayMusic(music);    
    playMusic();
};

next.addEventListener("click", () => {
    nextMusic();
});

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);    
    playMusic();
};

function pauseMusic(){
    container.classList.remove("playling");
    play.classList="fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playling");
    play.classList ="fa-solid fa-pause";
    audio.play();
}

 const calculateTime = (toplamSaniye) => {
     const dakika = Math.floor(toplamSaniye / 60);
     const saniye = Math.floor(toplamSaniye % 60);
     const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`
     const sonuc =`${dakika}:${guncellenenSaniye}`;
     return sonuc;
 }

audio.addEventListener("loadedmetadata",() => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration)
})

audio.addEventListener("timeupdate",() => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input" , () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let sesDurumu ="Sesli";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0){
        audio.muted = true;
        sesDurumu = "Sesisiz"
        volume.classList = "fa-solid fa-volume-xmark"

    }else{
        audio.muted = false;
        sesDurumu = "Sesli"
        volume.classList = "fa-solid fa-volume-high"

    }

})


volume.addEventListener("click", () => {
    if (sesDurumu ==="Sesli"){
        audio.muted = true;
        sesDurumu = "Sesisiz"
        volume.classList = "fa-solid fa-volume-xmark"
        volumeBar.value=0;
    }else{
        audio.muted = false;
        sesDurumu = "Sesli"
        volume.classList = "fa-solid fa-volume-high"
        volumeBar.value=100;
    }
})

const displayMusiclistesi = (list) =>{
    for( let i = 0; i < list.length; i++){
        let liTag = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music ${i}"  class="badge bg-primary rounded-pill"></span>
                    <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;

        ul.insertAdjacentHTML("beforeend",liTag);

        let liSesTurTag = ul.querySelector(`#music-${i}`);
        let liSesTag = ul.querySelector(`.music-${i}`);

        liSesTag.addEventListener("loadeddata", () => {
            liSesTurTag.innerText = calculateTime(liSesTag.duration);
        });


    }
 }
 

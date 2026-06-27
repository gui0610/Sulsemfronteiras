let aud = new Audio("podcast7.mp3");

let playing = false;

const btnP = document.getElementById("btn-play");
const icoPlay = document.getElementById("ico-play");
const icoPause = document.getElementById("ico-pause");
const lbl = document.getElementById("play-lbl");
const podTime = document.getElementById("pod-time");
const podFill = document.getElementById("pod-fill");
const podBar = document.getElementById("pod-bar");

function fmt(s){
  if(!s || isNaN(s)) return "0:00";

  return Math.floor(s/60)+":"+
  (Math.floor(s%60)+"").padStart(2,"0");
}

aud.ontimeupdate = () => {

  const p = (aud.currentTime / aud.duration) * 100 || 0;

  podFill.style.width = p + "%";

  podTime.textContent =
    fmt(aud.currentTime) +
    " / " +
    fmt(aud.duration);
};

aud.onended = () => {

  playing = false;

  icoPlay.style.display = "";
  icoPause.style.display = "none";

  lbl.textContent = "Ouvir novamente";
};

if(btnP){

  btnP.onclick = () => {

    if(playing){

      aud.pause();

      playing = false;

      icoPlay.style.display = "";
      icoPause.style.display = "none";

      lbl.textContent = "Ouvir agora";

    }else{

      aud.play();

      playing = true;

      icoPlay.style.display = "none";
      icoPause.style.display = "";

      lbl.textContent = "Pausar";
    }
  };
}

if(podBar){

  podBar.onclick = e => {

    if(!aud.duration) return;

    const r = podBar.getBoundingClientRect();

    aud.currentTime =
      ((e.clientX - r.left) / r.width)
      * aud.duration;
  };
}
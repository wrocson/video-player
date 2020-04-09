const player = document.querySelector(".player");
const video = player.querySelector(".video");
const progressRange = player.querySelector(".progress-range");
const progressBar = player.querySelector(".progress-bar");
const playBtn = player.querySelector(".play-controls");
const volumeIcon = player.querySelector(".volume-icon");
const volumeRange = player.querySelector(".volume-range");
const volumeBar = player.querySelector(".volume-bar");
const speed = player.querySelector(".player-speed");
const currentTime = player.querySelector(".time-elapsed");
const duration = player.querySelector(".time-duration");
const fullscreenBtn = player.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //

playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = `<i class="fas fa-pause" title="Pause"></i>`;
  } else {
    video.pause();
    playBtn.innerHTML = `<i class="fas fa-play" title="Play"></i>`;
  }
}
// On video end, show play button icon
video.addEventListener(
  "ended",
  () => (playBtn.innerHTML = `<i class="fas fa-play" title="Play"></i>`)
);

// Progress Bar ---------------------------------- //

// Update progress bar as video plays
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
function updateProgress(e) {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.innerHTML = `${displayTime(video.currentTime)} /`;
  duration.innerHTML = `${displayTime(video.duration)}`;
}

// Format current time, duration
function displayTime(time) {
  var minutes = Math.floor((time % 3600) / 60);
  var seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Click to seek within the video
progressRange.addEventListener("click", setProgress);
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Mute
volumeIcon.addEventListener("click", toggleMute);
function toggleMute() {
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.innerHTML = '<i class="fas fa-volume-mute" title="Unmute"></i>';
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.innerHTML = '<i class="fas fa-volume-up" title="Mute"></i>';
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Volume Bar
volumeRange.addEventListener("click", changeVolume);
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  if (volume > 0.7) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (volume == 0) {
    volumeIcon.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
  lastVolume = volume;
}

// Change Playback Speed -------------------- //

speed.addEventListener("change", changeSpeed);
function changeSpeed() {
  video[this.name] = this.value;
}

// Fullscreen ------------------------------- //
fullscreenBtn.addEventListener("click", toggleFullscreen);

let fullscreen = false;
// Toggle fullscreen
function toggleFullscreen() {
  if (fullscreen == false) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}

/* View in fullscreen */
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

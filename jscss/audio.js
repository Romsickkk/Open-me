let isMusicPlaying = false;
let stopInterval = false;
let backgroundColor = document.querySelector(".backgroundColor");
let pointEat = document.getElementById("pointEat");
let firstAudio = document.getElementById("firstAudio");
let secondAudio = document.getElementById("secondAudio");
let firstPoint = document.getElementById("firstPoint");
let fivePoints = document.getElementById("fivePoints");
let tenPoints = document.getElementById("tenPoints");
let loseSound = document.getElementById("loseSound");
let fifteenPoints = document.getElementById("fifteenPoints");

let volumeIncreaseRate = 0.015; // Регулируйте этот параметр для управления скоростью увеличения громкости
let targetVolume = 0.2; // Регулируйте этот параметр для установки желаемой конечной громкости
let currentVolume = 0;
let muteVolume = 0;
let lowVolume = 0.05;

// Ceck is audio ended

//Start and STOP music
function startLowSoundMusic(music) {
  music.volume = 0.3;
  music.play();
}

function startFirstMusic(music) {
  // music.currentTime = 17.5;
  music.volume = currentVolume;
  music.play();
}

function stopMusic() {
  if (muteVolume < currentVolume) {
    currentVolume -= volumeIncreaseRate;
    firstAudio.volume = currentVolume;
  } else {
    firstAudio.pause();
  }
}

function newMusicStart(oldMusic, newMusic) {
  clearInterval(decreaseProcess);
  incriseProcess = setInterval(
    (oldMusic, newMusic) => {
      if (oldMusic.volume > 0 || newMusic.volume < targetVolume) {
        oldMusic.volume -= volumeIncreaseRate;
        newMusic.volume -= volumeIncreaseRate;
      }
    },
    50, // Устанавливаем интервал для увеличения громкости
    oldMusic,
    newMusic
  );
}

//
function getSoundDuratin(sound) {
  return Math.floor(sound.duration * 1000);
}
// Functions for Points
function pointSound(pointSound) {
  pointSound.play();
}

function funcPoint(music) {
  music.volume = 0.3;
  music.play();
}

let decreaseProcess;
let incriseProcess;
function decreaseVolume(music) {
  clearInterval(incriseProcess);
  decreaseProcess = setInterval(
    (music) => {
      if (lowVolume >= music.volume) {
        clearInterval(decreaseProcess);
      }
      music.volume -= volumeIncreaseRate;
    },
    50,
    music
  );
}

function increaseVolume(music) {
  clearInterval(decreaseProcess);
  incriseProcess = setInterval(
    (music) => {
      if (music.volume >= targetVolume) {
        clearInterval(incriseProcess);
      }

      music.volume += volumeIncreaseRate;
    },
    50,
    music
  );
}

function playFirstMusic() {
  if (dir !== "") {
    startFirstMusic(firstAudio);
    increaseVolume(firstAudio);
    stopInterval = true;
  } else {
    stopMusic();
  }
}

// Shwitch all music and sounds
let soundsInterval;
let firstPlay = true;
let secondPlay = true;
let thirdPlay = true;
let fourthPlay = true;
soundsInterval = setInterval(() => {
  if (stopInterval === false) {
    playFirstMusic();
  } else if (score == 1 && firstPlay) {
    backgroundColor.style.backgroundColor = "#d8b4fe";
    decreaseVolume(firstAudio);
    pointSound(firstPoint);
    runMyFunc(increaseVolume, getSoundDuratin(firstPoint), firstAudio);
    firstPlay = false;
  } else if (score >= 5 && secondPlay == true) {
    backgroundColor.style.backgroundColor = "#c084fc";
    newInterval(180);
    decreaseVolume(firstAudio);
    pointSound(fivePoints);
    runMyFunc(increaseVolume, getSoundDuratin(fivePoints), firstAudio);
    backgroundColor.style.backgroundColor = "#a855f7";
    secondPlay = false;
  } else if (score >= 10 && thirdPlay === true) {
    backgroundColor.style.backgroundColor = "#9333ea";
    newInterval(150);
    decreaseVolume(firstAudio);
    pointSound(tenPoints);
    runMyFunc(increaseVolume, getSoundDuratin(tenPoints), firstAudio);
    thirdPlay = false;
  } else if (score >= 15 && fourthPlay === true) {
    backgroundColor.style.backgroundColor = "#7e22ce";
    newInterval(130);
    decreaseVolume(firstAudio);
    pointSound(fifteenPoints);
    runNewMyFunc(
      newMusicStart,
      getSoundDuratin(fifteenPoints),
      firstAudio,
      secondAudio
    );
    fourthPlay = false;
  }
}, 100);

function clearAllMusics() {
  firstAudio.pause();
  firstPoint.pause();
  fivePoints.pause();
  tenPoints.pause();
  fifteenPoints.pause();
  secondAudio.pause();
}

//Quieting the music
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function runMyFunc(funcName, milliseconds, ...arg) {
  await sleep(milliseconds);
  funcName(...arg);
}

// Clearing old music and start new
async function runNewMyFunc(funcName, milliseconds, clear, write) {
  await sleep(milliseconds);
  startLowSoundMusic(write);
  funcName(clear, write);
}

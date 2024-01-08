let isMusicPlaying = false;
let stopInterval = false;
let pointEat = document.getElementById("pointEat");
let firstAudio = document.getElementById("firstAudio");
let firstPoint = document.getElementById("firstPoint");
let tenPoints = document.getElementById("tenPoints");
let loseSound = document.getElementById("loseSound");

let volumeIncreaseRate = 0.015; // Регулируйте этот параметр для управления скоростью увеличения громкости
let targetVolume = 0.3; // Регулируйте этот параметр для установки желаемой конечной громкости
let currentVolume = 0;
let muteVolume = 0;
let lowVolume = 0.05;

// Ceck is audio ended

//Start and STOP music
function startFirstMusic(music) {
  music.currentTime = 17.5;
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
    50, // Устанавливаем интервал для увеличения громкости
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
let soundsInterval;
let firstPlay = true;
let secondPlay = true;
let thirdPlay = true;
soundsInterval = setInterval(() => {
  if (stopInterval === false) {
    playFirstMusic();
  } else if (score == 1 && firstPlay) {
    decreaseVolume(firstAudio);
    pointSound(firstPoint);
    runMyFunc(increaseVolume, getSoundDuratin(firstPoint), firstAudio);
    firstPlay = false;
  } else if (score >= 5 && secondPlay == true) {
    newInterval(100);
    decreaseVolume(firstAudio);

    runMyFunc(increaseVolume, getSoundDuratin(tenPoints), firstAudio);
    secondPlay = false;
  } else if (score >= 10 && thirdPlay === true) {
    newInterval(100);
    decreaseVolume(firstAudio);
    // pointSound(tenPoints);
    runMyFunc(increaseVolume, getSoundDuratin(tenPoints), firstAudio);
    thirdPlay = false;
  }
}, 100);

function clearAllMusics() {
  firstAudio.pause();
  firstPoint.pause();
  tenPoints.pause();
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function runMyFunc(funcName, milliseconds, ...arg) {
  await sleep(milliseconds);
  funcName(...arg);
}

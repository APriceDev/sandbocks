const vol = document.querySelector('#vol');
const volBar = vol.querySelector('#vol-bar');
const freq = document.querySelector('#freq');
const freqBar = vol.querySelector('#freq-bar');

let oscVolume = 50;
let ossFrequency = 440;

function updateVol(value){
    oscVolume = value;
}

function updateFreq(value){
    oscFrequency = value;
}


function handleMove(e, el, minValue, maxValue, callback, place, str) {
    const x = e.pageX - el.offsetLeft;
    const percent = x / el.offsetWidth;
    const min = minValue;
    const max = maxValue;
    const width = Math.round(percent * 100) + '%';
    const value = percent * (max - min) + min;
    el.firstChild.style.width = width;
    el.firstChild.textContent = Math.round(value.toFixed(place)) + str;
    callback(value)
}

vol.addEventListener('mousemove', e => handleMove(e, vol, 0, 100, updateVol, 2, '%'));
freq.addEventListener('mousemove', e => handleMove(e, freq, 0, 5000, updateFreq, 4, 'hz'));
  //vol.addEventListener('mousemove', handleMove);
  //freq.addEventListener('mousemove', handleMove);

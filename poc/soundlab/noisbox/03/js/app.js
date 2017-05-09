const dashboard = document.querySelector('#dashboard');
const waveforms = document.querySelectorAll('[data-wavform]');
const vol = document.querySelector('#vol');
const volBar = vol.querySelector('#vol-bar');
const freq = document.querySelector('#freq');
const freqBar = vol.querySelector('#freq-bar');

let power = false;
let waveform = 'sine';
let oscVolume = 50;
let ossFrequency = 440;

function updateVol(value){
    oscVolume = value;
}

function updateFreq(value){
    oscFrequency = value;
}

function handleRange(e, el, min, max, callback, place, str) {
    const x = e.pageX - el.offsetLeft;
    const percent = x / el.offsetWidth;
    const value = percent * (max - min) + min;
    el.firstChild.style.width = Math.round(percent * 100) + '%';
    el.firstChild.textContent = Math.round(value.toFixed(place)) + str;
    callback(value)
}

function handleWaveForm(e){
    if (e.target.id != 'dashboard'){
        if (e.target.id === 'power'){
            e.target.classList.toggle('active');
            power = !power;
        }else{
            waveforms.forEach((wave) => {
                wave.classList.remove('active');
            });
            e.target.classList.add('active');
            waveform = e.target.id;
        }
    }
}

dashboard.addEventListener('click', handleWaveForm);
vol.addEventListener('mousemove', e => handleRange(e, vol, 0, 100, updateVol, 2, '%'));
freq.addEventListener('mousemove', e => handleRange(e, freq, 0, 5000, updateFreq, 4, 'hz'));
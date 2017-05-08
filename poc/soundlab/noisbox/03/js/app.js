const vol = document.querySelector('#volume');
const volRange = vol.querySelector('#volumeRange');

  function handleMove(e) {
      const x = e.pageX - this.offsetLeft;
      const percent = x / this.offsetWidth;
      const min = 0;
      const max = 100;
      const width = Math.round(percent * 100) + '%';
      const volume = percent * (max - min) + min;
      volRange.style.width = width;
      volRange.textContent = Math.round(volume.toFixed(2)) + '%';
      //osc.volume = volume;
    }
  vol.addEventListener('mousemove', handleMove);
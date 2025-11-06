const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const presetTime = document.getElementById('presetTime');
    const customTime = document.getElementById('customTime');
    const progressBar = document.getElementById('progressBar');
    const clock = document.getElementById('clock');
    const message = document.getElementById('message');
    const muteBtn = document.getElementById('muteBtn');
    const muteIcon = document.getElementById('muteIcon');

    let timer, remaining = 0, totalSeconds = 0, paused = false;

    // 🎵 Música Lofi Medieval
    const lofiAudio = new Audio("mp3/Medieval_Lofi.mp3");
    lofiAudio.loop = true;
    lofiAudio.volume = 0.5;

    // Reproducir solo tras interacción
    document.addEventListener('click', () => {
      if (lofiAudio.paused) lofiAudio.play().catch(()=>{});
    }, { once: true });

    let muted = false;
    muteBtn.addEventListener('click', () => {
      muted = !muted;
      lofiAudio.muted = muted;
      muteIcon.src = muted 
        ? "https://cdn-icons-png.flaticon.com/512/727/727269.png"
        : "https://cdn-icons-png.flaticon.com/512/727/727240.png";
    });

    function updateClock(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      clock.textContent = `${m}:${s}`;
    }

    startBtn.addEventListener('click', () => {
      const minutes = customTime.value ? parseInt(customTime.value) : parseInt(presetTime.value);
      if (isNaN(minutes) || minutes <= 0) return alert('Introduce un tiempo válido.');
      totalSeconds = minutes * 60;
      remaining = totalSeconds;
      startTimer();
    });

    function startTimer() {
      clearInterval(timer);
      message.textContent = '';
      paused = false;
      updateClock(remaining);

      timer = setInterval(() => {
        if (!paused) {
          remaining--;
          updateClock(remaining);
          progressBar.style.width = (remaining / totalSeconds) * 100 + '%';
          if (remaining <= 0) {
            clearInterval(timer);
            clock.textContent = "00:00";
            message.innerHTML = '⚡ Energía agotada, ¡hora de recargar el espíritu! ☕';
            progressBar.style.width = '0%';
          }
        }
      }, 1000);
    }

    pauseBtn.addEventListener('click', () => {
      if (remaining > 0) {
        paused = !paused;
        pauseBtn.textContent = paused ? '▶️ Reanudar' : '⏸️ Pausar';
      }
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timer);
      remaining = 0;
      totalSeconds = 0;
      paused = false;
      pauseBtn.textContent = '⏸️ Pausar';
      progressBar.style.width = '100%';
      message.textContent = '';
      updateClock(0);
    });
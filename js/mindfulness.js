document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // Breathing Animation with Timer
    // ==========================
    const breathCircle = document.getElementById('breathCircle');
    const breathTimer = document.getElementById('breathTimer');
    const breathLabel = document.getElementById('breathLabel');
    const startBreathBtn = document.getElementById('startBreath');
    const pauseBreathBtn = document.getElementById('pauseBreath');
    const stopBreathBtn = document.getElementById('stopBreath');
    const cycleLengthSelect = document.getElementById('cycleLength');

    let breathInterval;
    let breathSeconds;
    let breathPhase = 'inhale';
    let cycleLength = parseInt(cycleLengthSelect.value);

    function updateBreathTimer(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        breathTimer.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startBreathing() {
        clearInterval(breathInterval);
        cycleLength = parseInt(cycleLengthSelect.value);
        breathSeconds = cycleLength;
        breathPhase = 'inhale';
        breathCircle.classList.add('animate', 'inhale');
        breathLabel.textContent = "Inhale";
        updateBreathTimer(breathSeconds);

        breathInterval = setInterval(() => {
            breathSeconds--;
            updateBreathTimer(breathSeconds);

            if (breathSeconds <= 0) {
                if (breathPhase === 'inhale') {
                    breathPhase = 'exhale';
                    breathLabel.textContent = "Exhale";
                    breathCircle.classList.remove('inhale');
                    breathCircle.classList.add('exhale');
                } else {
                    breathPhase = 'inhale';
                    breathLabel.textContent = "Inhale";
                    breathCircle.classList.remove('exhale');
                    breathCircle.classList.add('inhale');
                }
                breathSeconds = cycleLength;
            }
        }, 1000);
    }

    function pauseBreathing() {
        clearInterval(breathInterval);
        breathLabel.textContent = "Paused";
    }

    function stopBreathing() {
        clearInterval(breathInterval);
        breathSeconds = 0;
        updateBreathTimer(breathSeconds);
        breathLabel.textContent = "Ready";
        breathCircle.classList.remove('inhale', 'exhale', 'animate');
    }

    startBreathBtn.addEventListener('click', startBreathing);
    pauseBreathBtn.addEventListener('click', pauseBreathing);
    stopBreathBtn.addEventListener('click', stopBreathing);

    cycleLengthSelect.addEventListener('change', () => {
        cycleLength = parseInt(cycleLengthSelect.value);
        if (breathInterval) {
            stopBreathing();
            startBreathing();
        }
    });

    // ==========================
    // Meditation Timer
    // ==========================
    let timerDuration = 5 * 60;
    let timeLeft = timerDuration;
    let timer = null;

    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const startTimerBtn = document.getElementById('startTimer');
    const pauseTimerBtn = document.getElementById('pauseTimer');
    const resetTimerBtn = document.getElementById('resetTimer');

    function updateTimerDisplay() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        minutesEl.textContent = m.toString().padStart(2, '0');
        secondsEl.textContent = s.toString().padStart(2, '0');
    }

    // Preset buttons
    document.querySelectorAll('.preset').forEach(btn => {
        btn.addEventListener('click', () => {
            timerDuration = parseInt(btn.dataset.min) * 60;
            timeLeft = timerDuration;
            updateTimerDisplay();
        });
    });

    function startTimer() {
        if (timer) return;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                // ✅ Auto increment sessions when timer ends
                completedSessions++;
                localStorage.setItem('completedSessions', completedSessions);
                totalCompletedEl.textContent = completedSessions;
                alert("Session Completed!");
                timeLeft = timerDuration;
                updateTimerDisplay();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timer);
        timer = null;
    }

    function resetTimer() {
        clearInterval(timer);
        timer = null;
        timeLeft = timerDuration;
        updateTimerDisplay();
    }

    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);

    // ==========================
    // Ambient Sounds
    // ==========================
    const sounds = {
        rain: document.getElementById('audio-rain'),
        waves: document.getElementById('audio-waves'),
        forest: document.getElementById('audio-forest'),
        fireplace: document.getElementById('audio-fireplace'),
    };

    let currentSound = null;

    document.querySelectorAll('.sound-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.dataset.sound;

            if (currentSound && currentSound !== sounds[selected]) {
                currentSound.pause();
                document.querySelectorAll('.sound-card').forEach(card => card.classList.remove('playing'));
            }

            if (currentSound === sounds[selected]) {
                currentSound.pause();
                currentSound = null;
                btn.textContent = "Play";
                btn.parentElement.classList.remove('playing');
            } else {
                sounds[selected].play();
                currentSound = sounds[selected];
                document.querySelectorAll('.sound-toggle').forEach(b => b.textContent = "Play");
                btn.textContent = "Pause";
                document.querySelectorAll('.sound-card').forEach(card => card.classList.remove('playing'));
                btn.parentElement.classList.add('playing');
            }
        });
    });

    // ==========================
    // Session Tracking (Simple Counter)
    // ==========================
    const totalCompletedEl = document.getElementById('totalCompleted');
    const completeSessionBtn = document.getElementById('completeSession');
    const clearSessionsBtn = document.getElementById('clearSessions');

    let completedSessions = parseInt(localStorage.getItem('completedSessions')) || 0;

    // Show stored count on page load
    totalCompletedEl.textContent = completedSessions;

    // ✅ Manual increment
    completeSessionBtn.addEventListener('click', () => {
        completedSessions++;
        localStorage.setItem('completedSessions', completedSessions);
        totalCompletedEl.textContent = completedSessions;
    });

    // ✅ Clear all
    clearSessionsBtn.addEventListener('click', () => {
        completedSessions = 0;
        localStorage.setItem('completedSessions', completedSessions);
        totalCompletedEl.textContent = completedSessions;
    });

    // ==========================
    // Init
    // ==========================
    updateTimerDisplay();
});

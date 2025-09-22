// workout.js
document.addEventListener("DOMContentLoaded", () => {

    const workoutForm = document.getElementById("workoutForm");
    const workoutResults = document.getElementById("workoutResults");
    const exercisesList = document.getElementById("exercisesList");

    const startBtn = document.getElementById("startWorkout");
    const endBtn = document.getElementById("endWorkout");

    // Pause and Skip buttons
    const pauseBtn = document.createElement("button");
    const skipBtn = document.createElement("button");
    pauseBtn.textContent = "Pause";
    skipBtn.textContent = "Next";
    pauseBtn.classList.add("btn");
    skipBtn.classList.add("btn");
    document.querySelector(".workout-controls").appendChild(pauseBtn);
    document.querySelector(".workout-controls").appendChild(skipBtn);

    let workoutPlan = [];
    let currentExercise = 0;
    let timerInterval;
    let isRunning = false;
    let isPaused = false;
    let remainingTime = 0;

    // ---- Full list of exercises (64+ combinations covered by logic) ----
    const exercisesData = [
        // Arms
        { name: "Push-Ups", bodyPart: "arms", equipment: "none", duration: 45 },
        { name: "Tricep Dips", bodyPart: "arms", equipment: "none", duration: 45 },
        { name: "Bicep Curls", bodyPart: "arms", equipment: "dumbbells", duration: 50 },
        { name: "Hammer Curls", bodyPart: "arms", equipment: "dumbbells", duration: 45 },
        { name: "Overhead Press", bodyPart: "arms", equipment: "dumbbells", duration: 50 },

        // Legs
        { name: "Squats", bodyPart: "legs", equipment: "none", duration: 50 },
        { name: "Lunges", bodyPart: "legs", equipment: "none", duration: 45 },
        { name: "Step-Ups", bodyPart: "legs", equipment: "none", duration: 45 },
        { name: "Glute Kickbacks", bodyPart: "legs", equipment: "resistance-band", duration: 50 },
        { name: "Side Leg Raises", bodyPart: "legs", equipment: "resistance-band", duration: 45 },

        // Back
        { name: "Pull-Ups", bodyPart: "back", equipment: "none", duration: 45 },
        { name: "Superman", bodyPart: "back", equipment: "none", duration: 45 },
        { name: "Resistance Band Rows", bodyPart: "back", equipment: "resistance-band", duration: 50 },
        { name: "Reverse Fly", bodyPart: "back", equipment: "dumbbells", duration: 45 },
        { name: "Dumbbell Rows", bodyPart: "back", equipment: "dumbbells", duration: 50 },

        // Full Body
        { name: "Burpees", bodyPart: "full-body", equipment: "none", duration: 50 },
        { name: "Mountain Climbers", bodyPart: "full-body", equipment: "none", duration: 45 },
        { name: "Jumping Jacks", bodyPart: "full-body", equipment: "none", duration: 45 },
        { name: "Thrusters", bodyPart: "full-body", equipment: "dumbbells", duration: 50 },
        { name: "High Knees", bodyPart: "full-body", equipment: "none", duration: 45 }
    ];

    // Shuffle array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Generate workout with at least 5 exercises
    function generateWorkout(bodyPart, equipment) {
        let filteredExercises = exercisesData.filter(ex => {
            const bodyMatch = ex.bodyPart === bodyPart || bodyPart === "full-body";
            const equipMatch = equipment === "none" ? ex.equipment === "none" : (ex.equipment === equipment || ex.equipment === "none");
            return bodyMatch && equipMatch;
        });

        if (filteredExercises.length === 0) {
            alert("No exercises found for selected options.");
            return [];
        }

        let workout = [];
        while (workout.length < 5) {
            workout = workout.concat(shuffleArray(filteredExercises));
        }
        return workout.slice(0, 5);
    }

    // Display exercises with timer bars
    function displayExercises(plan) {
        exercisesList.innerHTML = "";
        plan.forEach((exercise, index) => {
            const exerciseDiv = document.createElement("div");
            exerciseDiv.classList.add("exercise");
            exerciseDiv.id = "exercise-" + index;

            const nameSpan = document.createElement("span");
            nameSpan.classList.add("exercise-name");
            nameSpan.textContent = exercise.name;

            const timerContainer = document.createElement("div");
            timerContainer.classList.add("exercise-timer-container");

            const timerSpan = document.createElement("span");
            timerSpan.classList.add("exercise-timer");
            timerSpan.textContent = exercise.duration + "s";

            const countdownBar = document.createElement("div");
            countdownBar.classList.add("countdown-bar");
            const progress = document.createElement("div");
            progress.classList.add("progress-bar");
            countdownBar.appendChild(progress);

            timerContainer.appendChild(timerSpan);
            timerContainer.appendChild(countdownBar);

            exerciseDiv.appendChild(nameSpan);
            exerciseDiv.appendChild(timerContainer);

            exercisesList.appendChild(exerciseDiv);

            // Add references for JS timer updates
            exercise.timerSpan = timerSpan;
            exercise.progressBar = progress;
            exercise.exerciseDiv = exerciseDiv;
        });
    }

    // Highlight current exercise
    function highlightExercise(index) {
        workoutPlan.forEach((ex, i) => {
            ex.exerciseDiv.style.backgroundColor = i === index ? "#d1f2eb" : "#ecf0f1";
        });
    }

    // Start workout timer
    function startWorkout() {
        if (currentExercise >= workoutPlan.length) {
            alert("Workout complete!");
            return;
        }
        if (isRunning) return;

        isRunning = true;
        isPaused = false;
        pauseBtn.textContent = "Pause";

        const exercise = workoutPlan[currentExercise];
        remainingTime = exercise.duration;
        highlightExercise(currentExercise);

        timerInterval = setInterval(() => {
            if (!isPaused) {
                exercise.timerSpan.textContent = remainingTime + "s";
                const percent = ((exercise.duration - remainingTime) / exercise.duration) * 100;
                exercise.progressBar.style.width = percent + "%";

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    currentExercise++;
                    isRunning = false;
                    startWorkout();
                } else {
                    remainingTime--;
                }
            }
        }, 1000);
    }

    // Pause / Resume
    pauseBtn.addEventListener("click", () => {
        if (!isRunning) return;
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";
    });

    // Skip / Next
    skipBtn.addEventListener("click", () => {
        if (!isRunning) return;
        clearInterval(timerInterval);
        currentExercise++;
        isRunning = false;
        startWorkout();
    });

    // End workout
    function endWorkout() {
        clearInterval(timerInterval);
        currentExercise = 0;
        isRunning = false;
        isPaused = false;
        pauseBtn.textContent = "Pause";

        workoutPlan.forEach(ex => {
            ex.timerSpan.textContent = ex.duration + "s";
            ex.progressBar.style.width = "0%";
            ex.exerciseDiv.style.backgroundColor = "#ecf0f1";
        });
    }

    // Form submit
    workoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bodyPart = document.getElementById("bodyPart").value;
        const equipment = document.getElementById("equipment").value;

        if (!bodyPart || !equipment) {
            alert("Please select both body part and equipment.");
            return;
        }

        workoutPlan = generateWorkout(bodyPart, equipment);
        displayExercises(workoutPlan);

        workoutResults.classList.remove("hidden");
        currentExercise = 0;
        isRunning = false;
        isPaused = false;
        pauseBtn.textContent = "Pause";
    });

    startBtn.addEventListener("click", startWorkout);
    endBtn.addEventListener("click", endWorkout);

});

// calculator.js

// Wait for DOM
document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("calcForm");
    const resultsSection = document.getElementById("results");

    const bmrValue = document.getElementById("bmrValue");
    const tdeeValue = document.getElementById("tdeeValue");

    const carbValue = document.getElementById("carbValue");
    const proteinValue = document.getElementById("proteinValue");
    const fatValue = document.getElementById("fatValue");

    const carbBar = document.getElementById("carbBar");
    const proteinBar = document.getElementById("proteinBar");
    const fatBar = document.getElementById("fatBar");

    // Helper function to animate numbers
    function animateCounter(element, start, end, duration) {
        let startTime = null;

        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // Helper function to animate progress bars
    function animateBar(barElement, percentage) {
        barElement.style.width = "0%";
        setTimeout(() => {
            barElement.style.width = percentage + "%";
        }, 100); // small delay for smooth effect
    }

    // Form submit event
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Get values
        const age = parseInt(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const height = parseInt(document.getElementById("height").value);
        const weight = parseInt(document.getElementById("weight").value);
        const activityFactor = parseFloat(document.getElementById("activity").value);

        // Validation
        if (!age || !gender || !height || !weight || !activityFactor) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // BMR calculation
        let bmr;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === "female") {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // TDEE calculation
        const tdee = Math.round(bmr * activityFactor);

        // Macronutrient breakdown
        const carbs = Math.round((tdee * 0.5) / 4);   // g
        const protein = Math.round((tdee * 0.2) / 4); // g
        const fat = Math.round((tdee * 0.3) / 9);     // g

        // Show results section
        resultsSection.classList.remove("hidden");

        // Animate numbers
        animateCounter(bmrValue, 0, Math.round(bmr), 1000);
        animateCounter(tdeeValue, 0, tdee, 1000);
        animateCounter(carbValue, 0, carbs, 1000);
        animateCounter(proteinValue, 0, protein, 1000);
        animateCounter(fatValue, 0, fat, 1000);

        // Animate progress bars
        const totalMacros = carbs + protein + fat;
        const carbPercent = (carbs / totalMacros) * 100;
        const proteinPercent = (protein / totalMacros) * 100;
        const fatPercent = (fat / totalMacros) * 100;

        animateBar(carbBar, carbPercent);
        animateBar(proteinBar, proteinPercent);
        animateBar(fatBar, fatPercent);

        // Optional: Save last result in localStorage
        const lastResult = { bmr, tdee, carbs, protein, fat };
        localStorage.setItem("lastCalculatorResult", JSON.stringify(lastResult));
    });

});

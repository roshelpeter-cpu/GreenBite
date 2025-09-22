/* =========================
   HAMBURGER MENU (MOBILE)
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active"); // show/hide menu
      hamburger.classList.toggle("active"); // animate hamburger
    });
  }
});
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});




/* =========================
   NEWSLETTER SUBSCRIPTION
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const subscribeBtn = document.getElementById("subscribeBtn");
  const emailInput = document.getElementById("newsletterEmail");

  if (!subscribeBtn || !emailInput) return;

  subscribeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    // Store email in localStorage
    localStorage.setItem("subscribedEmail", email);

    // Clear input for next submission
    emailInput.value = "";

    // Change placeholder text to show success
    emailInput.placeholder = "Subscribed Successfully!";

    // Log email in console
    console.log("Subscription email stored:", email);

    // Optional: revert placeholder after 3 seconds
    setTimeout(() => {
      emailInput.placeholder = "Enter your email";
    }, 3000);
  });
});


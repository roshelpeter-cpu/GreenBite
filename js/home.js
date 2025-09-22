const heroSection = document.querySelector('.hero');
const heroQuote = document.getElementById("heroQuote");


const heroSlides = [
  { img: 'assets/images/hero5.jpg',quote: "Eat fresh, live well!" },
  { img: 'assets/images/hero4.jpg',quote: "Healthy body, happy mind." },
  { img: 'assets/images/hero3.jpg', quote: "Stay active, stay alive." }
];

let currentSlide = 0;

function changeHero() {
  const slide = heroSlides[currentSlide];
  heroSection.style.backgroundImage = `url('${slide.img}')`;
  heroQuote.textContent = slide.quote;
  currentSlide = (currentSlide + 1) % heroSlides.length;
}

// Initialize first slide
changeHero();

// Rotate every 5 seconds
setInterval(changeHero, 5000);



document.addEventListener("DOMContentLoaded", () => {
  // Arrays of daily content
  const healthTips = [
    "Drink at least 8 glasses of water today.",
    "Take a 10-minute walk after meals.",
    "Eat more leafy greens for vitamins.",
    "Get at least 7 hours of sleep.",
    "Stretch for 5 minutes every morning."
  ];

  const words = [
    "Serendipity – a fortunate discovery by chance.",
    "Euphoria – a feeling of intense happiness.",
    "Resilience – the ability to recover quickly from difficulties.",
    "Ephemeral – lasting for a very short time.",
    "Amicable – having a spirit of friendliness."
  ];

  const productivityTips = [
    "Use the Pomodoro technique: 25 min focus, 5 min break.",
    "Start your day with the hardest task first.",
    "Write down your top 3 priorities for today.",
    "Turn off notifications for 1 hour of deep work.",
    "Break big tasks into smaller steps."
  ];

  // Get today’s index based on date
  const today = new Date().getDate();
  const healthIndex = today % healthTips.length;
  const wordIndex = today % words.length;
  const productivityIndex = today % productivityTips.length;

  // Insert into HTML
  document.getElementById("healthTip").textContent = healthTips[healthIndex];
  document.getElementById("wordOfTheDay").textContent = words[wordIndex];
  document.getElementById("productivityTip").textContent = productivityTips[productivityIndex];
});

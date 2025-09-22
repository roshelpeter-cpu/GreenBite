
const recipes = [
    // New Healthy Recipes Data
    {
        id: 1,
        title: "Berry Smoothie Bowl",
        category: "breakfast",
        image: "assets/recipes/berry_smoothie_bowl.jpg",
        description: "A colorful smoothie bowl topped with fresh berries and seeds.",
        ingredients: ["1 cup frozen berries", "1 banana", "1/2 cup yogurt", "Chia seeds", "Granola"],
        steps: ["Blend berries, banana, and yogurt until smooth.", "Pour into a bowl.", "Top with granola and chia seeds."],
        nutrition: { Calories: "280 kcal", Protein: "8 g", Carbs: "50 g", Fat: "6 g" }
    },
    {
        id: 2,
        title: "Spinach & Feta Omelette",
        category: "breakfast",
        image: "assets/recipes/spinach_feta_omelette.jpg",
        description: "Fluffy omelette with spinach, feta cheese, and herbs.",
        ingredients: ["3 eggs", "1 cup spinach", "50g feta cheese", "Salt & pepper", "Olive oil"],
        steps: ["Whisk eggs with salt and pepper.", "Sauté spinach in olive oil.", "Pour eggs and cook.", "Add feta and fold."],
        nutrition: { Calories: "250 kcal", Protein: "18 g", Carbs: "4 g", Fat: "18 g" }
    },

    {
        id: 3,
        title: "Classic Caesar Salad",
        category: "lunch",
        image: "assets/recipes/caesar_salad.jpg",
        description: "Crisp romaine lettuce tossed with Caesar dressing, croutons, and parmesan cheese.",
        ingredients: ["1 head romaine lettuce", "1/4 cup grated parmesan", "Croutons", "2 tbsp Caesar dressing", "Salt & pepper"],
        steps: ["Wash and chop the lettuce.", "Toss lettuce with dressing.", "Add croutons and sprinkle parmesan on top.", "Season with salt and pepper to taste."],
        nutrition: { Calories: "350 kcal", Protein: "10 g", Carbs: "15 g", Fat: "28 g" }
    },
    {
        id: 4,
        title: "Grilled Cheese Sandwich",
        category: "lunch",
        image: "assets/recipes/grilled_cheese.jpg",
        description: "Classic grilled cheese sandwich with melted cheddar on toasted bread.",
        ingredients: ["2 slices bread", "2 slices cheddar cheese", "Butter"],
        steps: ["Butter the bread slices.", "Place cheese between slices.", "Grill on medium heat until golden brown."],
        nutrition: { Calories: "320 kcal", Protein: "12 g", Carbs: "30 g", Fat: "18 g" }
    },
    {
        id: 5,
        title: "Spaghetti Bolognese",
        category: "dinner",
        image: "assets/recipes/spaghetti_bolognese.jpg",
        description: "Classic Italian pasta dish with rich meat sauce.",
        ingredients: ["200g spaghetti", "150g minced beef", "1 cup tomato sauce", "Onion", "Garlic", "Olive oil", "Parmesan"],
        steps: ["Cook spaghetti according to package instructions.", "Sauté onion and garlic.", "Add minced beef and cook.", "Add tomato sauce and simmer.", "Serve over pasta with parmesan."],
        nutrition: { Calories: "550 kcal", Protein: "25 g", Carbs: "60 g", Fat: "22 g" }
    },
    {
        id: 6,
        title: "Margherita Pizza",
        category: "dinner",
        image: "assets/recipes/margherita_pizza.jpg",
        description: "Classic Italian pizza topped with fresh tomatoes, mozzarella, and basil.",
        ingredients: ["1 pizza base", "1/2 cup tomato sauce", "100g mozzarella cheese", "Fresh basil leaves", "Olive oil", "Salt & pepper"],
        steps: [
            "Preheat oven to 220°C (425°F).",
            "Spread tomato sauce over the pizza base.",
            "Top with mozzarella cheese and fresh basil leaves.",
            "Drizzle lightly with olive oil and season with salt and pepper.",
            "Bake for 12-15 minutes until the cheese melts and the crust is golden.",
            "Serve hot."
        ],
        nutrition: { Calories: "300 kcal per serving", Protein: "12 g", Carbs: "35 g", Fat: "12 g" }
    },
    {
        id: 7,
        title: "Greek Yogurt Parfait",
        category: "snack",
        image: "assets/recipes/yogurt_parfait.jpg",
        description: "Layers of Greek yogurt, granola, and berries for a healthy snack.",
        ingredients: ["1 cup Greek yogurt", "1/2 cup granola", "Berries", "Honey (optional)"],
        steps: ["Layer yogurt, granola, and berries in a glass.", "Drizzle honey on top."],
        nutrition: { Calories: "200 kcal", Protein: "12 g", Carbs: "25 g", Fat: "5 g" }
    },
    {
        id: 8,
        title: "Spicy Nachos",
        category: "snack",
        image: "assets/recipes/spicy_nachos.jpg",
        description: "Crispy tortilla chips topped with cheese, jalapeños, and a spicy salsa for a flavorful snack.",
        ingredients: ["Tortilla chips", "1/2 cup shredded cheddar cheese", "1/4 cup diced tomatoes", "Jalapeños (sliced)", "1/4 cup black beans (optional)", "Salsa or hot sauce"],
        steps: [
            "Preheat oven to 180°C (350°F).",
            "Spread tortilla chips on a baking sheet.",
            "Sprinkle shredded cheese over chips.",
            "Add diced tomatoes, jalapeños, and black beans if using.",
            "Bake for 8-10 minutes until cheese melts.",
            "Serve hot with salsa or extra hot sauce."
        ],
        nutrition: { Calories: "250 kcal per serving", Protein: "8 g", Carbs: "30 g", Fat: "12 g" }
    }
];


// ===== Display Recipes =====
const recipesContainer = document.getElementById('recipesContainer');

function displayRecipes(data) {
    recipesContainer.innerHTML = '';
    data.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.dataset.id = recipe.id;
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="card-body">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
            </div>
        `;
        recipesContainer.appendChild(card);
    });
}
displayRecipes(recipes);

// ===== Filter/Search =====
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function filterRecipes() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = recipes.filter(r => {
        const matchesName = r.title.toLowerCase().includes(searchText);
        const matchesCategory = category === 'all' || r.category === category;
        return matchesName && matchesCategory;
    });

    displayRecipes(filtered);
}

searchInput.addEventListener('input', filterRecipes);
categoryFilter.addEventListener('change', filterRecipes);

// ===== Modal Logic =====
const modal = document.getElementById('recipeModal');
const closeModal = document.getElementById('closeModal');

recipesContainer.addEventListener('click', e => {
    const card = e.target.closest('.recipe-card');
    if (!card) return;

    const recipe = recipes.find(r => r.id == card.dataset.id);

    document.getElementById('modalTitle').textContent = recipe.title;
    document.getElementById('modalImage').src = recipe.image;

    const ingredientsList = document.getElementById('modalIngredients');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ingredientsList.appendChild(li);
    });

    const stepsList = document.getElementById('modalSteps');
    stepsList.innerHTML = '';
    recipe.steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });

    const nutritionTableBody = document.querySelector('#modalNutrition tbody');
    nutritionTableBody.innerHTML = '';
    for (const [key, value] of Object.entries(recipe.nutrition)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${key}</td><td>${value}</td>`;
        nutritionTableBody.appendChild(row);
    }

    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
});

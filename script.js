//menu déroulant
var small_menu = document.querySelector("small_menu");
if (small_menu) {
  small_menu.onclick = function () {
    small_menu.classList.toggle("active");
    menu.classList.toggle("small");
  };
} else {
  console.error("Element with class 'small_menu' not found.");
}

// Données pour les cartes
const cards = [
  { name: "Harry Potter", family: "Famille A", image: "cards/card1.jpg" },
  { name: "Hermione Granger", family: "Famille A", image: "cards/card2.webp" },
  { name: "Ron Weasley", family: "Famille A", image: "cards/card3.webp" },
  { name: "Draco Malfoy", family: "Famille B", image: "cards/card4.webp" },
  { name: "Lord Voldemort", family: "Famille B", image: "cards/card5.webp" },
  { name: "Rubeus Hagrid", family: "Famille A", image: "cards/card6.webp" },
  { name: "Severus Snape", family: "Famille B", image: "cards/card7.webp" },
  { name: "Cédric Diggory", family: "Famille D", image: "cards/card8.webp" },
  { name: "Genny Weasley", family: "Famille A", image: "cards/card9.webp" },
  { name: "Luna Lovegood", family: "Famille C", image: "cards/card10.webp" },
  {
    name: "Neville Longdubat",
    family: "Famille A",
    image: "cards/card11.webp",
  },
  {
    name: "Bellatrix Lestrange",
    family: "Famille B",
    image: "cards/card12.webp",
  },
  { name: "Remus Lupin", family: "Famille A", image: "cards/card13.webp" },
  { name: "Sirius Black", family: "Famille A", image: "cards/card14.webp" },
  { name: "Cho Chang", family: "Famille C", image: "cards/card15.webp" },
  {
    name: "Dollores Umbridge",
    family: "Famille B",
    image: "cards/card16.webp",
  },
];

// Fonction pour générer le contenu HTML des cartes
function generateCardHTML(card) {
  return `
        <div class="card">
            <img src="${card.image}" alt="${card.name}">
            <h2>${card.name}</h2>
            <p>Famille: ${card.family}</p>
        </div>
    `;
}

// Sélectionnez la balise <div> pour les cartes
const cardsContainer = document.getElementById("cards-container");

// Générer le contenu HTML des cartes à partir des données
const cardHTML = cards.map(generateCardHTML).join("");

// Ajouter le contenu HTML généré à la balise <div> des cartes
cardsContainer.innerHTML = cardHTML;

const favorites = [];

// Créer les cartes et les ajouter au conteneur
const cardContainer = document.getElementById("cardContainer");
cards.forEach((cardData, index) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `<img src="${cardData.image}" alt="${cardData.name}"><p>${cardData.name}</p>`;

  // Ajout du bouton favoris avec une icône SVG
  const favoriteButton = document.createElement("button");
  favoriteButton.classList.add("favorite-button");
  favoriteButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="M8 14s-1.5-2-4-2-4 2-4 2V2h12v12s-1.5-2-4-2-4 2-4 2z"/></svg>';
  favoriteButton.addEventListener("click", () =>
    toggleFavorite(index, favoriteButton)
  );
  cardElement.appendChild(favoriteButton);

  cardContainer.appendChild(cardElement);
});

// Fonction de recherche de carte
function searchCard() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  cards.forEach((cardData, index) => {
    const cardElement = cardContainer.children[index];
    if (cardData.name.toLowerCase().includes(searchInput)) {
      cardElement.style.display = "inline-block";
    } else {
      cardElement.style.display = "none";
    }
  });
}

// Fonction de filtre par famille
function filterCards() {
  const filterSelect = document.getElementById("filterSelect");
  const selectedFamily = filterSelect.value;
  const colors = {
    "Famille A": "red",
    "Famille B": "green",
    "Famille C": "blue",
    "Famille D": "yellow",
  };
  cardContainer.style.backgroundColor = colors[selectedFamily] || "";
  cards.forEach((cardData, index) => {
    const cardElement = cardContainer.children[index];
    if (selectedFamily === "all" || cardData.family === selectedFamily) {
      cardElement.style.display = "inline-block";
    } else {
      cardElement.style.display = "none";
    }
  });
}

// Fonction pour ajouter ou supprimer une carte des favoris
function toggleFavorite(index, button) {
  const cardData = cards[index];
  const favoriteIndex = favorites.indexOf(cardData);
  if (favoriteIndex === -1) {
    favorites.push(cardData);
    button.classList.add("selected");
  } else {
    favorites.splice(favoriteIndex, 1);
    button.classList.remove("selected");
  }
}

// Fonction pour afficher uniquement les favoris
function showFavorites() {
  cards.forEach((cardData, index) => {
    const cardElement = cardContainer.children[index];
    if (favorites.includes(cardData)) {
      cardElement.style.display = "inline-block";
    } else {
      cardElement.style.display = "none";
    }
  });
}

function populateCardOptions() {
  const selectCard = document.getElementById("selectCard");
  selectCard.innerHTML = ""; // Réinitialiser les options

  // Ajouter une option par carte
  cards.forEach((cardData) => {
    const option = document.createElement("option");
    option.value = cardData.name;
    option.text = cardData.name;
    selectCard.appendChild(option);
  });
}

function openModal() {
  document.getElementById("modalOverlay").style.display = "flex";
  // Appeler la fonction pour peupler les options du sélecteur de cartes
  populateCardOptions();
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function submitExchangeForm() {
  alert("Formulaire soumis avec succès!");
  closeModal();
}

//
//formulaire
document
  .getElementById("updateProfileForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const messageSubject = document.getElementById("messageSubject").value;
    const message = document.getElementById("message").value;

    const response = await fetch("/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        messageSubject: messageSubject,
        message: message,
      }),
    });

    if (response.ok) {
      alert("Profil mis à jour avec succès !");
      // Rediriger vers la page de profil après la mise à jour
      window.location.href = "/profile.html";
    } else {
      alert("Une erreur s'est produite lors de la mise à jour du profil.");
    }
  });

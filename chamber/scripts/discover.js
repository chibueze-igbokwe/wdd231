import { places } from "../data/places.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const difference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(difference / 86400000);

    if (daysDifference < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

function displayPlaces() {
  cardsContainer.innerHTML = "";

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="images/${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    cardsContainer.appendChild(card);
  });
}

displayVisitMessage();
displayPlaces();
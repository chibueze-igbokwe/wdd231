const resourcesContainer = document.querySelector("#resources-container");
const categoryFilter = document.querySelector("#category-filter");
const resourceCount = document.querySelector("#resource-count");
const modal = document.querySelector("#resource-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");

let resources = [];

function getRiskClass(riskLevel) {
  return riskLevel.toLowerCase().replace(" ", "-");
}

function openResourceModal(resource) {
  modalContent.innerHTML = `
    <h2>${resource.title}</h2>
    <p><strong>Category:</strong> ${resource.category}</p>
    <p><strong>Risk Level:</strong> ${resource.riskLevel}</p>
    <p><strong>Description:</strong> ${resource.description}</p>
    <p><strong>Recommendation:</strong> ${resource.recommendation}</p>
  `;

  modal.showModal();
}

function displayResources(resourceList) {
  resourcesContainer.innerHTML = "";

  resourceCount.textContent = `${resourceList.length} resources displayed`;

  resourceList.forEach((resource) => {
    const card = document.createElement("article");
    card.classList.add("resource-card");

    card.innerHTML = `
      <h2>${resource.title}</h2>
      <p><strong>Category:</strong> ${resource.category}</p>
      <p><strong>Risk Level:</strong> <span class="risk ${getRiskClass(resource.riskLevel)}">${resource.riskLevel}</span></p>
      <p>${resource.description}</p>
      <button type="button">View Details</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      openResourceModal(resource);
    });

    resourcesContainer.appendChild(card);
  });
}

function filterResources() {
  const selectedCategory = categoryFilter.value;

  const filteredResources = selectedCategory === "all"
    ? resources
    : resources.filter((resource) => resource.category === selectedCategory);

  localStorage.setItem("safetrack-category", selectedCategory);
  displayResources(filteredResources);
}

async function getResources() {
  try {
    const response = await fetch("data/resources.json");

    if (!response.ok) {
      throw new Error("Unable to load safety resources.");
    }

    resources = await response.json();

    const savedCategory = localStorage.getItem("safetrack-category");

    if (savedCategory) {
      categoryFilter.value = savedCategory;
    }

    filterResources();
  } catch (error) {
    resourcesContainer.innerHTML = "<p>Safety resources could not be loaded.</p>";
    console.error(error);
  }
}

categoryFilter.addEventListener("change", filterResources);

closeModalButton.addEventListener("click", () => {
  modal.close();
});

getResources();
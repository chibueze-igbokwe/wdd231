const spotlightContainer = document.querySelector("#spotlights");

const getMembershipName = (level) => {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
};

const shuffleMembers = (members) => {
  return members.sort(() => Math.random() - 0.5);
};

const displaySpotlights = (members) => {
  spotlightContainer.innerHTML = "";

  const qualifiedMembers = members.filter((member) => member.membership === 2 || member.membership === 3);
  const selectedMembers = shuffleMembers(qualifiedMembers).slice(0, 3);

  selectedMembers.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="220" height="140" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p>${getMembershipName(member.membership)}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
};

const getSpotlights = async () => {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Member data could not be loaded.");
    }

    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Company spotlights are currently unavailable.</p>";
    console.error(error);
  }
};

getSpotlights();
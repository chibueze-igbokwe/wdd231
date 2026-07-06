const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

const getMembershipName = (level) => {
  if (level === 3) return "Gold Member";
  if (level === 2) return "Silver Member";
  return "Member";
};

const displayMembers = (members) => {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" width="300" height="180" loading="lazy">
      <div>
        <h2>${member.name}</h2>
        <p><strong>Industry:</strong> ${member.industry}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership:</strong> ${getMembershipName(member.membership)}</p>
        <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
      </div>
    `;

    membersContainer.appendChild(card);
  });
};

const getMembers = async () => {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Unable to load member data.");
    }

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p>Business member data could not be loaded.</p>`;
    console.error(error);
  }
};

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

getMembers();
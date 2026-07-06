const timestampField = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

timestampField.value = new Date().toLocaleString();

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.querySelector(`#${modalId}`);

    modal.showModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
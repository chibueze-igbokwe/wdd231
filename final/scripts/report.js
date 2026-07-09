const incidentForm = document.querySelector("#incident-form");
const reporterInput = document.querySelector("#reporter");
const emailInput = document.querySelector("#email");
const departmentInput = document.querySelector("#department");
const submittedInput = document.querySelector("#submitted");

submittedInput.value = new Date().toLocaleString();

reporterInput.value = localStorage.getItem("safetrack-reporter") || "";
emailInput.value = localStorage.getItem("safetrack-email") || "";
departmentInput.value = localStorage.getItem("safetrack-department") || "";

incidentForm.addEventListener("submit", () => {
  localStorage.setItem("safetrack-reporter", reporterInput.value);
  localStorage.setItem("safetrack-email", emailInput.value);
  localStorage.setItem("safetrack-department", departmentInput.value);
});
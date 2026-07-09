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

  const formData = new FormData(incidentForm);

  const report = {
    reporter: formData.get("reporter"),
    email: formData.get("email"),
    department: formData.get("department"),
    incidentType: formData.get("incidenttype"),
    severity: formData.get("severity"),
    incidentDate: formData.get("incidentdate"),
    location: formData.get("location"),
    injury: formData.get("injury"),
    description: formData.get("description"),
    submitted: submittedInput.value
  };

  const savedReports = JSON.parse(localStorage.getItem("safetrack-reports")) || [];
  savedReports.push(report);

  localStorage.setItem("safetrack-reports", JSON.stringify(savedReports));
});
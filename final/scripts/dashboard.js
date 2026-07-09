const incidentList = document.querySelector("#incident-list");
const reportCount = document.querySelector("#report-count");
const clearReportsButton = document.querySelector("#clear-reports");
const incidentModal = document.querySelector("#incident-modal");
const incidentModalContent = document.querySelector("#incident-modal-content");
const closeIncidentModal = document.querySelector("#close-incident-modal");

function getSeverityClass(severity) {
  return severity.toLowerCase();
}

function openIncidentModal(report) {
  incidentModalContent.innerHTML = `
    <h2>${report.incidentType}</h2>
    <p><strong>Reporter:</strong> ${report.reporter}</p>
    <p><strong>Email:</strong> ${report.email}</p>
    <p><strong>Department:</strong> ${report.department}</p>
    <p><strong>Severity:</strong> ${report.severity}</p>
    <p><strong>Date of Incident:</strong> ${report.incidentDate}</p>
    <p><strong>Location:</strong> ${report.location}</p>
    <p><strong>Injury Reported:</strong> ${report.injury}</p>
    <p><strong>Description:</strong> ${report.description}</p>
    <p><strong>Submitted:</strong> ${report.submitted}</p>
  `;

  incidentModal.showModal();
}

function displayReports() {
  const reports = JSON.parse(localStorage.getItem("safetrack-reports")) || [];

  incidentList.innerHTML = "";
  reportCount.textContent = reports.length;

  if (reports.length === 0) {
    incidentList.innerHTML = `
      <article class="empty-dashboard">
        <h2>No Reports Yet</h2>
        <p>No incident reports have been submitted in this browser.</p>
        <a href="report.html" class="cta">Submit First Report</a>
      </article>
    `;
    return;
  }

  reports.forEach((report) => {
    const card = document.createElement("article");
    card.classList.add("incident-card");

    card.innerHTML = `
      <h2>${report.incidentType}</h2>
      <p><strong>Severity:</strong> <span class="risk ${getSeverityClass(report.severity)}">${report.severity}</span></p>
      <p><strong>Department:</strong> ${report.department}</p>
      <p><strong>Location:</strong> ${report.location}</p>
      <p><strong>Submitted:</strong> ${report.submitted}</p>
      <button type="button">View Details</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      openIncidentModal(report);
    });

    incidentList.appendChild(card);
  });
}

clearReportsButton.addEventListener("click", () => {
  localStorage.removeItem("safetrack-reports");
  displayReports();
});

closeIncidentModal.addEventListener("click", () => {
  incidentModal.close();
});

displayReports();
const reportSummary = document.querySelector("#report-summary");
const params = new URLSearchParams(window.location.search);

const reportData = [
  ["Reporter Name", params.get("reporter")],
  ["Email", params.get("email")],
  ["Department", params.get("department")],
  ["Incident Type", params.get("incidenttype")],
  ["Severity", params.get("severity")],
  ["Date of Incident", params.get("incidentdate")],
  ["Location", params.get("location")],
  ["Injury Reported", params.get("injury")],
  ["Description", params.get("description")],
  ["Submitted", params.get("submitted")]
];

reportSummary.innerHTML = reportData
  .map(([label, value]) => `<p><strong>${label}:</strong> ${value || "Not provided"}</p>`)
  .join("");
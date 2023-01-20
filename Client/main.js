const submitButton = document.getElementById("submit-button");
const deleteButtons = document.getElementsByClassName("delete-button");
const updateButtons = document.getElementsByClassName("update-button");

// Handle form submission
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(document.getElementById("report-form"));
  formData.append("timestamp", new Date());
  fetch("/submit-report", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      // Add the new report to the page
      const reportsContainer = document.getElementById("reports-container");
      const reportElement = document.createElement("div");
      reportElement.classList.add("report");
      // Add the report details
      // ...
      reportsContainer.appendChild(reportElement);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Handle report deletion
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", (event) => {
    const reportId = event.target.dataset.reportId;
    fetch(`/delete-report/${reportId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        // Remove the report element from the page
        const reportElement = event.target.closest(".report");
        reportElement.remove();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

// Handle report update
for (let i = 0; i < updateButtons.length; i++) {
  updateButtons[i].addEventListener("click", (event) => {
    const reportId = event.target.datasat.reportId;
    const updateForm = document.getElementById(`update-form-${reportId}`);
    const formData = new FormData(updateForm);
    formData.append("timestamp", new Date());
    fetch(`/update-report/${reportId}`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        // Update the report element on the page
        const reportElement = event.target.closest(".report");
        // Update the report details
        // ...
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

// Get the recent reports
document
  .getElementById("get-recent-reports-btn")
  .addEventListener("click", getRecentReports);

function getRecentReports() {
  fetch("/recent-reports")
    .then((response) => response.json())
    .then((data) => {
      // code to handle the data and display the recent reports
      const recentReportsContainer = document.getElementById("recent-reports");
      data.forEach((report) => {
        recentReportsContainer.innerHTML += `
                <div class="report">
                    <img src="${report.photo}" alt="${report.trail} trail conditions">
                    <div class="report-details">
                        <h3>${report.trail}</h3>
                        <p>Conditions: ${report.conditions}</p>
                        <p>Timestamp: ${report.timestamp}</p>
                        <p>Note: ${report.note}</p>
                    </div>
                </div>
                `;
      });
    })
    .catch((error) => {
      // code to handle any errors
    });
}

// Call the function to get and display the recent reports
getRecentReports();

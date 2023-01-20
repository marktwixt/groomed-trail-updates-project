// function to update the view
function updateView(data) {
    // check if the data is an array of recent reports
    if (Array.isArray(data)) {
        // update the recent reports list on the page
        const recentReportsContainer = document.getElementById("recent-reports");
        recentReportsContainer.innerHTML = "";
        data.forEach(report => {
        recentReportsContainer.innerHTML += '<div class="report"> <img>src="${report.photo}" alt="${report.trail} trail conditions"> <div class="report-details"> <h3>${report.trail}</h3> <p>Conditions: ${report.conditions}</p> <p>Timestamp: ${report.timestamp}</p> <p>Note: ${report.note}</p> </div> </div> ';
        });
        
        module.exports = {
        updateView
        };
    }}
const model = require("./model.js");
const view = require("./view.js");

// function to handle adding a new report
function addReport(report) {
    // call the addReport function from the model
    const newReport = model.addReport(report);
    // call the updateView function from the view
    view.updateView(newReport);
}

// function to handle updating a report
function updateReport(reportId, updatedReport) {
    // call the updateReport function from the model
    const updated = model.updateReport(reportId, updatedReport);
    // call the updateView function from the view
    view.updateView(updated);
}

// function to handle removing a report
function removeReport(reportId) {
    // call the removeReport function from the model
    const removed = model.removeReport(reportId);
    // call the updateView function from the view
    view.updateView(removed);
}

// function to handle retrieving recent reports
function getRecentReports() {
    // call the getRecentReports function from the model
    const recentReports = model.getRecentReports();
    // call the updateView function from the view
    view.updateView(recentReports);
}

module.exports = {
    addReport,
    updateReport,
    removeReport,
    getRecentReports
};
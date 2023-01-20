const reports = require('./reports.json');

// function to add a new report
function addReport(report) {
    // add the new report to the database
    reports.push(report);
    // return the added report
    return report;
}

// function to update a report
function updateReport(reportId, updatedReport) {
    // find the index of the report to update
    const index = reports.findIndex(report => report.id === reportId);
    // update the report in the database
    reports[index] = updatedReport;
    // return the updated report
    return updatedReport;
}

// function to remove a report
function removeReport(reportId) {
    // find the index of the report to remove
    const index = reports.findIndex(report => report.id === reportId);
    // remove the report from the database
    const removed = reports.splice(index, 1);
    // return the removed report
    return removed[0];
}

// function to retrieve recent reports
function getRecentReports() {
    // return the recent reports from the database
    return reports;
}

module.exports = {
    addReport,
    updateReport,
    removeReport,
    getRecentReports
};
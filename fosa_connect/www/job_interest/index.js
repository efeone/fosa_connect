
$(document).ready(function () {
    // Initialize the filter flag to false when the page loads
    var filterFlag = false;

    // Event listener for changes in the filter fields
    $('#jobTitle, #location, #status').change(function () {
        // Get the selected values from the filter fields
        var jobTitle = $('#jobTitle').val();
        var location = $('#location').val();
        var status = $('#status').val();

        // Construct the URL with the selected filter values
        var url = '/job_interest/?job_title=' + jobTitle + '&location=' + location + '&status=' + status;

        // Redirect to the constructed URL
        window.location.href = url;

        // Update the filter flag to true when the filter is applied
        filterFlag = true;
    });

});

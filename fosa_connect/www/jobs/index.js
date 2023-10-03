$(document).ready(function () {
    // Initialize the filter flag to false when the page loads
    var filterFlag = false;

    // Event listener for changes in the filter fields
    $('#jobTitle, #location, #type').change(function () {
        // Get the selected values from the filter fields
        var jobTitle = $('#jobTitle').val();
        var location = $('#location').val();
        var type = $('#type').val();

        // Construct the URL with the selected filter values
        var url = '/jobs/?job_title=' + jobTitle + '&location=' + location + '&job_type=' + type;

        // Redirect to the constructed URL
        window.location.href = url;

        // Update the filter flag to true when the filter is applied
        filterFlag = true;
    });

    // Use the filterFlag variable as needed in your code
    // For example, you can check its value and conditionally apply filters in your server-side code.
});

// Function to trigger workflow action
function triggerWorkflowAction(jobInterestId, button) {
    var action = button.getAttribute('data-action');
    var userRole = button.getAttribute('data-user-role');

    frappe.confirm('Are you sure you want to ' + action + ' this application?', function () {
        frappe.call({
            method: 'fosa_connect.fosa_connect.doctype.job_interest.job_interest.trigger_workflow_action',
            args: {
                docname: jobInterestId,
                action: action,
                user_role: userRole
            },
            callback: function (r) {
                if (r.message) {
                    // Handle the success response here
                    alert(action + ' the application successfully: ' + r.message);
                    // Refresh the whole page
                   yourRefreshFunction();
                  } else {
                    // Handle errors here
                    alert('Error: ' + r.exc);
                }
            },
            refresh:yourRefreshFunction
        });
    });
}

function yourRefreshFunction() {
    // Reload the whole page
    location.reload();
}

document.getElementById('interestButton').addEventListener('click', function() {
    // Trigger click event on the "Interested" button in Job DocType
    frappe.ui.form.trigger('Job', 'interested_button'); // Replace 'Job' with your DocType name
});

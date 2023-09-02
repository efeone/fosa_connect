// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member', {
	refresh: function(frm) {
        if (frm.doc.status == 'Student') {
        frm.add_custom_button('Create CV'),
        pass
        }
    },
	validate: function (frm) {
        var year = frm.doc.year_of_admission;

        // Check if the year is a valid four-digit number
        if (!/^\d{4}$/.test(year)) {
            frappe.msgprint(__('Year must be a valid four-digit number.'));
            frappe.validated = false;
        } else {
            var currentYear = new Date().getFullYear();

            // You can specify a range of valid years if needed
            var validStartYear = 1950;

            if (year < validStartYear || year > currentYear) {
                frappe.msgprint(__('Year must be between ' + validStartYear + ' and ' + currentYear));
                frappe.validated = false;
            }
        }
    },
});

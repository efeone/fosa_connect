// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member', {
    setup: function(frm) {
        // Filter addresses to show only address linked to the current user
        frm.set_query('primary_address', function(doc) {
			return {
				filters: {
					'link_doctype': 'Member',
					'link_name': doc.name
				}
			}
		})
    },
	 refresh: function(frm) {
        //Create CV Button
        frm.add_custom_button(('Create CV'), function () {
        frappe.set_route('print', frm.doc.doctype, frm.doc.name)
        });

        //Dynamic Link to link member to their new address
        frappe.dynamic_link = {doc: frm.doc, fieldname: 'name', doctype: 'Member'}
        //New address
        if(!frm.doc.__islocal) {
			frappe.contacts.render_address_and_contact(frm);
        } else {
			frappe.contacts.clear_address_and_contact(frm);
		}
        //frm.toggle_display(['address_html'], !frm.doc.__islocal);
        if(!frm.is_new()){
        frm.set_df_property('primary_address', 'reqd', 1)
        }
        var currentCheckbox = frm.doc.current;
        var toField = frm.get_field('to'); // Assuming 'to' is the fieldname

        if (currentCheckbox) {
            toField.$wrapper.hide(); // Hide the 'to' field
            toField.set_value(''); // Clear the 'to' field value
        } else {
            toField.$wrapper.show(); // Show the 'to' field
        }

        // Set 'to' field as required when not a new record
        if (!frm.is_new()) {
            frm.set_df_property('to', 'reqd', 1);
        }
	 },

	validate: function (frm) {
        if(frm.doc.status == 'Student'){
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
    }
}
});

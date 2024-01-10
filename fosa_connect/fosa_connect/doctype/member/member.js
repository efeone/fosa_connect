// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member', {
    setup: function (frm) {
        // Filter addresses to show only address linked to the current user
        frm.set_query('primary_address', function (doc) {
            return {
                filters: {
                    'link_doctype': 'Member',
                    'link_name': doc.name
                }
            }
        })
    },
    refresh: function (frm) {
        //Create CV Button
        if (frm.doc.status == 'Active') {
            frm.add_custom_button(('Create CV'), function () {
                if (frm.doc.primary_address) {
                    frappe.set_route('print', frm.doc.doctype, frm.doc.name)
                }
                else {
                    frappe.msgprint("Please fill primary address")
                }
            });
        }
        if (frm.doc.status == 'Pending Approval') {
            frm.add_custom_button(('Approve Member'), function () {
                frm.call('approve_member', { email: frm.doc.email_id, action: 'Approve' })
                    .then(r => {
                        if (r.message) {
                            frappe.msgprint('Member Approved')
                            frm.reload();
                        }
                    })
            });
        } else if(frm.doc.status == 'Active') {
            frm.add_custom_button(('Disable Member'), function () {
                frm.call('approve_member', { email: frm.doc.email_id, action: 'Disable' })
                    .then(r => {
                        if (r.message) {
                            frappe.msgprint('Member Disabled')
                            frm.reload();
                        }
                    })
            });
        } else if(frm.doc.status == 'Disabled') {
            frm.add_custom_button(('Enable Member'), function () {
                frm.call('approve_member', { email: frm.doc.email_id, action: 'Enable' })
                    .then(r => {
                        if (r.message) {
                            frappe.msgprint('Member Enabled')
                            frm.reload();
                        }
                    })
            });
        }

        //Dynamic Link to link member to their new address
        frappe.dynamic_link = { doc: frm.doc, fieldname: 'name', doctype: 'Member' }
        //New address
        if (!frm.doc.__islocal) {
            frappe.contacts.render_address_and_contact(frm);
        } else {
            frappe.contacts.clear_address_and_contact(frm);
        }
    },

    validate: function (frm) {
        if (frm.doc.status == 'Student') {
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

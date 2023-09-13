frappe.ui.form.on('Job', {
  refresh: function (frm) {
    if (frappe.user_roles.includes('Student')) {
      if (!frm.is_new()) {

        var liked_user_list = []

        if (frm.doc._liked_by) {
          liked_user_list = JSON.parse(frm.doc._liked_by)
        }

        // Checking if the logged in user has liked the job
        if (!liked_user_list.includes(frappe.session.user)) {
          frm.add_custom_button(('Interested'), function () {
            create_job_interest(frm)
            interest_button_fn(frm, `Yes`)
          });
        }
        else {
          frm.add_custom_button('Not Interested', function () {
            interest_button_fn(frm, `No`)
          });
        }
      }
    }
  }
});

function interest_button_fn(frm, add) {
  // Calls a server side method to add/remove the logged in user in the liked list of the document
  frappe.call({
    method: 'frappe.desk.like.toggle_like',
    args: {
      doctype: frm.doc.doctype,
      name: frm.doc.name,
      add: add,
    },
    callback: function (r) {
      if (!r.exc) {
        frm.reload_doc();
      }
    },
  });
}

function create_job_interest(frm) {
  // Create a new entry in the "Job Interest" DocType
  frappe.call({
    method: 'fosa_connect.fosa_connect.utils.create_job_interest_entry',
    args: {
      job_id: frm.doc.name,
      student_id: frappe.session.user,
    },
  });
}
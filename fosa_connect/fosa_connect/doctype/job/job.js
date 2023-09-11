frappe.ui.form.on('Job', {
  refresh: function (frm) {
    //Only Admin can view the field
      let roles = frappe.user_roles;
      if (roles.includes('Student')) {
            // Check if the job is disabled
            if (frm.doc.status === 'Disabled') {
                // Hide the "Status" field
                frm.set_df_property('status', 'hidden', 1);
            }
        }
    if(roles.includes("Administrator")||roles.includes("Alumni")){
      frm.set_df_property('disabled','hidden',0);
      frm.set_df_property('published','hidden',0);
    }
    else{
      frm.set_df_property('disabled','hidden',1);
      frm.set_df_property('published','hidden',1);
    }

    var liked_user_list = JSON.parse(frm.doc._liked_by)

    // Checking if the logged in user has liked the job
    if (!liked_user_list.includes(frappe.session.user)){

      frm.add_custom_button(('Interested'), function () {
        interest_button_fn(frm, `Yes`)
      });
    }
    else {
      frm.add_custom_button('Not Interested', function () {
        interest_button_fn(frm, `No`)
      });
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

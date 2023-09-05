frappe.ui.form.on('Job', {
  refresh: function (frm) {
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

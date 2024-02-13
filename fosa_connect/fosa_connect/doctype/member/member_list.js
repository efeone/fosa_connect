frappe.listview_settings['Member'] = {
  refresh: function(frm) {
    frm.page.add_inner_button(__("Add Approver"), function () {
      let d = new frappe.ui.Dialog({
      title: 'Enter details',
      fields: [
          {
              label: 'Member',
              fieldname: 'member',
              fieldtype: 'Link',
              options: 'Member'
          },
          {
              label: 'Batch',
              fieldname: 'batch',
              fieldtype: 'Link',
              options: 'Batch'
          }
      ],
      size: 'small', // small, large, extra-large
      primary_action_label: 'Submit',
      primary_action(values) {
        frappe.call({
          method:'fosa_connect.fosa_connect.doctype.member.member.create_user_permission',
          args: {
            'user_permission':values
          },
          callback: function(r){
            if(r.message){
              d.hide();
            }
          }
        })
      }
    });

    d.show();

    });
  }
}

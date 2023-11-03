// Copyright (c) 2023, efeone and contributors
// For license information, please see license.txt

frappe.ui.form.on('Review', {
  refresh: function(frm) {
      frm.fields_dict['job_interest_id'].get_query = function(doc, cdt, cdn) {
          return {
              filters: [
                  ['Job Interest', 'status', '=', 'Accepted']
              ]
          };
      };
  }
});

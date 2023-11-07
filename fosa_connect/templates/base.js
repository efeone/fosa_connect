const subject = frappe.utils.xss_sanitise($("#subject").val() || "").trim();
function update_notification(notification) {
frappe.call({
    method: "fosa_connect.templates.base.notification_icon",
    args: {
        "subject": subject
      },
      callback: function (response) {
              if (response.message) {
                  // Handle the success response, e.g., show a message to the user
                  frappe.msgprint(response.message);
              } else {
                  // Handle any errors that may occur during the request
              }
          }
      });
}

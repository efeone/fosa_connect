import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def notification_icon(name):
    frappe.db.set_value("Notification Log", name, "read", 1)
    frappe.db.commit
    return _("Notification marked as read")

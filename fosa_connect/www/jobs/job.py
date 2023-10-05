# job.py
import frappe

def get_context(context):
    context.roles = frappe.get_roles(frappe.session.user)
    context.member = frappe.get_value("Member", {"email_id": frappe.session.user}, "name")
    context.jobs = frappe.get_doc('Job',frappe.form_dict.docname)
    return {
        "context": context
    }

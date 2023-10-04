
import frappe

def get_context(context):

    # Get the current user's roles
    cur_usr = frappe.session.user
    user_roles = frappe.get_roles(cur_usr)

    # Get the 'Job Interest' document
    context.job_interest = frappe.get_doc('Job Interest',frappe.form_dict.docname)
    context.jobs = frappe.get_doc('Job', context.job_interest.job)
    context.user_type = user_roles

    return {
        "context": context  # Pass the context variable to the template
    }

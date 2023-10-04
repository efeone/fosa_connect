# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document
from frappe.email.doctype.email_template.email_template import get_email_template
from fosa_connect.fosa_connect.utils import create_notification_log


class JobInterest(WebsiteGenerator):
    pass

# Job Update for alumni
@frappe.whitelist()
def job_create_notification_log(doc, method=None):
    if doc.job:
        recipient = frappe.db.get_value("Job", doc.job, "owner")
        job_title = frappe.db.get_value("Job", doc.job, "job_title")
        subject = "New Job Interest for " + job_title
        email_template = get_email_template("Alumni - Received Job Application", doc.as_dict())
        content = email_template['message']
        create_notification_log(doc, recipient, subject, content)


# Job Update for student
@frappe.whitelist()
def student_notification_log(doc, method=None):
    if doc.status != "Open":
        recipient = frappe.db.get_value("Member", doc.member, "email_id")
        job_title = frappe.db.get_value("Job", doc.job, "job_title")
        subject = "Job Interest update for " + job_title + " : " + doc.status
        email_template = get_email_template("Student - Job Application Update", doc.as_dict())
        content = email_template['message']
        create_notification_log(doc, recipient, subject, content)

#Trigger the workflow transition
@frappe.whitelist()
def trigger_workflow_action(docname, action, user_role):
    try:
        # Fetch the Workflow document using the name of your workflow
        workflow = frappe.get_doc("Workflow", "job interest status")  # Replace with the actual workflow name

        # Fetch the document by its name (docname)
        doc = frappe.get_doc("Job Interest", docname)

        # Find the appropriate transition based on the action and current state
        for transition in workflow.transitions:
            if (
                transition.action == action
                and transition.state == doc.workflow_state
                and user_role in transition.allowed
            ):
                # Trigger the action directly based on the transition
                if transition.action == "Approve":
                    # Implement your custom logic for the "Approve" action here
                    doc.workflow_state = "Accepted"
                    doc.status = "Accepted"
                elif transition.action == "Reject":
                    # Implement your custom logic for the "Reject" action here
                    doc.workflow_state = "Rejected"
                    doc.status = "Rejected"
                elif transition.action == "Hold":
                    # Implement your custom logic for the "Hold" action here
                    doc.workflow_state = "On Hold"
                    doc.status = "On Hold"
                elif transition.action == "Cancel":
                    # Implement your custom logic for the "Cancel" action here
                    doc.workflow_state = "Cancelled"
                    doc.status = "Cancelled"

                # Save the document to apply the transition
                doc.save()
                frappe.db.commit()

                return f"Workflow action '{action}' triggered successfully."

        return f"Invalid action or user role for the current state."

    except Exception as e:
        frappe.throw(f"Error: {str(e)}")

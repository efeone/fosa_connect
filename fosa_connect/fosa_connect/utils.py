import frappe


@frappe.whitelist()
def create_job_interest_entry(job_id, student_id):
    try:
        member = frappe.get_doc("Member", {"email_id": student_id})
        # Check if a job interest entry already exists for the student and job
        if not frappe.db.exists("Job Interest", {"job": job_id, "member": member.name}):
            # Create a new entry in the "Job Interest" DocType
            job_interest = frappe.new_doc("Job Interest")
            job_interest.job = job_id
            job_interest.member = member.name
            job_interest.posting_date = frappe.utils.nowdate()
            job_interest.save()

            # Return a success message
            frappe.msgprint("You have expressed interest in this job.")
        else:
            # A job interest entry already exists, so return an error message
            frappe.throw("Job Interest was already created once")

    except Exception as e:
        # Handle any exceptions or errors that may occur during the process
        frappe.log_error(f"Error creating job interest entry: {str(e)}")
        return "Error"


# Notification Function
@frappe.whitelist()
def create_notification_log(doc, recipient, subject, content=None, type=None):
    """method is used to create notification log
    args:
        doc: document object
        recipient: notification receiving user
        subject: subject of notification log
        type: type of the notification log"""
    notification_log = frappe.new_doc("Notification Log")
    notification_log.type = "Alert"
    if type:
        notification_log.type = type
    notification_log.document_type = doc.doctype
    notification_log.document_name = doc.name
    notification_log.for_user = recipient
    notification_log.subject = subject
    if content:
        notification_log.email_content = content
    notification_log.save(ignore_permissions=True)

import frappe

@frappe.whitelist()
def create_job_interest_entry(job_id, student_id):
    try:
        member = frappe.get_doc("Member", {"email_id": student_id})
        # Check if a job interest entry already exists for the student and job
        existing_entry = frappe.get_list(
            "Job Interest",
            filters={"job": job_id, "member": member.name},
        )
        if not existing_entry:
            # Create a new entry in the "Job Interest" DocType
            job_interest = frappe.new_doc("Job Interest")
            job_interest.job = job_id
            job_interest.member = member
            job_interest.posting_date = frappe.utils.nowdate()
            job_interest.save()

            # Return a success message
            return "success"
        else:
            # A job interest entry already exists, so return an error message
            return "Entry already exists"

    except Exception as e:
        # Handle any exceptions or errors that may occur during the process
        frappe.log_error(f"Error creating job interest entry: {str(e)}")
        return "Error"

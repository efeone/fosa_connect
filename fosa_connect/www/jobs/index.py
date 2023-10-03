import frappe

def get_context(context):
    # Get the currently logged-in user
    cur_user = frappe.session.user
    def is_student(user):
        if "Student" in frappe.get_roles(cur_user):
            return True
        else:
            return False
    # Get job_title, location, and job_type from the request form data
    job_title, location, job_type = frappe.form_dict.get('job_title'), frappe.form_dict.get('location'), frappe.form_dict.get('job_type')

    conditions = []
    filter = False

    # Check each filter value and add conditions to the list
    if job_title:
        conditions.append(f"job_title = '{job_title}'")
        filter = True
    if location:
        conditions.append(f"location = '{location}'")
        filter = True
    if job_type:
        conditions.append(f"job_type = '{job_type}'")
        filter = True

    where_clause = " AND ".join(conditions)
    if is_student(cur_user):
        # If the user is a student, fetch all jobs without filtering by the owner
        jobs = frappe.db.sql(f"""
            SELECT name, job_title, location, job_category, job_type, last_date_to_apply
            FROM `tabJob`
            WHERE disabled = 0 {f"AND {where_clause}" if filter else ""};
        """, as_dict=True)
    else:
        # Fetch jobs and filter based on the 'disabled' field and the creator (cur_user)
        jobs = frappe.db.sql(f"""
            SELECT name, job_title, location, job_category, job_type, last_date_to_apply
            FROM `tabJob`
            WHERE disabled = 0 {f"AND {where_clause}" if filter else ""}
            AND     owner = '{cur_user}';  -- Filter by the job creator
        """, as_dict=True)

    context.job_titles = frappe.db.sql("""SELECT DISTINCT job_title FROM tabJob;""", as_dict=True)
    context.job_locations = frappe.db.sql("""SELECT DISTINCT location FROM tabJob;""", as_dict=True)
    context.job_types = frappe.db.sql("""SELECT DISTINCT job_type FROM tabJob;""", as_dict=True)

    context.jobs = jobs
    context.job_title = job_title
    context.job_location = location
    context.job_type = job_type

    return {
        "context": context
    }

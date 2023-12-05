import frappe

def get_context(context):
    # Get the currently logged-in user
    cur_user = frappe.session.user
    role = frappe.get_roles(cur_user)

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
    if "Student" in frappe.get_roles(cur_user):
        # If the user is a student, fetch all jobs without filtering by the owner
        jobs = frappe.db.sql(f"""
            SELECT name, job_title, location, job_category, job_type, last_date_to_apply
            FROM `tabJob`
            WHERE disabled = 0 {f"AND {where_clause}" if filter else ""};
        """, as_dict=True)
        job_titles = frappe.db.sql(f"""SELECT DISTINCT job_title FROM tabJob;""", as_dict=True)
        job_locations = frappe.db.sql(f"""SELECT DISTINCT location FROM tabJob;""", as_dict=True)
        job_types = frappe.db.sql(f"""SELECT DISTINCT job_type FROM tabJob;""", as_dict=True)

    elif "Alumni" in frappe.get_roles(cur_user):
        # Fetch jobs and filter based on the 'disabled' field and the creator (cur_user)
        jobs = frappe.db.sql(f"""
            SELECT name, job_title, location, job_category, job_type, last_date_to_apply
            FROM `tabJob` WHERE owner = '{cur_user}';  -- Filter by the job creator
        """, as_dict=True)
        job_titles = frappe.db.sql(f"""SELECT DISTINCT job_title FROM tabJob WHERE owner = '{cur_user}';""", as_dict=True)
        job_locations = frappe.db.sql(f"""SELECT DISTINCT location FROM tabJob WHERE owner = '{cur_user}';""", as_dict=True)
        job_types = frappe.db.sql(f"""SELECT DISTINCT job_type FROM tabJob WHERE owner = '{cur_user}';""", as_dict=True)

    context.job_titles = job_titles
    context.job_locations = job_locations
    context.job_types = job_types
    context.jobs = jobs
    context.job_title = job_title
    context.job_location = location
    context.job_type = job_type
    context.roles = role

    return {
        "context": context
    }

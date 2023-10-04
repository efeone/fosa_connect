
import frappe

def get_context(context):
    # Get the current user's roles
    cur_usr = frappe.session.user
    user_roles = frappe.get_roles(cur_usr)


    print(user_roles,"\n\n\n")
    if "Alumni" in frappe.get_roles(cur_usr):
        print(cur_usr)

    # Get the selected filter values
    job_title = frappe.form_dict.get('job_title')
    location = frappe.form_dict.get('location')
    status = frappe.form_dict.get('status')

    # Initialize filter conditions and filter flag
    conditions = []
    filter = False


    # Check each filter value and add conditions to the list
    if "Alumni" in user_roles:
        conditions.append("status != 'Cancelled'")
        filter = True

    # Check each filter value and add conditions to the list
    if job_title:
        conditions.append(f"job_title = '{job_title}'")
        filter = True
    if location:
        conditions.append(f"location = '{location}'")
        filter = True
    if status:
        conditions.append(f"status = '{status}'")
        filter = True

    # Build the WHERE clause based on the selected conditions
    where_clause = " AND ".join(conditions)

    if "Alumni" in frappe.get_roles(cur_usr):
        # Construct the SQL query with the dynamic WHERE clause
        sql_query = f"""
            SELECT K.creation, J.job_title, J.location, J.name AS id, K.name, K.posting_date, K.status
            FROM `tabJob Interest` AS K
            INNER JOIN `tabJob` AS J ON K.job = J.name
            {f"WHERE {where_clause}" if filter else ""} AND J.owner = '{cur_usr}'
            ORDER BY creation DESC;
        """
        title_query = f"""
            SELECT DISTINCT J.job_title FROM `tabJob Interest` AS K INNER JOIN `tabJob` AS J ON K.job=J.name AND J.owner = '{cur_usr}';
        """
        loc_query = f"""
            SELECT DISTINCT J.location FROM `tabJob Interest` AS K INNER JOIN `tabJob` AS J ON K.job=J.name AND J.owner = '{cur_usr}';
        """
    elif "Student" in frappe.get_roles(cur_usr):
        # Construct the SQL query with the dynamic WHERE clause
        sql_query = f"""
            SELECT K.creation, J.job_title, J.location, J.name AS id, K.name, K.posting_date, K.status
            FROM `tabJob Interest` AS K
            INNER JOIN `tabJob` AS J ON K.job = J.name
            {f"WHERE {where_clause}" if filter else ""} AND K.owner = '{cur_usr}'
            ORDER BY creation DESC;
        """
        title_query = f"""
            SELECT DISTINCT J.job_title FROM `tabJob Interest` AS K INNER JOIN `tabJob` AS J ON K.job=J.name AND K.owner = '{cur_usr}';
        """
        loc_query = f"""
            SELECT DISTINCT J.location FROM `tabJob Interest` AS K INNER JOIN `tabJob` AS J ON K.job=J.name AND K.owner = '{cur_usr}';
        """

    # Execute the SQL query and fetch the results as dictionaries
    job_interests = frappe.db.sql(sql_query, as_dict=True)

    # Fetch distinct job titles, locations, and statuses for the filter options
    context.job_titles = frappe.db.sql(title_query,as_dict=True)
    context.locations = frappe.db.sql(loc_query, as_dict=True)

    # Pass the filtered job interests and filter flag to the context
    context.job_interests = job_interests
    context.job_title = job_title
    context.location = location
    context.status = status
    context.user_type = user_roles

    return {
        "context": context  # Pass the context variable to the template
    }

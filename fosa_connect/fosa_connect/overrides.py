import frappe
from frappe.website.utils import is_signup_disabled
from frappe.utils import escape_html, random_string
from frappe import _

@frappe.whitelist(allow_guest=True)
def sign_up(email, first_name, last_name, full_name,  member_type, admission_number=None, year_of_admission=None, department=None, year_of_passing=None, job_title=None, designation=None):
    if is_signup_disabled():
        frappe.throw(_('Sign Up is disabled'), title='Not Allowed')

    # Check if a user with the provided email already exists
    user = frappe.db.get("User", {"email": email})
    if user:
        user = frappe.get_doc("User", user[0]["name"])
        if user.enabled:
            return 0, _("Already Registered")
        else:
            return 0, _("Registered but disabled")
    else:
        if frappe.db.get_creation_count('User', 60) > 500:
            frappe.respond_as_web_page(_('Temporarily Disabled'),
                _('Too many users signed up recently, so the registration is disabled. Please try back in an hour'),
                http_status_code=429)
    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": escape_html(first_name),
        "last_name": escape_html(last_name),
        "full_name": escape_html(full_name),
        "country": "",
        "enabled": 1,
        "new_password": random_string(10),
        "user_type": "Website User",
        "send_welcome_email": 0
    })
    user.flags.ignore_permissions = True
    user.flags.ignore_password_policy = True
    user.insert()

    # set default signup role as per Portal Settings
    default_role = frappe.db.get_value("Portal Settings", None, "default_role")
    if default_role:
        user.add_roles(default_role)

    # Check the member_type and call the appropriate create_member function
    if member_type == 'Student':
        create_student_member(email, first_name, last_name, member_type, admission_number, year_of_admission, department)
        create_alumni_member(email, first_name, last_name,  member_type, year_of_passing, job_title, designation )

    if user.flags.email_sent:
        return 1, _("Please check your email for verification")
    else:
        return 2, _("Please ask your administrator to verify your sign-up")

@frappe.whitelist(allow_guest=True)
def create_student_member(email, first_name, last_name, member_type, admission_number, year_of_admission, department):
    # Create a new student member
    member = frappe.get_doc({
        "doctype": "Member",
        "email": email,
        "first_name": escape_html(first_name),
        "last_name": last_name,
        "member_type": "Student",
        "admission_number": admission_number,
        "year_of_admission": year_of_admission,
        "department": department,


    })
    member.flags.ignore_permissions = True
    member.flags.ignore_password_policy = True
    member.insert()
    frappe.db.commit()

@frappe.whitelist(allow_guest=True)
def create_alumni_member(email, first_name, last_name, member_type, year_of_passing, job_title, designation, ):
    # Create a new alumni member
    member = frappe.get_doc({
        "doctype": "Member",
        "email": email,
        "first_name": escape_html(first_name),
        "last_name": last_name,
        "member_type": "Alumni",
        "job_title": job_title,
        "year_of_passing": year_of_passing,
        "designation": designation,
    })
    member.flags.ignore_permissions = True
    member.flags.ignore_password_policy = True
    member.insert()
    frappe.db.commit()

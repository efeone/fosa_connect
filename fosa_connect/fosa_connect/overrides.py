import frappe
from frappe.website.utils import is_signup_disabled
from frappe.utils import escape_html, random_string
from frappe import _

@frappe.whitelist(allow_guest=True)
def sign_up(email, first_name, last_name, full_name,  member_type, admission_number=None, year_of_admission=None, department=None, year_of_passing=None, job_title=None, designation=None):
    if is_signup_disabled():
        frappe.throw(_('Sign Up is disabled'), title='Not Allowed')

    # Check if a user with the provided email already exists
    user = frappe.get_all("User", {"email": email})
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

    # Create a member record
    create_member(email, first_name, last_name, member_type,admission_number, year_of_admission, department, year_of_passing, job_title, designation)

    if user.flags.email_sent:
        return 1, _("Please check your email for verification")
    else:
        return 2, _("Please ask your administrator to verify your sign-up")


@frappe.whitelist(allow_guest=True)
def create_member(email, first_name, last_name, member_type, admission_number=None, year_of_admission=None, department=None, year_of_passing=None, job_title=None, designation=None):
    # Check if a member with the same admission number already exists
    existing_member = frappe.get_all("Member", filters={"admission_number": admission_number}, limit=1)

    if existing_member:
        # Member with the same admission number exists
        existing_member_doc = frappe.get_doc("Member", existing_member[0]["name"])

        # You can choose to update the existing member's information here if needed
        # Example: existing_member_doc.first_name = first_name
        # Update other fields as necessary

        existing_member_doc.save()
        frappe.db.commit()

        return existing_member_doc.name  # Return the name of the existing member
    else:
        # Create a new member
        member_data = {
            "doctype": "Member",
            "email": email,
            "first_name": escape_html(first_name),
            "last_name": last_name,
            "member_type": member_type,
            "admission_number": admission_number if member_type == "Student" else "",
            "year_of_admission": year_of_admission if member_type == "Student" else "",
            "department": department if member_type == "Student" else "",
            "year_of_passing": year_of_passing if member_type == "Alumni" else "",
            "job_title": job_title if member_type == "Alumni" else "",
            "designation": designation if member_type == "Alumni" else "",
        }

        member = frappe.get_doc(member_data)
        member.flags.ignore_permissions = True
        member.flags.ignore_password_policy = True
        member.insert()
        frappe.db.commit()

        return member.name  # Return the name of the newly created member

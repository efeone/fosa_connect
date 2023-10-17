import frappe
from frappe.website.utils import is_signup_disabled
from frappe.utils import escape_html, random_string
from frappe import _

@frappe.whitelist(allow_guest=True)
def sign_up(email, first_name, last_name, full_name,  member_type, admission_number=None, year_of_admission=None, department=None, year_of_passing=None, job_title=None, designation=None):
    if is_signup_disabled():
        frappe.throw(_('Sign Up is disabled'), title='Not Allowed')

    user = frappe.db.get("User", {"email": email})
    if user:
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
        "enabled": 0,
        "new_password": random_string(10),
        "user_type": "Website User",
        "send_welcome_email": 0
    })
    user.flags.ignore_permissions = True
    user.flags.ignore_password_policy = True
    user.insert(ignore_permissions=True)


    create_member(email, first_name, last_name, member_type,admission_number, year_of_admission, department, year_of_passing, job_title, designation)

    if user.flags.email_sent:
        return 1, _("Please check your email for verification")
    else:
        return 2, _("Please ask your administrator to verify your sign-up")


@frappe.whitelist(allow_guest=True)
def create_member(email, first_name, last_name, member_type, admission_number=None, year_of_admission=None, department=None, year_of_passing=None, job_title=None, designation=None):
    if frappe.db.exists('Member', { 'email': email }):
        frappe.throw('Member already registered with this email id.')
    else:
        # Create a new member
        member_data = {
            "doctype": "Member",
            "email_id": email,
            "first_name": escape_html(first_name),
            "last_name": escape_html(last_name),
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
        member.insert(ignore_permissions=True)
        frappe.db.commit()

        return member.name  # Return the name of the newly created member

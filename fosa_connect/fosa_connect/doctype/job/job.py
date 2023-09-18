import frappe
from frappe.website.website_generator import WebsiteGenerator

class Job(WebsiteGenerator):
	pass
@frappe.whitelist()
def permission_query_conditions(user):
	if not user:
		user = frappe.session.user
	user_roles = frappe.get_roles(user)
	if "Administrator" in user_roles:
		return None
	if "Student" in user_roles:
		conditions = """tabJob.published = 1"""
		return conditions

	return

# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Job(Document):
	pass



@frappe.whitelist()
def permission_query_conditions(user):
	if not user:
		user = frappe.session.user
	user_roles = frappe.get_roles(user)
	if user == "Administrator" in user_roles:
		return None

	if "Student" in user_roles:
		conditions = """tabJob.published = 1"""
		return conditions

	return None  # Return None for other roles

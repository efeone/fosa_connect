# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
import json
from frappe.contacts.address_and_contact import (
	delete_contact_and_address,
	load_address_and_contact,
)
from frappe.model.document import Document
from frappe.model.workflow import apply_workflow

class Member(Document):
	def onload(self):
		"""Load address and contacts in `__onload`"""
		load_address_and_contact(self)

	def on_trash(self):
		delete_contact_and_address("Member", self.name)

	@frappe.whitelist()
	def approve_member(self, email, action):
		doc = frappe.get_doc("User",email)
		apply_workflow(doc, action)
		if action == 'Approve' or action == 'Enable':
			self.status = 'Active'
		else:
			self.status = 'Disabled'
		self.save()
		return 1

@frappe.whitelist()
def create_user_permission(user_permission):
    permission = json.loads(user_permission)
    member = permission.get('member')
    email_id = frappe.get_value("Member", {'name': member}, 'email_id')

    doc = frappe.new_doc('User Permission')
    doc.user = email_id
    doc.allow = "Batch"
    doc.for_value = permission.get('batch')
    doc.apply_to_all_doctypes = 1

    doc.insert(ignore_permissions=True)

    user = frappe.get_doc("User", email_id)
    user.flags.ignore_permissions = True

    if "Member Approver" not in user.get("roles"):
        user.append_roles("Member Approver")
        user.save()

    return doc.name

# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
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
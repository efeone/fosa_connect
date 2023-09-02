# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class CurriculumVitae(Document):
	def before_save(self):
		self.full_name=f'{self.first_name} {self.middle_name or ""} {self.last_name or ""}'

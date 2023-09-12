# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document
from fosa_connect.fosa_connect.utils import create_notification_log

class JobInterest(WebsiteGenerator):
    pass


class JobInterest(Document):
    def after_insert(self):
       if self.job:
           recipient = frappe.db.get_value('Job', self.job, 'owner')
           job_title = frappe.db.get_value('Job', self.job, 'job_title')
           job_create_notification_log(self, recipient, job_title) 

# Job Update for alumni
@frappe.whitelist()
def job_create_notification_log(doc, recipient, job_title):
    subject = "New Job Interest for "+job_title
    create_notification_log(doc, recipient, subject)
    frappe.db.commit()
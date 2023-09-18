# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.model.document import Document
from fosa_connect.fosa_connect.utils import create_notification_log


class JobInterest(WebsiteGenerator):
    pass

# Job Update for alumni
@frappe.whitelist()
def job_create_notification_log(doc, method=None):
    if doc.job:
        recipient = frappe.db.get_value("Job", doc.job, "owner")
        job_title = frappe.db.get_value("Job", doc.job, "job_title")
        subject = "New Job Interest for " + job_title
        create_notification_log(doc, recipient, subject)


# Job Update for student
@frappe.whitelist()
def student_notification_log(doc, method=None):
    if doc.status != "Open":
        recipient = frappe.db.get_value("Member", doc.member, "email_id")
        job_title = frappe.db.get_value("Job", doc.job, "job_title")
        subject = "Job Interest update for " + job_title + " : " + doc.status
        create_notification_log(doc, recipient, subject)

import frappe
from frappe.website.website_generator import WebsiteGenerator
from fosa_connect.fosa_connect.utils import create_notification_log
from frappe.model.document import Document

class Job(Document):
    def on_update(self):
        if self.published:
            self.send_job_alert_mail()

    def send_job_alert_mail(self):
        if self.job_category:
            job_category = self.job_category
            members = frappe.db.get_all('Job Category List', filters={'job_category': job_category, 'parenttype': 'Member', 'parentfield': 'area_interested_in' },pluck='parent')
            for member in members:
                if frappe.db.get_value('Member', member, 'email_id'):
                    recipient = frappe.db.get_value('Member', member, 'email_id')
                    subject = "New Job Alert On " + job_category
                    content = "It's a new Job Alert"
                    create_notification_log(self, recipient, subject, content)

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

    return None

@frappe.whitelist()
def post_job(job_title, qualification, responsibility, start_date, end_date, job_category, location, job_type, salary_info, job_description, organization, isPublished):
    job_data = { 
        "doctype": "Job",
        "job_title": job_title,
        "qualification": qualification,
        "responsibility": responsibility,
        "start_date": start_date,
        "last_date_to_apply": end_date,
        "job_category": job_category,
        "location": location,
        "job_type": job_type,
        "salary_info": salary_info,
        "job_description": job_description,
        "organization_name": organization,
        "published" : isPublished
    }
    job_doc = frappe.get_doc(job_data)
    job_doc.insert()
    frappe.db.commit()
    return job_doc.name
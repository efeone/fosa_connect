# Copyright (c) 2023, efeone and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class JobInterest(Document):
	def after_insert(self)

@frappe.whitelist()
def create_notification_log(doctype, "JobInterest", "User@gmail.com", subject, content, type = None):
    ''' method is used to create notification log
        args:
            doc: document object
            recipient: notification receiving user
            subject: subject of notification log
            type: type of the notification log '''
    notification_log = frappe.new_doc('Notification Log')
    notification_log.type = 'Alert'
    if type:
        notification_log.type = type
    notification_log.document_type = doctype
    notification_log.document_name = name
    notification_log.for_user = recipient
    notification_log.subject = subject
    notification_log.email_content = content
    notification_log.save(ignore_permissions = True)

import frappe
import json
from frappe.utils.file_manager import save_file

@frappe.whitelist()
def upload_file(filedata, doc_name):
    doc = frappe.get_doc('Job', doc_name)
    if filedata:
        filedata_json = json.loads(filedata)
        filedata_list = list(filedata_json["files_data"])
        for filedata_item in filedata_list:
            filedoc = save_file(filedata_item["filename"], filedata_item["dataurl"], doc.doctype, doc.name, decode=True, is_private=0, df='job_details')
            doc.job_details = filedoc.file_url
            doc.save()
            #Only One file will be there
            return 1
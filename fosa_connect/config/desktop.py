from frappe import _

def get_data():
	return [
		{
			"module_name": "FOSA Connect",
			"type": "module",
			"label": _("FOSA Connect")
		}
	]

# Define a custom page route
{
    "route": "/edit_job",
    "name": "edit_job",
    "icon": "octicon octicon-file-directory",
    "label": _("Edit Job"),
    "type": "page",
    "link": "fosa_connect.fosa_connect.www.edit_job"
},
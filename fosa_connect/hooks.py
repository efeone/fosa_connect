from . import __version__ as app_version

app_name = "fosa_connect"
app_title = "FOSA Connect"
app_publisher = "efeone"
app_description = "FOSA Connect"
app_email = "info@efeone.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/fosa_connect/css/fosa_connect.css"
# app_include_js = "/assets/fosa_connect/js/fosa_connect.js"

# include js, css files in header of web template
# web_include_css = "/assets/fosa_connect/css/fosa_connect.css"
# web_include_js = "/assets/fosa_connect/js/fosa_connect.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "fosa_connect/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "fosa_connect.utils.jinja_methods",
#	"filters": "fosa_connect.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "fosa_connect.install.before_install"
# after_install = "fosa_connect.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "fosa_connect.uninstall.before_uninstall"
# after_uninstall = "fosa_connect.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "fosa_connect.utils.before_app_install"
# after_app_install = "fosa_connect.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "fosa_connect.utils.before_app_uninstall"
# after_app_uninstall = "fosa_connect.utils.after_app_uninstall"

signup_form_template = "fosa_connect/templates/signup.html"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "fosa_connect.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

permission_query_conditions = {
	"Job": "fosa_connect.fosa_connect.doctype.job.job.permission_query_conditions",
}
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
    "Job Interest": {
        "after_insert": "fosa_connect.fosa_connect.doctype.job_interest.job_interest.job_create_notification_log",
        "on_update": "fosa_connect.fosa_connect.doctype.job_interest.job_interest.student_notification_log"
    }
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"fosa_connect.tasks.all"
#	],
#	"daily": [
#		"fosa_connect.tasks.daily"
#	],
#	"hourly": [
#		"fosa_connect.tasks.hourly"
#	],
#	"weekly": [
#		"fosa_connect.tasks.weekly"
#	],
#	"monthly": [
#		"fosa_connect.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "fosa_connect.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "fosa_connect.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "fosa_connect.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["fosa_connect.utils.before_request"]
# after_request = ["fosa_connect.utils.after_request"]

# Job Events
# ----------
# before_job = ["fosa_connect.utils.before_job"]
# after_job = ["fosa_connect.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"fosa_connect.auth.validate"
# ]

fixtures = [
    "Program", "Job Category", "Workflow", "Workflow State", "Email Template", "Qualification"
]


website_route_rules = [
    {'from_route':'/jobs/job/<docname>','to_route':'jobs/job'},
	{'from_route':'/job_interest/job_interest/<docname>','to_route':'job_interest/job_interest'},
]

import frappe
from frappe.utils import escape_html
from frappe.utils import getdate
import json
from frappe.utils.file_manager import save_file
from frappe.utils import *
from frappe import _

def get_context(context):
    # Get the current user's roles
    context.member = frappe.get_doc("Member", {"email_id": frappe.session.user})
    context.technical_skills = frappe.get_all("Technical Skills", pluck="name")
    context.soft_skills = frappe.get_all("Soft Skills", pluck="name")
    return {
        "context": context
    }

@frappe.whitelist(allow_guest=True)
def update_member(email, first_name, middle_name, last_name, mobile_no, admission_number,
    year_of_admission, department, year_of_passing, job_title, designation, linkedin,
    website_or_portfolio, hobbies_and_interests, certifications, career_objective_or_summary,
    awards_and_achievements,volunteer_work_or_extracurricular_activities,
    address_title, address_line1, address_line2, city, state, pincode,
    career_history=None, education = None, projects=None, publications=None,
    technical_skills=None,soft_skills=None, language_proficiency=None, references=None, area_interested_in=None):


    member = frappe.get_doc("Member", {"email_id": frappe.session.user})
    user = frappe.get_doc("User", {"email": frappe.session.user})

    #Check if address exists
    if frappe.db.exists("Dynamic Link", {"link_name" : member.name}):
        primary_address = frappe.get_value("Dynamic Link", filters = {"link_name" : member.name}, fieldname = "parent")
        address = frappe.get_doc("Address",primary_address)
        if address:
            address.address_title = address_title
            address.address_line1 = address_line1
            address.address_line2 = address_line2
            address.city = city
            address.state = state
            address.pincode = pincode
        address.save(ignore_permissions=True)
        frappe.db.commit()

    else:
        #create a new address
        address = frappe.new_doc("Address")
        address.address_title = member.name
        address.address_line1 = address_line1
        address.address_line2 = address_line2
        address.city = city
        address.state = state
        address.pincode = pincode
        address.address_type = "Personal"
        link = address.append('links')
        link.link_doctype = "Member"
        link.link_name = member.name
        link.link_title = member.name
        address.insert(ignore_permissions=True)
        frappe.db.commit()
        primary_address = address.address_title + "-" + address.address_type


    if member:
        # Update the first_name field
        member.first_name = escape_html(first_name)
        member.middle_name = middle_name
        member.last_name = last_name
        member.email_id = email
        member.mobile_no = mobile_no
        user.email = email
        user.first_name = first_name
        user.middle_name = middle_name
        user.last_name = last_name
        member.admission_number = admission_number
        member.year_of_admission = year_of_admission
        member.department = department
        member.year_of_passing = year_of_passing
        member.job_title = job_title
        member.designation = designation
        member.linkedin = linkedin
        member.website_or_portfolio = website_or_portfolio
        member.hobbies_and_interests = hobbies_and_interests
        member.certifications = certifications
        member.career_objective_or_summary = career_objective_or_summary
        member.awards_and_achievements = awards_and_achievements
        member.volunteer_work_or_extracurricular_activities = volunteer_work_or_extracurricular_activities
        if not member.primary_address:
            member.primary_address = primary_address
        member.career_history = []
        if career_history:
            career_history = json.loads(career_history)
            for row in career_history:
                child = member.append('career_history')
                child.organization_name = row.get('organization_name')
                child.industry = row.get('industry')
                child.role = row.get('role')
                child.organization_description = row.get('organization_description')
                if row.get('from_date'):
                    print(row.get('from_date'))
                    child.from_date = row.get('from_date')
                if row.get('to_date'):
                    child.to_date = getdate(row.get('to_date'))
                child.current = row.get('current')
        member.education = []
        if education:
            education = json.loads(education)
            for row in education:
                child=member.append('education')
                child.degrees_earned= row.get('degrees_earned')
                child.majorfield_of_study = row.get('majorfield_of_study')
                child.schooluniversity_name = row.get('schooluniversity_name')
                child.percentagegrade = row.get('percentagegrade')
                child.graduation_year = row.get('graduation_year')
        member.projects=[]
        if projects:
            projects = json.loads(projects)
            for row in projects:
                child=member.append('projects')
                child.project_title=row.get('project_title')
                child.description=row.get('description')
                child.role=row.get('role')
                child.technologies_used=row.get('technologies_used')
        member.publications =[]
        if publications:
            publications = json.loads(publications)
            for row in publications:
                child=member.append('publications')
                child.title=row.get('title')
                child.publisher=row.get('publisher')
                if row.get('publication_date'):
                    child.publication_date = getdate(row.get('publication_date'))
        member.references=[]
        if references:
            references = json.loads(references)
            for row in references:
                child = member.append('references')
                child.name1=row.get('name1')
                child.titleposition=row.get('titleposition')
                child.companyorganization=row.get('companyorganization')
                child.contact_information_phoneemail=row.get('contact_information_phoneemail')
        member.technical_skills=[]
        if technical_skills:
            technical_skills = json.loads(technical_skills)
            for row in technical_skills:
                skill = row.get('skills').capitalize()
                if not frappe.db.exists('Technical Skills', skill):
                    frappe.get_doc({"doctype": "Technical Skills", "technical_skills_name": skill}).insert()
                child = member.append('technical_skills')
                child.skills=skill
                child.level=row.get('level')
        member.soft_skills=[]
        if soft_skills:
            soft_skills = json.loads(soft_skills)
            for row in soft_skills:
                skill = row.get('skills').capitalize()
                if not frappe.db.exists('Soft Skills', skill):
                    frappe.get_doc({"doctype": "Soft Skills", "soft_skills_name": skill}).insert()
                child = member.append('soft_skills')
                child.skills=row.get('skills')
                child.level=row.get('level')
        member.language_proficiency=[]
        if language_proficiency:
            language_proficiency = json.loads(language_proficiency)
            for row in language_proficiency:
                child = member.append('language_proficiency')
                child.language = row.get('language')
                child.read = row.get('read')
                child.write = row.get('write')
                child.speak = row.get('speak')

        if area_interested_in:
            member.area_interested_in = []
            area_interested_in = json.loads(area_interested_in)
            for area in area_interested_in:
                child = member.append('area_interested_in')
                child.job_category = area


        # Save the updated Member document
        member.save()

        # Commit the changes to the database
        frappe.db.commit()

        return member.name  # Return the updated document's name
    else:
        # Handle the case where no Member with the given email exists
        return "Member not found for email: " + email

@frappe.whitelist()
def upload_image(filedata):
    doc = frappe.get_doc('Member', {'email_id': frappe.session.user })
    if filedata:
        filedata_json = json.loads(filedata)
        filedata_list = list(filedata_json["files_data"])
        for filedata_item in filedata_list:
            filedoc = save_file(filedata_item["filename"], filedata_item["dataurl"], doc.doctype, doc.name, decode=True, is_private=0, df='image')
            doc.image = filedoc.file_url
            doc.save()
            #Only One file will be there
            return 1

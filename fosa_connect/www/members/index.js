
frappe.ready(function () {
$(".update-member").on("submit", (e) => {
  console.log("Button clicked!");
    e.preventDefault();
    updateMember();
});
});

const updateMember = () => {
const email = ($("#email_id").val() || "").trim();
const first_name = frappe.utils.xss_sanitise($("#first_name").val() || "").trim();
const middle_name = frappe.utils.xss_sanitise($("#middle_name").val() || "").trim();
const last_name = frappe.utils.xss_sanitise($("#last_name").val() || "").trim();
const mobile_no = frappe.utils.xss_sanitise($("#mobile_no").val() || "").trim();
const admission_number = frappe.utils.xss_sanitise($("#admission_number").val() || "").trim();
const year_of_admission = frappe.utils.xss_sanitise($("#year_of_admission").val() || "").trim();
const department = frappe.utils.xss_sanitise($("#department").val() || "").trim();
const year_of_passing = frappe.utils.xss_sanitise($("#year_of_passing").val() || "").trim();
const job_title = frappe.utils.xss_sanitise($("#job_title").val() || "").trim();
const designation = frappe.utils.xss_sanitise($("#designation").val() || "").trim();
const linkedin = frappe.utils.xss_sanitise($("#linkedin").val() || "").trim();
const website_or_portfolio = frappe.utils.xss_sanitise($("#website_or_portfolio").val() || "").trim();
const hobbies_and_interests = frappe.utils.xss_sanitise($("#hobbies_and_interests").val() || "").trim();
const technical_skills = frappe.utils.xss_sanitise($("#technical_skills").val() || "").trim();
const soft_skills = frappe.utils.xss_sanitise($("#soft_skills").val() || "").trim();
const language_proficiency = frappe.utils.xss_sanitise($("#language_proficiency").val() || "").trim();
const certifications = frappe.utils.xss_sanitise($("#certifications").val() || "").trim();
const career_objective_or_summary = frappe.utils.xss_sanitise($("#career_objective_or_summary").val() || "").trim();
const awards_and_achievements = frappe.utils.xss_sanitise($("#awards_and_achievements").val() || "").trim();
const volunteer_work_or_extracurricular_activities = frappe.utils.xss_sanitise($("#volunteer_work_or_extracurricular_activities").val() || "").trim();
const career_history = get_carrer_history_data();
const education = get_education_data();
const projects = get_projects_data();
const publications = get_publications_data();
const references = get_references_data();


frappe.call({
    method: "fosa_connect.www.members.index.update_member",
    args: {
        "email": email,
        "first_name": first_name,
        "middle_name": middle_name,
        "last_name": last_name,
        "mobile_no" : mobile_no,
        "admission_number" : admission_number,
        "year_of_admission" : year_of_admission,
        "department" : department,
        "year_of_passing" : year_of_passing,
        "job_title" : job_title,
        "designation" : designation,
        "linkedin" : linkedin,
        "website_or_portfolio" : website_or_portfolio,
        "hobbies_and_interests": hobbies_and_interests,
        "technical_skills" : technical_skills,
        "soft_skills" : soft_skills,
        "language_proficiency" : language_proficiency,
        "certifications" : certifications,
        "career_objective_or_summary" :career_objective_or_summary,
        "awards_and_achievements" : awards_and_achievements,
        "volunteer_work_or_extracurricular_activities":volunteer_work_or_extracurricular_activities,
        "career_history" : career_history,
        "education" : education,
        "projects" : projects,
        "publications" : publications,
        "references" : references,

    },
});
};

function add_carrer_history_row() {
    var table = document.getElementById("carrer-history").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var orgNameCell = newRow.insertCell(0);
    var industryCell = newRow.insertCell(1);
    var roleCell = newRow.insertCell(2);
    var fromCell = newRow.insertCell(3);
    var toCell = newRow.insertCell(4);
    var actionCell = newRow.insertCell(5);

    orgNameCell.innerHTML = '<input type="text" name="organization_name[]" value="" />';
    industryCell.innerHTML = '<input type="text" name="industry[]" value="" />';
    roleCell.innerHTML = '<input type="text" name="role[]" value="" />';
    fromCell.innerHTML = '<input type="text" name="from[]" value="" />';
    toCell.innerHTML = '<input type="text" name="to[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function add_education_row() {
    var table = document.getElementById("education").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var degrees_earnedCell = newRow.insertCell(0);
    var majorfield_of_studyCell = newRow.insertCell(1);
    var schooluniversity_nameCell = newRow.insertCell(2);
    var percentagegradeCell = newRow.insertCell(3);
    var graduation_yearCell = newRow.insertCell(4);
    var actionCell = newRow.insertCell(5);

    degrees_earnedCell.innerHTML = '<input type="text" name="degrees_earned[]" value="" />';
    majorfield_of_studyCell.innerHTML = '<input type="text" name="majorfield_of_study[]" value="" />';
    schooluniversity_nameCell.innerHTML = '<input type="text" name="schooluniversity_name[]" value="" />';
    percentagegradeCell.innerHTML = '<input type="text" name="percentagegrade[]" value="" />';
    graduation_yearCell.innerHTML = '<input type="text" name="graduation_year[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}


function add_projects_row() {
    var table = document.getElementById("projects").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var project_titleCell = newRow.insertCell(0);
    var descriptionCell = newRow.insertCell(1);
    var roleCell = newRow.insertCell(2);
    var technologies_usedCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    project_titleCell.innerHTML = '<input type="text" name="project_title[]" value="" />';
    descriptionCell.innerHTML = '<input type="text" name="description[]" value="" />';
    roleCell.innerHTML = '<input type="text" name="role[]" value="" />';
    technologies_usedCell.innerHTML = '<input type="text" name="technologies_used[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function add_publications_row() {
    var table = document.getElementById("publications").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var titleCell = newRow.insertCell(0);
    var publisherCell = newRow.insertCell(1);
    var publication_dateCell = newRow.insertCell(2);
    var actionCell = newRow.insertCell(3);

    titleCell.innerHTML = '<input type="text" name="title[]" value="" />';
    publisherCell.innerHTML = '<input type="text" name="publisher[]" value="" />';
    publication_dateCell.innerHTML = '<input type="text" name="publication_date[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function add_references_row() {
    var table = document.getElementById("references").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var name1Cell = newRow.insertCell(0);
    var titlepositionCell = newRow.insertCell(1);
    var companyorganizationCell = newRow.insertCell(2);
    var contact_information_phoneemailCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    name1Cell.innerHTML = '<input type="text" name="name1[]" value="" />';
    titlepositionCell.innerHTML = '<input type="text" name="titleposition[]" value="" />';
    companyorganizationCell.innerHTML = '<input type="text" name="rcompanyorganization[]" value="" />';
    contact_information_phoneemailCell.innerHTML = '<input type="text" name="contact_information_phoneemail[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function add_technical_skills_row() {
    var table = document.getElementById("technical-skills").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var skillsCell = newRow.insertCell(0);
    var levelCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);
    levelCell.className= "star-wrapper"
    skillsCell.innerHTML = '<input type="text" name="skills[]" value="" />';
    levelCell.innerHTML = '<a class="fas fa-star s1"></a><a class="fas fa-star s2"></a><a class="fas fa-star s3"></a><a class="fas fa-star s4"></a><a class="fas fa-star s5"></a>';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
    add_star_wrapper_row();
}


function add_soft_skills_row() {
    var table = document.getElementById("soft-skills").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var skillsCell = newRow.insertCell(0);
    var levelCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);
    levelCell.className= "star-wrapper"
    skillsCell.innerHTML = '<input type="text" name="skills[]" value="" />';
    levelCell.innerHTML = '<a class="fas fa-star s1"></a> <a class="fas fa-star s2"></a> <a class="fas fa-star s3"></a> <a class="fas fa-star s4"></a> <a class="fas fa-star s5"></a>';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function add_language_proficiency_row() {
    var table = document.getElementById("language_proficiency").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var languageCell = newRow.insertCell(0);
    var readCell = newRow.insertCell(1);
    var writeCell = newRow.insertCell(2);
    var speakCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    languageCell.innerHTML = '<input type="text" name="language[]" value="" />';
    readCell.innerHTML = '<input type="checkbox" name="read[]" value="" />';
    writeCell.innerHTML = '<input type="checkbox" name="write[]" value="" />';
    speakCell.innerHTML = '<input type="checkbox" name="speak[]" value="" />';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function get_carrer_history_data() {
    var table = document.getElementById("carrer-history").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var orgName = row.cells[0].querySelector('input').value;
        var industry = row.cells[1].querySelector('input').value;
        var role = row.cells[2].querySelector('input').value;
        var organization_description = row.cells[3].querySelector('input').value;
        var from_date = row.cells[4].querySelector('input').value;
        var to_date = row.cells[5].querySelector('input').value;
        data.push({ organization_name: orgName, industry: industry, role: role,organization_description:organization_description, from_date: from_date, to_date: to_date });
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}


function get_education_data() {
    var table = document.getElementById("education").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var degrees_earned = row.cells[0].querySelector('input').value;
        var majorfield_of_study = row.cells[1].querySelector('input').value;
        var schooluniversity_name = row.cells[2].querySelector('input').value;
        var percentagegrade = row.cells[3].querySelector('input').value;
        var graduation_year = row.cells[4].querySelector('input').value;
        data.push({ degrees_earned: degrees_earned, majorfield_of_study: majorfield_of_study, schooluniversity_name: schooluniversity_name, percentagegrade: percentagegrade, graduation_year: graduation_year });
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_projects_data() {
    var table = document.getElementById("projects").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var project_title = row.cells[0].querySelector('input').value;
        var description = row.cells[1].querySelector('input').value;
        var role = row.cells[2].querySelector('input').value;
        var technologies_used = row.cells[3].querySelector('input').value;
        data.push({ project_title: project_title, description: description, role: role, technologies_used: technologies_used });
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_publications_data() {
    var table = document.getElementById("publications").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var title = row.cells[0].querySelector('input').value;
        var publisher = row.cells[1].querySelector('input').value;
        var publication_date = row.cells[2].querySelector('input').value;
        data.push({ title: title, publisher: publisher, publication_date: publication_date,});
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_references_data() {
    var table = document.getElementById("references").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var name1 = row.cells[0].querySelector('input').value;
        var titleposition = row.cells[1].querySelector('input').value;
        var companyorganization = row.cells[2].querySelector('input').value;
        var contact_information_phoneemail = row.cells[3].querySelector('input').value;
        data.push({ name1: name1, titleposition: titleposition, companyorganization: companyorganization, contact_information_phoneemail:contact_information_phoneemail,});
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_technical_skills_data() {
    var table = document.getElementById("technical-skills").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var skills = row.cells[0].querySelector('input').value;
        var level = row.cells[0].querySelector('input').value;
        data.push({ skills: skills, level: level,});
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}


function get_soft_skills_data() {
    var table = document.getElementById("soft-skills").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var skills = row.cells[0].querySelector('input').value;
        var level = row.cells[0].querySelector('input').value;
        data.push({ skills: skills, level: level,});
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}
function get_language_proficiency_data() {
    var table = document.getElementById("language-proficiency").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var language = row.cells[0].querySelector('input').value;
        var read = row.cells[1].querySelector('input').value;
        var write = row.cells[2].querySelector('input').value;
        var speak = row.cells[3].querySelector('input').value;
        data.push({ language: language, read: read, write: write, speak:speak,});
    }

    var jsonData = JSON.stringify(data);
    console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}




//for saving star rating
function setRating(starElement, rating) {
    const row = starElement.parentElement.parentElement; // Get the parent row
    const ratingInput = row.querySelector('.rating-input'); // Find the hidden input
    ratingInput.value = rating; // Set the value of the hidden input to the selected rating
}

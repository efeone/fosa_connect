new MultiSelectTag('area_interested_in');

$(document).ready(function () {
    console.log("frappe ready");
  $("#submitBtn").click(function(){
    console.log("Button clicked!");
    updateMember();
  });
  var $form = $("form[id='memberForm']")
  $form.on("change", "[type='file']", function() {
    console.log("on change");
    var $input = $(this);
    var input = $input.get(0);
    if(input.files.length) {
      input.filedata = { "files_data" : [] }; //Initialize as json array.
      window.file_reading = true;
      $.each(input.files, function(key, value) {
        setupReader(value, input);
      });
      window.file_reading = false;
    }
  });
  function setupReader(file, input) {
    var name = file.name;
    var reader = new FileReader();
    reader.onload = function(e) {
        input.filedata.files_data.push({
            "__file_attachment": 1,
            "filename": file.name,
            "dataurl": reader.result
        });
    };
    reader.readAsDataURL(file);
  }

  $("#uploadBtn").click(function(){
    var filedata = $('#uploadImg').prop('filedata')
    frappe.call({
      method: 'fosa_connect.www.members.index.upload_image',
      args : { 'filedata': filedata },
      freeze: true,
      freeze_msg: 'Uploading',
      callback: function(r){
        if (r.message) {
            alert('Image uploaded successfully ');
            location.reload(true);
          } else {
            // Handle errors here
            alert('Error: ' + r.exc);
        }
      }
    });
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
const certifications = frappe.utils.xss_sanitise($("#certifications").val() || "").trim();
const career_objective_or_summary = frappe.utils.xss_sanitise($("#career_objective_or_summary").val() || "").trim();
const awards_and_achievements = frappe.utils.xss_sanitise($("#awards_and_achievements").val() || "").trim();
const volunteer_work_or_extracurricular_activities = frappe.utils.xss_sanitise($("#volunteer_work_or_extracurricular_activities").val() || "").trim();
const address_title = frappe.utils.xss_sanitise($("#address_title").val() || "").trim();
const address_line1 = frappe.utils.xss_sanitise($("#address_line1").val() || "").trim();
const address_line2 = frappe.utils.xss_sanitise($("#address_line2").val() || "").trim();
const area_interested_in = $("#area_interested_in").val()
const city = frappe.utils.xss_sanitise($("#city").val() || "").trim();
const state = frappe.utils.xss_sanitise($("#state").val() || "").trim();
const pincode = frappe.utils.xss_sanitise($('#pincode').val() ||"").trim();
const career_history = get_carrer_history_data();
const education = get_education_data();
const projects = get_projects_data();
const publications = get_publications_data();
const references = get_references_data();
const language_proficiency = get_language_proficiency_data();
const technical_skills = get_skills_data("technical-skills");
const soft_skills = get_skills_data("soft-skills");

// frappe.throw('ss')
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
        "address_title" : address_title,
        "address_line1" : address_line1,
        "address_line2" : address_line2,
        "city" : city,
        "state" : state,
        "pincode" : pincode,
        "area_interested_in" : area_interested_in,

    },
    callback: function (r) {
        if (r.message) {
            // Handle the success response here
            alert(' Submitted successfully ');
            // Refresh the whole page
          } else {
            // Handle errors here
            alert('Error: ' + r.exc);
        }
    },
});
};


function add_carrer_history_row() {
    var table = document.getElementById("carrer-history").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var orgNameCell = newRow.insertCell(0);
    var industryCell = newRow.insertCell(1);
    var roleCell = newRow.insertCell(2);
    var orgdecCell = newRow.insertCell(3)
    var fromCell = newRow.insertCell(4);
    var toCell = newRow.insertCell(5);
    var currentCell = newRow.insertCell(6);
    var actionCell = newRow.insertCell(7);

    orgNameCell.innerHTML = '<input type="text" name="organization_name[]" value="" />';
    industryCell.innerHTML = '<input type="text" name="industry[]" value="" />';
    roleCell.innerHTML = '<input type="text" name="role[]" value="" />';
    orgdecCell.innerHTML = '<input type="text" name="organization_description[]" value="" />';
    fromCell.innerHTML = '<input type="date" name="from[]" value="" />';
    toCell.innerHTML = '<input type="date" name="to[]" value="" />';
    currentCell.innerHTML = '<input type="checkbox" name="curr_date[]" />';
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
    tableName = 'technical-skills';
    var skillsCell = newRow.insertCell(0);
    var levelCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);
    levelCell.className= "star-wrapper"
    skillsCell.innerHTML = '<input type="text" name="technical-skills[]" value="" />';
    levelCell.innerHTML = '<a class="fas fa-star s1"></a> <a class="fas fa-star s2"></a> <a class="fas fa-star s3"></a> <a class="fas fa-star s4"></a> <a class="fas fa-star s5"></a> <input type="hidden" class="rating-input" value="0">';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
    var rowIndex = newRow.rowIndex;
    add_star_wrapper_row(tableName, rowIndex);
}


function add_soft_skills_row() {
    var table = document.getElementById("soft-skills").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    tableName = "soft-skills";
    var skillsCell = newRow.insertCell(0);
    var levelCell = newRow.insertCell(1);
    var actionCell = newRow.insertCell(2);
    levelCell.className= "star-wrapper"
    skillsCell.innerHTML = '<input type="text" name="soft-skills[]" value="" />';
    levelCell.innerHTML = '<a class="fas fa-star s1"></a> <a class="fas fa-star s2"></a> <a class="fas fa-star s3"></a> <a class="fas fa-star s4"></a> <a class="fas fa-star s5"></a> <input type="hidden" class="rating-input" value="0">';
    actionCell.innerHTML = '<button type="button" onclick="deleteRow(this)">Delete</button>';
    var rowIndex = newRow.rowIndex;
    add_star_wrapper_row(tableName, rowIndex);
}

function add_language_proficiency_row() {
    var table = document.getElementById("language-proficiency").getElementsByTagName('tbody')[0];
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
        var curr_date = row.cells[6].querySelector('input').value;
        data.push({ organization_name: orgName, industry: industry, role: role,organization_description:organization_description, from_date: from_date, to_date: to_date, curr_date: curr_date });
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
    // console.log(jsonData);
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
    // console.log(jsonData);
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
    // console.log(jsonData);
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
    // console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_skills_data(tableName) {
    var table = document.getElementById(tableName).getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var skills = row.cells[0].querySelector('input').value;
        var level = row.querySelector('.rating-input').value;
        data.push({ skills: skills, level: level,});
    }

    var jsonData = JSON.stringify(data);
    // console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

function get_language_proficiency_data() {
    var table = document.getElementById("language-proficiency").getElementsByTagName('tbody')[0];
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        var language = row.cells[0].querySelector('input').value;
        if (row.cells[1].querySelector('input').checked) {
          var read = 1;
         } else {
           var read = 0;
         }
       if (row.cells[2].querySelector('input').checked) {
         var write = 1;
        } else {
          var write = 0;
        }
      if (row.cells[3].querySelector('input').checked) {
        var speak = 1
       } else {
         var speak = 0;
       }
        data.push({ language: language, read: read, write: write, speak:speak,});
    }

    var jsonData = JSON.stringify(data);
    // console.log(jsonData);
    return jsonData;
    // You can now send the jsonData to your server or use it as needed.
}

// Star Rating
function add_star_wrapper_row(tableName, rowIndex){
	const row = document.getElementById(tableName).rows[rowIndex];
    const stars = row.querySelectorAll('.star-wrapper a');
    let selectedStar = null;

    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        selectedStar = index;
        let starValue = (index + 1) / 5;
          row.querySelector('.rating-input').value=starValue;
        updateStars();
      });
    });

    function updateStars() {
      stars.forEach((star, index) => {
        if (index <= selectedStar) {
          star.style.color = 'gold';
        } else {
          star.style.color = '#fff';
        }
      });
    }
	}
//to get the print format
function createCV() {
  var member = $("#name").val()
  var print_format = $("#templateSelect").val();
  var link = "/printview?doctype=Member&name=" + member + "&format=" + print_format;
  window.open(link, '_blank');
}

$(document).ready(function () {
  $("#input-submit").click(function () {
    createJobEntry();
  });
  var $form = $("form[id='post_job']")
    $form.on("change", "[type='file']", function () {
      var $input = $(this);
      var input = $input.get(0);
      if (input.files.length) {
        input.filedata = { "files_data": [] }; //Initialize as json array.
        window.file_reading = true;
        $.each(input.files, function (key, value) {
          setupReader(value, input);
        });
        window.file_reading = false;
      }
    });
    function setupReader(file, input) {
      var name = file.name;
      var reader = new FileReader();
      reader.onload = function (e) {
        input.filedata.files_data.push({
          "__file_attachment": 1,
          "filename": file.name,
          "dataurl": reader.result
        });
      };
      reader.readAsDataURL(file);
    }
});

const createJobEntry = () => {
  if (document.getElementById('isPublished').checked) {
    var isPublished = 1;
  }
  else {
    var isPublished = 0;
  }
    // Get values from form fields
    let title = $("#input-title").val().trim() || '';
    let qualification = $("#input-qualification").val().trim() || '';
    let responsibility = $("#input-responsibility").val().trim() || '';
    let start_date = $("#start-date").val().trim() || '';
    let end_date = $("#end-date").val().trim() || '';
    let category = $("#input-category").val().trim() || '';
    let location = $("#input-location").val().trim() || '';
    let type = $("#input-type").val().trim() || '';
    let salary = $("#input-salary").val().trim() || '';
    let message = $("#input-message").val().trim() || '';
    let organization = $("#input-organization").val().trim() || '';
    let docName;
    // Create a new job posting entry
    frappe.call({
        method: "fosa_connect.fosa_connect.doctype.job.job.post_job",
        freeze: true,
        args: {
            "job_title": title,
            "qualification": qualification,
            "responsibility": responsibility,
            "start_date": start_date,
            "end_date": end_date,
            "job_category": category,
            "location": location,
            "job_type": type,
            "salary_info": salary,
            "job_description": message,
            "organization": organization,
            "isPublished": isPublished
        },
        callback: function (response) {
            if (response.message) {
                docName = response.message;
                var filedata = $('#uploadPdf').prop('filedata')
                frappe.call({
                    method: 'fosa_connect.www.post_job.index.upload_file',
                    args: {
                        'filedata': filedata,
                        'doc_name': docName,
                    },
                    freeze: true,
                    freeze_msg: 'Uploading',
                    callback: function (r) {
                        if (r.message) {
                            alert('File uploaded successfully ');
                            location.reload(true);
                        } else {
                            // Handle errors here
                            alert('Error: ' + r.exc);
                        }
                    }
                });
                // Display a success message or redirect the user
                alert("Job posting created successfully");
                window.location.href = "/jobs"; // Redirect to a jobs page
            } else {
                // Handle error, if any
                alert("Error: Unable to create job posting");
            }
        }
    });
    return false;
}

frappe.ready(function () {
  const url_params = new URLSearchParams(window.location.search);
  const job_id = url_params.get("job_id");
  let isPublished = document.getElementById('isPublished').checked ? 1 : 0;

  $(".cf").on("submit", (e) => {
    e.preventDefault();
    EditJobEntry(job_id, isPublished);
  });

  // Add an event listener to update 'isPublished' when the checkbox is clicked
  document.getElementById('isPublished').addEventListener('click', function () {
    isPublished = this.checked ? 1 : 0;
  });
});

const EditJobEntry = (job_id, isPublished) => {
  // Get values from form fields
  let title = $("#input-title").val().trim();
  let qualification = $("#input-qualification").val().trim();
  let responsibility = $("#input-responsibility").val().trim();
  let start_date = $("#start-date").val().trim();
  let end_date = $("#end-date").val().trim();
  let category = $("#input-category").val().trim();
  let location = $("#input-location").val().trim();
  let type = $("#input-type").val().trim();
  let salary = $("#input-salary").val().trim();
  let message = $("#input-message").val().trim();
  let organization = $("#input-organization").val().trim();

  // Update edited job posting entry
  frappe.call({
    method: "fosa_connect.www.edit_job.index.edit_job",
    args: {
      "job_id": job_id,
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
      "isPublished": isPublished  // Update 'isPublished' with the new value
    },
    callback: function (response) {
      if (response.message) {
        // Display a success message or redirect the user
        alert("Job Edited Successfully");
        window.location.href = "/jobs"; // Redirect to a jobs page
      } else {
        // Handle error, if any
        alert("Error: Unable to edit job posting");
      }
    }
  });

  return false;
}

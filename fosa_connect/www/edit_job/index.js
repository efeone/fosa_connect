frappe.ready(function () {
  const url_params = new URLSearchParams(window.location.search);
  const job_id = url_params.get("job_id");
  let isPublished = document.getElementById('isPublished').checked ? 1 : 0;
  let disabled = document.getElementById('isPublished').checked ? 0 : 1;
  // Add an event listener to update 'isPublished' when the checkbox is clicked
  document.getElementById('isPublished').addEventListener('click', function () {
    isPublished = this.checked ? 1 : 0;
    disabled = this.checked ? 0 : 1;
  });

  $(".cf").on("submit", (e) => {
    e.preventDefault();
    EditJobEntry(job_id, isPublished, disabled);
  });
});

const EditJobEntry = (job_id, isPublished, disabled) => {
  // Get values from form fields
  let title = $("#input-title").val().trim();
  let qualification = $("#input-qualification").val().trim();
  let organization_website = $("#input-organization_website").val().trim();
  let start_date = $("#start-date").val().trim();
  let end_date = $("#end-date").val().trim();
  let category = $("#input-category").val().trim();
  let location = $("#input-location").val().trim();
  let type = $("#input-type").val().trim();
  let salary = $("#input-salary").val().trim();
  let message = $("#input-message").val().trim();
  let organization = $("#input-organization").val().trim();
  let organization_type = $("#input-organization_type").val().trim();

  // Update edited job posting entry
  frappe.call({
    method: "fosa_connect.www.edit_job.index.edit_job",
    args: {
      "job_id": job_id,
      "job_title": title,
      "qualification": qualification,
      "organization_website": organization_website,
      "start_date": start_date,
      "end_date": end_date,
      "job_category": category,
      "location": location,
      "job_type": type,
      "salary_info": salary,
      "job_description": message,
      "organization": organization,
      "isPublished": isPublished,  // Update 'isPublished' with the new value
      "disabled": disabled,
      "organization_type": organization_type

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

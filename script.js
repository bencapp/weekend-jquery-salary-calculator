// initialize jquery
$(document).ready(onReady);

// declare state variables
let employees = [];

function onReady() {
  //EVENTS: event listeners
  $(document).on("click", "#submit-btn", onSubmit);

  render();
}

// creates a new employee object and renders the page
function onSubmit(evt) {
  // prevent default behavior of submit button
  evt.preventDefault();
  // access input values and place them in a new object
  const newEmployee = {
    firstName: $("#first-input").val(),
    lastName: $("#last-input").val(),
    employeeID: $("#ID-input").val(),
    jobTitle: $("#job-input").val(),
    annualSalary: $("#salary-input").val(),
  };

  console.log(newEmployee);
  // push that object to the employees array
}

// render state changes to the DOM
function render() {}

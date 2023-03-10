// initialize jquery
$(document).ready(onReady);

// declare state variables
let employees = [];
let totalCosts = 0;
let over20K = false;
let oopsMessage = false;

function onReady() {
  //EVENTS: event listeners
  $(document).on("click", "#submit-btn", onAddEmployee);
  $(document).on("click", ".delete-employee", onDeleteEmployee);

  render();
}

// creates a new employee object
function onAddEmployee(evt) {
  // prevent default behavior of submit button
  evt.preventDefault();

  // check if all fields have been filled;
  // if not, render an error message and return
  if (
    !$("#first-input").val() ||
    !$("#last-input").val() ||
    !$("#ID-input").val() ||
    !$("#job-input").val() ||
    !$("#salary-input").val()
  ) {
    // check if the error message is already there
    if (!oopsMessage) {
      //render error message
      oopsMessage = true;
      $("form").after(
        `<p id="error-message">Oops! Fill out all fields to add an employee.</p>`
      );
      // after 2 seconds, remove the message.
      setTimeout(function () {
        $("#error-message").remove();
        oopsMessage = false;
      }, 2000);
    }

    // return so the rest of onAddEmployee does not run
    return;
  }

  // access input values and place them in a new object
  const newEmployee = {
    firstName: $("#first-input").val(),
    lastName: $("#last-input").val(),
    employeeID: $("#ID-input").val(),
    jobTitle: $("#job-input").val(),
    annualSalary: Number($("#salary-input").val()),
  };

  // push that object to the employees array
  employees.push(newEmployee);

  // clear the input fields
  // accessing all input fields and excepting the button using ':' operator
  $("input:not(#submit-btn)").val("");

  // add employee's salary to the total cost
  totalCosts += newEmployee.annualSalary;

  // render the most recently added employee
  renderEmployee(newEmployee);

  renderCosts();
}

function onDeleteEmployee() {
  // update state
  //                     button  <td>     <tr>
  const employeeIndex = $(this).parent().parent().index() - 1;

  // remove employee salary from total cost
  totalCosts -= employees[employeeIndex].annualSalary;

  // remove employee from state array
  employees.splice(employeeIndex, 1);

  // render all employees and the updated cost
  // clearing array here, because I only need to reset the full
  // DOM table when deleting
  $(".employee-line").remove();
  render();
}

// render state changes to the DOM
function render() {
  for (let employee of employees) {
    renderEmployee(employee);
  }
  // render total costs
  renderCosts();
}

// render individual employee to DOM
function renderEmployee(employee) {
  $("#employee-table").append(
    `<tr class="employee-line">
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>${employee.employeeID}</td>
        <td>${employee.jobTitle}</td>
        <td>$${employee.annualSalary.toLocaleString("en-US")}</td>
        <td>        
            <button class='delete-employee'>Delete ????</button>
        </td>
    </tr>`
  );
}

// render total cost to DOM
function renderCosts() {
  // toLocaleString method converts the integer to a string
  // and adds commas
  $("#total-costs").text(
    `Total annual cost: $${totalCosts.toLocaleString("en-US")}`
  );

  // check whether to highlight total cost indicator
  // and add corresponding text
  if (totalCosts > 20000) {
    $("#total-costs").css("background-color", "#ec092f");
    if (!over20K) {
      $("#total-costs").after(`<p id="a-lot-text">That's a lot of money!</p>`);
      over20K = true;
    }
  } else {
    $("#total-costs").css("background-color", "transparent");
    $("#a-lot-text").remove();
    over20K = false;
  }
}

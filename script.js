// initialize jquery
$(document).ready(onReady);

// declare state variables
let employees = [];
let totalCosts = 0;

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
  // button  <td>   <tr>
  const employeeIndex = $(this).parent().parent().index() - 1;

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
            <button class='delete-employee'>Delete 🔴</button>
        </td>
    </tr>`
  );
}

// render total cost to DOM
function renderCosts() {
  // toLocaleString method converts the integer to a string
  // and adds commas
  $("#total-costs").text(`Total costs: $${totalCosts.toLocaleString("en-US")}`);
  if (totalCosts > 20000) {
    $("#total-costs").css("background-color", "#ec092f");
  }
}

// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let inEvent = employee.timeInEvents.find(e => e.date === date);
  let outEvent = employee.timeOutEvents.find(e => e.date === date);
  return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour;
  return parseFloat(wage.toString());
}

function allWagesFor(employee) {
  let eligibleDates = employee.timeInEvents.map(e => e.date);
  let payable = eligibleDates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d), 0);
  return payable;
}

function calculatePayroll(employees) {
  return employees.reduce((m, e) => m + allWagesFor(e), 0);
}

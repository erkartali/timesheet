var config = {
	apiKey: "AIzaSyA2Kgq-Zt9JprHavAmXC6lkG_gQnvvBg-c",
	authDomain: "coding-bootcamp-c2d63.firebaseapp.com",
	databaseURL: "https://coding-bootcamp-c2d63.firebaseio.com",
	projectId: "coding-bootcamp-c2d63",
	storageBucket: "coding-bootcamp-c2d63.appspot.com"
};
firebase.initializeApp(config);

var database = firebase.database();
var employeeCount = 0;

$("#submit-button").on("click", function (event) {
	event.preventDefault();
	var name = $("#employee-name").val();
	var role = $("#role").val();
	var startDate = $("#start-date").val();
	var monthlyRate = $("#monthly-rate").val();

	if (getMonthsWorked(startDate) < 0) {
		alert("Invalid Start Date");
	}
	else {
		database.ref().push({
			name: name,
			role: role,
			startDate: startDate,
			monthlyRate: monthlyRate,
		});
	}
});

database.ref().on("child_added", function (snapshot) {
	employeeCount++;
	var name = snapshot.val().name;
	var role = snapshot.val().role;
	var startDate = snapshot.val().startDate;
	var monthlyRate = snapshot.val().monthlyRate;

	var monthsWorked = getMonthsWorked(startDate);
	var totalBilled = monthsWorked * monthlyRate;

	var newRow = $("<tr>");
	newRow.append("<td>" + employeeCount + "</td>");
	newRow.append("<td>" + name + "</td>");
	newRow.append("<td>" + role + "</td>");
	newRow.append("<td>" + startDate + "</td>");
	newRow.append("<td>" + monthsWorked + "</td>");
	newRow.append("<td>" + monthlyRate + "</td>");
	newRow.append("<td>" + totalBilled + "</td>");
	$("#table-body").append(newRow);
});

function getMonthsWorked(startDate) {
	var todaysDate = moment().format('YYYY-MM-DD');
	var date = moment(startDate)
	return moment(todaysDate).diff(moment(date), 'months');
}

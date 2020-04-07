var config = {
	apiKey: "AIzaSyA2Kgq-Zt9JprHavAmXC6lkG_gQnvvBg-c",
	authDomain: "coding-bootcamp-c2d63.firebaseapp.com",
	databaseURL: "https://coding-bootcamp-c2d63.firebaseio.com",
	projectId: "coding-bootcamp-c2d63",
	storageBucket: "coding-bootcamp-c2d63.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();
var employeeCount = 0;
var tableBody = $("#table-body");
var rows = [];

$("#submit-button").on("click", function (event) {
	event.preventDefault();
	var name = $("#employee-name").val();
	var role = $("#role").val();
	var startDate = $("#start-date").val();
	var monthlyRate = $("#monthly-rate").val();

	if (getMonthsWorked(startDate) < 0) {
		alert("Invalid Start Date");
	} else {
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
	var row = {
		number: employeeCount,
		name: snapshot.val().name,
		role: snapshot.val().role,
		startDate: snapshot.val().startDate,
		monthlyRate: snapshot.val().monthlyRate,
		get monthsWorked() {
			return getMonthsWorked(this.startDate);
		},
		get totalBilled() {
			return this.monthsWorked * this.monthlyRate;
		},
		childKey: snapshot.key,
	};
	rows.push(row);
	displayRow(row);
});

tableBody.on("click", ".delete-button", function () {
	rows = rows.filter((e) => e.childKey !== child);
	database.ref().child(child).remove();
	tableBody.empty();
	for (row of rows) {
		displayRow(row);
	}
	deleteRow($(this).attr("data-key"));
});

function displayRow(row) {
	var newRow = $("<tr>");
	var deleteButton = $("<button>");
	deleteButton.attr("class", "delete-button");
	deleteButton.text("delete");
	newRow.append("<td>" + row.employeeCount + "</td>");
	newRow.append("<td>" + row.name + "</td>");
	newRow.append("<td>" + row.role + "</td>");
	newRow.append("<td>" + row.startDate + "</td>");
	newRow.append("<td>" + row.monthsWorked + "</td>");
	newRow.append("<td>" + row.monthlyRate + "</td>");
	newRow.append("<td>" + row.totalBilled + "</td>");
	newRow.append(deleteButton);
	tableBody.append(newRow);
}

function getMonthsWorked(startDate) {
	var todaysDate = moment().format("YYYY-MM-DD");
	var date = moment(startDate);
	return moment(todaysDate).diff(moment(date), "months");
}

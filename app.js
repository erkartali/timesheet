var config = {
	apiKey: "AIzaSyAxrrDGwvJPDmTwqNk9cAgD0L1Z8BtuHEE",
	authDomain: "bootcamp-4087e.firebaseapp.com",
	databaseURL: "https://bootcamp-4087e.firebaseio.com",
	projectId: "bootcamp-4087e",
	storageBucket: "bootcamp-4087e.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function (event) {
	event.preventDefault();
	var name = $("#employee-name").val();
	var role = $("#role").val();
	var startDate = $("#start-date").val();
	var monthlyRate = $("#monthly-rate").val();

	database.ref().push({
		name: name,
		role: role,
		startDate: startDate,
		monthlyRate: monthlyRate,
	});
});

database.ref().on("child_added", function (snapshot) {
	var name = snapshot.val().name;
	var role = snapshot.val().role;
	var startDate = snapshot.val().startDate;
	var monthlyRate = snapshot.val().monthlyRate;

	var monthsWorked = getMonthsWorked(startDate);
	var totalBilled = monthsWorked * monthlyRate;

	var newRow = $("<tr>");
	newRow.append("<td>" + "#" + "</td>");
	newRow.append("<td>" + name + "</td>");
	newRow.append("<td>" + role + "</td>");
	newRow.append("<td>" + startDate + "</td>");
	newRow.append("<td>" + monthlyRate + "</td>");
	$("#table-body").append(newRow);
});

function getMonthsWorked(startDate) {
	console.log(startDate);
	var today = new Date();
	console.log(today - startDate);
}

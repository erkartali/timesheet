$("#submit-button").on("click", function (event) {
	event.preventDefault();
	var name = $("#employee-name").val();
	var role = $("#role").val();
	var startDate = $("#start-date").val();
	var monthlyRate = $("#monthly-rate").val();

	var newRow = $("<tr>");
	newRow.append("<td>" + "#" + "</td>");
	newRow.append("<td>" + name + "</td>");
	newRow.append("<td>" + role + "</td>");
	newRow.append("<td>" + startDate + "</td>");
	newRow.append("<td>" + monthlyRate + "</td>");
	$("#table-body").append(newRow);
});

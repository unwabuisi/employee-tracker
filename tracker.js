$(document).ready(function() {

// ============================= INITIALIZE DATABASE ===========
var config = {
    apiKey: "AIzaSyDdbEyWETbKB6kUqfXYW4yk5jLYoMD2lcM",
    authDomain: "ermtracker-98931.firebaseapp.com",
    databaseURL: "https://ermtracker-98931.firebaseio.com",
    projectId: "ermtracker-98931",
    storageBucket: "",
    messagingSenderId: "1042958961053"
  };
firebase.initializeApp(config);


// ============================= VARIABLES ===========
var database = firebase.database();



// ============================= FUNCTIONS ===========

    $("#submitBtn").on("click", function(event) {
        event.preventDefault();

        var employeeName = $("#employeeName").val().trim();
        var employeeRole = $("#employeeRole").val().trim();
        var startDate = $("#startDate").val().trim();
        var monthlyRate = parseInt($("#monthlyRate").val().trim());

        // console.log(employeeName);
        // console.log(employeeRole);
        // console.log(startDate);
        // console.log(monthlyRate);
        writeToDB(employeeName,employeeRole,startDate,monthlyRate);
        $("#employeeForm")[0].reset();
    });


    function writeToDB(name,role,startDate,rate) {
        database.ref("/employees").push({
            employeeName:name,
            employeeRole:role,
            startDate:startDate,
            monthlyRate:rate,
            dateAdded:firebase.database.ServerValue.TIMESTAMP

        });
    }


    function displayEmployees() {

        database.ref().on('value', function(snapshot) {
            var employees = snapshot.child('employees').toJSON();

            //Firebase creates a dynamic string for each new record (dynamicValue)
            for (var dynamicValue in employees) {

                var name = employees[dynamicValue].employeeName;
                var role = employees[dynamicValue].employeeRole;
                var rate = employees[dynamicValue].monthlyRate;
                var startDate = employees[dynamicValue].startDate;
                var dateAdded = employees[dynamicValue].dateAdded;
                // console.log(name +" "+ role +" "+ rate +" "+ startDate);

            }
        });



        database.ref('employees').on('child_added', function (snapshot, prevChildKey) {
            var name = snapshot.val().employeeName;
            var role = snapshot.val().employeeRole;
            var startDate = snapshot.val().startDate;
            var rate = snapshot.val().monthlyRate;

            $("#employeeTable > tbody").append(
                "<tr><td>" +name +"</td>" +
                "<td>" +role +"</td>" +
                "<td>" +startDate +"</td>" +
                "<td>" + "N/A" +"</td>" +
                "<td>" +rate +"</td>" +
                "<td>" +"N/A" +"</td></tr>"
            );
        });


    }


// ============================= MAIN PROCESSES ===========
displayEmployees();



});

// need to add firebase configuration  
  	var config = {
    apiKey: "AIzaSyAqlsMtdDvXiw2qnpTxeHLZ8GeT8be4KgE",
    authDomain: "traindb-81f24.firebaseapp.com",
    databaseURL: "https://traindb-81f24.firebaseio.com",
    projectId: "traindb-81f24",
    storageBucket: "traindb-81f24.appspot.com",
    messagingSenderId: "165084756606"
  };

  // Initialize Firebase
 	firebase.initializeApp(config);

  // Create a variable to reference the database
	var database = firebase.database();

	//button click event
	$('#add-train').on("click",function(event){
	  event.preventDefault();

	//capture user input
	var trainName = "";
	var destination = "";
	var time = 0;
	var frequency = 0;

	trainName = $('#trainName-input').val().trim();
	destination = $('#destination-input').val().trim();
	time = moment($('#time-input').val(),["h:mm A "]).format("HH:mm");
	frequency = $('#iteration-input').val().trim();

	//prevents input fields are not empty
	console.log(trainName);
	console.log(destination);
	console.log(time);
	console.log(frequency);

	if(trainName != "" && destination !="" && time != "" && frequency != "") {
		console.log("test");
		//this should have an array of objects not sure how to set it up
		//push data into DB
		database.ref('train-data').push({
			trainName: trainName,
			destination: destination,
			time: time,
			frequency:frequency

		});
		
	}
	return false;
	// Clears all of the text-boxes
	$("#trainName-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#iteration-input").val("");
	
	
});
	//the main** shoould process user input 
	//code for setting values in the db
	//var well = $('#trainInfo').append('<tr>');
	database.ref('train-data').on('child_added', function (snapshot) {
	//console.log(snapshot.val().trainName);
	
	// should update the variable with data from the database 
	var name = snapshot.val().trainName;
	var destination = snapshot.val().destination;
	var times = snapshot.val().time;
	var frequency = snapshot.val().frequency;
	
	//momentjs  NOT WORKING
// moment.js methods for time calls and calculations. lines 57 to 65 were accomplished with Tenor's assistance. I didn't update the current time. It looks like "Minutes Away" may be larger than the frequency interval :(
  var firstTrainTime = snapshot.val().time;
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); // creates a moment object of current date and time and storing it in a variable whenever the user click the submit button

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");

	//add data into table 
	var tr = $('<tr>');
	//table data
	var n = $('<td>');
	var d = $('<td>');
	var f = $('<td>');
	var next = $('<td>');
	var away = $('<td>');
    
	n.append(name);
	d.append(destination);
	f.append(frequency);
	away.append(formatNextArrival);
	next.append(minutesAway);
	
	//https://stackoverflow.com/questions/2160890/how-do-you-append-rows-to-a-table-using-jquery
	//$('#myTable tbody').append('<tr class="child"><td>blahblah</td></tr>');
	var x = tr.append(n).append(d).append(f).append(away).append(next);
	
	$('tbody').append(x);
	
	}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


	/*
	var firstTrain = moment(times,"HH:mm A");

	var currentTime = moment();

	var nextTrain = moment().diff(moment.unix(times), "minutes");
	console.log("time difference ",timeDiff);
	var tStart = moment(snapshot.val().times, 'hh:mm A'); 
	console.log("start time: ", tStart);
	var currentTime = moment();
	console.log("Current Time", currentTime);

	var timeDiff = moment().diff(moment.unix(times), "minutes");
	console.log("time difference ",timeDiff); 

	var firstTrain = moment(snapshot.val().time, 'hh:mm A').subtract(1,"years");
	console.log(firstTrain);

	var minAway = frequency -(moment().diff(moment.unix(firstTrain),"minutes") % frequency);	
	console.log("minAway: ", minAway);

	var  nextTrain = (moment(moment().add(minAway, "minutes")).format("hh:mm A"));
	console.log("Next Train: ",nextTrain);
	*/
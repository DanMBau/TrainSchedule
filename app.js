
var config = {
    apiKey: "AIzaSyChPbXl7la6a_jJ5LZuNwFZv2dyAxywq3k",
    authDomain: "new1-9432f.firebaseapp.com",
    databaseURL: "https://new1-9432f.firebaseio.com",
    projectId: "new1-9432f",
    storageBucket: "new1-9432f.appspot.com",
    messagingSenderId: "807197139156"
  };
  firebase.initializeApp(config);
  
  var trainData = firebase.database();
  
  $("#add-train-btn").on("click", function() {
  
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(1,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();
  
    var newTrain = {
  
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    trainData.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
  
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
  
  });
  
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
        console.log('childSnapshot1 ' + childSnapshot.val());
  
        var dataName = childSnapshot.val().name;
        var dataDestination = childSnapshot.val().destination;
        var dataFrequency = childSnapshot.val().frequency;
        var dataFirstTrain = childSnapshot.val().firstTrain;

        var timeRemaining = moment().diff(moment.unix(dataFirstTrain),"minutes")%dataFrequency;
        var dataMinutes = dataFrequency - timeRemaining;
        var dataArrival = moment().add(dataMinutes,"m").format("hh:mm A");




// ??? arrival time first train, minutes away



        var timeArrival = dataFirstTrain.split(':');
        console.log('arrival time' + timeArrival)
        console.log('dataName' + dataName)
        
  

        $("#train-table > tbody").append("<tr><td>" + dataName + "</td><td>" + dataDestination + "</td><td>" +
            dataFrequency + "</td><td>" + dataArrival + "</td><td>" + dataMinutes + "</td></tr>");
  
  
  
    })
        
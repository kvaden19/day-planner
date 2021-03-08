// Define DOM variables
var currentDayP = $("#currentDay");
var timeBlockContainer = $(".container");

// Define other stuff
var dayOfWeek = moment().format('dddd'); // home page
var date = moment().format('MMMM Do');

// Display stuff
currentDayP.text("Today is " + dayOfWeek + ", " + date);

for (i=8; i<19; i++) {
    var hour = moment({ hour:i, minute:0 }).format('h:mm A'); // Docs - Parse - Object
    var htmlContent = "<p>" + hour + "</p>";
    timeBlockContainer.append(htmlContent);
}





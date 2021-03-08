// Define DOM variables
var currentDayP = $("#currentDay");

// Define other stuff
var dayOfWeek = moment().format('dddd');
var date = moment().format('MMMM Do');

currentDayP.text("Today is " + dayOfWeek + ", " + date);


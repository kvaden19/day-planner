// Define DOM variables
var currentDayP = $("#currentDay");
var timeBlockContainer = $(".container");
// var saveButtons = $(".saveBtn");
var saveButtons = document.getElementsByClassName("saveBtn"); // Why doesn't JQuery work?
var button_indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Define Moment variables
var dayOfWeek = moment().format('dddd');
var date = moment().format('MMMM Do');

// Load array of Timeblock objects from local storage
var timeblocks = JSON.parse(localStorage.getItem("timeblocks"));

// If the array does not exist, do this...
// Define a Timeblock object constructor and a Timeblock representing each business hour
if (timeblocks === null) {
    timeblocks = [];

    class Timeblock {
    constructor(hour, text) {
        this.hour = hour;
        this.text = text;
        }
    }

    for (var hour = 8; hour < 19; hour++) {
    var timeblock = new Timeblock(hour, "");
    timeblocks.push(timeblock);
    }
}

// Display current date in jumbotron
currentDayP.text(`Today is ${dayOfWeek}, ${date}`);

// Display timeblocks for each business hour
for (var i=8; i<19; i++) {
    var hour = moment({ hour:i, minute:0 });
    var hourFormatted = hour.format('h:mm A');
    var timeComparison = "";

    // Add conditional formatting for timeblock color
    if (moment().isSame(hour, 'hour')) {
        timeComparison = "present"
    } else if (moment().isAfter(hour, 'hour')) {
        timeComparison = "past"
    } else {
        timeComparison = "future"
    }

    // If applicable, get saved text for that hour from local storage
    var savedText = timeblocks[i-8].text;

    var timeBlockHTML = "";
    timeBlockHTML = `
        <div class="row">
        <div class="hour col-1">${hourFormatted}</div>
        <div class="${timeComparison} col-10"><textarea>${savedText}</textarea></div>
        <div class="saveBtn col-1"><i data-hour="${i}" class="fas fa-save fa-2x"></i></div>
        </div>`;
    timeBlockContainer.append(timeBlockHTML);
}

for (index in button_indices) {
    // saveButtons[key].click(function() { // Why doesn't JQuery work?
    saveButtons[index].addEventListener("click", e => { 
        var timeblockIndex = e.target.dataset.hour - 8;
        var savedText = e.target.parentNode.parentNode.childNodes[3].childNodes[0].value;
        timeblocks[timeblockIndex].text = savedText;
        localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
    });
}

// TODO: How do I tie the Timeblock array to the current day? Don't want it to persist on the next day...
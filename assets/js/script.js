// Define DOM variables
var currentDayP = $("#currentDay");
var timeBlockContainer = $(".container");
var timeBlockHTML = "";
var timeComparison = "";

// Define Moment variables
var dayOfWeek = moment().format('dddd');
var date = moment().format('MMMM Do');

// Add dynamic HTML elements
currentDayP.text(`Today is ${dayOfWeek}, ${date}`);

for (i=8; i<19; i++) {
    var hour = moment({ hour:i, minute:0 });
    var hourFormatted = hour.format('h:mm A');

    if (moment().isSame(hour, 'hour')) {
        timeComparison = "present"
    } else if (moment().isAfter(hour, 'hour')) {
        timeComparison = "past"
    } else {
        timeComparison = "future"
    }

    timeBlockHTML = `
        <div class="row">
        <div class="hour col-1">${hourFormatted}</div>
        <div class="${timeComparison} col-10"><textarea></textarea></div>
        <div class="saveBtn col-1"><i class="fas fa-save fa-2x"></i></div>
        </div>`;
    timeBlockContainer.append(timeBlockHTML);
}
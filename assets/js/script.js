//-1 is not a valid value for either hour or day, so current time will never match
//This means checkDay and checkHour will always update properly on first load.
var currentHour = -1;
var currentDay = -1;


$(function () {
  //Event listener for save button. Navigate from button to text field
  $("#calendar").on("click", ".saveBtn", function (event) {
    var timeblock = $(event.target).parents(".time-block");
    localStorage.setItem(timeblock.attr("id"), timeblock.children(".description").val());
  });
  //Wrapper for the functions that update the timeblock formatting and set the current day.
  //Both update according to time, so makes sense to put them in same interval.
  clockedUpdates();
  var clock = setInterval(clockedUpdates, 1000);

  for (var i = 9; i <= 17; i++) {
    $(`#hour-${i}`).children().eq(1).text(localStorage.getItem(`hour-${i}`));
  }
});

//Wrapper for the functions that update the timeblock formatting and set the current day.
//Both update according to time, so makes sense to put them in same interval.
function clockedUpdates() {
  checkDay();
  checkTime();
}

//If day has changed, update the day.
function checkDay() {
  day = dayjs().format("D");
  if (currentDay == day) {
    return;
  }
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));
  currentDay = day;
}

//If hour has changed, update all time blocks
function checkTime() {
  hour = dayjs().format("HH");
  if (currentHour == hour) {
    return;
  }
  var block;
  for (var i = 9; i <= 17; i++) {
    block = $(`#hour-${i}`);
    if (i < hour) {
      block.attr("class", "row time-block past");
    }
    else if (i == hour) {
      block.attr("class", "row time-block present");
    }
    else {
      block.attr("class", "row time-block future");
    }
  }
  currentHour = hour;
}

//Pseudo Code

//display date via DayJS
//Need to add more hours/timeblocks for input in html
//Functionality for the save button
//Add event listener, need to be able to store and remove user input from local storage
//Add incremented function to track time of day and color code timeblocks accordingly. 
//  loop through time blocks and update color according to current time.
//  use string formatting for iteration. update color is just changing past-present-future classes. 
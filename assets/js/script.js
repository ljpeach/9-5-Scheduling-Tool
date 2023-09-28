// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  $("#calendar").on("click", ".fa-save", function (event) {
    // console.log($(event.target).parent().parent().attr("id"));
    // console.log($(event.target).parent().parent().children().eq(1).val());
    localStorage.setItem($(event.target).parent().parent().attr("id"), $(event.target).parent().parent().children().eq(1).val())
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var currentHour = -1; //will always format on first run
  checkTime(currentHour);
  var clock = setInterval(checkTime, 1000, currentHour);
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 9; i <= 17; i++) {
    console.log(localStorage.getItem(`hour-${i}`));
    $(`#hour-${i}`).children().eq(1).text(localStorage.getItem(`hour-${i}`));
  }
  //
  // TODO: Add code to display the current date in the header of the page.
});

function checkTime(currentHour) {
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
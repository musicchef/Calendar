// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {

  // Select the save buttons using the class selector '.saveBtn'
  let saveBtn = $('.saveBtn');

  // Select the reset button using the ID selector '#resetBtn'
  let resetBtn = $('#resetBtn'); 

  // Load any saved events from local storage for each hour (9 am to 5 pm)
  // using a for loop from hour 9 to 17 (5 pm is represented as 17 in 24-hour format).
  for (let hour = 9; hour <= 17; hour++) {

    // Create the time block ID for each hour, e.g., 'hour-9', 'hour-10', etc.
    let timeBlockId = `hour-${hour}`;

    // Select the textarea element within the corresponding time block using the ID.
    let descriptionElement = $(`#${timeBlockId} .description`);

    // Retrieve any saved event for this hour from local storage using the time block ID.
    let savedEvent = localStorage.getItem(timeBlockId);

    // If there's a saved event, set the value of the textarea to display it.
    if (savedEvent) {
      descriptionElement.val(savedEvent);
    }
  }

  // Display the current date in the header using the dayjs library.
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // Update time block colors based on the current hour using a function.
  function updateHourColors() {

    // Get the current hour in 24-hour format using the dayjs library.
    let currentHour = dayjs().hour();

    // Loop through each time block using the jQuery each() function.
    $('.time-block').each(function () {

      // Extract the hour from the time block ID, e.g., 'hour-9' -> 9.
      let hour = parseInt($(this).attr('id').split('-')[1]);

      // Compare the hour with the current hour to set appropriate classes
      // for past, present, and future time blocks.
      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Call the function to update time block colors.
  updateHourColors();

  // Event listener for save buttons
  saveBtn.on('click', function () {

    // Get the ID of the parent time block containing the clicked save button.
    let timeBlockId = $(this).parent().attr('id');

    // Get the user input (description) from the sibling textarea element.
    let userInput = $(this).siblings('.description').val();

    // Store the user input (description) in local storage with the time block ID as the key.
    localStorage.setItem(timeBlockId, userInput);
  });

  // Event listener for reset button
  resetBtn.on('click', function () {

    // Clear user inputs from all the textareas by setting their value to an empty string.
    $('.description').val('');

    // Remove all saved events from local storage by calling the clear() method.
    localStorage.clear();
  });
});

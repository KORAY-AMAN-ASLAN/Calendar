'use strict';

/**
 * Calendar App
 * Author: Aman Arabzadeh
 * Date: 2023-07-03
 */

// Get the elements in global variables 
const currentMonthElement = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const calendarBody = document.getElementById('calendarBody');
const currentDayDateElement = document.getElementById('currentDayDate');

// Define the months of the year in one array
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Define the days of the week inb one array
const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Get the current date
const currentDate = new Date();
let currentDisplayedMonth = currentDate.getMonth(); // Track the displayed month separately
let currentDisplayedYear = currentDate.getFullYear(); // Track the displayed year separately

/**
 * Display the current month and year
 */
const displayCurrentMonth = () => {
  currentMonthElement.textContent = `${months[currentDisplayedMonth]} ${currentDisplayedYear}`;
};

/**
 * Generate the calendar dates
 */
const generateCalendar = () => {
  calendarBody.innerHTML = '';

  // Get the first day of the month
  const firstDay = new Date(currentDisplayedYear, currentDisplayedMonth, 1).getDay();

  // Get the number of days in the month
  const lastDay = new Date(currentDisplayedYear, currentDisplayedMonth + 1, 0).getDate();

  let date = 1;

  // Generate the calendar rows and cells
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        // Add empty cells for the days before the first day of the month
        const cell = document.createElement('td');
        row.appendChild(cell);
      } else if (date > lastDay) {
        // Stop generating cells if we've reached the last day of the month
        break;
      } else {
        // Create a cell for the current date
        const cell = document.createElement('td');
        cell.textContent = date;

        if (
          currentDate.getDate() === date &&
          currentDate.getMonth() === currentDisplayedMonth &&
          currentDate.getFullYear() === currentDisplayedYear
        ) {
          cell.classList.add('current-day');
        }

        row.appendChild(cell);
        date++;
      }
    }

    calendarBody.appendChild(row);
  }
};

/**
 * Update the current day, date, and time at the bottom
 */
const updateCurrentDayDate = () => {
  const currentDay = daysOfWeek[currentDate.getDay()];
  const currentDateFormatted = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = getCurrentTimeFormatted();
  currentDayDateElement.textContent = `Today is ${currentDay}, ${currentDateFormatted}, and the time is: ${currentTime}`;
};

/**
 * Get the current time formatted with leading zeros
 */
const getCurrentTimeFormatted = () => {
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Update the time every second
setInterval(() => {
  currentDate.setTime(Date.now());
  updateCurrentDayDate();
}, 1000);

// Event listeners for previous and next month buttons
prevMonthBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentDisplayedMonth--; // Decrement the displayed month

  if (currentDisplayedMonth < 0) {
    currentDisplayedMonth = 11; // Wrap around to December
    currentDisplayedYear--; // Decrement the year
  }

  displayCurrentMonth();
  generateCalendar();
  updateCurrentDayDate();
});

nextMonthBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentDisplayedMonth++; // Increment the displayed month

  if (currentDisplayedMonth > 11) {
    currentDisplayedMonth = 0; // Wrap around to January
    currentDisplayedYear++; // Increment the year
  }

  displayCurrentMonth();
  generateCalendar();
  updateCurrentDayDate();
});

// Initial display
displayCurrentMonth();
generateCalendar();
updateCurrentDayDate();

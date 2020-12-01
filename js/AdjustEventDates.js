'use strict';

/*
*   AdjustEventDates: Finds months in the calendar and converts them to an
*   abbreviated version
*/

function AdjustEventDates() {
  console.log('Adjust events date loaded...');
  
  const abbreviations = {};
  abbreviations['January'] = 'Jan';
  abbreviations['February'] = 'Feb';
  abbreviations['March'] = 'Mar';
  abbreviations['April'] = 'Apr';
  // Skip May, since three lttters already
  abbreviations['June'] = 'Jun';
  abbreviations['July'] = 'Jul';
  abbreviations['August'] = 'Aug';
  abbreviations['September'] = 'Sep';
  abbreviations['October'] = 'Oct';
  abbreviations['November'] = 'Nov';
  abbreviations['December'] = 'Dec';
  
  var dates = document.querySelectorAll('.daterange');
  
  for (let i = 0; i < dates.length; i += 1) {
    let date = dates[i]; 
    for(let abbrev in abbreviations) {
      if (date.textContent.indexOf(abbrev) >= 0) {
        date.textContent = date.textContent.replaceAll(abbrev, abbreviations[abbrev]);
      }
    }
  }
}

window.addEventListener('load', AdjustEventDates);
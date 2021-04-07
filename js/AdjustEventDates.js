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

function UpdateHeadingsOnMyCalendar () {
  console.log('Adjust heading level for My Calendar');

  var main = document.querySelector('main');
  var h2 = main.querySelector('h2.aitg-calendar');
  var caption = main.querySelector('caption.my-calendar-month');
  var h3Single = main.querySelector('h3.mc-single');

  if (h2) {
    if (caption) {
      h2.textContent = caption.textContent;
      h2.setAttribute('aria-hidden', 'false');
    }
    if (h3Single) {
      var h2Single = document.createElement('h2');
      h2Single.textContent = h3Single.textContent;
      h3Single.parentNode.insertBefore(h3Single, h2Single);
      h3Single.style.display = 'none';
    }
  }
}

window.addEventListener('load', AdjustEventDates);
window.addEventListener('load', UpdateHeadingsOnMyCalendar);

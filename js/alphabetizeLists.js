'use strict';
/*
*  AlphabetizeLists: A utility to reorder element in a list alphabetically.
*/

function AlphabetizeLists(listSelector) {
  let listNodes = document.querySelectorAll(listSelector);

  for(let i = 0; i < listNodes.length; i++) {
    let listNode = listNodes[i];

    let listitemNodes = listNode.querySelectorAll('li');
    let items = [];

    if (listitemNodes.length > 1 ) {
      for (let j = 0 ; j < listitemNodes.length; j++) {
        let listitemNode = listitemNodes[j];

        let item = {};
        item.name = listitemNode.textContent.trim();
        item.nameCompare = item.name.toLowerCase();
        item.href = '';

        let linkNode = listitemNode.querySelector('a');

        if (linkNode) {
          item.href = linkNode.href;
          item.className = linkNode.className;
        }

        items.push(item);
      }

    }

    items.sort(function(a, b) {
        return a.nameCompare > b.nameCompare;
    });

    let html = '';

    items.forEach(item => {
      html += '<li>';
      if (item.href) {
        html += '<a href="' + item.href + '"' + ' class="' + item.className +'">' + item.name + '</a>';
      } else {
        html += item.name;
      }
      html += '</li>';
    });

    listNode.innerHTML = html;
  }
}

/*
*   IIFE that initializes All tags order by count object
*/
(function () {
  AlphabetizeLists('.post-tags.count');
})();

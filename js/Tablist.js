'use strict';
/*
*  Tablist: A Tablist object instantiates an ARIA Tablist, Tab and Tabpanel pattern.
*/
class Tablist {
  constructor(tablistNode) {
    this.tablistNode = tablistNode;

    this.tabNodes = this.tablistNode.querySelectorAll('[role="tab"]');
    this.tabpanelNodes = [];

    console.log('[tabNodes]: ' + this.tabNodes.length);
    for (let i = 0; i < this.tabNodes.length; i++) {
      let tabNode = this.tabNodes[i];
      console.log('[tabNode]: ' + i + ' ' + tabNode.textContent);

      if (i === 0) {
        tabNode.tabindex = 0;
        tabNode.setAttribute('aria-selected', 'true');
      } else {
        tabNode.tabindex = -1;
        tabNode.setAttribute('aria-selected', 'false');
      }

      let id = tabNode.getAttribute('aria-controls');
      let tabpanelNode = document.getElementById(id);
      if (tabpanelNode) {
        this.tabpanelNodes.push(tabpanelNode);
      }
      else {
        console.log('[ERROR]: ' + ' could not find "' + id + '" for tabpanel.');
      }
    }
    this.updatePanels();
  }

  updatePanels() {
    for (let i = 0; i < this.tabNodes.length; i++) {
      let tabNode = this.tabNodes[i];
      if (tabNode.getAttribute('aria-selected') === 'true') {
        this.tabpanelNodes[i].style.display = 'block';
      } else {
        this.tabpanelNodes[i].style.display = 'none';
      }
    }
  }


}

/*
*   IIFE that initializes DisclosureMenu object
*/
(function () {
  new Tablist(document.querySelector('[role="tablist"]'));
})();

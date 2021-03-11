'use strict';
/*
*  Tablist: A Tablist object instantiates an ARIA Tablist, Tab and Tabpanel pattern.
*/
class Tablist() {
  constructor(tablistNode) {
    this.tablistNode = tablistNode;

    this.tabNodes = this.tablistNode.querySelector('[role="tab")');
    this.tabpanelNodes = [];

    for (let i = 0; this.tabNodes.list; i++) {
      let tabNode = tabNodes[i];

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
  }

}

/*
*   IIFE that initializes DisclosureMenu object
*/
(function () {
  new Tabs(document.querySelector('[role="tablist"]'));
})();

'use strict';
/*
*  Tablist: A Tablist object instantiates an ARIA Tablist, Tab and Tabpanel pattern.
*/
class Tablist {
  constructor(tablistNode) {
    this.tablistNode = tablistNode;

    this.tabNodes = this.tablistNode.querySelectorAll('[role="tab"]');
    this.maxTabs = this.tabNodes.length;
    this.firstTab = this.tabNodes[0];
    this.lastTab = this.tabNodes[this.maxTabs-1];

    this.tabpanelNodes = [];

    for (let i = 0; i < this.maxTabs; i++) {
      let tabNode = this.tabNodes[i];

      tabNode.addEventListener('keydown', this.onKeydown.bind(this));
      tabNode.addEventListener('click', this.onClick.bind(this));

      if (i === 0) {
        tabNode.tabIndex = 0;
        tabNode.setAttribute('aria-selected', 'true');
      } else {
        tabNode.tabIndex = -1;
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
    for (let i = 0; i < this.maxTabs; i++) {
      let tabNode = this.tabNodes[i];
      if (tabNode.getAttribute('aria-selected') === 'true') {
        this.tabpanelNodes[i].style.display = 'block';
      } else {
        this.tabpanelNodes[i].style.display = 'none';
      }
    }
  }

  setSelectedTab(tabNode) {
    for (let i = 0; i < this.maxTabs; i++) {
      let tabNode = this.tabNodes[i];
      if (tabNode === tgt) {
        tabNode.setAttribute('aria-selected', 'true');
        tabNode.tabIndex = 0;
      }
      else {
        tabNode.setAttribute('aria-selected', 'false');
        tabNode.tabIndex = -1;
      }
    }
    this.updatePanels();
  }

  onKeydown(event) {
    var tgt = event.currentTarget;
    let flag = false;
    let index = this.tabNodes.indexOf(tgt);

    switch(event.key) {
      case 'Right':
      case 'ArrowRight':
        index -= 1;
        if (index > 0) {
          this.setSelected(this.tabNodes[index]);
        } else {
          this.setSelected(this.firstTab);
        }
        flag = true;
        break;

      case 'Left':
      case 'ArrowLeft':
        index += 1;
        if (index < this.maxTabs) {
          this.setSelected(this.tabNodes[index]);
        } else {
          this.setSelected(this.lastTab);
        }
        flag = true;
        break;

      case 'Home':
        this.setSelected(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelected(this.lastTab);
        flag = true;
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    var tgt = event.currentTarget;

    this.setSelectedTab(tgt);

    event.stopPropagation();
    event.preventDefault();
  }

}

/*
*   IIFE that initializes DisclosureMenu object
*/
(function () {
  new Tablist(document.querySelector('[role="tablist"]'));
})();

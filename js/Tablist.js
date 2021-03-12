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
        tabpanelNode.tabIndex = 0;
        tabpanelNode.classList.add('hide-tabpanel');
        this.tabpanelNodes.push(tabpanelNode);
      }
      else {
        console.log('[ERROR]: ' + ' could not find "' + id + '" for tabpanel.');
      }
    }
    this.updatePanels();
  }

  getIndexOfTab(tabNode) {
    for (let i = 0; i < this.maxTabs; i++) {
      if (tabNode === this.tabNodes[i]) {
        return i;
      }
    }
    return -1;
  }

  updatePanels() {
    for (let i = 0; i < this.maxTabs; i++) {
      let tabNode = this.tabNodes[i];
      let tabpanelNode = this.tabpanelNodes[i];
      if (tabNode.getAttribute('aria-selected') === 'true') {
        tabpanelNode.classList.remove('hide-tabpanel');
        tabpanelNode.classList.add('show-tabpanel');
        tabpanelNode.style.display = 'block';
      } else {
        tabpanelNode.classList.remove('show-tabpanel');
        tabpanelNode.classList.add('hide-tabpanel');
      }
    }
  }

  setSelectedTab(node) {
    for (let i = 0; i < this.maxTabs; i++) {
      let tabNode = this.tabNodes[i];
      if (tabNode === node) {
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
    let index = this.getIndexOfTab(tgt);

    switch(event.key) {
      case 'Left':
      case 'ArrowLeft':
        index -= 1;
        if (index >= 0) {
          this.setSelectedTab(this.tabNodes[index]);
          this.tabNodes[index].focus();
        } else {
          this.setSelectedTab(this.lastTab);
          this.lastTab.focus();
        }
        flag = true;
        break;

      case 'Right':
      case 'ArrowRight':
        index += 1;
        if (index < this.maxTabs) {
          this.setSelectedTab(this.tabNodes[index]);
          this.tabNodes[index].focus();
        } else {
          this.setSelectedTab(this.firstTab);
          this.firstTab.focus();
        }
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        this.firstTab.focus();
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        this.lastTab.focus();
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
    tgt.focus();

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

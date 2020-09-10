/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Supplemental JS for the disclosure menu keyboard behavior
*/

'use strict';

var DisclosureMenu = function (domNode) {
    this.rootNode = domNode;    

    document.body.addEventListener('mousedown', this.handleBodyCloseMenus.bind(this));
    document.body.addEventListener('focusin', this.handleBodyCloseMenus.bind(this));
    
    this.containerNodes = this.rootNode.querySelectorAll('ul.menu > li.menu-item-has-children');

    this.buttonNodes = this.rootNode.querySelectorAll('ul.menu > li.menu-item-has-children > a');

    this.linkNodes = [];

    for (let i = 0; i < this.containerNodes.length; i++) {
        this.containerNodes[i].addEventListener('focusin', this.handleFocusIn.bind(this));
    }

    for (let i = 0; i < this.buttonNodes.length; i++) {
        // Change link role to button role and set href to '#'
        this.buttonNodes[i].setAttribute('role', 'button');
        this.buttonNodes[i].setAttribute('aria-expanded', 'false');
        this.buttonNodes[i].setAttribute('href', '#');
        this.buttonNodes[i].setAttribute('aria-controls', 'banner-menu-' + i);
    
        this.buttonNodes[i].addEventListener('click', this.handleButtonClick.bind(this));
    }

    this.menuNodes = this.rootNode.querySelectorAll('ul.menu > li.menu-item-has-children > ul.sub-menu');

    for (let i = 0; i < this.menuNodes.length; i++) {
        this.menuNodes[i].id = 'banner-menu-' + i;
        this.linkNodes[i] = this.menuNodes[i].querySelectorAll('ul.sub-menu a');

        for (let j = 0; j < this.linkNodes[i].length; j++) {
            var linkNode = this.linkNodes[i][j];
        }
    }

};

DisclosureMenu.prototype.getMenuNode = function (node) {
    var menuNode = node.nextElementSibling;
    
    if (menuNode && menuNode.classList.contains('sub-menu') && menuNode.id) {
        return menuNode;
    }
    
    menuNode = node.parentNode.parentNode.parentNode.parentNode;
    
    if (menuNode && menuNode.classList.contains('sub-menu') && menuNode.id) {
        return menuNode;
    }

    menuNode = node.parentNode.parentNode;
    
    if (menuNode && menuNode.classList.contains('sub-menu') && menuNode.id) {
        return menuNode;
    }
    
    return false;
};

DisclosureMenu.prototype.openMenu = function (menuNode) {
    menuNode.style.display = 'block';
};

DisclosureMenu.prototype.closeMenus = function (menuNode) {
    if (typeof menuNode !== 'object') {
        menuNode = null;
    }

    for (var i = 0; i < this.menuNodes.length; i++) {
        if (menuNode !== this.menuNodes[i]) {
            this.menuNodes[i].style.display = 'none';
            this.buttonNodes[i].setAttribute('aria-expanded', 'false');
        }
    }
};

DisclosureMenu.prototype.toggleExpand = function (buttonNode, menuNode) {
    var isOpen = buttonNode.getAttribute('aria-expanded') === 'true';
  
    if (isOpen) {
        this.closeMenus();
    }
    else {
        this.closeMenus(menuNode); 
        buttonNode.setAttribute('aria-expanded', 'true');
        this.openMenu(menuNode); 
    }
};

/* Event Handlers */
DisclosureMenu.prototype.handleButtonClick = function (event) {
    var menuButton = event.target;
    var menuNode = this.getMenuNode(menuButton);
    this.toggleExpand(menuButton, menuNode);
    menuButton.focus();
};

DisclosureMenu.prototype.handleFocusIn = function (event) {
    var node = event.target;
    var menuNode = this.getMenuNode(node);
    this.closeMenus(menuNode);
};

DisclosureMenu.prototype.handleBodyCloseMenus = function (event) {
    if (!this.rootNode.contains(event.target)) {
        this.closeMenus();
    }  
};

/* Initialize Disclosure Menus */

window.addEventListener('load', function (event) {
  console.log('init banner menu...');
  var menus = document.querySelectorAll('.banner-menu');
  for (var i = 0; i < menus.length; i++) {
    new DisclosureMenu(menus[i]);
  }
}, false);

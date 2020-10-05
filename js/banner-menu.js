/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Supplemental JS for the disclosure menu keyboard behavior
 */
'use strict';

var DisclosureMenu = function(domNode) {
  this.rootNode = domNode;
  this.enhancedKeyboardSupport = true;

  document.body.addEventListener('mousedown', this.handleBodyCloseMenus.bind(this));
  document.body.addEventListener('focusin', this.handleBodyCloseMenus.bind(this));

  var containerNodes = this.rootNode.querySelectorAll('ul.menu > li');
  
  // If a SPAN is found in the banner menu, it is because WP uses a SPAN
  // when the URL of the page matches the link for the menu item.
  // Change SPAN to an A element, use the page URL as the HREF attribute
  // mark the link using ARIA-CURRENT=PAGE
  
  var spanNode = this.rootNode.querySelector('span');
  
  if (spanNode) {
    var parentNode = spanNode.parentNode;
    var linkNode = document.createElement('a');
    linkNode.textContent = spanNode.textContent;
    linkNode.href = location.href;
    linkNode.setAttribute('aria-current', 'page');
    parentNode.replaceChild(linkNode, spanNode);
  }

  // If the banner-name link is the current link, mark it with ARIA-CURRENT=PAGE

  var bannerNameLinkNode = document.querySelector('.banner-name a');

  if (bannerNameLinkNode) {
    var url1 = location.href.trim().toLowerCase();
    var url2 = bannerNameLinkNode.href.trim().toLowerCase();
    if (url1 === url2) {
      bannerNameLinkNode.setAttribute('aria-current', 'page');
    }
  }

  this.menuContainers = [];
  
  this.firstMenuContainer = false;
  this.lastMenuContainer = false;

  var i = 0;

  for (var j = 0; j < containerNodes.length; j++) {
    var containerNode = containerNodes[j];
    var buttonNode = containerNode.querySelector('a');
    if (!buttonNode) {
        continue;
    }

    this.menuContainers[i] = {};
    this.menuContainers[i].hasSubMenu = false;
    this.menuContainers[i].containerNode = containerNode;
    this.menuContainers[i].buttonNode = buttonNode;

    if (!this.firstMenuContainer) {
        this.firstMenuContainer = this.menuContainers[0];
    }
    this.lastMenuContainer = this.menuContainers[i];
    
    buttonNode.addEventListener('click', this.handleButtonClick.bind(this));
    buttonNode.addEventListener('keydown', this.handleButtonKeydown.bind(this));

    // Updated properties and add event handlers
    containerNode.addEventListener('focusin', this.handleFocusIn.bind(this));

    if (containerNode.classList.contains('menu-item-has-children')) {
      this.menuContainers[i].hasSubMenu = true;

      var menuNode = containerNode.querySelector('.sub-menu');
      var linkNodes = containerNode.querySelectorAll('.sub-menu a');
      
      // Updated properties and add event handlers
      containerNode.addEventListener('focusin', this.handleFocusIn.bind(this));

      // Change link role to button role and set href to '#'
      buttonNode.setAttribute('role', 'button');
      buttonNode.setAttribute('aria-expanded', 'false');
      buttonNode.setAttribute('href', '#');
      buttonNode.setAttribute('aria-controls', 'banner-menu-' + i);

      for (var k = 0; k < linkNodes.length; k++) {
          linkNodes[k].addEventListener('keydown', this.handleLinkKeydown.bind(this));
      }

      menuNode.id = 'banner-menu-' + i;

      this.menuContainers[i].menuNode = menuNode;
      this.menuContainers[i].linkNodes = linkNodes;
      this.menuContainers[i].firstLinkNode = linkNodes[0];
      this.menuContainers[i].lastLinkNode = linkNodes[linkNodes.length - 1];
    }
    i++;
  }
};

DisclosureMenu.prototype.getMenuContainer = function(node) {
  for (var i = 0; i < this.menuContainers.length; i++) {
    var c = this.menuContainers[i];

    if (c.containerNode.contains(node)) {
      return c;
    }
  }
  return false;
};

DisclosureMenu.prototype.openMenu = function(menuNode) {
  menuNode.style.display = 'block';
};

DisclosureMenu.prototype.closeMenus = function(menuNode) {
  if (typeof menuNode !== 'object') {
    menuNode = null;
  }

  for (var i = 0; i < this.menuContainers.length; i++) {
    var mc = this.menuContainers[i];
    if (mc.hasSubMenu && mc.menuNode !== menuNode) {
      mc.menuNode.style.display = 'none';
      mc.buttonNode.setAttribute('aria-expanded', 'false');
    }
  }
};

DisclosureMenu.prototype.toggleExpand = function(menuContainer) {
  var isOpen = menuContainer.buttonNode.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    this.closeMenus();
  } else {
    this.closeMenus(menuContainer.menuNode);
    menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
    this.openMenu(menuContainer.menuNode);
  }
};

DisclosureMenu.prototype.expand = function(menuContainer) {
  this.closeMenus(menuContainer.menuNode);
  menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
  this.openMenu(menuContainer.menuNode);
};

DisclosureMenu.prototype.getLinkIndex = function(menuContainer, link) {
  for (var i = 0; i < menuContainer.linkNodes.length; i++) {
    if (link === menuContainer.linkNodes[i]) {
      return i;
    }
  }
  return 0;
};

DisclosureMenu.prototype.setFocusToNextMenu = function(menuContainer) {
  if (menuContainer != this.lastMenuContainer) {
    var index = this.menuContainers.indexOf(menuContainer);
    this.closeMenus();
    this.menuContainers[index+1].buttonNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToPreviousMenu = function(menuContainer) {
  if (menuContainer != this.firstMenuContainer) {
    var index = this.menuContainers.indexOf(menuContainer);
    this.closeMenus();
    this.menuContainers[index-1].buttonNode.focus();
  }
};


DisclosureMenu.prototype.setFocusToFirstLink = function(menuContainer, currentLink) {
  if (menuContainer.hasSubMenu) {
    menuContainer.firstLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToLastLink = function(menuContainer, currentLink) {
  if (menuContainer.hasSubMenu) {
    menuContainer.lastLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToNextLink = function(menuContainer, currentLink) {
  if (currentLink === menuContainer.lastLinkNode) {
    menuContainer.firstLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.linkNodes[index+1].focus();        
  }
};

DisclosureMenu.prototype.setFocusToPreviousLink = function(menuContainer, currentLink) {
  if (currentLink === menuContainer.firstLinkNode) {
    menuContainer.lastLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.linkNodes[index-1].focus();        
  }
};


/* Event Handlers */
DisclosureMenu.prototype.handleButtonClick = function(event) {
  var mc = this.getMenuContainer(event.target);
  this.toggleExpand(mc);
  mc.buttonNode.focus();
  event.stopPropagation();
  event.preventDefault();
};

DisclosureMenu.prototype.handleButtonKeydown = function(event) {
  var mc = this.getMenuContainer(event.target);
  var tgt = event.currentTarget,
    key = event.key,
    flag = false;

  switch (key) {
    case 'Esc':
    case 'Escape':
      this.closeMenus();
      flag = true;
      break;

    case 'Up':
    case 'ArrowUp':
      this.expand(mc);
      this.setFocusToLastLink(mc, tgt);
      flag = true;
      break;

    case 'Down':
    case 'ArrowDown':
      this.expand(mc);
      this.setFocusToFirstLink(mc, tgt);
      flag = true;
      break;

    case 'Left':
    case 'ArrowLeft':
      this.setFocusToPreviousMenu(mc);
      flag = true;
      break;

    case 'Right':
    case 'ArrowRight':
      this.setFocusToNextMenu(mc);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

DisclosureMenu.prototype.handleLinkKeydown = function(event) {
  var mc = this.getMenuContainer(event.target);
  var tgt = event.currentTarget,
    key = event.key,
    flag = false;

  switch (key) {
    case 'Esc':
    case 'Escape':
      this.closeMenus();
      mc.buttonNode.focus();
      flag = true;
      break;

    case 'Up':
    case 'ArrowUp':
      this.setFocusToPreviousLink(mc, tgt);
      flag = true;
      break;

    case 'Down':
    case 'ArrowDown':
      this.setFocusToNextLink(mc, tgt);
      flag = true;
      break;

    case 'Left':
    case 'ArrowLeft':
      this.setFocusToPreviousMenu(mc);
      flag = true;
      break;

    case 'Right':
    case 'ArrowRight':
      this.setFocusToNextMenu(mc);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};


DisclosureMenu.prototype.handleFocusIn = function(event) {
  var mc = this.getMenuContainer(event.target);
  this.closeMenus(mc.menuNode);
};

DisclosureMenu.prototype.handleBodyCloseMenus = function(event) {
  if (!this.rootNode.contains(event.target)) {
    this.closeMenus();
  }
};

/* Initialize Disclosure Menus */

window.addEventListener('load', function(event) {
  console.log('init banner menu...');
  var menus = document.querySelectorAll('.banner-menu');
  for (var i = 0; i < menus.length; i++) {
    new DisclosureMenu(menus[i]);
  }
}, false);
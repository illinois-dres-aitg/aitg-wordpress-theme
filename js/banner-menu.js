/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   Supplemental JS for the disclosure menu keyboard behavior
 */
'use strict';

function DisclosureMenu (domNode) {

  function convertSpansToLinks() {
    var spanNodes = domNode.querySelectorAll('span');
    
    for ( var i = 0; i < spanNodes.length; i += 1) {
      var parentNode = spanNodes[i].parentNode;
      var linkNode = document.createElement('a');
      linkNode.textContent = spanNodes[i].textContent;
      linkNode.href = location.href;
      linkNode.setAttribute('aria-current', 'page');
      parentNode.replaceChild(linkNode, spanNodes[i]);
    }
  }
  
  function setAriaCurrentOnBannerNameLink () {
    var bannerNameLinkNode = document.querySelector('.banner-name a');
    
    if (bannerNameLinkNode) {
      var url1 = location.href.trim().toLowerCase();
      var url2 = bannerNameLinkNode.href.trim().toLowerCase();
      if (url1 === url2) {
        bannerNameLinkNode.setAttribute('aria-current', 'page');
      }
    }
  }
  
  function createContainerObjectForMenubarItem ( disclosureMenuObj, containerNode, menubarLinkNode ) {
    var mc = {}
    mc.hasSubMenu = false;
    mc.containerNode = containerNode;
    // The menubar link will most often act like a button, 
    // so use the property name buttonNode
    mc.buttonNode = menubarLinkNode;

    linkNode.addEventListener('click', disclosureMenuObj.handleButtonClick.bind(disclosureMenuObj));
    linkNode.addEventListener('keydown', disclosureMenuObj.handleButtonKeydown.bind(disclosureMenuObj));

    // Check to see if menubar link has a sub menu links
    if (containerNode.classList.contains('menu-item-has-children')) {

      mc.hasSubMenu = true;

      // When menubar link has sub-menu links:
      //   Change link to use the button role
      //   Set href to '#' so it does not behave like a link
      //   Add aria-expanded and aria-controls for ARIA menu button pattern
      menubarLinkNode.setAttribute('role', 'button');
      menubarLinkNode.setAttribute('aria-expanded', 'false');
      menubarLinkNode.setAttribute('href', '#');
      menubarLinkNode.setAttribute('aria-controls', 'banner-menu-' + i);

      var subMenuNode = containerNode.querySelector('.sub-menu');
      var subMenuLinkNodes = containerNode.querySelectorAll('.sub-menu a');
      
      for (var i = 0; i < subMenuLinkNodes.length; i++) {
          subMenuLinkNodes[i].addEventListener('keydown', disclosureMenuObj.handleSubMenuLinkKeydown.bind(disclosureMenuObj));
      }

      subMenuNode.id = 'banner-sub-menu-' + i;

      // Add information to menu container object
      mc.subMenuNode = subMenuNode;
      mc.subMenuLinkNodes = subMenuLinkNodes;
      mc.firstSubMenuLinkNode = subMenuLinkNodes[0];
      mc.lastSubMenuLinkNode = subMenuLinkNodes[subMenuLinkNodes.length - 1];
    }

    return mc;
  }
    
  this.rootNode = domNode;

  // Event handlers to close the pull down menus when focus or mouse event is 
  // not on a menu item 
  document.body.addEventListener('mousedown', this.handleBodyCloseMenus.bind(this));
  document.body.addEventListener('focusin', this.handleBodyCloseMenus.bind(this));

  // If a SPAN is found in the banner menu, it is because WP changes links to
  // SPANs when the URL of the link page matches page URL.
  // Change the SPAN to an A element, use the page URL as the HREF attribute
  // mark the link using ARIA-CURRENT=PAGE
  convertSpansToLinks();

  // If the banner-name link is the current page link, 
  // mark it with ARIA-CURRENT=PAGE
  setAriaCurrentOnBannerNameLink();

  this.menuContainers = [];
  var containerNodes = this.rootNode.querySelectorAll('ul.menu > li');
  
  for (var i = 0; i < containerNodes.length; i++) {
    var containerNode = containerNodes[i];

    // When a menu item gets focus, close any other sub menus
    containerNode.addEventListener('focusin', this.handleFocusIn.bind(this));
    
    var linkNode = containerNode.querySelector('a');
    // If for some reason there is no link in the container,
    // do not create a menuContiner object for this item
    if (!linkNode) {
        continue;
    }

    // Create object that references each menubar link and any associated 
    // sub menu links.
    // For menubar links that do not have submenus the hasSubMenu property of 
    // the object is set to false
    this.menuContainers.push(createContainerObjectForMenubarItem( this, containerNode, linkNode ));
  }

  this.firstMenuContainer = this.menuContainers[0];
  this.lastMenuContainer = this.menuContainers[this.menuContainers.length - 1];
  
}

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

DisclosureMenu.prototype.closeMenus = function(subMenuNode) {
  if (typeof subMenuNode !== 'object') {
    subMenuNode = null;
  }

  for (var i = 0; i < this.menuContainers.length; i++) {
    var mc = this.menuContainers[i];
    // If sub menu is defined don't close that menu
    if (mc.hasSubMenu && mc.subMenuNode !== subMenuNode) {
      mc.subMenuNode.style.display = 'none';
      mc.buttonNode.setAttribute('aria-expanded', 'false');
    }
  }
};

DisclosureMenu.prototype.toggleExpand = function(menuContainer) {
  if (menuContainer.hasSubMenu) {
    var isOpen = menuContainer.buttonNode.getAttribute('aria-expanded') === 'true';
    
    if (isOpen) {
      this.closeMenus();
    } else {
      this.closeMenus(menuContainer.subMenuNode);
      menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
      this.openMenu(menuContainer.subMenuNode);
    }
  }    
};

DisclosureMenu.prototype.expand = function(menuContainer) {
  this.closeMenus(menuContainer.subMenuNode);
  menuContainer.buttonNode.setAttribute('aria-expanded', 'true');
  this.openMenu(menuContainer.subMenuNode);
};

DisclosureMenu.prototype.getLinkIndex = function(menuContainer, link) {
  for (var i = 0; i < menuContainer.subMenuLinkNodes.length; i++) {
    if (link === menuContainer.subMenuLinkNodes[i]) {
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
    menuContainer.firstSubMenuLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToLastLink = function(menuContainer, currentLink) {
  if (menuContainer.hasSubMenu) {
    menuContainer.lastSubMenuLinkNode.focus();
  }
};

DisclosureMenu.prototype.setFocusToNextLink = function(menuContainer, currentLink) {
  if (currentLink === menuContainer.lastSubMenuLinkNode) {
    menuContainer.firstSubMenuLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.subMenuLinkNodes[index+1].focus();        
  }
};

DisclosureMenu.prototype.setFocusToPreviousLink = function(menuContainer, currentLink) {
  if (currentLink === menuContainer.firstSubMenuLinkNode) {
    menuContainer.lastSubMenuLinkNode.focus();
  }
  else {
    var index = this.getLinkIndex(menuContainer, currentLink);
    menuContainer.subMenuLinkNodes[index-1].focus();        
  }
};

/* Event Handlers */
DisclosureMenu.prototype.handleButtonClick = function(event) {
  var mc = this.getMenuContainer(event.target);
  if (mc.hasSubMenu) {
    this.toggleExpand(mc);
    mc.buttonNode.focus();
    event.stopPropagation();
    event.preventDefault();
  }
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

DisclosureMenu.prototype.handleSubMenuLinkKeydown = function(event) {
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
  this.closeMenus(mc.subMenuNode);
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

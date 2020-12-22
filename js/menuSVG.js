/*
*   createMenuToggleSVG: Return an SVG image of a chevron pointing downward
*   that can be rotated 180 degrees to a chevron pointing upward. Its intended
*   use is as a menu button icon that indicates what the resulting action will
*   be when the button is activated: it will open the submenu when pointing
*   downward, or close the submenu when pointing upward.
*/
function createMenuToggleSVG () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'width', '11px');
  svg1.setAttributeNS(null, 'height', '11px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 133 79');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('menu open/close icon');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let g2 = document.createElementNS(xmlns, 'g');
  g2.setAttributeNS(null, 'transform', 'translate(-50.000000, -122.000000)');
  g2.setAttributeNS(null, 'fill', 'currentColor');
  g1.appendChild(g2);

  let g3 = document.createElementNS(xmlns, 'g');
  g3.setAttributeNS(null, 'transform', 'translate(45.000000, 64.000000)');
  g2.appendChild(g3);

  let path1 = document.createElementNS(xmlns, 'path');
  path1.setAttributeNS(null, 'd', 'M33.5,21 C40.4035594,21 46,26.5964406 46,33.5 L46,96.5 L109,96.5 C115.903559,96.5 121.5,102.096441 121.5,109 C121.5,115.903559 115.903559,121.5 109,121.5 L34,121.5 C30.4210403,121.5 27.1933842,119.995891 24.9146718,117.585313 C22.5041093,115.306616 21,112.07896 21,108.5 L21,33.5 C21,26.5964406 26.5964406,21 33.5,21 Z');
  path1.setAttributeNS(null, 'transform', 'translate(71.250000, 71.250000) rotate(-45.000000) translate(-71.250000, -71.250000) ');
  g3.appendChild(path1);

  return svg1;
}

/*
*   createMenuLinkSVG: Return an SVG image of a chevron pointing rightward.
*   Its intended use is as a menu button icon that indicates what the
*   resulting action will be when the button is activated: it serves as a
*   direct link to another page within the website.
*/
function createMenuLinkSVG () {
  const xmlns = 'http://www.w3.org/2000/svg';

  let svg1 = document.createElementNS(xmlns, 'svg');
  svg1.setAttributeNS(null, 'aria-hidden', 'true');
  svg1.setAttributeNS(null, 'width', '6px');
  svg1.setAttributeNS(null, 'height', '11px');
  svg1.setAttributeNS(null, 'viewBox', '0 0 79 133');
  svg1.setAttributeNS(null, 'version', '1.1');

  let title1 = document.createElementNS(xmlns, 'title');
  {
    let textNode = document.createTextNode('menu link icon');
    title1.appendChild(textNode);
  }
  svg1.appendChild(title1);

  let g1 = document.createElementNS(xmlns, 'g');
  g1.setAttributeNS(null, 'stroke', 'none');
  g1.setAttributeNS(null, 'stroke-width', '1');
  g1.setAttributeNS(null, 'fill', 'none');
  g1.setAttributeNS(null, 'fill-rule', 'evenodd');
  svg1.appendChild(g1);

  let g2 = document.createElementNS(xmlns, 'g');
  g2.setAttributeNS(null, 'transform', 'translate(-293.000000, -69.000000)');
  g2.setAttributeNS(null, 'fill', 'currentColor');
  g1.appendChild(g2);

  let g3 = document.createElementNS(xmlns, 'g');
  g3.setAttributeNS(null, 'transform', 'translate(235.000000, 64.000000)');
  g2.appendChild(g3);

  let path1 = document.createElementNS(xmlns, 'path');
  path1.setAttributeNS(null, 'd', 'M33.5,21 C40.4035594,21 46,26.5964406 46,33.5 L46,96.5 L109,96.5 C115.903559,96.5 121.5,102.096441 121.5,109 C121.5,115.903559 115.903559,121.5 109,121.5 L34,121.5 C30.4210403,121.5 27.1933842,119.995891 24.9146718,117.585313 C22.5041093,115.306616 21,112.07896 21,108.5 L21,33.5 C21,26.5964406 26.5964406,21 33.5,21 Z');
  path1.setAttributeNS(null, 'transform', 'translate(71.250000, 71.250000) rotate(-135.000000) translate(-71.250000, -71.250000) ');
  g3.appendChild(path1);

  return svg1;
}

/*
*   IIFE that adds the appropriate SVG image to each of the top-level menu buttons
*/
(function () {
  let menuButtonElements;

  const buttonHasChildrenSelector = '.banner-menu ul.menu > li.menu-item.menu-item-has-children > a';
  const buttonNoChildrenSelector = '.banner-menu ul.menu > li.menu-item:not(.menu-item-has-children) > a';

  menuButtonElements = document.querySelectorAll(buttonHasChildrenSelector);
  for (let i = 0; i < menuButtonElements.length; i++) {
    menuButtonElements[i].appendChild(createMenuToggleSVG());
  }

  menuButtonElements = document.querySelectorAll(buttonNoChildrenSelector);
  for (let i = 0; i < menuButtonElements.length; i++) {
    menuButtonElements[i].appendChild(createMenuLinkSVG());
  }
})();

'use strict';
var nav = document.querySelector('#nav');
var navClose = document.querySelector('#nav-close');
var navOpen = document.querySelector('#nav-open');
var overlay = document.querySelector('#overlay');

/**
 * Creates and HTML node of the given tagName, with the given id and classes.
 * @param options.tagName {string} The type of node that should be created.
 * @param options.id {string} Optional. The id that should be assigned to the node.
 * @param options.classes {array} Optional. A list of classes that should be assigned to the node.
 * @param options.children {array} Optional. A list of nodes that should be appended to the node.
 */
var createNode = function (options) {
	var node = document.createElement(options.tagName);
	if (options.id) {
		node.setAttribute('id', options.id);
	}
	if (options.classes) {
		options.classes.forEach(function (className) {
			node.classList.add(className);
		});
	}
	if (options.children && options.children.length > 0) {
		options.children.forEach(function (child) {
			node.appendChild(child);
		});
	}
	return node;
};

/**
 * Creates an unordered list node with the given options, see createNode(options).
 */
var createUnorderedList = function (options) {
	options.tagName = 'ul';
	var ul = createNode(options);
	return ul;
};

/**
 * Creates a list item node with the given options, see createNode(options).
 */
var createListItem = function (options) {
	options.tagName = 'li';
	var li = createNode(options);
	return li;
};

/**
 * Creates an anchor node with the given url, text and other options, see createNode(options).
 * @param options.url {string} the url to be set to the anchor href attribute.
 * @param options.label {string} the text that will be appended to the anchor.
 */
var createAnchor = function (options) {
	options.tagName = 'a';
	var anchor = createNode(options);

	anchor.setAttribute('href', options.url);
	anchor.appendChild(document.createTextNode(options.label));
	return anchor;
};

/**
 * Creates an unordered list of items, each with a single anchor inside, based on the list of items passed.
 * @param items {array} A list of items, each containing a url and a label.
 */
var createNavListFromItems = function (items) {
	var listItems = [];

	items.forEach(function (item) {
		var anchor = createAnchor(item);
		var listItem = createListItem({children: [anchor]});
		listItems.push(listItem);
	});

	var ul = createUnorderedList({children: listItems});
	return ul;
};

/**
 * Deactivates all the primary nav links.
 */
var deactivatePrimaryNavs = function () {
	var primaryNavs = Array.prototype.slice.call(document.querySelectorAll('ul.primary > li'));
	primaryNavs.forEach(function (nav) {
		if (nav.classList.contains('active')) {
			nav.classList.remove('active');
		}
	});
};

/**
 * Shows the overlay
 */
var showOverlay = function () {
	overlay.style.display = 'block';
};

/**
 * Hides the overlay
 */
var hideOverlay = function () {
	overlay.style.display = 'none';
};

/**
 * Opens the navigation bar.
 */
var openNavbar = function () {
	if (nav.classList) {
		nav.classList.add('active');
	} else {
		nav.className += 'active';
	}
	showOverlay();
};

/**
 * Closes the navigation bar and hides the overlay.
 */
var closeNavbar = function () {
	if (nav.classList && nav.classList.contains('active')) {
		nav.classList.remove('active');
	}
	hideOverlay();
};

/**
 * Reverts the navbar to its initial state.
 */
var resetNav = function () {
	deactivatePrimaryNavs();
	closeNavbar();
};
overlay.addEventListener('click', resetNav);

/**
 * Handles the click in the navbar links:
 * If it is a secondary nav, simply reset the nav and allow navigation.
 * If it is a primary nav, and item is a dropdown button, prevent navigation and instead open the dropdown content.
 * If it is a primary nav, and item is not a dropdown button, reset the nav and let navigation procceed.
 * @param {object} event The event that represents the click.
 */
var clickNavLink = function (event) {
	var parentLi = this.parentNode;
	var isPrimaryNavLink = parentLi.parentNode.classList.contains('primary');

	if (isPrimaryNavLink) {
		var isActive = parentLi.classList.contains('active');

		// If item is a dropdown button, prevent navigation and instead open the dropdown content.
		if (this.classList.contains('dropdown-btn')) {
			showOverlay();
			deactivatePrimaryNavs();
			event.preventDefault();
			if (!isActive) {
				parentLi.classList.add('active');
			}
		} else {
			resetNav();
		}
	} else {
		resetNav();
	}
};

/**
 * Attaches the necessary events to their respective nodes.
 */
var addNavbarListeners = function () {
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav ul li a'));

	navOpen.addEventListener('click', openNavbar);
	navClose.addEventListener('click', closeNavbar);
	navLinks.forEach(function (navLink) {
		navLink.addEventListener('click', clickNavLink);
	});
};

/**
 * Builds the unordered list node that represents the navigation bar.
 * @param items {array} a list of items that represent the structure that the navigation bar should have.
 */
var buildNavbarItemList = function (items) {
	var listItems = [];

	items.forEach(function (item) {

		var isDropdown = item.items && item.items.length > 0;
		var anchorOptions = {
			url: item.url,
			label: item.label,
			classes: isDropdown ? ['dropdown-btn'] : null
		};
		var anchor = createAnchor(anchorOptions);

		var listItemOptions = {
			children: [anchor]
		};

		if (isDropdown) {
			var secondaryUl = createNavListFromItems(item.items);
			secondaryUl.classList.add('secondary');
			listItemOptions.children.push(secondaryUl);
		}

		var listItem = createListItem(listItemOptions);
		listItems.push(listItem);
	});

	var unorderedList = createUnorderedList({children: listItems});
	return unorderedList;
};

/**
 * Constructs the navbar based on the given json structure.
 */
var buildNavbar = function (json) {
	var unorderedList = buildNavbarItemList(json.items);
	unorderedList.classList.add('primary');

	var nav = document.querySelector('#nav');
	nav.appendChild(unorderedList);

	addNavbarListeners();
};

/**
 * Creates an ajax request for the nav json, parses it as a json object and calls the given callback with the json object.
 */
var getNavJSON = function (callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState === 4 && xhttp.status === 200) {
			callback(JSON.parse(xhttp.responseText));
		}
	};
	xhttp.open('GET', 'api/nav.json', true);
	xhttp.send();
};

/**
 * Starts the initialization of the navbar.
 */
var initializeNavbar = function () {
	getNavJSON(buildNavbar);
};

/**
 * Calls the given callback once the document has been fully loaded.
 */
var ready = function (callback) {
	if (document.readyState !== 'loading'){
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
};

ready(initializeNavbar);

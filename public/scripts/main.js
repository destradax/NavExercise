'use strict';
var nav = document.querySelector('nav');
var navOpen = document.querySelector('#nav-open');
var navClose = document.querySelector('#nav-close');
var overlay = document.querySelector('#overlay');
var primaryNavs = Array.prototype.slice.call(document.querySelectorAll('ul.primary > li'));
var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav ul li a'));

/**
 * Constructs the navbar based on the given json structure.
 */
var initializeNavbar = function (json) {
	json.items.forEach(function (item) {
		console.log(item.label + ': ' + item.url);
	});
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
getNavJSON(initializeNavbar);

/**
 * Deactivates all the primary nav links.
 */
var deactivatePrimaryNavs = function () {
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
var initializeListeners = function () {
	navOpen.addEventListener('click', openNavbar);
	navClose.addEventListener('click', closeNavbar);
	overlay.addEventListener('click', closeNavbar);
	navLinks.forEach(function (navLink) {
		navLink.addEventListener('click', clickNavLink);
	});
};
initializeListeners();

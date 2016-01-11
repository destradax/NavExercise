'use strict';
var navOpen = document.querySelector('#nav-open');
var navClose = document.querySelector('#nav-close');
var overlay = document.querySelector('#overlay');
var primaryNavLinks = Array.prototype.slice.call(document.querySelectorAll('nav ul li a'));

/**
 * Opens the navigation bar.
 */
var openNavbar = function () {
	var nav = document.querySelector('nav');
	if (nav.classList) {
		nav.classList.add('active');
	} else {
		nav.className += 'active';
	}
};
navOpen.addEventListener('click', openNavbar);

/**
 * Closes the navigation bar.
 */
var closeNavbar = function () {
	var nav = document.querySelector('nav');
	if (nav.classList && nav.classList.contains('active')) {
		nav.classList.remove('active');
	}
};
navClose.addEventListener('click', closeNavbar);
overlay.addEventListener('click', closeNavbar);

/**
 * Handles the click in the navbar items:
 * Remove the active class from other navbar items.
 * If item is a dropdown button, prevent navigation and instead open the dropdown content
 * If item is not a dropdown button, let navigation procceed.
 * @param {object} event The event that represents the click.
 */
var clickNavLink = function (event) {
	var li = this.parentNode;
	var isActive = li.classList.contains('active');
	var siblings = Array.prototype.slice.call(li.parentNode.children);
	siblings.forEach(function (dropdown) {
		if (dropdown.classList.contains('active')) {
			dropdown.classList.remove('active');
		}
	});

	if (this.classList.contains('dropdown-btn')) {
		event.preventDefault();
		if (!isActive) {
			li.classList.add('active');
		}
	}
};
primaryNavLinks.forEach(function (navLink) {
	navLink.addEventListener('click', clickNavLink);
});

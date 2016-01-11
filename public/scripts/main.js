'use strict';
var navOpen = document.querySelector('#nav-open');
var navClose = document.querySelector('#nav-close');
var overlay = document.querySelector('#overlay');

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

'use strict';
var navOpen = document.querySelector('#nav-open');
var navClose = document.querySelector('#nav-close');

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

/**
 * Closes the navigation bar.
 */
var closeNavbar = function () {
	var nav = document.querySelector('nav');
	if (nav.classList && nav.classList.contains('active')) {
		nav.classList.remove('active');
	}
};

navOpen.addEventListener('click', openNavbar);

navClose.addEventListener('click', closeNavbar);

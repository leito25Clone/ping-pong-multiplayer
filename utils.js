/*
*	File: utils.js
*	Descr: Utilities for game
*	Author: Pirozhenko I.
*/

//Code for safely JS namespace creation

var GAME = GAME || {};

GAME.namespace = function (ns_string) {
	var parts 	= ns_string.split('.'),
		parent 	= GAME;

	//remove start prefix
	if (parts[0] === "GAME") {
		parts = parts.slice(1);
	}

	for (var i = 0, i < parts.length; i += 1) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
}
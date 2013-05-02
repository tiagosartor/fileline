/*jslint browser: true */
/*globals console */

var fileline = window.fileline || {};

fileline = {
	addFile: function (i) {
		'use strict';
		var t = fileline,
			ext = t.urls[i].match(/\.js$|\.css$/)[0],
			head = document.getElementsByTagName('head')[0],
			next = i + 1,
			file;
		switch (ext) {
		case '.js':
			file = document.createElement('script');
			file.src = t.urls[i];
			file.type = 'text/javascript';
			file.id = 'fileline-js-' + i;
			file.async = true;
			break;
		case '.css':
			file = document.createElement('link');
			file.href = t.urls[i];
			file.type = 'text/css';
			file.id = 'fileline-css-' + i;
			file.rel = 'stylesheet';
			break;
		}

		// Run this if the loading was okay
		file.onload = function (a) {
			if (console) {
				console.log('Loaded: ' + ((a.target.src !== undefined) ? a.target.src : a.target.href));
			}
			switch (i) {
			// If it's the last script, then move on
			case t.urlsLen:
				if (t.success) {
					t.success();
				}
				break;
			// Keep adding if it's not the last
			default:
				t.addFile(next);
			}
		};

		// Run this if there's an error
		file.onerror = function (a) {
			if (console) {
				console.log('Error: ' + ((a.target.src !== undefined) ? a.target.src : a.target.href));
			}
			if (t.error) {
				t.error();
			}
		};

		// Add script to the header
		head.appendChild(file);
	},

	init: function (url, success, error) {
		'use strict';
		var t = fileline;

		// Define array of URLs in the order you want them to be loaded
		t.urls = url.split(/\s?,\s?/g);
		t.urlsLen = t.urls.length - 1;

		// Define callbacks
		if (success) {
			t.success = success;
		} else {
			t.success = null;
		}
		if (error) {
			t.error = error;
		} else {
			t.error = null;
		}

		// Add and load
		t.addFile(0);
	}
};

var fl = fileline.init;
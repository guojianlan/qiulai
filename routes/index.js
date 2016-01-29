var routesController = require('../routesController').static;
var fs =require('fs');
var Path = require('path');
module.exports = function(server) {
	server.route([{
		method: 'GET',
		path: '/{htmlPath*}',
		handler: routesController.htmlFile
	}, {
		method: 'GET',
		path: '/static/css/{cssPath*}',
		handler: routesController.cssFile
	}, {
		method: 'GET',
		path: '/static/images/{imgPath*}',
		handler: routesController.imgFile
	}, {
		method: 'GET',
		path: '/static/js/{jsPath*}',
		handler: routesController.jsFile
	},{
		method: 'GET',
		path: '/static/fonts/{fontsPath*}',
		handler: routesController.fontFile
	},{
		method: 'GET',
		path: '/dist/{filePath*}',
		handler: routesController.packFile
	},{
        method: 'GET',
        path: '/plug/{filePath*}',
        handler: routesController.plugpackFile
    }]);
}
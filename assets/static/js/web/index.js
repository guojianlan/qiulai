var $=window.$=window.jQuery=require('jquery');
var _ =require('lodash');
var React = require('react');
var index = require('./modules/indexModule/index.js');
var indexModule = module.exports = function(){
    (function(){
        indexModule.init();
    })();
    return indexModule;
};
indexModule.init = function(){
    new index();
};
indexModule();
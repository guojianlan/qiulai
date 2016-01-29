/**
 * Created by zhenhong on 15/10/23.
 */
/**
 * Created by zhenhong on 15/8/24.
 */
var _ = require('lodash');
var one = require('html!./index.html');

var indexModule = module.exports = function() {
   console.log('init');
    console.log($);
    this.init();
};
var p = indexModule.prototype;
p.init=function(){
    this.renderTemplate();
};
p.renderTemplate=function(){
    var self = this;
    var compiledOne = _.template(one);
    console.log(compiledOne());
    this.bindEvent();
};
p.bindEvent = function() {
    var self = this;
    console.log('bindEvent');
};



define([
    'jquery'

], function ($) {

    'use strict';

    $.browser = {};
    $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    return {
        isDevice: function() {
            return $.browser.device;
        }
    }
});


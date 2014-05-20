define([
    'jquery'

], function ($) {
    'use strict';

    var uirouter = function () {

        return {

            init: function (callback) {

                var me = this;

                $(document).keydown(function (e) {
                    //down//
                    if (e.keyCode === 40) {
                        callback.call(me, uirouter.down());
                    }
                    //up//
                    if (e.keyCode === 38) {
                        callback.call(me, uirouter.up());
                    }
                });

                $('#container').mousewheel(function (event) {

                    //console.log(event.deltaX, event.deltaY, event.deltaFactor);

                    var deltaY = event.deltaY;
                    if (deltaY < 0) {
                        callback.call(me, uirouter.down());

                    } else {
                        callback.call(me, uirouter.up());
                    }

                });

            },

            up: function () {
                return -1;
            },

            down: function () {
                return +1
            }

        };

    }();

    return uirouter;
});

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/navbullet.html'

], function ($, _, Backbone, bulletTemplate) {
    'use strict';

    var navbarView = Backbone.View.extend({

        el: $('#nav-bullets'),

        // The DOM events specific to an item.
        events: {

        },

        initialize: function () {
            var me = this;

            this.listenTo(this.model, 'change', this.render);
            this.model.set({"counter": 4});
        },

        // Re-render
        render: function () {
            var me = this,
                counter,
                out = "",
                currentPage,
                arr = [], idx = 1;

            counter = (this.model.get("counter") || 0);
            currentPage = (this.model.get("id") || 1);
            for (; idx < counter + 1; idx++) {
                arr.push(idx);
            }
            _.each(arr, function (elt) {
                var compiledTemplate = _.template(bulletTemplate);

                currentPage = parseInt(currentPage);
                if (currentPage === elt) {
                    out += compiledTemplate({idx: elt, classname: "page active"});

                } else {
                    out += compiledTemplate({idx: elt, classname: "page"});
                }

            }, this);

            $(this.el).html(out);

            return this;
        }
    });

    return navbarView;
});

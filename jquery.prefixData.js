/**
 * Prefix Data
 *
 * Return the value at the prefixed data store for the first element in the set of matched elements. Returned value can
 * be an object based on the attribute values and attributes name structure.
 *
 * @version 0.0.1
 * @link https://github.com/cichy380/prefixData
 * @author Marcin Dobroszek <marcin.dobroszek@gmail.pl>
 * @license The MIT License (MIT)
 *
 * @todo: method need to be getter and setter (now only getter)
 * @todo: chaining (as setter)
 *        to possible: $elem = $(‘.selector’).prefixData(‘mojprefix’, {„prop1”:”val1”, „prop2”:”val2”});
 */
;(function($) {
    /**
     * All available methods.
     * @private
     */
    var methods = {

        /**
         * Set value to specific property of object
         * based on https://stackoverflow.com/a/44271732
         */
        _setValue: function(object, path, value) {
            var way = path.split('-'),
                last = way.pop();

            way.reduce(function (o, k) {
                return o[k] = o[k] || {};
            }, object)[last] = value;
        },

        /**
         * Convert "flat object" with 1-level deep to immersion object
         * based on https://stackoverflow.com/a/44271732
         */
        immersion: function(input) {
            var output = $.extend({}, input); // working on copy of object

            Object.keys(output).forEach(function (key) {
                try {
                    output[key] = JSON.parse(output[key]); // convert JSON-string to object
                }
                catch(err) {}

                if (key.indexOf('-') !== -1) {
                    methods._setValue(output, key, output[key]);
                    delete output[key];
                }
            });

            return output;
        },
    };

    /**
     * .prefixData()
     * @param {string} prefix - prefix text next to data-* attributes
     * @return {object} data from prefixed data-* attributes
     */
    $.fn.prefixData = function(prefix) {
        var data,
            mainData, // from data-prefixname=".."
            deeperData, // from data-prefixname-propery=".."
            attrs;

        if ($.type(prefix) === 'undefined') {
            $.error('Prefix param is required.')
        }

        if ($.type(prefix) !== 'string') {
            $.error('Prefix param has wrong type. It has to be string format.')
        }

        // try to read data from storaged data
        data = this.data(prefix + '--storage');

        if (typeof data === 'undefined') {
            // try to read data from single attribute
            mainData = this.data(prefix);

            // get all data-* attributes with our prefix
            attrs = this.getAttributes('data-' + prefix + '-', true);

            // convert list of attributes datas to object
            deeperData = methods.immersion(attrs);

            data = $.extend(true, {}, mainData, deeperData);

            // save created object with data to "data-prefixname" attribute
            // to speed up reading this data from this element next time
            this.data(prefix + '--storage', data);
        }

        return data;
    };
})(jQuery);


/**
 * Get Attributes
 *
 * Return the list of HTML attributes for the first element in the set of matched elements.
 *
 * @link https://stackoverflow.com/a/5282801
 */
;(function($) {
    $.fn.getAttributes = function(prefix, removePrefix) {
        var attributes = {};

        if (this.length) {
            $.each(this[0].attributes, function(index, attr) {
                var property = attr.name,
                    value = attr.value;

                if (prefix) {
                    if (attr.name.indexOf(prefix) === 0) {
                        property = removePrefix ? property.substring(prefix.length) : property;
                        attributes[ property ] = value;
                    }
                } else {
                    attributes[ property ] = value;
                }
            });
        }
        return attributes;
    };
})(jQuery);

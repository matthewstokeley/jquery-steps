// built with help from the jquery-boilerplate
// https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/How-did-we-get-here%3F


// @todo replace individual checkbox names with array

(function($, window, undefined) {
    $.fn.steps = function(options) {

        // Date now shim
        if (!Date.now) {
            Date.now = function() {
                return new Date().getTime();
            };
        }

        // create the settings object
        // user options override defaults
        var settings = $.extend({
            // The messages array.
            // Included for preloading message objects.
            'events': [{
                handle: 'handle',
                message: 'message'
            }],
            // should the message flash or stayput
            'flash': false,
            // if flashing, how long
            'flashDuration': 1000
        }, options);

        var timestamp = Date.now();

        // the form id
        var formId = "steps-checklist-" + timestamp;

        // will hold the form object
        var $form;

        // assign the jquery context to a variable
        that = this;

        /**
         * Find an object in an array by the key
         * @param  {array} source     the array to search
         * @param  {string} key       the key to search by
         * @param  {string} value     the value of the key for
         * @return {int|bool}         returns index or false
         */
        var findByKey = function(source, key, value) {
            for (var i = 0; i < source.length; i++) {
                if (source[i][key] === value) {
                    return i;
                }
            }
            return null;
        };


        /**
         * Give the event object the `complete` property and mark it as false
         * @param  {[type]} eventObject [description]
         * @return {[type]}             [description]
         */
        var markDefault = function(eventObject) {
            eventObject["complete"] = false;
            return eventObject;
        };

        /**
         * Creates a hidden form
         * @return {null}
         */
        var createForm = function() {
            $('body').append('<form id="' + formId + '" class="steps-checklist" style="display:none" data-uid="' + timestamp + '"></form>');
            return $('#' + formId);
        };

        /**
         * Adds checkboxes to the form
         */
        var addToForm = function(handle) {
            document.getElementById('#' + formId).innerHTML = '<input>';
            $('#' + formId).append('<input type="checkbox" id="steps-checklist-' + timestamp + '--' + handle + '" class="steps-checkbox steps-checklist-' + timestamp + '--' + handle + '">');
            return $('#' + 'steps-checklist-' + timestamp + '--' + handle);
        };

        var isFormComplete = function() {
            var length = getFormLength();
            var completed = findCompleted();
            if (length == completed) {
                return true;
            }
            return false;
        };

        var findCompleted = function() {
            var count = 0;
            if ($form.length > 0) {
                $('#steps-checklist-' + timestamp + ' :input').each(function() {
                    var $input = $(this);
                    if (($input).is(":checked")) {
                        count++;
                    }
                });
                return count;
            }
            return false;
        };

        var findFormLength = function() {
            if ($form.length > 0) {
                return $form.children().length;
            }
            return false;
        };

        var findFormPercentComplete = function() {
            var length = getFormLength();
            var completed = findCompleted();
            return parseInt(completed, 10) / parseInt(length, 10);

        };

        var init = function() {
            $form = createForm();
            settings.events.forEach(function(value, index, array) {
                markDefault(value);
                addToForm(value.handle);
            });
        };

        init();

        // Publicly available methods
        return {
            /**
             * Register messages
             * @param  {string} handle  the name of the message
             * @param  {string} message the message
             * @return {object}         the message object
             */
            register: function(eventObject) {

                // push the message object into the array.
                if (eventObject.hasOwnProperty('handle')) {
                    settings.events.push(eventObject);
                }

                addToForm(eventObject.handle);

                // return the message object
                return eventObject;

            },

            /**
             * Remove messages from list
             * @param  {string} handle the name of the message
             * @return {bool|object}   returns message or false if not found
             */
            deregister: function(handle) {

                // find the message object
                var index = findByKey(settings.events, 'handle', handle);

                // fail gracefully
                if (index === null) {
                    return false;
                }

                // remove the message object from the
                var event = settings.events.splice(index, 1);

                // remove dom element from form
                $input = $('#steps-checklist-' + timestamp + '--' + handle);
                if ($input.length > 0) {
                    $input.remove();
                }

                // return the removed message
                return event;

            },
            /**
             * Mark an event completed
             * @param  {string} handle  the name of the message
             * @return {bool}
             * // @TODO create queue
             */
            markComplete: function(handle) {

                // find the event
                var index = findByKey(settings.events, 'handle', handle);

                // fail gracefully
                if (index === null) {
                    return false;
                }

                // assignment
                var eventObject = settings.events[index];

                // mark event object true
                eventObject.complete = true;

                // mark checkbox complete
                $("#steps-checklist-" + timestamp + "--" + handle).prop('checked', true).trigger('change');

                // return the event object
                return eventObject;

                // end of the `mark` method
            },
            unmarkIncomplete: function(handle) {

                // find the event
                var index = findByKey(settings.events, 'handle', handle);

                // fail gracefully
                if (index === null) {
                    return false;
                }

                // assignment
                var eventObject = settings.events[index];

                // mark event object true
                eventObject.complete = false;

                // mark checkbox complete
                $("#steps-checklist-" + timestamp + "--" + handle).prop('checked', false).trigger('change');

                // return the event object
                return eventObject;

            },
            /**
             * Review registered events for completion
             * @return {Object}
             */
            review: function() {

                return {
                    complete: isFormComplete(),
                    completed: findCompleted(),
                    length: findFormLength(),
                    percent: findFormPercentComplete()
                };

            },
            /**
             * triggers on form change.
             * @return {[type]} [description]
             */
            listen: function(fn) {
                    $form.on('change', function() {
                        fn.call();
                    });
                }
                // end of the public methods
        };
        // end of the plugin
    };
    // end of the IIFE
}(jQuery, window));
(function ($) {
    "use strict";

    $.widget('ui.datetimepicker', {
        // default options
        options: {
            dateOptions: {},
            timeOptions: {
                'format': '24h'
            }
        },

        // constructor
        _create: function () {
            var elem = this.element,
                self = this,
                btnDate,
                btnTime,
                container,
                timepicker,
                timepickerContainer,
                dateInput,
                i,
                j,
                ampm,
                datetimeInput;

            // set up markup
            elem.addClass('ui-state-default ui-corner-all ' + 
                'ui-datetimepicker-input');

            $(elem).wrap('<div class="ui-widget ui-datetimepicker" />');
            container = elem.parent();

            btnDate = $('<span class="ui-icon ui-icon-calculator ' + 
                'ui-datetimepicker-button"></span>').
                appendTo(elem.parent()).button();

            btnTime = $('<span class="ui-icon ui-icon-clock ' + 
                'ui-datetimepicker-button"></span>').
                appendTo(elem.parent()).button();

            // create datepicker
            dateInput = $('<input class="ui-state-default ui-corner-all ' +
                'ui-datetimepicker-date" id="' + elem.attr('id') + 
                '-date" type="text" />');

            j = elem.attr('name');
            if(j) {
                datetimeInput = $('<input type="hidden" name="' + j + '" />');
                dateInput.attr('name', j + '-date');
                elem.attr('name', j + '-time');
                container.append(datetimeInput);
            }

            dateInput.datepicker(self.options.dateOptions);
            container.prepend(dateInput);

            // create time picker markup
            timepicker = $('<select />');

            if(self.options.timeOptions.format === '24h') {
                for(i = 1; i < 24; i++) {
                    timepicker.append('<option>' + i + ':00</option>');
                    timepicker.append('<option>' + i + ':30</option>');
                }
                timepicker.append('<option>00:00</option>');
                timepicker.append('<option>00:30</option>');
            } else {
                timepicker.append('<option>12:00 AM</option>');
                timepicker.append('<option>12:30 AM</option>');
                for(i = 1; i < 24; i++) {
                    j = i;
                    ampm = 'AM';
                    if(i > 12) {
                        j = i - 12;
                        ampm = 'PM';
                    }
                    timepicker.append('<option>' + j + ':00 ' + 
                        ampm + '</option>');
                    timepicker.append('<option>' + j + ':30 ' + 
                        ampm + '</option>');
                }
            }

            timepickerContainer = $('<div class="ui-widget-content ' + 
                'ui-timepicker-container ui-corner-all" />');
            timepickerContainer.position({
                of: elem,
                my: 'left top',
                at: 'left bottom'
            }).append('<div class="ui-widget-header ui-timepicker-header ' +
                'ui-corner-all">Time</div>').append(timepicker);

            container.append(timepickerContainer);

            timepickerContainer.hide();

            // event binding
            elem.bind('focus', function () {
                timepickerContainer.fadeIn('fast');
            });

            dateInput.bind('change', function () {
                datetimeInput.val(self.getDatetime());
            });

            btnDate.bind('click', function () {
                dateInput.datepicker("show");
            });

            btnTime.bind('click', function () {
                timepickerContainer.fadeToggle('fast');
            });

            $(document).mouseup(function (e) {
                if (timepickerContainer.has(e.target).length === 0 &&
                    self.element[0] !== e.target)
                {
                    timepickerContainer.fadeOut('fast');
                }
            });

            timepicker.bind('change', function () {
                timepickerContainer.fadeOut('fast');
                elem.val(container.find('select').val());
                datetimeInput.val(self.getDatetime());
            });
        },

        // public methods

        getDatetime: function() {
            var date = this.element.parent()
                    .find('.ui-datetimepicker-date').val(),
                time = this.element.val();

            return date + ' ' + time;
        }
    });
}(jQuery));
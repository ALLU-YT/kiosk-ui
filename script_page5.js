conf = {
    autoClose: false,
    format: 'DD-MM-YYYY',
    separator: ' to ',
    language: 'auto',
    startOfWeek: 'sunday', // or monday

    startDate: new Date(),
    endDate: false,
    time: {
        enabled: false
    },
    minDays: 0,
    maxDays: 0,
    singleMonth: true,
    inline: true,
    container: '#cal',
    alwaysOpen: true,
    singleDate: false,
    lookBehind: false,
    batchMode: false,
    duration: 200,
    stickyMonths: false,
    dayDivAttrs: [],
    dayTdAttrs: [],
    applyBtnClass: '',

    showShortcuts: false,
    showTopbar: false,
    // hoveringTooltip: function(days, startTime, hoveringTime) {
    //     return days > 1 ? days + ' ' + lang('days') : '';
    // },

    swapTime: false,
    selectForward: false,
    selectBackward: false,
    showWeekNumbers: false,
    getWeekNumber: function(date) //date will be the first day of a week
        {
            return moment(date).format('w');
        },
    monthSelect: false,
    yearSelect: false
};
$('#cal').dateRangePicker(conf)
    .bind('datepicker-first-date-selected', function(event, obj) {
        console.log(obj);

        var startDateString = obj.date1.toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric',
            day: '2-digit'
        });
        $('.startingDateTime').text(startDateString);
        $('.ending_datetime').text(startDateString);

        // Triggering the second function
        toggleDivs();
    })
    .bind('datepicker-change', function(event, obj) {

        console.log(obj);

        var endDateString = obj.date2.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric', day: '2-digit' });
        $('#ending_date').text(endDateString);

        var totalDays = Math.floor((obj.date2 - obj.date1) / (1000 * 60 * 60 * 24));
        $('.dagerange').text(totalDays + 1);
    }).ready(function() {
        $('#increaseBtn').click(function() {
            var $cal = $('#cal');
            var currentStartDate = moment($('.startingDateTime').text(), 'MM/DD/YYYY');
            var newStartDate = currentStartDate.clone(); // Use clone to avoid mutating the original object
            var currentEndDate = moment($('#ending_date').text(), 'MM/DD/YYYY');
            var newEndDate = currentEndDate.clone().add(1, 'days'); // Similar to newStartDate

            $('#ending_date').text(newEndDate.format('MM/DD/YYYY'));

            // Update the day range count
            var totalDays = newEndDate.diff(newStartDate, 'days') + 1;
            $('.dagerange').text(totalDays);

            // Trigger the datepicker-change event to update the calendar UI
            $cal.trigger('datepicker-change', {
                date1: newStartDate.toDate(),
                date2: newEndDate.toDate()
            });

            // Update the classes of td elements
            $('.day').each(function() {
                var time = parseInt($(this).attr('time'));
                if (time >= newStartDate.valueOf() && time <= newEndDate.valueOf()) {
                    $(this).addClass('checked tmp first-date-selected');
                } else {
                    $(this).removeClass('checked');
                }
                if (time === newStartDate.startOf('day').valueOf()) {
                    $(this).addClass('first-date-selected');
                } else {
                    $(this).removeClass('first-date-selected');
                }
                if (time === newEndDate.endOf('day').valueOf()) { // Corrected from newEndDate.valueOf('day').valueOf()
                    $(this).addClass('tmp checked last-date-selected');
                } else {
                    $(this).removeClass('tmp');
                }
            });


        });

        $('#decreaseBtn').click(function() {
            var $cal = $('#cal');
            var currentStartDate = moment($('.startingDateTime').text(), 'MM/DD/YYYY');
            var newStartDate = currentStartDate.clone();
            var currentEndDate = moment($('#ending_date').text(), 'MM/DD/YYYY');
            var newEndDate = currentEndDate.clone().subtract(1, 'days'); // Subtract 1 day from the current end date

            $('#ending_date').text(newEndDate.format('MM/DD/YYYY'));

            // Remove the last date selected
            $('.day.last-date-selected').removeClass('last-date-selected');

            // Update the day range count
            var totalDays = newEndDate.diff(newStartDate, 'days') + 1; // Added 1 to include the start and end dates
            $('.dagerange').text(totalDays);

            // Trigger the datepicker-change event to update the calendar UI
            $cal.trigger('datepicker-change', {
                date1: newStartDate.toDate(),
                date2: newEndDate.toDate()
            });


            // Update the classes of td elements
            $('.day').each(function() {
                var time = parseInt($(this).attr('time'));
                if (time >= newStartDate.valueOf() && time <= newEndDate.valueOf()) {
                    $(this).addClass('checked tmp first-date-selected');
                } else {
                    $(this).removeClass('checked');
                }
                if (time === newStartDate.startOf('day').valueOf()) {
                    $(this).addClass('first-date-selected');
                } else {
                    $(this).removeClass('first-date-selected');
                }
                if (time === newEndDate.endOf('day').valueOf()) {
                    $(this).addClass('tmp checked last-date-selected');
                } else {
                    $(this).removeClass('tmp');
                }
            });
        });

        // Your other code for initializing date range picker and handling events
    });






function toggleDivs() {
    var firstDiv = document.getElementById('firstDiv');
    var secondDiv = document.getElementById('secondDiv');

    if (firstDiv.style.display !== 'none') {
        firstDiv.style.display = 'none';
        secondDiv.style.display = 'block';
    }
}
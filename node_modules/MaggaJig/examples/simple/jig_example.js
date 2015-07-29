/**
 * Created by developer on 02.06.15.
 */
// Jig that displays time;

var Jig = require('../../src/jig.js');
var timeStatics,
    yearStatics,
    d;
timeStatics =
{
    time: function () {
        d = new Date();
        return '' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },
    init: function () {
        console.log(this.displayTime());
    },
    nameGetter: function () {
        return 'TimeDisplay';
    },
    displayTime: function () {
        return 'Jig ' + this.nameGetter() + ' outputs ' + this.time();
    }
};

// The jig TimeDisplay outputs the time at creation
// and at instatiation.
Jig.create('TimeDisplay', timeStatics, {});

// Time is accurate every time.
function timeAfterASecond() {
    console.log('\n..time after a second:');
    new global.TimeDisplay();
}
setTimeout(timeAfterASecond, 1000);


// NOW, create a child Jig of TimeDisplay, but that also outputs the year

// We can override init, and the child Jig YearDisplay will inherit the statics
// from parent jig TimeDisplay
yearStatics =
{
    displayYear: function () {
        return 'Jig ' + this.nameGetter() + ' outputs ' + new Date().getFullYear();
    },

    init: function () {
        console.log(this.displayTime(), 'and ', this.displayYear());
    },
    nameGetter: function () {
        return 'YearDisplay ';
    }
};
global.TimeDisplay.create('YearDisplay', yearStatics, {});

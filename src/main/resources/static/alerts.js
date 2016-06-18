'use strict';

module.exports = function createAlert(message, messageType) {
    $('#alert-placeholder').append('<div class="alert ' + messageType + ' fade in"><span>' + message + '</span></div>')
    setTimeout(function() { // this will automatically close the alert and remove this if the users doesn't close it in 5 secs
        $('.' + messageType).alert("close");
    }, 3000);
};
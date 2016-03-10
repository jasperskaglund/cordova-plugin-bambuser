var Broadcaster = {}

var exec = require('cordova/exec');

var viewfinderVisible = false;
var togglingViewfinder = false;

Broadcaster.showViewfinderBehindWebView = function(successCallback, errorCallback) {
    if (togglingViewfinder) {
        console.log('ignored multiple calls to showViewfinderBehindWebView');
        return errorCallback();
    }
    if (viewfinderVisible) {
        console.log('viewfinder is already visible');
        return errorCallback();
    }
    togglingViewfinder = true;
    exec(function() {
        // console.log('showViewfinderBehindWebView success');
        togglingViewfinder = false;
        viewfinderVisible = true;
        successCallback.call(this, arguments);
    }, function() {
        console.log('showViewfinderBehindWebView failure');
        togglingViewfinder = false;
        errorCallback.call(this, arguments);
    }, 'CordovaBambuserBroadcaster', 'showViewfinderBehindWebView', []);
}

Broadcaster.hideViewfinder = function(successCallback, errorCallback) {
    if (togglingViewfinder) {
        console.log('ignored multiple calls to hideViewfinder');
        return errorCallback();
    }
    if (!viewfinderVisible) {
        console.log('hideViewfinder: viewfinder is already hidden');
        return errorCallback();
    }
    togglingViewfinder = true;
    exec(function() {
        // console.log('hideViewfinder success');
        togglingViewfinder = false;
        viewfinderVisible = false;
        successCallback.call(this, arguments);
    }, function() {
        console.log('hideViewfinder failure');
        togglingViewfinder = false;
        errorCallback.call(this, arguments);
    }, 'CordovaBambuserBroadcaster', 'hideViewfinder', []);
}

Broadcaster.toggleViewfinder = function(successCallback, errorCallback) {
    if (viewfinderVisible) {
        Broadcaster.hideViewfinder(successCallback, errorCallback);
    } else {
        Broadcaster.showViewfinderBehindWebView(successCallback, errorCallback);
    }
}

Broadcaster.setCustomData = function(customData, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'setCustomData', [customData]);
}

Broadcaster.setPrivateMode = function(value, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'setPrivateMode', [value]);
}

Broadcaster.setSendPosition = function(value, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'setSendPosition', [value]);
}

Broadcaster.setTitle = function(title, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'setTitle', [title]);
}

/**
 * Supported presets:
 * - auto
 *      Attempts to optimize for a high (adaptive) frame rate by also
 *      adapting the frame quality to the observed throughput. Uses
 *      useAutomaticResolutionSwitching() on Android and
 *      setVideoQualityPreset('kSessionPresetAuto') on iOS.
 *
 * Default: Constant (platfrom-specific default) frame quality
 * with adaptive frame rate.
 */
Broadcaster.setVideoQualityPreset = function(preset, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'setVideoQualityPreset', [preset]);
}

Broadcaster.startBroadcast = function(username, password, successCallback, errorCallback) {
    // console.log('startBroadcast called with username ' + username);
    if (!username) errorCallback('A username is required');
    if (!password) errorCallback('A password is required');
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'startBroadcast', [username, password]);
};

Broadcaster.stopBroadcast = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'stopBroadcast', []);
};

Broadcaster.switchCamera = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'CordovaBambuserBroadcaster', 'switchCamera', []);
};

module.exports = Broadcaster;
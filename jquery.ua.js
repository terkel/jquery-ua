/*
 * jQuery UA plugin
 * https://github.com/terkel/jquery-ua
 *
 * Copyright (c) 2011 Takeru Suzuki
 * Dual licensed under the MIT and GPL licenses.
 *
 * Inspired by jQuery Browser Plugin http://jquery.thewikies.com/browser
 */
(function ($) {

    $.ua = $.ua || {};

    var ua = navigator.userAgent.toLowerCase(),
        p = $.ua.platform = {},
        b = $.ua.browser = {},
        e = $.ua.engine = {};

    // detect platform
    p.name = (/(win|mac|linux|ipad|iphone|ipod|android|blackberry)/.exec(ua) || [, 'unknown'])[1];
    p[p.name] = true;
    p.mobile = /(mobile|phone)/.test(ua) || p.blackberry;
    p.tablet = /tablet/.test(ua) || p.ipad || (p.android && !/mobile/.test(ua));

    // detect browser
    b.name = (/(msie|firefox|chrome|safari|opera)/.exec(ua) || [, 'unknown'])[1]; // chrome must be tested before safari
    b[b.name] = true;
    b.version = (b.unknown)? 0: /(?:msie |firefox\/|chrome\/|version\/)(\d+(\.\d+)*)/.exec(ua)[1];
    b.versionMajor = parseInt(b.version, 10);

    // detect engine
    e.name = (/(trident|webkit|gecko|presto)/.exec(ua) || [, 'unknown'])[1]; // webkit must be tested before gecko
    e[e.name] = true;
    e.version = (e.unknown)? 0: /(?:trident\/|rv:|webkit\/|presto\/)(\d+(\.\d+)*)/.exec(ua)[1];
    e.versionMajor = parseInt(e.version, 10);

    // add classes to html element
    $('html').addClass([
        p.name,
        b.name,
        b.name + b.versionMajor,
        e.name,
        e.name + e.versionMajor
    ].join(' '));

})(jQuery);

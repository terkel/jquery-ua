/*
 * jQuery UA plugin v0.9.1
 * https://github.com/terkel/jquery-ua
 *
 * Copyright (c) 2011 Takeru Suzuki
 * Dual licensed under the MIT and GPL licenses.
 *
 * Inspired by PPK's Browser Detect http://www.quirksmode.org/js/detect.html
 */
(function ($) {

    $.ua = $.ua || {};

    var ua = navigator.userAgent.toLowerCase(),
        p = $.ua.platform = {},
        b = $.ua.browser = {},
        e = $.ua.engine = {},
        platforms = [
            { name: 'win',        version: 'windows(?: nt)? ', versionNames: [
                { number: '6.1',  name: 'win7' },
                { number: '6.0',  name: 'winVista' },
                { number: '5.2',  name: 'winXP' },
                { number: '5.1',  name: 'winXP' },
                { number: '5.01', name: 'win2000' },
                { number: '5.0',  name: 'win2000' }
            ]},
            { name: 'mac',        version: 'os x ' },
            { name: 'ipad',       version: 'cpu os ' },
            { name: 'iphone',     version: 'iphone os ' },
            { name: 'ipod',       version: 'iphone os ' },
            { name: 'android',    version: 'android ' }, // android must be tested before linux
            { name: 'blackberry', version: '(?:blackberry\\d{4}[a-z]?|version)/' },
            { name: 'linux' }
        ],
        browsers = [
            { name: 'msie',    version: 'msie ' },
            { name: 'firefox', version: 'firefox/' },
            { name: 'chrome',  version: 'chrome/' }, // chrome must be tested before safari
            { name: 'safari',  version: 'version/' },
            { name: 'opera',   version: 'version/' }
        ],
        engines = [
            { name: 'trident', version: 'trident/' },
            { name: 'webkit',  version: 'webkit/' }, // webkit must be tested before gecko
            { name: 'gecko',   version: 'rv:' },
            { name: 'presto',  version: 'presto/' }
        ];

    // detect platform
    detect(p, platforms);
    p.mobile = /(mobile|phone)/.test(ua) || p.blackberry;
    p.tablet = /tablet/.test(ua) || p.ipad || (p.android && !/mobile/.test(ua));

    // detect browser
    detect(b, browsers);

    // detect engine
    detect(e, engines);

    // add classes to html element
    $('html').addClass([
        p.name,
        p.versionName,
        b.name,
        b.name + b.versionMajor,
        e.name,
        e.name + e.versionMajor
    ].join(' '));

    function detect (item, data) {
        var i,
            is,
            j,
            js;
        for (i = 0, is = data.length; i < is; i++) {
            if (new RegExp(data[i].name).test(ua)) {
                item.name = data[i].name;
                item[item.name] = true;
                item.version = String((new RegExp(data[i].version + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
                item.versionMajor = parseInt(item.version, 10);
                if (data[i].versionNames) {
                    for (j = 0, js = data[i].versionNames.length; j < js; j++) {
                        if (item.version === data[i].versionNames[j].number) {
                            item.versionName = data[i].versionNames[j].name;
                            item[item.versionName] = true;
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (!item.name) {
            item.name = 'unknown';
            item['unknown'] = true;
            item.version = '';
            item.versionMajor = '';
        }
    }

})(jQuery);

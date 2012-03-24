/*!
 * jQuery UA plugin v0.9.3
 * https://github.com/terkel/jquery-ua
 *
 * Copyright (c) 2012 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://www.opensource.org/licenses/MIT
 */
(function ($) {

    $.ua = $.ua || {};

    var ua = navigator.userAgent.toLowerCase(),
        platforms = [
            { name: 'win',        version: 'windows(?: nt)? ', versionNames: [
                { number: '6.2',  name: 'win8' },
                { number: '6.1',  name: 'win7' },
                { number: '6.0',  name: 'winvista' },
                { number: '5.2',  name: 'winxp' },
                { number: '5.1',  name: 'winxp' },
                { number: '5.01', name: 'win2000' },
                { number: '5.0',  name: 'win2000' }
            ]},
            { name: 'ipad',       version: 'cpu os ' }, // ipad and ipod must be tested before iphone
            { name: 'ipod',       version: 'iphone os ' },
            { name: 'iphone',     version: 'iphone os ' }, // iphone must be tested before mac
            { name: 'mac',        version: 'os x ' },
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
        ],
        p = $.ua.platform = detect(platforms),
        b = $.ua.browser = detect(browsers),
        e = $.ua.engine = detect(engines);

    function detect (data) {
        var item = {},
            c,
            re,
            map,
            i,
            is,
            j,
            js;
        for (i = 0, is = data.length; i < is; i++) {
            c = data[i];
            re = new RegExp(c.name);
            map = c.versionNames;
            if (re.test(ua)) {
                item.name = c.name;
                item[item.name] = true;
                item.version = String((new RegExp(c.version + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
                item.versionMajor = parseInt(item.version, 10);
                if (data === platforms) {
                    item.mobile = /mobile|phone/.test(ua) || item.blackberry;
                    item.tablet = /tablet/.test(ua) || item.ipad || (item.android && !/mobile/.test(ua));
                }
                if (map) {
                    for (j = 0, js = map.length; j < js; j++) {
                        if (item.version === map[j].number) {
                            item.versionName = map[j].name;
                            item[item.versionName] = true;
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (!item.name) {
            item['unknown'] = true;
            item.name = '';
            item.version = '';
            item.versionMajor = '';
        }
        return item;
    }

    $('html').addClass([
        p.name,
        p.versionName,
        b.name,
        b.name + b.versionMajor,
        e.name,
        e.name + e.versionMajor
    ].join(' '));

})(jQuery);
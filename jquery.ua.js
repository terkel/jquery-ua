/*!
 * jQuery UA plugin v0.9.8
 * https://github.com/terkel/jquery-ua
 *
 * Copyright (c) 2014 Takeru Suzuki - http://terkel.jp/
 * Licensed under the MIT license - http://www.opensource.org/licenses/MIT
 */
(function ($) {

    var p, b, e;

    $.ua = $.ua || {

        init: function () {
            p = this.platform = this.detect(this.data.platforms);
            b = this.browser = this.detect(this.data.browsers);
            e = this.engine = this.detect(this.data.engines);
        },

        detect: function (data) {
            var ua = navigator.userAgent.toLowerCase(),
                item = {},
                name,
                versionSearch,
                flags,
                versionNames,
                i,
                is,
                ic,
                j,
                js,
                jc;
            for (i = 0, is = data.length; i < is; i++) {
                ic = data[i];
                name = ic.name;
                versionSearch = ic.versionSearch;
                flags = ic.flags;
                versionNames = ic.versionNames;
                if (ua.indexOf(name) !== -1) {
                    item.name = name.replace(/\s/g, '');
                    item[item.name] = true;
                    item.version = ('' + (new RegExp(versionSearch + '(\\d+((\\.|_)\\d+)*)').exec(ua) || [, 0])[1]).replace(/_/g, '.');
                    item.versionMajor = parseInt(item.version, 10);
                    if (flags) {
                        for (j = 0, js = flags.length; j < js; j++) {
                            item[flags[j]] = true;
                        }
                    }
                    if (versionNames) {
                        for (j = 0, js = versionNames.length; j < js; j++) {
                            jc = versionNames[j];
                            if (item.version.indexOf(jc.number) === 0) {
                                item.versionName = jc.name;
                                item[item.versionName] = true;
                                break;
                            }
                        }
                    }
                    if (data === $.ua.data.platforms) {
                        item.mobile = /mobile|phone/.test(ua) || item.blackberry;
                        item.tablet = /tablet/.test(ua) || item.ipad || (item.android && !/mobile/.test(ua));
                        if (item.ios) {
                            item.versionName = 'ios' + item.versionMajor;
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
        },

        data: {
            platforms: [
                { name: 'windows phone', versionSearch: 'windows phone os ', versionNames: [ // windows phone must be tested before win
                    { number: '7.5', name: 'mango' }
                ]},
                { name: 'win', versionSearch: 'windows(?: nt)? ', versionNames: [
                    { number: '6.3', name: 'win81' },
                    { number: '6.2', name: 'win8' },
                    { number: '6.1', name: 'win7' },
                    { number: '6.0', name: 'winvista' },
                    { number: '5.2', name: 'winxp' },
                    { number: '5.1', name: 'winxp' },
                    { number: '5.0', name: 'win2000' }
                ]},
                { name: 'ipad',   versionSearch: 'cpu os ',    flags: ['ios'] }, // ipad and ipod must be tested before iphone
                { name: 'ipod',   versionSearch: 'iphone os ', flags: ['ios'] },
                { name: 'iphone', versionSearch: 'iphone os ', flags: ['ios'] }, // iphone must be tested before mac
                { name: 'mac', versionSearch: 'os x ', versionNames: [
                    { number: '10.10', name: 'yosemite' },
                    { number: '10.9', name: 'mavericks' },
                    { number: '10.8', name: 'mountainlion' },
                    { number: '10.7', name: 'lion' },
                    { number: '10.6', name: 'snowleopard' },
                    { number: '10.5', name: 'leopard' },
                    { number: '10.4', name: 'tiger' },
                    { number: '10.3', name: 'panther' },
                    { number: '10.2', name: 'jaguar' },
                    { number: '10.1', name: 'puma' },
                    { number: '10.0', name: 'cheetah' }
                ]},
                { name: 'android', versionSearch: 'android ', versionNames: [ // android must be tested before linux
                    { number: '4.4', name: 'kitkat' },
                    { number: '4.3', name: 'jellybean' },
                    { number: '4.2', name: 'jellybean' },
                    { number: '4.1', name: 'jellybean' },
                    { number: '4.0', name: 'icecreamsandwich' },
                    { number: '3.',  name: 'honeycomb' },
                    { number: '2.3', name: 'gingerbread' },
                    { number: '2.2', name: 'froyo' },
                    { number: '2.',  name: 'eclair' },
                    { number: '1.6', name: 'donut' },
                    { number: '1.5', name: 'cupcake' }
                ]},
                { name: 'blackberry', versionSearch: '(?:blackberry\\d{4}[a-z]?|version)/' },
                { name: 'linux' }
            ],
            browsers: [
                { name: 'iemobile', versionSearch: 'iemobile/' }, // iemobile must be tested before msie
                { name: 'msie',     versionSearch: 'msie ' },
                { name: 'firefox',  versionSearch: 'firefox/' },
                { name: 'chrome',   versionSearch: 'chrome/' }, // chrome must be tested before safari
                { name: 'safari',   versionSearch: 'version/' },
                { name: 'opera',    versionSearch: 'version/' }
            ],
            engines: [
                { name: 'trident', versionSearch: 'trident/' },
                { name: 'webkit',  versionSearch: 'webkit/' }, // webkit must be tested before gecko
                { name: 'gecko',   versionSearch: 'rv:' },
                { name: 'presto',  versionSearch: 'presto/' }
            ]
        }

    };

    $.ua.init();

    $('html').addClass([
        p.name,
        p.versionName,
        b.name,
        b.name + b.versionMajor,
        e.name,
        e.name + e.versionMajor
    ].join(' '));

})(jQuery);

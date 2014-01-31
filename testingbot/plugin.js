// Init namespace.
var testingbot = {};
(function(a){function b(a,b){var c=(a&65535)+(b&65535),d=(a>>16)+(b>>16)+(c>>16);return d<<16|c&65535}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<a.length*32;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];c[(a.length>>2)-1]=undefined;for(b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<a.length*8;b+=8)c[b>>5]|=(a.charCodeAt(b/8)&255)<<b%32;return c}function l(a){return j(i(k(a),a.length*8))}function m(a,b){var c,d=k(a),e=[],f=[],g;e[15]=f[15]=undefined,d.length>16&&(d=i(d,a.length*8));for(c=0;c<16;c+=1)e[c]=d[c]^909522486,f[c]=d[c]^1549556828;return g=i(e.concat(k(b)),512+b.length*8),j(i(f.concat(g),640))}function n(a){var b="0123456789abcdef",c="",d,e;for(e=0;e<a.length;e+=1)d=a.charCodeAt(e),c+=b.charAt(d>>>4&15)+b.charAt(d&15);return c}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"use strict",typeof define=="function"&&define.amd?define(function(){return t}):a.md5=t})(this);
// Strings
// en
var m = builder.translate.locales['en'].mapping;
m.__testingbot_settings = "TestingBot Settings";
m.__testingbot_key = "TestingBot API key";
m.__testingbot_secret = "TestingBot API Secret";
m.__testingbot_lookup_access_key = "look up access key";
m.__testingbot_get_account = "Don't have an account? Get one for free!";
m.__testingbot_browser = "Browser";
m.__testingbot_auto_show_job = "Automatically show TestingBot jobs page";
m.__testingbot_connection_error = "Unable to connect to the TestingBot servers: {0}";
m.__testingbot_on_os = "on";
m.__testingbot_run_ondemand = "Run on TestingBot";
m.__testingbot_account_exhausted = "Your TestingBot account has run out of minutes.";
m.__testingbot_ondemand_connection_error = "Unable to connect to TestingBot: {0}";

testingbot.shutdown = function() {

};

testingbot.loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);

testingbot.loginInfo = new Components.Constructor(
  "@mozilla.org/login-manager/loginInfo;1",
  Components.interfaces.nsILoginInfo,
  "init"
);

testingbot.getCredentials = function() {
  var logins = testingbot.loginManager.findLogins(
    {},
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login'
  );
  
  for (var i = 0; i < logins.length; i++) {
    return {'key': logins[i].username, 'secret': logins[i].password};
  }
  return {'key': "", 'secret': ""};
};

testingbot.setCredentials = function(key, secret) {
  var logins = testingbot.loginManager.findLogins(
    {},
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login'
  );
  
  for (var i = 0; i < logins.length; i++) {
    testingbot.loginManager.removeLogin(logins[i]);
  }
  
  var loginInfo = new testingbot.loginInfo(
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login',
    /*username*/      key,
    /*password*/      secret,
    /*usernameField*/ "",
    /*passwordField*/ ""
  );
  testingbot.loginManager.addLogin(loginInfo);
};

testingbot.getBrowser = function(sel1) {
  var prefName = sel1 ? "extensions.seleniumbuilder.plugins.testingbot.browser_sel1" : "extensions.seleniumbuilder.plugins.testingbot.browser";
  return bridge.prefManager.prefHasUserValue(prefName) ? bridge.prefManager.getCharPref(prefName) : "";
};

testingbot.setBrowser = function(browser, sel1) {
    var prefName = sel1 ? "extensions.seleniumbuilder.plugins.testingbot.browser_sel1" : "extensions.seleniumbuilder.plugins.testingbot.browser";
  bridge.prefManager.setCharPref(prefName, browser);
};

testingbot.getAutoShowJobPage = function() {
  return bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.plugins.testingbot.autoshowjobpage") ? bridge.prefManager.getBoolPref("extensions.seleniumbuilder.plugins.testingbot.autoshowjobpage") : true;
};

testingbot.setAutoShowJobPage = function(asjp) {
  bridge.prefManager.setBoolPref("extensions.seleniumbuilder.plugins.testingbot.autoshowjobpage", asjp);
};

testingbot.settingspanel = {};
/** The dialog. */
testingbot.settingspanel.dialog = null;

testingbot.settingspanel.show = function(sel1, callback) {
  if (testingbot.settingspanel.dialog) { return; }
  jQuery('#edit-rc-connecting').show();
  jQuery.ajax(
    sel1 ? "https://api.testingbot.com/v1/browsers?type=rc" : "https://api.testingbot.com/v1/browsers?type=webdriver",
    {
      success: function(testingbotBrowsers) {
        jQuery('#edit-rc-connecting').hide();
        var credentials = testingbot.getCredentials();
        testingbot.settingspanel.dialog =
          newNode('div', {'class': 'dialog'},
            newNode('h3', _t('__testingbot_settings')),
            newNode('table', {style: 'border: none;', id: 'rc-options-table'},
              newNode('tr',
                newNode('td', _t('__testingbot_key') + " "),
                newNode('td', newNode('input', {id: 'testingbot-key', type: 'text', value: credentials.key, 'change': function() {
                  if (jQuery('#testingbot-key').val() == "") {
                    jQuery('#testingbot-account-link').show();
                  } else {
                    jQuery('#testingbot-account-link').hide();
                  }
                }}))
              ),
              newNode('tr',
                newNode('td', _t('__testingbot_secret') + " "),
                newNode('td', newNode('input', {id: 'testingbot-secret', type: 'text', value: credentials.secret}))
              ),
              newNode('tr',
                newNode('td', ""),
                newNode('td', newNode('a', {'href': 'https://testingbot.com/members/user/edit', 'target': '_blank'}, "(" + _t('__testingbot_lookup_access_key') + ")"))
              ),
              newNode('tr', {'id': 'testingbot-account-link'},
                newNode('td', ""),
                newNode('td', newNode('a', {'href': 'http://testingbot.com/signup', 'target': '_blank'}, "(" + _t('__testingbot_get_account') + ")"))
              ),
              newNode('tr',
                newNode('td', _t('__testingbot_browser') + " "),
                newNode('td', newNode('select', {'id': 'testingbot-browser'}))
              ),
              newNode('tr',
                newNode('td', {'colspan': 2}, newNode('input', {'type':'checkbox', 'id': 'testingbot-showjobpage'}), _t('__testingbot_auto_show_job'))
              )
            ),
            newNode('a', {'href': '#', 'class': 'button', 'id': 'testingbot-ok', 'click': function() {
              var key = jQuery('#testingbot-key').val();
              var secret = jQuery('#testingbot-secret').val();
              var choice = jQuery('#testingbot-browser').val();
              var browser = testingbotBrowsers[choice];
              testingbot.setCredentials(key, secret);
              testingbot.setBrowser(testingbot.browserOptionName(browser), sel1);
              testingbot.setAutoShowJobPage(!!jQuery('#testingbot-showjobpage').attr('checked'));
              testingbot.settingspanel.hide();
              if (callback) {
                callback({
                  'key': key,
                  'secret': secret,
                  'browser': browser.name,
                  'version': browser.version,
                  'platform': browser.platform,
                  'sel1': sel1 || false
                });
              }
            }}, _t('ok')),
            newNode('a', {'href': '#', 'class': 'button', 'id': 'testingbot-cancel', 'click': function() {
              testingbot.settingspanel.hide();
            }}, _t('cancel'))
          );
        builder.dialogs.show(testingbot.settingspanel.dialog);
        if (testingbot.getAutoShowJobPage()) {
          jQuery('#testingbot-showjobpage').attr('checked', 'checked');
        }
        if (credentials.key != "") {
          jQuery('#testingbot-account-link').hide();
        }
        var usedNames = {};
        var defaultName = testingbot.getBrowser(sel1);
        for (var i = 0; i < testingbotBrowsers.length; i++) {
          var name = testingbot.browserOptionName(testingbotBrowsers[i]);
          if (usedNames[name]) { continue; }
          usedNames[name] = true;
          if (name == defaultName) {
            jQuery('#testingbot-browser').append(newNode(
              'option',
              {'value': i, 'selected': 'selected'},
              name
            ));
          } else {
            jQuery('#testingbot-browser').append(newNode(
              'option',
              {'value': i},
              name
            ));
          }
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        jQuery('#edit-rc-connecting').hide();
        alert(_t('__testingbot_connection_error', errorThrown));
      }
    }
  );
};

testingbot.browserOptionName = function(entry) {
  return entry.name + ((entry.version !== undefined) ? " " + entry.version : "") + " " + _t('__testingbot_on_os') + " " + entry.platform;
};

testingbot.settingspanel.hide = function() {
  jQuery(testingbot.settingspanel.dialog).remove();
  testingbot.settingspanel.dialog = null;
};

builder.registerPostLoadHook(function() {  
  builder.gui.menu.addItem('file', _t('__testingbot_settings'), 'file-testingbot-settings', testingbot.settingspanel.show);

  builder.gui.menu.addItem('run', _t('__testingbot_run_ondemand'), 'run-testingbot-ondemand', function() {
    jQuery('#edit-rc-connecting').show();
    testingbot.settingspanel.show(/*sel1*/ false, function(result) {
      jQuery.ajax(
        "https://api.testingbot.com/v1/user",
        {
          beforeSend: function(xhr){ 
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(result.key + ":" + result.secret));
          },
          success: function(ajresult) {
            if (ajresult.seconds <= 0) {
              jQuery('#edit-rc-connecting').hide();
              alert(_t('__testingbot_account_exhausted'));
            } else {
              builder.selenium2.rcPlayback.run(
                result.key + ":" + result.secret + "@hub.testingbot.com:80",
                result.browser,
                result.version,
                result.platform,
                null,
                // Start job callback
                function(response) {
                  if (testingbot.getAutoShowJobPage()) {
                    window.open("http://testingbot.com/tests/" + response.sessionId + "?auth=" + md5(result.key + ":" + result.secret + ":" + response.sessionId),'_newtab');
                  } else {
                    var lnk = newNode('div', {'class': 'dialog', 'style': 'padding-top: 30px;'},
                      newNode('a', {'href': "http://testingbot.com/tests/" + response.sessionId + "?auth=" + md5(result.key + ":" + result.secret + ":" + response.sessionId), 'target': '_newtab'}, "Show job info")
                    );
                    builder.dialogs.show(lnk);
                    var hide = function() { jQuery(lnk).remove(); builder.views.script.removeClearResultsListener(hide); };
                    builder.views.script.addClearResultsListener(hide);
                  }
                }
              );
            }
          },
          error: function(xhr, textStatus, errorThrown) {
            alert(textStatus);
            jQuery('#edit-rc-connecting').hide();
            alert(_t('__testingbot_ondemand_connection_error', errorThrown));
          }
        }
      );
    });
  });

  builder.gui.menu.addItem('run', _t('__testingbot_run_ondemand'), 'run-testingbot-ondemand-sel1', function() {
    jQuery('#edit-rc-connecting').show();
    testingbot.settingspanel.show(/* sel1 */ true, function(result) {
      jQuery.ajax(
        "https://api.testingbot.com/v1/user",
        {
          beforeSend: function(xhr){ 
            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(result.key + ":" + result.secret));
          },
          success: function(ajresult) {
            if (ajresult.seconds <= 0) {
              jQuery('#edit-rc-connecting').hide();
              alert(_t('__testingbot_account_exhausted'));
            } else {
              var name = _t('sel2_untitled_run');
              if (builder.getScript().path) {
                var name = builder.getScript().path.path.split("/");
                name = name[name.length - 1];
                name = name.split(".")[0];
              }
              name = "Selenium Builder " + result.browser + " " + (result.version ? result.version + " " : "") + (result.platform ? result.platform + " " : "") + name;
            
              builder.selenium1.rcPlayback.run(
                "hub.testingbot.com:80",
                JSON.stringify({
                  'client_key':        result.key,
                  'client_secret':      result.secret,
                  'platform':              result.platform,
                  'browserName':         result.browser,
                  'version': result.version,
                  'name':            name
                }),
                null,
                // Start job callback
                function(rcResponse) {
                  var sessionId = rcResponse.substring(3);
                  if (testingbot.getAutoShowJobPage()) {
                    window.open("http://testingbot.com/tests/" + sessionId + "?auth=" + md5(result.key + ":" + result.secret + ":" + sessionId),'_newtab');
                  } else {
                    var lnk = newNode('div', {'class': 'dialog', 'style': 'padding-top: 30px;'},
                      newNode('a', {'href': "http://testingbot.com/tests/" + sessionId + "?auth=" + md5(result.key + ":" + result.secret + ":" + sessionId), 'target': '_newtab'}, "Show job info")
                    );
                    builder.dialogs.show(lnk);
                    var hide = function() { jQuery(lnk).remove(); builder.views.script.removeClearResultsListener(hide); };
                    builder.views.script.addClearResultsListener(hide);
                  }
                }
              );
            }
          },
          error: function(xhr, textStatus, errorThrown) {
            jQuery('#edit-rc-connecting').hide();
            alert(_t('__testingbot_ondemand_connection_error', errorThrown));
          }
        }
      );
    });
  });
});

builder.suite.addScriptChangeListener(function() {
  var script = builder.getScript();
  if (script && script.seleniumVersion === builder.selenium2) {
    jQuery('#run-testingbot-ondemand').show();
    jQuery('#run-testingbot-ondemand-sel1').hide();
  } else {
    jQuery('#run-testingbot-ondemand').hide();
    jQuery('#run-testingbot-ondemand-sel1').show();
  }
});

// Add Java exporters that talk to the testingbot infrastructure.
var to_add = [];
for (var name in builder.selenium2.io.lang_infos) {
  if (name.startsWith && name.startsWith("Java")) {
    to_add.push(name);
  }
}

function createDerivedInfo(name) {
  builder.selenium2.io.addDerivedLangFormatter(name, {
    name: name + "/testingbot On Demand",
    get_params: function(script, callback) { testingbot.settingspanel.show(/* sel1 */ false, callback); },
    extraImports:
      "import java.net.URL;\n" +
      "import org.openqa.selenium.remote.DesiredCapabilities;\n" +
      "import org.openqa.selenium.remote.RemoteWebDriver;\n",
    driverVar:
      "RemoteWebDriver wd;",
    initDriver:
      "DesiredCapabilities caps = DesiredCapabilities.{browserstring}();\n" +
      "    caps.setCapability(\"name\", \"{scriptName}\");\n" +
      "wd = new RemoteWebDriver(\n" +
      "    new URL(\"http://{key}:{secret}@hub.testingbot.com:80/wd/hub\"),\n" +
      "    caps);"
  });
};

for (var i = 0; i < to_add.length; i++) {
  createDerivedInfo(to_add[i]);
}

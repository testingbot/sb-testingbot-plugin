// Init namespace.
var tb = {};

// Strings
// en
var m = builder.translate.locales['en'].mapping;
m.__tb_settings = "TestingBot Settings";
m.__tb_username = "TestingBot Key";
m.__tb_access_key = "TestingBot Secret";
m.__tb_lookup_access_key = "look up key";
m.__tb_get_account = "Don't have an account? Get one for free!";
m.__tb_browser = "Browser";
m.__tb_browser_2 = "Sel 2 Browser";
m.__tb_add_config_line = "Add";
m.__tb_auto_show_job = "Automatically show TestingBot jobs page";
m.__tb_parallel = "Run multiple tests in parallel";
m.__tb_parallel_disabled = "Parallel playback disabled when state is shared across suite"
m.__tb_connection_error = "Unable to connect to the TestingBot servers: {0}";
m.__tb_on_os = "on";
m.__tb_run_ondemand = "Run on TestingBot";
m.__tb_run_suite_ondemand = "Run suite on TestingBot";
m.__tb_account_exhausted = "Your TestingBot account has run out of minutes.";
m.__tb_ondemand_connection_error = "Unable to connect to TestingBot: {0}";
m.__tb_run_stopped = "Stopped";
m.__tb_stopping = "Stopping...";
m.__tb_configs = "Saved configs";
m.__tb_add_config = "Save as config...";
m.__tb_delete_config = "Delete";
m.__tb_config_name_prompt = "Choose a name for this configuration";
m.__tb_confirm_delete_config = "Really delete this configuration?";
m.__tb_config_replace_prompt = "Replace the configuration named {0}?";
m.__tb_tunnels = "Tunnels";
m.__tb_reload = "Reload";
m.__tb_reloading = "Loading...";
m.__tb_default = "Default";

tb.loginManager = Components.classes["@mozilla.org/login-manager;1"].getService(Components.interfaces.nsILoginManager);

tb.loginInfo = new Components.Constructor(
  "@mozilla.org/login-manager/loginInfo;1",
  Components.interfaces.nsILoginInfo,
  "init"
);

tb.getCredentials = function() {
  // Migrate to new credentials storage system.
  var creds = tb.getOldCredentials();
  if (creds.username && creds.accesskey) {
    tb.setCredentials(creds.username, creds.accesskey);
    tb.setOldCredentials("", "");
    return creds;
  }
  
  var logins = tb.loginManager.findLogins(
    {},
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login'
  );
  
  for (var i = 0; i < logins.length; i++) {
    return {'username': logins[i].username, 'accesskey': logins[i].password};
  }
  return {'username': "", 'accesskey': ""};
};

tb.setCredentials = function(username, accesskey) {
  var logins = tb.loginManager.findLogins(
    {},
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login'
  );
  
  for (var i = 0; i < logins.length; i++) {
    tb.loginManager.removeLogin(logins[i]);
  }
  
  var loginInfo = new tb.loginInfo(
    /*hostname*/      'chrome://seleniumbuilder',
    /*formSubmitURL*/ null,
    /*httprealm*/     'TestingBot User Login',
    /*username*/      username,
    /*password*/      accesskey,
    /*usernameField*/ "",
    /*passwordField*/ ""
  );
  tb.loginManager.addLogin(loginInfo);
};

tb.getOldCredentials = function() {
  return {
    username:
      (bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.plugins.tb.username") ? bridge.prefManager.getCharPref("extensions.seleniumbuilder.plugins.tb.username") : ""),
    accesskey:
      (bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.plugins.tb.accesskey") ? bridge.prefManager.getCharPref("extensions.seleniumbuilder.plugins.tb.accesskey") : "")
  };
};

tb.setOldCredentials = function(username, accesskey) {
  bridge.prefManager.setCharPref("extensions.seleniumbuilder.plugins.tb.username", username);
  bridge.prefManager.setCharPref("extensions.seleniumbuilder.plugins.tb.accesskey", accesskey);
};

tb.getBrowserConfigsPrefs = function() {
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserConfigs";
  try {
    return JSON.parse(bridge.prefManager.prefHasUserValue(prefName) ? bridge.prefManager.getCharPref(prefName) : "[]");
  } catch (e) {
    return [];
  }
};

tb.setBrowserConfigsPrefs = function(configs) {
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserConfigs";
  try {
    bridge.prefManager.setCharPref(prefName, JSON.stringify(configs));
  } catch (e) { /* ignore */ }
};

tb.getBrowserOptionPrefs = function() {
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserOptions_sel2";
  try {
    return JSON.parse(bridge.prefManager.prefHasUserValue(prefName) ? bridge.prefManager.getCharPref(prefName) : "{}");
  } catch (e) {
    return {};
  }
};

tb.setBrowserOptionPrefs = function(os, browser, version) {
  var prefs = tb.getBrowserOptionPrefs();
  prefs.os = os;
  if (!prefs.browsers) { prefs.browsers = {}; }
  if (!prefs.browsers[os]) { prefs.browsers[os] = {name: browser, versions: {}}; }
  prefs.browsers[os].name = browser;
  prefs.browsers[os].versions[browser] = version;
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserOptions_sel2";
  try {
    bridge.prefManager.setCharPref(prefName, JSON.stringify(prefs));
  } catch (e) { /* ignore */ }
};

tb.getBrowserOptionSettings = function() {
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserOptionSettings_sel2";
  try {
    return JSON.parse(bridge.prefManager.prefHasUserValue(prefName) ? bridge.prefManager.getCharPref(prefName) : "[]");
  } catch (e) {
    return [];
  }
};

tb.setBrowserOptionSettings = function(settings) {
  var prefName = "extensions.seleniumbuilder.plugins.tb.browserOptionSettings_sel2";
  try {
    bridge.prefManager.setCharPref(prefName, JSON.stringify(settings));
  } catch (e) { /* ignore */ }
};

tb.getAutoShowJobPage = function() {
  return bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.plugins.tb.autoshowjobpage") ? bridge.prefManager.getBoolPref("extensions.seleniumbuilder.plugins.tb.autoshowjobpage") : true;
};

tb.setAutoShowJobPage = function(asjp) {
  bridge.prefManager.setBoolPref("extensions.seleniumbuilder.plugins.tb.autoshowjobpage", asjp);
};

tb.getDoParallel = function() {
  return bridge.prefManager.prefHasUserValue("extensions.seleniumbuilder.plugins.tb.doparallel") ? bridge.prefManager.getBoolPref("extensions.seleniumbuilder.plugins.tb.doparallel") : true;
};

tb.setDoParallel = function(dp) {
  bridge.prefManager.setBoolPref("extensions.seleniumbuilder.plugins.tb.doparallel", dp);
};

tb.settingspanel = {};
/** The dialog. */
tb.settingspanel.dialog = null;
tb.settingspanel.open = false;

tb.settingspanel.browserListEntryID = 1;

tb.doparallel = tb.getDoParallel();
tb.breakpointsWereEnabled = true;
tb.restoreBreakpoints = false;
tb.restoreParallel = false;
tb.concurrency = 2;
tb.mac_concurrency = 2;

tb.storeAndDisableBreakpointsState = function() {
  if (!tb.restoreBreakpoints) {
    tb.breakpointsWereEnabled = builder.breakpointsEnabled;
    builder.breakpointsEnabled = false;
    tb.restoreBreakpoints = true;
  }
};

tb.restoreBreakpointsState = function() {
  if (tb.restoreBreakpoints) {
    builder.breakpointsEnabled = tb.breakpointsWereEnabled;
    tb.restoreBreakpoints = false;
  }
};

tb.addBrowserListEntry = function(tbBrowsersTree2, os, browser, version) {
  var v = '2';
  var tree = tbBrowsersTree2;
  var id = 'tb-browser-' + v + '-list-' + tb.settingspanel.browserListEntryID++;
  jQuery('#tb-browser-' + v + '-list').append(newNode('div', {'id': id},
    newNode('select', {'id': id + '-os'}), " ",
    newNode('select', {'id': id + '-browser'}), " ",
    newNode('select', {'id': id + '-version'}), " ",
    newNode('a', {'href': '#', 'click': function() { jQuery('#' + id).remove(); }}, 'x')
  ));
  tb.populateOSDropdown(id + "-os", tree, tb.getBrowserOptionPrefs());
  jQuery('#' + id + '-os').change(function() {
    tb.populateBrowserDropdown(id + "-browser", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val());
    tb.populateVersionDropdown(id + "-version", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val(), jQuery("#" + id + "-browser").val());
  });
  tb.populateBrowserDropdown(id + "-browser", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val());
  jQuery('#' + id + '-browser').change(function() {
    tb.populateVersionDropdown(id + "-version", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val(), jQuery("#" + id + "-browser").val());
  });
  tb.populateVersionDropdown(id + "-version", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val(), jQuery("#" + id + "-browser").val());
  if (os) {
    jQuery("#" + id + "-os").val(os);
    tb.populateBrowserDropdown(id + "-browser", tree, tb.getBrowserOptionPrefs(), os);
  }
  if (browser) {
    jQuery("#" + id + "-browser").val(browser);
    tb.populateVersionDropdown(id + "-version", tree, tb.getBrowserOptionPrefs(), jQuery("#" + id + "-os").val(), browser);
  }
  if (version) {
    jQuery("#" + id + "-version").val(version);
  }
};

// Callback takes success, list.
tb.getTunnels = function(username, accesskey, cb) {
  jQuery.ajax(
    "https://" + username + ":" + accesskey + "@api.testingbot.com/v1/tunnel/list",
    {
      "headers": {"Authorization": "Basic " + btoa(username + ":" + accesskey)},
      success: function(id_list) {
        if (id_list.length == 0) {
          cb(false);
          return;
        }
        return cb(true, id_list);
      },
      error: function() {
        cb(false);
      }
    }
  );
};

tb.updateTunnels = function(credentials) {
  tb.tunnelsLoaded = false;
  jQuery('#tb-tunnels-reload').removeClass('button').html(_t('__tb_reloading'));
  tb.getTunnels(credentials.username, credentials.accesskey, function(success, l) {
    jQuery('#tb-tunnels-list').html('');
    if (success && l[0]) {
      jQuery('#tb-tunnels-title').css('color', 'black');
      jQuery('#tb-tunnels-list').append(newNode('option', {'value': '--NO TUNNEL--'}, '--'));
      jQuery('#tb-tunnels-list').append(newNode('option', {'value': l[0].ip, 'selected': '1'}, l[0].ip));
    } else {
      jQuery('#tb-tunnels-title').css('color', '#333333');
      tb.tunnelInfos = [];
    }
    tb.tunnelsLoaded = true;
    jQuery('#tb-tunnels-reload').addClass('button').html(_t('__tb_reload'));
  });
};

tb.tunnelsLoaded = false;
tb.tunnelInfos = [];
tb.last_tunnel_identifier = null;

tb.getLimits = function(username, accesskey, cb) {
  jQuery.ajax(
    "https://" + username + ":" + accesskey + "@api.testingbot.com/v1/user",
    {
      "headers": {"Authorization": "Basic " + btoa(username + ":" + accesskey)},
      success: function(ajr) {
        tb.concurrency = ajr.max_concurrent;
        tb.mac_concurrency = tb.concurrency;
        cb();
      },
      error: function() {
        cb();
      }
    }
  );
};

tb.settingspanel.show = function(callback) {
  if (tb.settingspanel.open) { return; }
  tb.settingspanel.open = true;
  jQuery('#edit-rc-connecting').show();
  jQuery('#edit-panel').css('height', '29px');
  jQuery.ajax(
    "https://api.testingbot.com/v1/browsers?type=webdriver",
    {
      success: function(tbBrowsers2) {
        var tbBrowsersTree2 = tb.browserOptionTree(tbBrowsers2);
  
        jQuery('#edit-rc-connecting').hide();
        jQuery('#edit-panel').css('height', '');
        var credentials = tb.getCredentials();
        
        tb.settingspanel.dialog =
          newNode('div', {'class': 'dialog'},
            newNode('h3', _t('__tb_settings')),
            newNode('table', {style: 'border: none;', id: 'rc-options-table'},
              newNode('tr',
                newNode('td', _t('__tb_username') + " "),
                newNode('td', newNode('input', {id: 'tb-key', type: 'text', value: credentials.username, 'change': function() {
                  if (jQuery('#tb-key').val() == "") {
                    jQuery('#tb-account-link').show();
                  } else {
                    jQuery('#tb-account-link').hide();
                  }
                }}))
              ),
              newNode('tr',
                newNode('td', _t('__tb_access_key') + " "),
                newNode('td', newNode('input', {id: 'tb-secret', type: 'text', value: credentials.accesskey}))
              ),
              newNode('tr',
                newNode('td', ""),
                newNode('td', newNode('a', {'href': 'https://testingbot.com/members/user/edit', 'target': '_blank'}, "(" + _t('__tb_lookup_access_key') + ")"))
              ),
              newNode('tr', {'id': 'tb-account-link'},
                newNode('td', ""),
                newNode('td', newNode('a', {'href': 'https://testingbot.com/users/sign_up', 'target': '_blank'}, "(" + _t('__tb_get_account') + ")"))
              ),
              newNode('tr', {'id': 'tb-tunnels-tr'},
                newNode('td', {'style': 'color: #666666', 'id': 'tb-tunnels-title'}, _t('__tb_tunnels')),
                newNode('td', newNode('select', {'id': 'tb-tunnels-list'}), " ", newNode('a', {'class': 'button', 'id': 'tb-tunnels-reload', 'click': function() { if (tb.tunnelsLoaded) { tb.updateTunnels(credentials); } }}, _t('__tb_reload')))
              ),
              newNode('tr', {'id': 'tb-browser-configs-list-tr'},
                newNode('td', _t('__tb_configs')),
                newNode('td', newNode('select', {'id': 'tb-browser-configs-list', 'change': function() { tb.browserConfigSelected(tbBrowsersTree2); }}), " ", newNode('a', {'class': 'button', 'id': 'tb-browser-configs-delete', 'click': tb.deleteBrowserConfig }, _t('__tb_delete_config')))
              ),
              newNode('tr', {'id': 'tb-browser-2-tr'},
                newNode('td', {'style': 'vertical-align: top;'}, _t('__tb_browser_2') + " "),
                newNode('td',
                  newNode('div', {'id': 'tb-browser-2-list'}),
                  newNode('p', newNode('a', {'class': 'button', 'id': 'tb-browser-2-list-add', 'click': function() {tb.addBrowserListEntry(tbBrowsersTree2);}}, _t('__tb_add_config_line')))
                )
              ),
              newNode('tr', {'id': 'tb-browser-configs-buttons-tr'},
                newNode('td', ''),
                newNode('td', newNode('a', {'class': 'button', 'id': 'tb-browser-configs-add', 'click': function() { tb.addBrowserConfig(); } }, _t('__tb_add_config')))
              ),
              newNode('tr',
                newNode('td', {'colspan': 2}, newNode('input', {'type':'checkbox', 'id': 'tb-showjobpage'}), _t('__tb_auto_show_job'))
              ),
              newNode('tr',
                newNode('td', {'colspan': 2}, newNode('input', {'type':'checkbox', 'id': 'tb-parallel'}), builder.doShareSuiteState() ? _t('__tb_parallel_disabled') : _t('__tb_parallel', tb.concurrency))
              )
            ),
            newNode('a', {'href': '#', 'class': 'button', 'id': 'tb-ok', 'click': function() {
              var username = jQuery('#tb-key').val();
              var accesskey = jQuery('#tb-secret').val();
              tb.setCredentials(username, accesskey);
              
              var tunnel_identifier = jQuery('#tb-tunnels-list').val();
              if (tunnel_identifier == '--NO TUNNEL--') { tunnel_identifier = null; }
              tb.last_tunnel_identifier = tunnel_identifier;
              
              var dropdownValues = [];
              jQuery('#tb-browser-2-list select').each(function(i, dropdown) {
                dropdownValues.push(jQuery(dropdown).val());
              });
              if (dropdownValues.length > 0) { tb.setBrowserOptionSettings(dropdownValues); }
              var browsers2 = [];
              for (var i = 0; i < dropdownValues.length; i += 3) {
                tb.setBrowserOptionPrefs(true, dropdownValues[i], dropdownValues[i + 1], dropdownValues[i + 2]);
                var option = tb.getBrowserOptionChoice(tbBrowsersTree2, dropdownValues[i], dropdownValues[i + 1], dropdownValues[i + 2]);
                browsers2.push({'username': username, 'accesskey': accesskey, 'browserstring2': option.name, 'browserversion2': option.version, 'platform2': option.platform, 'name': [dropdownValues[i], dropdownValues[i + 1], dropdownValues[i + 2]].join(" "), 'tunnel_identifier': tunnel_identifier});
              }
              tb.setAutoShowJobPage(!!jQuery('#tb-showjobpage').prop('checked'));
              tb.setDoParallel(!!jQuery('#tb-parallel').prop('checked'));
              tb.doparallel = !!jQuery('#tb-parallel').prop('checked') && !builder.doShareSuiteState();
              if (tb.doparallel) {
                tb.storeAndDisableBreakpointsState();
              }
              tb.settingspanel.hide();
              if (callback) {
                callback({
                  'username': username,
                  'accesskey': accesskey,
                  'sel2': browsers2
                });
              }
            }}, _t('ok')),
            newNode('a', {'href': '#', 'class': 'button', 'id': 'tb-cancel', 'click': function() {
              tb.settingspanel.hide();
            }}, _t('cancel'))
          );
        builder.dialogs.show(tb.settingspanel.dialog);
        if (tb.runall.playing && callback) {
          jQuery('#tb-ok').hide(); // Make the OK button for starting a new run invisible.
        }
        if (tb.getAutoShowJobPage()) {
          jQuery('#tb-showjobpage').prop('checked', true);
        }
        if (tb.getDoParallel() || tb.restoreParallel) {
          jQuery('#tb-parallel').prop('checked', true);
          tb.restoreParallel = false;
        }
        if (builder.doShareSuiteState()) {
          jQuery('#tb-parallel').prop('disabled', true);
        }
        // Populate dialog.
        if (credentials.username != "") {
          jQuery('#tb-account-link').hide();
        }
        var settings = tb.getBrowserOptionSettings(true);
        if (settings.length == 0) {
          tb.addBrowserListEntry(tbBrowsersTree2);
        } else {
          for (var i = 0; i < settings.length; i += 3) {
            tb.addBrowserListEntry(tbBrowsersTree2, settings[i], settings[i + 1], settings[i + 2]);
          }
        }
        tb.populateConfigsOptions();
        tb.updateTunnels(credentials);
      },
      error: function(xhr, textStatus, errorThrown) {
        jQuery('#edit-rc-connecting').hide();
        alert(_t('__tb_connection_error', errorThrown));
      }
    }
  );
};

tb.addBrowserConfig = function() {
  var cname = prompt(_t('__tb_config_name_prompt'));
  if (cname && cname.length > 0) {
    var cfg = {
      'name': cname
    };
    var dropdownValues = [];
    jQuery('#tb-browser-2-list select').each(function(i, dropdown) {
      dropdownValues.push(jQuery(dropdown).val());
    });
    var browsers2 = [];
    for (var i = 0; i < dropdownValues.length; i += 3) {
      browsers2.push([dropdownValues[i], dropdownValues[i + 1], dropdownValues[i + 2]]);
    }
    cfg.sel2 = browsers2;
    
    var configs = tb.getBrowserConfigsPrefs();
    
    var sameNameIndex = -1;
    for (var i = 0; i < configs.length; i++) { if (configs[i].name == cname) { sameNameIndex = i; }}
    if (sameNameIndex != -1) {
      if (confirm(_t('__tb_config_replace_prompt', cname))) {
        configs[sameNameIndex] = cfg;
        tb.setBrowserConfigsPrefs(configs);
        jQuery('#tb-browser-configs-list').val(sameNameIndex);
      }
    } else {
      configs.push(cfg);
      tb.setBrowserConfigsPrefs(configs);
      jQuery('#tb-browser-configs-list').append(newNode('option', {'value': configs.length - 1}, cfg.name));
      jQuery('#tb-browser-configs-list').val(configs.length - 1);
    }
  }
};

tb.browserConfigSelected = function(tbBrowsersTree2) {
  var indexVal = parseInt(jQuery('#tb-browser-configs-list').val());
  if (indexVal > -1) {
    var configs = tb.getBrowserConfigsPrefs();
    jQuery('#tb-browser-2-list div').remove();
    configs[indexVal].sel2.forEach(function(cfg) {
      tb.addBrowserListEntry(tbBrowsersTree2, cfg[0], cfg[1], cfg[2]);
    });
  }
};

tb.deleteBrowserConfig = function() {
  var currentConfigIndex = jQuery('#tb-browser-configs-list').val();
  if (currentConfigIndex > -1 && confirm(_t('__tb_confirm_delete_config'))) {
    jQuery('#tb-browser-configs-list option').remove();
    var configs = tb.getBrowserConfigsPrefs();
    configs.splice(currentConfigIndex, 1);
    tb.setBrowserConfigsPrefs(configs);
    tb.populateConfigsOptions();
  }
};

tb.populateConfigsOptions = function() {
  var cfs = tb.getBrowserConfigsPrefs();
  var index = 0;
  jQuery('#tb-browser-configs-list').append(newNode('option', {'value': -1}, '--'));
  cfs.forEach(function(cfg) {
    jQuery('#tb-browser-configs-list').append(newNode('option', {'value': index}, cfg.name));
    index++;
  });
};

tb.browserOptionName = function(entry) {
  return entry.name + " " + entry.version + " " + _t('__tb_on_os') + " " + entry.platform;
};

tb.browserOptionTree = function(entries) {
  var tree = {};
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    if (!tree[e.platform]) {
      tree[e.platform] = {
        name: e.platform,
        browsers: {}
      };
    }
    if (!tree[e.platform].browsers[e.name]) {
      tree[e.platform].browsers[e.name] = {
        name: e.name,
        versions: {}
      };
    }
    if (!tree[e.platform].browsers[e.name].versions[e.version]) {
      tree[e.platform].browsers[e.name].versions[e.version] = {
        name: e.version,
        entry: e,
        id: i
      };
    }
  }
  return tree;
};

tb.populateOSDropdown = function(id, tree, prefs) {
  var def = tb.getDefaultOSChoice(prefs);
  jQuery('#' + id).html('');
  for (var k in tree) {
    var osName = k.replace('Windows', 'Win');
    if (k == def) {
      jQuery('#' + id).append(newNode("option", {value: k, selected: "1"}, osName));
    } else {
      jQuery('#' + id).append(newNode("option", {value: k}, osName));
    }
  }
};

tb.populateBrowserDropdown = function(id, tree, prefs, os) {
  var def = tb.getDefaultBrowserChoice(prefs, tree, os);
  jQuery('#' + id).html('');
  for (var k in tree[os].browsers) {
    var browserName = k.replace(/Samsung|Motorola|Emulator/g, '');
    if (k == def) {
      jQuery('#' + id).append(newNode("option", {value: k, selected: "1"}, browserName));
    } else {
      jQuery('#' + id).append(newNode("option", {value: k}, browserName));
    }
  }
};

tb.populateVersionDropdown = function(id, tree, prefs, os, browser) {
  var def = tb.getDefaultVersionChoice(prefs, tree, os, browser);
  jQuery('#' + id).html('');
  for (var k in tree[os].browsers[browser].versions) {
    if (k == def) {
      jQuery('#' + id).append(newNode("option", {value: k, selected: "1"}, k));
    } else {
      jQuery('#' + id).append(newNode("option", {value: k}, k));
    }
  }
};

tb.getBrowserOptionChoice = function(tree, os, browser, version) {
  return tree[os] && tree[os].browsers[browser] && tree[os].browsers[browser].versions[version] ? tree[os].browsers[browser].versions[version].entry : null;
};

tb.getDefaultOSChoice = function(prefs) {
  return prefs.os || "VISTA";
};

tb.getDefaultBrowserChoice = function(prefs, tree, os) {
  if (prefs.browsers && prefs.browsers[os]) { return prefs.browsers[os].name; }
  if (tree[os] && tree[os].browsers["Firefox"]) { return "Firefox"; }
  return null;
};

function padVersionString(s) {
  return s.split(".").map(function(n) { return new Array(100 - n.length).join("0") + n; }).join(".");
}

tb.getDefaultVersionChoice = function(prefs, tree, os, browser) {
  if (prefs.browsers && prefs.browsers[os] && prefs.browsers[os].versions && prefs.browsers[os].versions[browser]) { return prefs.browsers[os].versions[browser]; }
  if (tree[os] && tree[os].browsers[browser]) {
    var v = null;
    for (var k in tree[os].browsers[browser].versions) {
      if (v == null || padVersionString(v) < padVersionString(k)) { v = k; }
    }
    return v;
  }
  return null;
};

tb.settingspanel.hide = function() {
  jQuery(tb.settingspanel.dialog).remove();
  tb.settingspanel.dialog = null;
  tb.settingspanel.open = false;
};

tb.runSel2ScriptWithSettings = function(result, callback, run) {
  jQuery('#edit-rc-connecting').show();
  jQuery.ajax(
    "https://" + result.username + ":" + result.accesskey + "@api.testingbot.com/v1/user/",
    {
      "headers": {"Authorization": "Basic " + btoa(result.username + ":" + result.accesskey)},
      success: function(ajresult) {
        builder.suite.switchToScript(run.index);
        builder.stepdisplay.update();
        jQuery('#edit-rc-connecting').hide();
        if (ajresult.seconds <= 0) {
          alert(_t('__tb_account_exhausted'));
        } else {  
          if (run.stopRequested) {
            if (!tb.doparallel) { builder.views.script.onEndRCPlayback(); }
            jQuery("#script-num-" + run.runIndex).css('background-color', '#cccccc'); 
            jQuery("#script-num-" + run.runIndex + "-error").html(_t("__tb_run_stopped")).show();
            return;
          }
          if (!tb.doparallel) { builder.views.script.onStartRCPlayback(); }
          
          var settings = {
            hostPort: result.username + ":" + result.accesskey + "@hub.testingbot.com:80",
            browserstring: result.browserstring2,
            browserversion: result.browserversion2,
            platform: result.platform2
          };
          
          if (result.tunnel_identifier) {
            settings['tunnel-identifier'] = result.tunnel_identifier;
            settings['hostPort'] = result.username + ":" + result.accesskey + "@localhost:4445";
          }
          
          var postRunCallback = function (runResult) {
            run.complete = true;
            if (!tb.doparallel) { builder.views.script.onEndRCPlayback(); }
            tb.runall.checkComplete();
            var data = null;
            if (runResult.success || !runResult.errormessage) {
              data = {"test[success]": runResult.success};
            } else {
              data = {"test[success]": runResult.success, 'test[extra]': {'playback-error': runResult.errormessage}};
            }
            jQuery.ajax("https://" + result.username + ":" + result.accesskey + "@api.testingbot.com/v1/tests/" + run.sessionId, {
              "headers": {"Authorization": "Basic " + btoa(result.username + ":" + result.accesskey)},
              "type": "PUT",
              "data": data
            });
            if (callback) {
              callback(runResult);
            }
          };
          
          var jobStartedCallback = function(response) {
            if (!tb.doparallel) { builder.views.script.onConnectionEstablished(); }
            run.sessionId = response.sessionId;
            if (tb.getAutoShowJobPage()) {
              window.open("https://testingbot.com/members/tests/" + response.sessionId,'_newtab');
            } else if (!tb.doparallel) {
              var lnk = newNode('div', {'class': 'dialog', 'style': 'padding-top: 30px;'},
                newNode('a', {'href': "https://testingbot.com/members/tests/" + response.sessionId, 'target': '_newtab'}, "Show job info")
              );
              builder.dialogs.show(lnk);
              var hide = function() { jQuery(lnk).remove(); builder.views.script.removeClearResultsListener(hide); };
              builder.views.script.addClearResultsListener(hide);
            }
          };
          if (run.reuseSession) {
            jobStartedCallback = function() {};
          }
          
          var stepStateCallback = builder.stepdisplay.updateStepPlaybackState;
          if (tb.doparallel) {
            stepStateCallback = function(r, script, step, stepIndex, state, message, error, percentProgress) {
              tb.runall.updateScriptPlaybackState(run.runIndex, r, script, step, stepIndex, state, message, error, percentProgress);
            };
          }
          
          var initialVars = run.initialVars;
          
          var pausedCallback = tb.doparallel ? null : builder.views.script.onPauseRCPlayback;
          
          var preserveRunSession = run.preserveRunSession;
          
          if (run.reuseSession) {
            run.playbackRun = builder.selenium2.rcPlayback.runReusing(
              run.prevRun.playbackRun,
              postRunCallback,
              jobStartedCallback,
              stepStateCallback,
              initialVars,
              pausedCallback,
              preserveRunSession
            );
          } else {
            run.playbackRun = builder.selenium2.rcPlayback.run(
              settings,
              postRunCallback,
              jobStartedCallback,
              stepStateCallback,
              initialVars,
              pausedCallback,
              preserveRunSession
            );
          }
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        jQuery('#edit-rc-connecting').hide();
        alert(_t('__tb_ondemand_connection_error', errorThrown));
      }
    }
  );
};

builder.registerPostLoadHook(function() {  
  builder.gui.menu.addItem('file', _t('__tb_settings'), 'file-tb-settings', function() { tb.settingspanel.show(); });

  builder.gui.menu.addItem('run', _t('__tb_run_ondemand'), 'run-tb-ondemand', function() {
    jQuery('#edit-rc-connecting').show();
    tb.settingspanel.show(function(result) {
      tb.runall.run(result, false, result.username, result.accesskey);
    });
  });
  
  builder.gui.menu.addItem('run', _t('__tb_run_suite_ondemand'), 'run-suite-ondemand', function() {
    jQuery('#edit-rc-connecting').show();
    tb.settingspanel.show(function(result) {
      tb.runall.run(result, true, result.username, result.accesskey);
    });
  });
});

// Add Java exporters that talk to the TestingBot infrastructure.
var to_add = [];
for (var name in builder.selenium2.io.lang_infos) {
  if (name.startsWith && name.startsWith("Java")) {
    to_add.push(name);
  }
}

function createDerivedInfo(name) {
  builder.selenium2.io.addDerivedLangFormatter(name, {
    name: name + "/TestingBot",
    get_params: function(script, callback) { tb.settingspanel.show(function(response) {
      response = response.sel2[0];
      if (response.browserstring2 == "internet explorer") {
        response.browserstring2 = "internetExplorer";
      }
      callback(response);
    }); },
    extraImports:
      "import java.net.URL;\n" +
      "import org.openqa.selenium.remote.DesiredCapabilities;\n" +
      "import org.openqa.selenium.remote.RemoteWebDriver;\n",
    driverVar:
      "RemoteWebDriver wd;",
    initDriver:
      "DesiredCapabilities caps = DesiredCapabilities.{browserstring2}();\n" +
      "            caps.setCapability(\"name\", \"{scriptName}\");\n" +
      "        wd = new RemoteWebDriver(\n" +
      "            new URL(\"http://{username}:{accesskey}@hub.testingbot.com:80/wd/hub\"),\n" +
      "            caps);"
  });
}

for (var i = 0; i < to_add.length; i++) {
  createDerivedInfo(to_add[i]);
}

// Run suite feature
/**
 * Dialog that runs all scripts in the suite and keeps track of scripts being run.
 */
tb.runall = {};
tb.runall.dialog = null;

tb.runall.scriptNames = [];
tb.runall.runs = [];
tb.runall.macRunIndex = -1;
tb.runall.nonmacRunIndex = -1;
tb.runall.mac_runs = [];
tb.runall.nonmac_runs = [];

tb.runall.info_p = null;
tb.runall.scriptlist = null;
tb.runall.stop_b = null;
tb.runall.close_b = null;

tb.runall.requestStop = false;
tb.runall.playing = false;

tb.runall.settings = null;

function makeViewResultLink(sid) {
  return newNode('a', {'class':"step-view", id:sid + "-view", style:"display: none", click: function(e) {
    window.bridge.getRecordingWindow().location = this.href;
    // We don't actually want the SB window to navigate to the script's page!
    e.preventDefault();
  }}, _t('view_run_result'));
}

tb.runall.run = function(settings, runall, username, accesskey) {
  if (tb.runall.playing) { return; }
  tb.runall.hide();
  tb.runall.playing = true;
  jQuery('#edit-suite-editing').hide();
  tb.runall.requestStop = false;
  
  var scripts = [];
  var scriptIndexes = [];
  if (runall) {
    for (var i = 0; i < builder.suite.getScriptNames().length; i++) { scriptIndexes.push(i); }
    scripts = builder.suite.scripts;
  } else {
    scriptIndexes = [builder.suite.getSelectedScriptIndex()];
    scripts = [builder.getScript()];
  }
  tb.runall.scriptNames = builder.suite.getScriptNames();
  builder.dialogs.runall.getAllRows(scripts, function(scriptsIndexToRows) {
    tb.runall.runs = [];
    tb.runall.mac_runs = [];
    tb.runall.nonmac_runs = [];
    
    var runIndex = 0;
    var prevRun = null;
    
    for (var settingsIndex = 0; settingsIndex < settings.sel2.length; settingsIndex++) {
      for (var scriptIndex = 0; scriptIndex < scriptIndexes.length; scriptIndex++) {
        var script = builder.suite.scripts[scriptIndexes[scriptIndex]];
        var rows = scriptsIndexToRows[scriptIndex];
        for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          var row = rows[rowIndex];
          var name = tb.runall.scriptNames[scriptIndexes[scriptIndex]] + " " + settings.sel2[settingsIndex].name;
          if (rows.length > 1) {
            name += " " + _t('row', rowIndex);
          }
          var isMac = settings.sel2[settingsIndex].platform2.startsWith("Mac");
          var firstSuiteRun = scriptIndex == 0 && rowIndex == 0;
          var lastSuiteRun = scriptIndex == scriptIndexes.length - 1 && rowIndex == rows.length - 1;
          var new_run = {
            'name': name,
            'script': script,
            'settings': settings.sel2[settingsIndex],
            'index': scriptIndexes[scriptIndex],
            'sessionId': null,
            'complete': false,
            'runIndex': runIndex++,
            'mac': isMac,
            'playbackRun': null,
            'seleniumVersion': script.seleniumVersion,
            'stopRequested': false,
            'initialVars': row,
            'prevRun': prevRun,
            'reuseSession': builder.doShareSuiteState() && !firstSuiteRun,
            'preserveRunSession': builder.doShareSuiteState() && !lastSuiteRun
          };
          prevRun = new_run;
          tb.runall.runs.push(new_run);
          (isMac ? tb.runall.mac_runs : tb.runall.nonmac_runs).push(new_run);
        }
      }
      prevRun = null;
    }
      
    tb.runall.info_p = newNode('p', {id:'infop'}, _t('running_scripts'));
  
    // Display the scripts in a similar fashion to the steps are shown in the record interface.
    tb.runall.scriptlist = newFragment();
  
    for (var i = 0; i < tb.runall.runs.length; i++) {
      var name = tb.runall.runs[i].name;
      var sid = 'script-num-' + i;

      tb.runall.scriptlist.appendChild(
        newNode('div', {id: sid, 'class': 'b-suite-playback-script', style: 'padding: 2px; padding-left: 5px; padding-right: 5px; margin-bottom: 1px; border-radius: 5px;'},
          newNode('div',
            newNode('span', {}, name),
            makeViewResultLink(sid),
            newNode('div', {style:"width: 100px; height: 3px; background: #333333; display: none", id: i + "-run-progress-done"}),
            newNode('div', {style:"width: 0px; height: 3px; background: #bbbbbb; position: relative; top: -3px; left: 100px; display: none", id: i + "-run-progress-notdone"})
          ),
          newNode('div', {'class':"step-error", id:sid + "-error", style:"display: none"})
        )
      );
    }
  
    tb.runall.stop_b = newNode('a', _t('stop'), {
      'class': 'button',
      click: function () {
        tb.runall.stoprun();
      },
      href: '#stop'
    });
  
    tb.runall.close_b = newNode('a', _t('close'), {
      'class': 'button',
      click: function () {
        tb.runall.hide();
      },
      href: '#close'
    });
  
    tb.runall.dialog = newNode('div', {'class': 'dialog'});
    jQuery(tb.runall.dialog)
      .append(tb.runall.info_p)
      .append(tb.runall.scriptlist)
      .append(newNode('p',
        newNode('span', {id: 'suite-playback-stop'}, tb.runall.stop_b),
        newNode('span', {id: 'suite-playback-close', style: 'display: none;'}, tb.runall.close_b)
      ));
      
    tb.runall.macRunIndex = -1; // Will get incremented to 0 in runNext.
    tb.runall.nonmacRunIndex = -1; // Will get incremented to 0 in runNext.
    
    if (tb.runall.runs.length == 1 && tb.doparallel) {
      tb.doparallel = false;
      tb.restoreParallel = true; // Only turning off parallel for this run.
      tb.runall.dialog = null;
    } else {
      builder.dialogs.show(tb.runall.dialog);
    }
  
    if (tb.doparallel) {
      tb.getLimits(username, accesskey, function() {
        var macEnabled = Math.min(tb.mac_concurrency, tb.runall.mac_runs.length);
        var nonMacEnabled = Math.min(tb.concurrency - macEnabled, tb.runall.nonmac_runs.length);
        for (var i = 0; i < macEnabled; i++) {
          tb.runall.runNext(/*mac*/true);
        }
        for (var i = 0; i < nonMacEnabled; i++) {
          tb.runall.runNext(/*mac*/false);
        }
      });
    } else {
      tb.runall.runNext();
    }
  });
};

tb.runall.updateScriptPlaybackState = function(runIndex, run, script, step, stepIndex, state, message, error, percentProgress) {
  if (state == builder.stepdisplay.state.SUCCEEDED || state == builder.stepdisplay.state.FAILED || state == builder.stepdisplay.state.ERROR)
  {
    tb.runall.setprogress(runIndex, 1 + (stepIndex + 1) * 99 / script.steps.length);
  }
};

tb.runall.setprogress = function(runIndex, percent) {
  if (percent == 0) {
    jQuery('#' + runIndex + '-run-progress-done').css('width', 0).hide();
    jQuery('#' + runIndex + '-run-progress-notdone').css('left', 0).css('width', 100).hide();
  } else {
    jQuery('#' + runIndex + '-run-progress-done').css('width', percent).show();
    jQuery('#' + runIndex + '-run-progress-notdone').css('left', percent).css('width', 100 - percent).show();
  }
};

tb.runall.stoprun = function() {
  jQuery(tb.runall.info_p).html(_t('__tb_stopping'));
  tb.runall.requestStop = true;
  jQuery('#suite-playback-stop').hide();
  tb.runall.runs.forEach(function (run) {
    run.stopRequested = true;
    if (run.playbackRun) {
      run.seleniumVersion.rcPlayback.stopTest(run.playbackRun);
    }
  });
};

tb.runall.processResult = function(result, runIndex) {
  tb.runall.setprogress(runIndex, 0);
  if (result.url) {
    jQuery("#script-num-" + runIndex + "-view").attr('href', result.url).show();
  }
  if (tb.runall.runs[runIndex].stopRequested) {
    jQuery("#script-num-" + runIndex).css('background-color', '#cccccc'); 
    jQuery("#script-num-" + runIndex + "-error").html(_t("__tb_run_stopped")).show();
  } else {
    if (result.success) {
      jQuery("#script-num-" + runIndex).css('background-color', '#bfee85');
    } else {
      if (result.errormessage) {
        jQuery("#script-num-" + runIndex).css('background-color', '#ff3333');
        jQuery("#script-num-" + runIndex + "-error").html(" " + result.errormessage).show();
      } else {
        jQuery("#script-num-" + runIndex).css('background-color', '#ffcccc');
      }
    }
  }
  tb.runall.runs[runIndex].complete = true;
  tb.runall.runNext(tb.runall.runs[runIndex].mac);
};

tb.runall.hide = function () {
  jQuery(tb.runall.dialog).remove();
};

tb.runall.allComplete = function() {
  if (tb.runall.requestStop) {
    for (var i = 0; i < tb.runall.runs.length; i++) {
      if (!tb.runall.runs[i].complete && tb.runall.runs[i].playbackRun) { return false; }
    }
  } else {
    for (var i = 0; i < tb.runall.runs.length; i++) {
      if (!tb.runall.runs[i].complete) { return false; }
    }
  }
  return true;
};

tb.runall.checkComplete = function() {
  if (tb.runall.allComplete()) {
    tb.restoreBreakpointsState();
    tb.runall.playing = false;
    jQuery('#tb-ok').show(); // Make the OK button for starting a new run visible.
    jQuery('#suite-playback-stop').hide();
    jQuery('#suite-playback-close').show();
    jQuery(tb.runall.info_p).html(_t('done_exclamation'));
    jQuery('#edit-suite-editing').show();
  }
};

tb.runall.runNext = function(mac) {
  if (tb.doparallel) {
    // respect mac-ness
    if (mac) {
      tb.runall.macRunIndex++;
      if (tb.runall.macRunIndex < tb.runall.mac_runs.length && !tb.runall.requestStop) {
        tb.runall.runScript(tb.runall.runs.indexOf(tb.runall.mac_runs[tb.runall.macRunIndex]));
        return;
      }
    }
    tb.runall.nonmacRunIndex++;
    if (tb.runall.nonmacRunIndex < tb.runall.nonmac_runs.length && !tb.runall.requestStop) {
      tb.runall.runScript(tb.runall.runs.indexOf(tb.runall.nonmac_runs[tb.runall.nonmacRunIndex]));
    } else {
      tb.runall.checkComplete();
    }
  } else {
    // just pick one or the other
    tb.runall.macRunIndex++;
    if (tb.runall.macRunIndex < tb.runall.mac_runs.length && !tb.runall.requestStop) {
      tb.runall.runScript(tb.runall.runs.indexOf(tb.runall.mac_runs[tb.runall.macRunIndex]));
    } else {
      tb.runall.nonmacRunIndex++;
      if (tb.runall.nonmacRunIndex < tb.runall.nonmac_runs.length && !tb.runall.requestStop) {
        tb.runall.runScript(tb.runall.runs.indexOf(tb.runall.nonmac_runs[tb.runall.nonmacRunIndex]));
      } else {
        tb.runall.checkComplete();
      }
    }
  }
};

tb.runall.runScript = function(runIndex) {
  jQuery("#script-num-" + runIndex).css('background-color', '#ffffaa');
  tb.runSel2ScriptWithSettings(tb.runall.runs[runIndex].settings, function(result) { tb.runall.processResult(result, runIndex); }, tb.runall.runs[runIndex]);
};

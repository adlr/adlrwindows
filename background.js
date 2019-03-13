// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var moveWindows = function(workarea) {
  var maximize = workarea.width < 1700;
  //console.log('wa:' + workarea.width);
  var startpos = [200, 62, 1225, 954];
  var offset = [32, 32];
  chrome.windows.getAll({populate: true, windowTypes: ["normal", "popup", "panel", "app", "devtools"]}, function(windows) {
    for (var i in windows) {
      var wind = windows[i];
      //console.log(wind.type + ' [' + wind.left + ', ' + wind.top + ', ' + wind.width + ', ' + wind.height +']');
      //console.log(wind);
      if (wind.type == 'normal') {
        if (maximize) {
          chrome.windows.update(wind.id, {left: workarea.left + 10, top: workarea.top + 10, width: workarea.width - 20, height: workarea.height - 20, state: 'normal'},
             function(window) {
               setTimeout(function(){
                chrome.windows.update(wind.id, {width: workarea.width - 1}, function() {
                  chrome.windows.update(wind.id, {state: 'maximized'});
                });
               }, 500);
             });
          // chrome.windows.update(wind.id, {width: workarea.width - 1}, function() {
          //   chrome.windows.update(wind.id, {state: 'maximized'});
          // });
        } else {
          chrome.windows.update(wind.id, {left: startpos[0], top: startpos[1], width: startpos[2], height: startpos[3], state: 'normal'});
          startpos[0] += offset[0];
          startpos[1] += offset[1];
        }
      }
    }
    //console.log(windows);
  })
};

chrome.browserAction.onClicked.addListener(function(tab) {
  //console.log('adlr');
  chrome.system.display.getInfo(function(displayinfo) {
    //console.log('x');
    //console.log(displayinfo);
    for (var i in displayinfo) {
      if (displayinfo[i].isPrimary) {
        moveWindows(displayinfo[i].workArea);
        break;
      }
    }
  });
  //chrome.tabs.create({url:chrome.extension.getURL("tabs_api.html")});
});

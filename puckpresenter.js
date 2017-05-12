var kb = require("ble_hid_keyboard");
NRF.setServices(undefined, { hid : kb.report });

function buttonHandler(e) {
  var useLED;
  if(measureHold(e) > 0.5) {
    useLED = LED1;
    useLED.write(true);
    kb.tap(kb.KEY.LEFT, 0, function() {
      console.log("HOLD");
    });
  } else {
    useLED = LED2;
    useLED.write(true);
    kb.tap(kb.KEY.RIGHT, 0, function() {
      console.log("CLICK");
    });
  }
  setTimeout(function() {
    useLED.write(false);
  }, 250);
}

function measureHold(e) {
  return e.time-e.lastTime;
}

setWatch(buttonHandler, BTN, {edge:"falling", repeat:true, debounce:50});

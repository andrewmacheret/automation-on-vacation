const Bulb = require('tplink-lightbulb')

const SCAN_TIME = 5000; // 5 sec
const GRACE_TIME = 1000; // 1 sec
const MIN_TIME = 5 * 1000; // 5 min
const MAX_TIME = 60 * 60 * 1000; // 60 min

const lights = {};

const scan = Bulb.scan()
  .on('light', light => {
    //console.log(light);
    console.log(light._info.address, '-', light.name)
    lights[light.name] = light;
  })
setTimeout(() => { scan.stop() }, SCAN_TIME)

/*
// if scan fails, use this
var lights = {
  'Low Life':   new Bulb('192.168.0.129'),
  'Alfa Romeo': new Bulb('192.168.0.163'),
  'High Life':  new Bulb('192.168.0.101'),
  'Desert Fox': new Bulb('192.168.0.117')
};
*/

setTimeout(() => {

  for (var name in lights) {
    ((name) => {
      console.log('STARTING: ' + name);
      var state = true;

      const repeatMe = () => {

        console.log('SETTING ' + name + ' TO ' + state);
        lights[name].set(state, 0)
          .then(r => {
            if (r.err_code !== 0) {
              console.log('FAILURE', r);
            }
          })

        state = !state;

        var delay = Math.random() * (MAX_TIME - MIN_TIME) + MIN_TIME;
        console.log('TIME TO CHANGE ' + name + ' to ' + state + ': ' + delay);

        setTimeout(repeatMe, delay);
      };
      repeatMe();
    })(name);
  }

}, SCAN_TIME + GRACE_TIME);

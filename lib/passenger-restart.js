var CompositeDisposable, PassengerRestart;

fs = require('fs');
path = require('path');
touch = require('touch');

CompositeDisposable = require('atom').CompositeDisposable;

module.exports = PassengerRestart = {
  
  subscriptions: null,
  
  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
    return this.subscriptions.add(atom.commands.add('atom-workspace', {
      'passenger-restart:restart': (function(_this) {
        return function() {
          return _this.restart();
        };
      })(this)
    }));
  },
  
  deactivate: function() {
    return this.passengerRestartView.destroy();
  },
  
  restart: function() {
    var tmpPath, tmpFile;
    
    atom.project.getDirectories().forEach(function(directory) {
      tmpPath = path.join(directory.realPath, 'tmp');
      
      if (fs.statSync(tmpPath).isDirectory()) {
        tmpFile = path.join(tmpPath, 'restart.txt');
        
        touch(tmpFile);
        
        atom.notifications.addSuccess("Passenger application restarted", {
          detail: `touch ${tmpFile}`
        });
      }
    });
  }
};

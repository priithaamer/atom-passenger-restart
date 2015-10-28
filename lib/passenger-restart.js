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
    var editor = atom.workspace.getActivePaneItem();
    
    atom.project.getDirectories().forEach(function(directory) {
      var tmpFile,
          tmpPath = path.join(directory.path, 'tmp'),
          basename = path.basename(directory.path);
      
      if (fs.existsSync(tmpPath) && fs.statSync(tmpPath).isDirectory()) {
        if (editor) {
          if (directory.contains(editor.buffer.file.path)) {
            tmpFile = path.join(tmpPath, 'restart.txt');
          }
        } else {
          tmpFile = path.join(tmpPath, 'restart.txt');
        }
        
        if (tmpFile) {
          touch(tmpFile);
          
          atom.notifications.addSuccess(`${basename} restarted`, {
            detail: `touch ${tmpFile}`
          });
        }
      }
    });
  }
};

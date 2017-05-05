exports.config = {
  specs: ['test.js'],

  capabilities: {
    browserName: 'chrome',
  },

  jasmineNodeOpts: {
      defaultTimeoutInterval: 360000,
      print: function() {}
  },

};



module.exports.promisify = function(fn) {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
      fn.apply(this, [].concat(args).concat([(err, res) => {
        if (err != null) {
          return reject(err);
        }
        resolve(res);
      }]));
    });
  };
}
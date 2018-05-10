const fs = require('fs');
const path = require('path');

module.exports = (ctx) => {
  console.log('-----------------------------');
  console.log('> Gradle - fix `play-services` versions');

  const Q = ctx.requireCordovaModule('q');
  const deferred = Q.defer();

  const gradle = path.join(ctx.opts.projectRoot, 'platforms', 'android', 'project.properties');
  console.log(gradle);
  fs.readFile(gradle, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return deferred.reject(err);
    }
    const result = data
      .replace(/play-services-analytics:.*/g, 'play-services-analytics:12.0.0');

    return fs.writeFile(gradle, result, 'utf8', (err) => {
      if (err) {
        console.log('error');
        console.log('-----------------------------');
        deferred.reject(err);
      }
      console.log('completed');
      console.log('-----------------------------');
      deferred.resolve();
    });
  });

  return deferred.promise;
};

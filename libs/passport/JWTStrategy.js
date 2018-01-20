const passport = require('koa-passport');
const config = require('config');
const {Strategy, ExtractJwt} = require('passport-jwt');
let User = require('../../models/user');


passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.get('jwtSecret')
}, function(jwtPayload, done) {
  User.findById(jwtPayload.id, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
}));

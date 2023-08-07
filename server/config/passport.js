const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('./database');

const passport = require('passport');
require('dotenv').config();

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

module.exports = (passport) => {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
          const user = await UserModel.findOne({ _id: jwt_payload.id }); // Using async/await
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      })
    );
  };

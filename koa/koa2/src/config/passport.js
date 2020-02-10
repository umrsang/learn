const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const { tksecret } = require('../config/key')
const mongoose = require("mongoose");
const User = mongoose.model("users");

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tksecret;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        console.log("jwt_payload", jwt_payload);

        const user = await User.findById(jwt_payload.id);
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }

    }));
};
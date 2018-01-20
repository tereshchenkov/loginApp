const config = require('config');
const jwt = require('jwt-simple');
const passport = require('koa-passport');
const User = require('../models/user');
const pick = require('lodash/pick');

exports.get = async function(ctx, next) {
	ctx.body = ctx.render('register');
};

exports.post = async function(ctx, next) {

    const userVars =  pick(ctx.request.body, User.publicFields);

    const user = await User.create(userVars);

    await ctx.login(user);
  
    if (ctx.state.user) {
      const payload = {
        id: ctx.state.user._id,
        displayName: ctx.state.user.displayName
      };
  
      const token = jwt.encode(payload, config.jwtSecret);
      ctx.body = {token};
    } else {
      ctx.status = 400;
      ctx.body = {error: "Invalid credentials"};
    }
  
  };
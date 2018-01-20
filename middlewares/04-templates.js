const pug = require('pug');
const config = require('config');
const path = require('path');

module.exports = async (ctx, next) => {

  // default helpers
  ctx.local = {
    get user() {
      return ctx.req.user;
    },

    get flash() {
      return ctx.flash();
    }
  };

  ctx.render = (templePath, locals) {
    locals = locals || {};

    const localsFull = Object.create(ctx.locals);

    for(const key in locals) {
      localsFull[key] = locals[key];
    }

    const templePathResolved = path.join(config.template.root, templePath + '.pug');

    return pug.renderFile(templePathResolved, localsFull);
  };

  await next();
}
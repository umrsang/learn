'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/egg', controller.home.egg);
  router.get('/new', controller.new.index);
  router.get('/article/:aid', controller.new.article);
};

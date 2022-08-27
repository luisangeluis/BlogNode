//Dependencies
const router = require('express').Router();
const passport =require('passport');
const postsServices =require('./posts.http');

//Middlewares
require('../middleware/auth.middleware')(passport);


router.route('/') // /api/v1/posts/
  .post(passport.authenticate('jwt', { session: false }),postsServices.makeAPost)
  .get(postsServices.getAll);

router.route('/me/posts')
  .get(passport.authenticate('jwt', { session: false }),postsServices.getAllMyPosts);

router.route('/me/posts/:id')
  .get(passport.authenticate('jwt', { session: false }),postsServices.getMyPostById)
  .put(passport.authenticate('jwt', { session: false }),postsServices.editMyPostById)
  .delete(passport.authenticate('jwt', { session: false }),postsServices.removeMyPostById);

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }),postsServices.getById);

exports.router =router;


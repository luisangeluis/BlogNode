const postsControllers = require('./posts.controllers');

const getAll = (req, res) => {
  const data = postsControllers.readAllPosts();

  res.status(200).json({ items: data.length, posts: data });

}

const makeAPost = (req, res) => {
  const userId = req.user.id;
  const data = req.body;

  if (!data.title || !data.content) {
    res.status(400).json({
      message: 'All field must be completed',
      fields: {
        title: 'Your title',
        content: 'Your content'
      }
    })
  }

  const response = postsControllers.createPost(userId, data);
  res.status(201).json({
    message: `Post created succesfully`,
    post: response
  })
}

const getById = (req, res) => {
  const id = req.params.id;
  const data = postsControllers.readPostById(id);

  if (data) res.status(200).json(data);

  res.status(400).json({ message: `The user with id ${id} doesn't exist` })

}

const getAllMyPosts = (req, res) => {
  const userId = req.user.id;
  const response = postsControllers.readAllMyPost(userId);

  // if (response) 
    res.status(200).json({ items: response.length, posts: response })

  // res.status(404).json({message:`Invalid Id`});

}

const getMyPostById = (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const response = postsControllers.readMyPostById(userId, postId);

  if (response) res.status(200).json({ response })

  res.status(404).json({ message: `The post with id:${postId} doesn't exist` })

}

const editMyPostById = (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const data = req.body;

  if (!data) res.status(400).json({ message: 'Missing data' })

  if (!data.title || !data.content)
    res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        title: 'Your title',
        content: 'Your content'
      }
    });

  const response = postsControllers.updateMyPostById(userId, postId, data);

  res.status(200).json({
    message: 'Post edited succesfully',
    response
  })
}

const removeMyPostById = (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  const response = postsControllers.deleteMyPostById(userId, postId);

  if (response) res.status(204).json();

  res.status(400).json({ message: `The post with id ${postId} doesn't exist` })

}
//! Revisar nombres de los servicios http

module.exports = {
  getAll,
  makeAPost,
  getById,
  getAllMyPosts,
  getMyPostById,
  editMyPostById,
  removeMyPostById
}
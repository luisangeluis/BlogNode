//Dependencies
const uuid = require('uuid');

const postDB = [];

const getAllPosts = () => {
  return postDB;
}

const createPost = (userId, data) => {
  const newPost = {
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    headerImage: data.headerImage ?data.headerImage: '',
    userId,
    published: true
  }

  postDB.push(newPost);
  return newPost;
}

const getPostById = (id) => {
  const index = postDB.findIndex(post => post.id === id);

  if (index !== -1) {
    return postDB[index];
  }

  return false;
}

const getAllMyPost = (userId) => {

  const data = postDB.filter(post => post.userId === userId);

  if (data.length > 0) {
    return data;
  }

  return false;

}

const getMyPostById= (userId, postId) => {
  const data = postDB.filter(post => post.userId === userId && post.id === postId);

  if (data.length > 0) {
    return data;
  }

  return false;

}

const editMyPostById = (userId, postId, data) => {

  const index = postDB.findIndex(post => post.userId === userId && post.id === postId);

  if (index !== -1) {
    postDB[index] = {
      title: data.title,
      content: data.content,
      headerImage: data.headerImage ? data.headerImage : '',
      published: true
    }

    return postDB[index];
  }

  return createPost(userId, data)
}

const deleteMyPostById = (userId, postId) => {
  const index = postDB.findIndex(post => post.userId === userId && post.id === postId)

  if (index !== -1) {
    postDB.splice(index, 1);
    return true;
  }

  return false;
}

module.exports={
  getAllPosts,
  createPost,
  getPostById,
  getAllMyPost,
  getMyPostById,
  editMyPostById,
  deleteMyPostById
}



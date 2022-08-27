//Dependencies
const uuid = require('uuid');

const postDB = [
  {
    "id": "98ab3d6b-7872-448c-abb2-459c224529b7",
    "title": "prueba post",
    "content": "post de prueba",
    "headerImage": "header",
    "userId": "d9dbc589-36ff-4773-a77f-f0112834d7f4",
    "published": true
  }
];

const readAllPosts = () => {
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

const readPostById = (id) => {
  const index = postDB.findIndex(post => post.id === id);

  if (index !== -1) {
    return postDB[index];
  }

  return false;
}

const readAllMyPost = (userId) => {

  const data = postDB.filter(post => post.userId === userId);

  // if (data.length > 0) {
  //   return data;
  // }
  // return false;

  return data;

}

const readMyPostById= (userId, postId) => {
  const data = postDB.filter(post => post.userId === userId && post.id === postId);

  if (data.length > 0) {
    return data[0];
  }

  return false;

}

const updateMyPostById = (userId, postId, data) => {

  const index = postDB.findIndex(post => post.userId === userId && post.id === postId);

  if (index !== -1) {
    postDB[index] = {
      id:postId,
      title: data.title,
      content: data.content,
      headerImage: data.headerImage ? data.headerImage : '',
      userId,
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
  readAllPosts,
  createPost,
  readPostById,
  readAllMyPost,
  readMyPostById,
  updateMyPostById,
  deleteMyPostById
}



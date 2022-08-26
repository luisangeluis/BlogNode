//Dependencies
const uuid = require('uuid');

const postDB=[];

const createPost =(id,data)=>{
  const newPost ={
    id:uuid.v4(),
    title:data.title,
    content:data.content,
    headerImage:data.headerImage,
    userId:id,
    published:true
  }
  
  postDB.push(newPost);
  return newPost;

}
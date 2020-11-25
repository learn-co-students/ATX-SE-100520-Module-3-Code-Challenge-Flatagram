
const baseAPI = 'http://localhost:3000/';
let currentImageId;

document.addEventListener('DOMContentLoaded', () => {
  fetchImage()
  document.querySelector('form.comment-form').addEventListener('submit', addComment);
});

function fetchImage(){
  fetch('http://localhost:3000/images/1')
    .then((resp) => resp.json())
    .then(renderImage)
}

function renderImage(image){
  console.log(image);
  currentImageId = image.id;
  
  document.querySelector('div.image-card h2').innerHTML = image.title;
  document.querySelector('img.image').src = image.image;
  document.querySelector('span.likes').innerHTML = `${image.likes} likes`;
  document.querySelector('button.like-button').addEventListener('click', function(event){
    let likes = image.likes + 1;
    image.likes = likes;
    fetch(`${baseAPI}images/${currentImageId}`, {
      body: JSON.stringify({ likes }),
      method: 'PATCH',
      headers: { Accepts: 'application/json', 'Content-type': 'application/json',}
    });
    document.querySelector('span.likes').innerHTML = `${image.likes} likes`;
  })
  renderComments(image);
}

function renderComments(image){
  const commentList = document.querySelector('ul.comments');
  commentList.innerHTML = '';

  image.comments.forEach((comment) => {
    let listItem = document.createElement('li');
    //listItem['data-id'] = comment.id; 
    listItem.innerHTML = comment.content;
    commentList.append(listItem);
  });
}

function addComment(e){
  e.preventDefault();
  fetch(`${baseAPI}comments`, {
    body: JSON.stringify({ 
      imageId: currentImageId,
      content: `${e.target.comment.value}`
     }),
    method: 'POST',
    headers: { Accepts: 'application/json', 'Content-type': 'application/json',}
  });

  let listItem = document.createElement('li').innerHTML = e.target.comment.value;
  document.querySelector('ul.comments').append(listItem);

  // reset form input after posted
  document.querySelector('form.comment-form').reset();
}

function deleteComment(e){
  let commentId = e.target['data-id'];
  fetch(`${baseAPI}comments/${commentId}`, {
    method: 'DELETE',
    headers: { Accepts: 'application/json', 'Content-type': 'application/json',}
  });
}
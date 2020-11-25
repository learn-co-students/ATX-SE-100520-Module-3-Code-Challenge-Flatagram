const imgURL = 'http://localhost:3000/images/1'

document.addEventListener('DOMContentLoaded', () => {
  fetch(imgURL)
    .then(res => res.json())
    .then(data => renderFirstImage(data))
  likeListener();
  commentListener();
});

function renderFirstImage (image) {
  const imageCard = document.querySelector('.image-card');
  const commentList = imageCard.querySelector('.comments');

  imageCard.querySelector('h2').innerText = image.title;
  imageCard.querySelector('img').src = image.image;
  imageCard.querySelector('.likes').innerText = `${image.likes} likes`;

  commentList.innerHTML = '';
  likeListener(image.likes);
  renderComments(image, commentList);
};

function renderComments (image, commentList) {
  image.comments.forEach(comment => {
    const li = document.createElement('li');
    li.innerText = comment.content;
    commentList.appendChild(li);
  });
};

function likeListener (likes) {
  const likeContainer = document.querySelector('.likes-section');
  const likesText = likeContainer.querySelector('span');
  likeContainer.querySelector('button').addEventListener('click', (event) => {
    likes++
    likeIncreaser(likes, likesText);
  });
};

function likeIncreaser (likes, likesText) {
  fetch(imgURL, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: likes,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  likesText.innerHTML = `${likes} likes`;
};

function commentListener () {
  const commentForm = document.querySelector('.image-card form');
  const commentList = document.querySelector('.comments');

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = commentForm.querySelector('input');
    
    const li = document.createElement('li');
    li.innerText = input.value;
    commentList.appendChild(li);
    postToComments(input);
    input.value = '';
  });
};

function postToComments (input) {
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    body: JSON.stringify({
      imageId: 1,
      content: input.value
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })  
};
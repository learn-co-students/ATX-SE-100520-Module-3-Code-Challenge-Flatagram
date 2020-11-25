const imagesURL = "http://localhost:3000/images"
const commentsURL = "http://localhost:3000/comments"
let imagesList = [];
let commentsList = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchImages(); 
    fetchComments();
});

function fetchImages(){
    fetch(imagesURL)
    .then(resp => resp.json())
    .then(loadImages)
}

function fetchComments(){
    fetch(commentsURL)
    .then(resp => resp.json())
    .then(loadComments)
}

function loadImages(images) {
    imageList = images 
    renderImageInformation(imageList[0])
}

function loadComments(comments) {
    commentsList = comments
    const commentSection = document.querySelector(".comments")
    commentSection.innerHTML = " "
    commentsList.forEach((comment) => {
        const commentContent = document.createElement("li")
        commentContent.innerText = comment.content
        commentSection.append(commentContent)
    })
}

function renderImageInformation(image) {
    document.querySelector(".image").src = image.image
    document.querySelector(".image-card h2").textContent = image.title
    document.querySelector(".likes").textContent = image.likes
    let likeBtn = document.querySelector('.like-button')
    likeBtn.addEventListener('click', function(e) {
        increaseLikes(image)
    })
    let postBtn = document.querySelector('.comment-button')
    postBtn.addEventListener('click', function(e) {
        addComment(e)
    })
}

function addComment(e) {
    e.preventDefault(); 
    const newComment = document.querySelector(".comment-input").value
    fetch(commentsURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(newComment)
    })
}

// Click on the heart icon to increase image likes, 
// and still see them when I reload the page

function increaseLikes(image) {
    image.preventDefault
    let increase = image.likes++;
    fetch(`http://localhost:3000/images/1`, {
        method: 'PATCH',
        headers: {
            Accepts: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ "likes": increase })
    })
}



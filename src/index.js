const imageUrl = 'http://localhost:3000/images/1'
document.addEventListener('DOMContentLoaded', () => {

    fetchImage()
})

function fetchImage() {
    fetch(imageUrl)
    .then(r => r.json())
    .then(json => {
        renderImage(json)
    })
}

function renderImage(image) {
   
    const titleCard = document.querySelector('.image-card h2')
    const imageContainer = document.querySelector('.image-card img')
    const likesContainer = document.querySelector('.likes')
    titleCard.innerHTML = ''
    titleCard.innerHTML = image.title
    imageContainer.src = image.image
    likesContainer.innerText = image.likes + ' likes'

    renderComments(image)
}

function renderComments(image) {
    const commentContainer = document.querySelector('.image-card ul')
    commentContainer.innerHTML = ''
    image.comments.forEach(comment => {
        const listItem = document.createElement('li')
        listItem.innerText = comment.content
        commentContainer.append(listItem)
        
        
    });
    addComment()
}

function addComment() {
    const form = document.querySelector('.comment-form')
    const commentBtn = document.querySelector('.comment-button')
    const commentContainer = document.querySelector('.image-card ul')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        
        if (e.target = form.children[0]) {
            commentContainer.append(form.children[0].value)
            form.children[0].value = ''
        }
        

    })
}

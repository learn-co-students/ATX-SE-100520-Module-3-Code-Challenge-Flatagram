

//once content is loaded fectch
document.addEventListener('DOMContentLoaded', ()=> {
    fetchImages();
  });

  function fetchImages () {
    fetch('http://localhost:3000/images/1')
      .then(response => response.json())
      .then(image => renderMenu(image))
     };



//create image

  function renderMenu(image){
      //console.log(data)


    for (const obj of image){
        const imageContainer = document.querySelector('.image-container')
        const immageCard = document.querySelector('.image-card')

        const imgLi = document.createElement('li')
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        h2.innerHTML = image.title
        console.log(image.title)
    }

}

// const imageContainer = document.querySelector('.image-container')
// data.ForEach(image => {
//  const imgLi = document.createElement('li')

//  const img = document.createElement('img')
//  img.setAttribute('src', image.image)
const accessKey="BI8252C2KORpolA6X6xtCrAGcRjTElGBpE4bckJfQk8";

const formE1 = document.querySelector('form');
const inputE1 = formE1.querySelector('#search-input');
const searchResults = document.querySelector('.search-results');
const showMore = document.querySelector('#show-more-btn');

let inputData= "";
let page = 1;


async function showImages(){
   inputData = inputE1.value;
   const url = `https://api.unsplash.com/search/photos?=${page}&query=${inputData}&client_id=${accessKey}`;

   const response = await fetch(url);
   const data = await response.json();
   const results = data.results;

   
   console.log(results);

   if(page === 1){
    searchResults.innerHTML = "";
   }

   results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result');
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink =document.createElement('a');
        imageLink.href = result.links.html;

        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);

    });

    page++
    if(page > 1){
        showMore.style.display = "block";

    }
}
formE1.addEventListener('submit', (event) =>{
    event.preventDefault();
    page = 1;
    showImages();

});

showMore.addEventListener('click', () =>{
    showImages();
});

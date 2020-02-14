// STEP 3: Create Article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-backend.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a component for each 'article' in the list.
// This won't be as easy as just iterating over an array though.
// Create a function that will programmatically create the following DOM component:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {authors name}</span>
//   </div>
// </div>
//
// Create a card for each of the articles and add the card to the DOM.
function Cards() {
  axios.get('https://lambda-times-backend.herokuapp.com/articles')
    .then(function(response) {
      const cardsContainer = document.querySelector('.cards-container');
      console.log(response);
      for (key in response.data.articles) {
        for (article of response.data.articles[key]) {          
          cardsContainer.appendChild(Card(article));
        }
      }
    })
    .catch(function(response) {
      console.error(response);
    });
}

function Card(article) {
  const card = document.createElement('div');
  card.classList.add('card');

  const headline = document.createElement('div');
  headline.classList.add('headline');
  headline.textContent = article.headline;
  card.appendChild(headline);

  const author = document.createElement('div');
  author.classList.add('author');

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');

  const img = document.createElement('img');
  img.setAttribute('src', article.authorPhoto);
  imgContainer.appendChild(img);

  author.appendChild(imgContainer);

  const authorName = document.createElement('span');
  authorName.textContent = `By ${article.authorName}`;
  author.appendChild(authorName);

  card.appendChild(author)

  return card;
}

Cards();

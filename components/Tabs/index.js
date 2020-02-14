// Step 2: Create Tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-backend.herokuapp.com/topics
// Once the data is returned console.log it and review the structure.
// Iterate over the topics creating a new Tab component and add it to the DOM
// under the .topics element.
//
//  The tab component should look like this:
//    <div class="tab">topic here</div>
function Tabs() {
  axios.get('https://lambda-times-backend.herokuapp.com/topics')
    .then(function(response) {
      const topics = document.querySelector('.topics');
      console.log(response);
      for (topic of response.data.topics) {
        topics.appendChild(Tab(topic));
      }
    })
    .catch(function(response) {
      console.error(response);
    });
}

function Tab(topic) {
  const topicDiv = document.createElement('div');
  topicDiv.classList.add('tab');
  topicDiv.setAttribute('data', topic);
  topicDiv.textContent = topic;

  topicDiv.addEventListener('click', () => {
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (card.dataset.topic === topic) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  });

  return topicDiv;
}

Tabs();

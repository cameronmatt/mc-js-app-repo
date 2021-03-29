document.addEventListener('DOMContentLoaded', function () {
  fetchListings();
});


const apikey = 'key_ce7f356ae4d82efac11bfba518b392f2'
let listings = [];

// fetch files from domain.com.au API
function fetchListings() {
    const response = fetch(`https://api.domain.com.au/v1/listings/residential/_search?api_key=${apikey}&HTTP/1.1/?_limit=2`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ })
      })
      .then(function(response){
          return response.json();
      })
      .then(function(data){
          //console.log(data);
          let html = '';
          data.forEach(function(address){
            html += `
                <li>
                    <img id="propetyImage" src="${address.project.media[0].url}"></img>
                    <h2>${address.project.displayableAddress}</h2>
                </li>
            `;
            listings.push(address);
          });
          document.getElementById("listings").innerHTML = html;
          //console.log(listings + 'listings');
      })
      .catch(function(error){
        console.log(error);
      })
  }
  fetchListings();
//Building the search function. not sure if Response in variable above is correct. 
  const searchBar = document.getElementById("search-bar");
  //console.log(searchBar);
  searchBar.addEventListener('keyup', (e) => {
      const searchString = e.target.value;
      const filteredListings = listings.filter( address => {
            return (
              address.project.suburb.includes(searchString)
            );
      });
      console.log(filteredListings);
      let html = '';
      filteredListings.forEach(function(address){
        html += `
            <li>
                <img id="propetyImage" src="${address.project.media[0].url}"></img>
                <h2>${address.project.displayableAddress}</h2>
            </li>
        `;
      });
      document.getElementById("listings").innerHTML = html;
  });


// Get all suburbs from listings on Domain
// Store suburbs for purpose of predictive text in search bar
// Search bar that can search for suburbs
//
//
// Display in listings section, date ordered newest to oldest
// Display Bedrooms, Bathrooms, Carspaces
// Display price
// Display main image
// Display address



function submitData(name, email) {
  let formData = {
      name: name,
      email: email
  };

  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/users", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
          let h2 = document.createElement('h2');
          h2.innerHTML = object.id;
          document.body.appendChild(h2);
          console.log(object);
      })
      .catch(function(error) {
          let h3 = document.createElement('h3');
          h3.innerHTML = error.message;
          document.body.appendChild(h3);
          console.log(error.message);
      });
} 
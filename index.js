document.addEventListener('DOMContentLoaded', function () {
});
//link to blue house image: http://eagle-host.s3-us-west-2.amazonaws.com/uploads/dd1fd1a85dcc8811cdb6d4a51826497b/blue-house.png

const apikey = 'key_ce7f356ae4d82efac11bfba518b392f2'
let listings = [];
let savedSearch = [];
// fetch files from domain.com.au API
function fetchListings() {
    const response = fetch(`https://api.domain.com.au/v1/listings/residential/_search?api_key=${apikey}&HTTP/1.1/`, {
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
          data.forEach( async function(address){
            html += `
                <li> 
                  <img id="propetyImage" src="${address.project.media[0].url}"></img>
                  <h3>${address.project.displayableAddress}</h3>
                  <span id = "heart"><i class="fa fa-heart-o" aria-hidden="true" style="font-size:24px"></i> </span>
                  <h2>${address.listings[0].priceDetails.displayPrice}</h2>
                  <p>
                    <i class="fa fa-bed"></i> <a>${address.listings[0].propertyDetails.bedrooms}</a> 
                    <i class="fa fa-car"></i> <a>${address.listings[0].propertyDetails.carspaces?address.listings[0].propertyDetails.carspaces:0}</a> 
                    <i class="fa fa-bath"></i> <a>${address.listings[0].propertyDetails.bathrooms}</a>
                    </p>
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
// Search bar that can search for suburbs
  const searchBar = document.getElementById("search-bar");
//console.log(searchBar);
  searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter'){
        const searchString = e.target.value.toUpperCase();
        const filteredListings = listings.filter( address => {
              return (
                address.project.suburb.includes(searchString)
              );
        });
        //console.log(filteredListings);
        let html = '';
        filteredListings.forEach(function (address){ 
        // Display main image, address, price, Bedrooms, Bathrooms, Carspaces, Like button
          html += `
              <li> 
                  <img id="propetyImage" src="${address.project.media[0].url}"></img>
                  <h3>${address.project.displayableAddress}</h3>
                  <span id = "heart"><i class="fa fa-heart-o" aria-hidden="true" style="font-size:24px"></i> </span>
                  <h2>${address.listings[0].priceDetails.displayPrice}</h2>
                  <p>
                    <i class="fa fa-bed"></i> <a>${address.listings[0].propertyDetails.bedrooms}</a> 
                    <i class="fa fa-car"></i> <a>${address.listings[0].propertyDetails.carspaces?address.listings[0].propertyDetails.carspaces:0}</a> 
                    <i class="fa fa-bath"></i> <a>${address.listings[0].propertyDetails.bathrooms}</a>
                  </p>
              </li>
          `;
          //Take the submitted search and enter as a saved search on sidebar
          savedSearch.push(searchString);
          document.getElementById("searches").innerHTML = "Recent Search";
              for (var i = 0; i < savedSearch.length; i++)
              {
                  nameList = "<ul id=listy >" + savedSearch[i] + "</ul>";
                  document.getElementById("searches").innerHTML += nameList;
              }
        });
        document.getElementById("listings").innerHTML = html;
      }
      document.addEventListener('click',function () {
      let clickSaved = document.getElementById("listy");
      clickSaved.onclick = function() {
        alert(savedSearch);
      }; 
    }); 
  });


  document.addEventListener('click', likeHeart)
  function likeHeart(heart) {
    heart = heart.target
    if ( heart.classList.contains( "fa-heart") ) {
        heart.classList.remove( "fa-heart" );
        heart.classList.add( "fa-heart-o" );
    }
    else if ( heart.classList.contains( "fa-heart-o") ) {
        heart.classList.remove( "fa-heart-o" );
        heart.classList.add( "fa-heart" );
    }
}



// Get all suburbs from listings on Domain
// Store suburbs for purpose of predictive text in search bar

//
// Display in listings section, date ordered newest to oldest
// Sticky header and side bar (CSS)



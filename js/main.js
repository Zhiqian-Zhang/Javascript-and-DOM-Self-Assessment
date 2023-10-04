function MainModule(listingsID = "#listings") {
    const me = {};
    const listingsElement = document.querySelector(listingsID);

  // The page should show the listing name, description, amenities, host (name and photo), price, thumbnail
    function getListingCode(listing) {
    // Extracting the first 5 amenities for brevity
    const displayedAmenities = listing.amenities.split(',').slice(0,5).join(', ');

    return `
    <div class="col-4">
        <div class="listing card">
            <img src="${listing.picture_url}" class="card-img-top" alt="${listing.name}">
            <div class="card-body">
                <h2 class="card-title">${listing.name}</h2>
                <div>${listing.price}</div>
                <p class="card-text">${listing.description.substr(0, 100) + "..."}</p>
                <strong>Host:</strong> ${listing.host_name}
                <img src="${listing.host_thumbnail_url}" alt="${listing.host_name}" class="img-thumbnail mt-2 mb-2">

                <!-- Added amenities -->
                <p><strong>Amenities:</strong> ${displayedAmenities}</p> <!-- CHANGE HERE -->

                <a href="${listing.listing_url}" class="btn btn-primary" target="_blank">View Listing</a>
            </div>
        </div>
    </div>
    `;
}


    function redraw(listings) {
        listingsElement.innerHTML = listings.map(getListingCode).join("\n");
    }
  
  // Starting from the github repository created in class for the AirBNB Listings https://github.com/john-guerra/Airbnb_Listings_demo_page Links to an external site.or your own code built for this, implement a page that displays and loads all the first 50 listings from the JSON file using AJAX (JavaScript fetch and await) as done in class.

// The page should show the listing name, description, amenities, host (name and photo), price, thumbnail, and some creative addition that separates your code from others. Please submit your github repo, and include a meaningful README that links to the deployment location (e.g. github-pages)

    async function loadData() {
        try {
            const res = await fetch("./airbnb_sf_listings_500.json");
            const listings = await res.json();
            me.redraw(listings.slice(0, 50));
        } catch (error) {
            console.error("Error fetching the listings", error);
        }
    }

    me.redraw = redraw;
    me.loadData = loadData;

    return me;
}

const main = MainModule();
main.loadData();

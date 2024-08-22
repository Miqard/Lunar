document.addEventListener('DOMContentLoaded', function () {
    const searchInput       = document.getElementById('searchInput');
    const searchResults     = document.getElementById('searchResults');
    let items = {};   
    
    fetch('/get-profiles', {method: 'GET'}).then( async function(response) {
        response.json().then(function(result){
            items = result;
        });
    });

    let timeoutId;
    searchInput.addEventListener('input', function () {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            // Code to execute after user stops typing
            const searchTerm = searchInput.value.toLowerCase();

            // const results = items.filter(item => item.name.toLowerCase().includes(searchTerm));
            const results = [];
            for (let key in items) {
                if (searchTerm.length == 0){
                    continue;
                }
                prof = items[key];
                userName = key
                regName  = prof["name"]
                let usernameMatch   = userName.toLowerCase().includes(searchTerm)
                let nameMatch       = regName.toLowerCase().includes(searchTerm)
                if (usernameMatch || nameMatch){
                    results.push(prof);
                    // results.push([userName, regName]);
                }
            }
            displaySearchResults(results);
        }, 500); // Adjust the delay in milliseconds
    });
  
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
        } else {
            results.forEach(result => {
                // + + + buat gambar profile user
                const userPreview       = document.createElement('div');
                userPreview.className   = "user-preview";
                
                const userImg           = document.createElement('div');
                userImg.className       = "user-img";
                const img               = document.createElement('img');
                img.src                 = result["userImage"];
                userImg.appendChild(img);

                // userPreview.appendChild(userImg);
                
                // + + + buat detail user
                const userDetail        = document.createElement('div');
                userDetail.className    = "user-details";

                const userDesc          = document.createElement('div');
                userDesc.className      = "user-description";

                const userName          = document.createElement('div');
                userName.className      = "user-name";                
                userName.innerHTML      = result["name"];

                const userBio           = document.createElement('div');
                userBio.className       = 'user-bio';
                userBio.style.paddingTop = "10px";
                userBio.innerHTML       = result["bio"];

                userDesc.appendChild(userName);
                userDesc.appendChild(userBio);
                
                userDetail.appendChild(userImg);
                userDetail.appendChild(userDesc);
                userPreview.appendChild(userDetail);

                // + + + buat follow button
                const button        = document.createElement('div');
                button.className    = "follow-btn";
                button.innerHTML    = "Follow";
                userPreview.appendChild(button);

                searchResults.appendChild(userPreview);
                // resultItem.addEventListener('click', function () {
                //     alert(`You clicked on: ${result.name}`);
                // });
            });
        }
    }
});
  
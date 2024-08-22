document.addEventListener('DOMContentLoaded', function () {
    let items = {};   
    
    fetch('/get-notification', {method: 'GET'}).then( async function(response) {
        response.json().then(function(result){
            items = result;
        });
    });


});
  
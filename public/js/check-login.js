fetch('/check-login', {method: 'GET'}).then( async function(response) {
    const result    = await response.text();
    console.log(result);
    if (result=="OUT") {
        window.location = "/";     
    }
});


// comment popup handler
function openCommentPopup() {
    document.getElementById("commentbox").style.display = "block";
}

function closeCommentPopup() {
    console.log("closePopup called");
    document.getElementById("commentbox").style.display = "none";
}

function submitComment() {
    console.log("submit comment called");
    // Get the comment from the textarea
    // const comment = document.getElementById("comment").value;
    closeCommentPopup();
}

    // comment popup handler
function openSharePopup() {
    document.getElementById("sharebox").style.display = "flex";
}

function closeSharePopup() {
    document.getElementById("sharebox").style.display = "none";
}


function heartHandler() {
    console.log("heart Handler called");
    let heart_containers    = document.getElementsByClassName("heart-container");
    let hearts              = []

    for (var i=0; i<heart_containers.length; i++) {
        let ct      = heart_containers[i]
        let heart   = ct.contentDocument.children[0]
        hearts.push(heart)
    }

    for (var i=0; i<hearts.length; i++) {
        let heart  = hearts[i]

        function onFilledHeartClick(event) {
            heart.children[0].setAttribute("d", "M25.2 6.24999C23.875 4.9215 22.1185 4.11067 20.2479 3.96396C18.3773 3.81724 16.516 4.34433 15 5.44999C13.4096 4.26704 11.43 3.73063 9.4599 3.94879C7.48981 4.16695 5.67555 5.12347 4.38247 6.62572C3.08938 8.12798 2.41353 10.0644 2.491 12.045C2.56848 14.0256 3.39352 15.9033 4.8 17.3L12.5625 25.075C13.2125 25.7147 14.088 26.0733 15 26.0733C15.912 26.0733 16.7875 25.7147 17.4375 25.075L25.2 17.3C26.6595 15.8316 27.4787 13.8453 27.4787 11.775C27.4787 9.70465 26.6595 7.71841 25.2 6.24999ZM23.4375 15.575L15.675 23.3375C15.5867 23.4267 15.4815 23.4975 15.3657 23.5458C15.2498 23.5941 15.1255 23.619 15 23.619C14.8745 23.619 14.7502 23.5941 14.6343 23.5458C14.5185 23.4975 14.4133 23.4267 14.325 23.3375L6.5625 15.5375C5.5822 14.5354 5.03326 13.1893 5.03326 11.7875C5.03326 10.3857 5.5822 9.03956 6.5625 8.03749C7.56144 7.05123 8.90872 6.4982 10.3125 6.4982C11.7163 6.4982 13.0636 7.05123 14.0625 8.03749C14.1787 8.15465 14.317 8.24765 14.4693 8.31111C14.6216 8.37457 14.785 8.40724 14.95 8.40724C15.115 8.40724 15.2784 8.37457 15.4307 8.31111C15.583 8.24765 15.7213 8.15465 15.8375 8.03749C16.8364 7.05123 18.1837 6.4982 19.5875 6.4982C20.9913 6.4982 22.3386 7.05123 23.3375 8.03749C24.3313 9.02643 24.8982 10.3652 24.9169 11.7671C24.9356 13.169 24.4046 14.5224 23.4375 15.5375V15.575Z");
            heart.children[0].setAttribute("fill", "white");
            heart.children[1].setAttribute("d", "");
            heart.children[1].setAttribute("fill", "");
            heart.removeEventListener("click", onFilledHeartClick);
            heart.addEventListener("click", onEmptyHeartClick);
        }
    
        function onEmptyHeartClick(event) {
            heart.children[0].setAttribute("d", "M 22.621 16.39 L 15.675 23.3375 C 15.5867 23.4267 15.4815 23.4975 15.3657 23.5458 C 15.2498 23.5941 15.1255 23.619 15 23.619 C 14.8745 23.619 14.7502 23.5941 14.6343 23.5458 C 14.5185 23.4975 14.4133 23.4267 14.325 23.3375 L 6.5625 15.5375 C 5.5822 14.5354 5.0333 13.1893 5.0333 11.7875 C 5.0333 10.3857 5.5822 9.0396 6.5625 8.0375 C 7.5614 7.0512 8.9087 6.4982 10.3125 6.4982 C 11.7163 6.4982 13.0636 7.0512 14.0625 8.0375 C 14.1787 8.1547 14.317 8.2477 14.4693 8.3111 C 14.6216 8.3746 14.785 8.4072 14.95 8.4072 C 15.115 8.4072 15.2784 8.3746 15.4307 8.3111 C 15.583 8.2477 15.7213 8.1547 15.8375 8.0375 C 16.8364 7.0512 18.1837 6.4982 19.5875 6.4982 C 20.9913 6.4982 22.3386 7.0512 23.3375 8.0375 C 24.3313 9.0264 24.8982 10.3652 24.9169 11.7671 C 24.9356 13.169 24.4046 14.5224 23.4375 15.5375 Z");
            heart.children[0].setAttribute("fill", "#E22C42");
            heart.children[1].setAttribute("d", "M25.2 6.24999C23.875 4.9215 22.1185 4.11067 20.2479 3.96396C18.3773 3.81724 16.516 4.34433 15 5.44999C13.4096 4.26704 11.43 3.73063 9.4599 3.94879C7.48981 4.16695 5.67555 5.12347 4.38247 6.62572C3.08938 8.12798 2.41353 10.0644 2.491 12.045C2.56848 14.0256 3.39352 15.9033 4.8 17.3L12.5625 25.075C13.2125 25.7147 14.088 26.0733 15 26.0733C15.912 26.0733 16.7875 25.7147 17.4375 25.075L25.2 17.3C26.6595 15.8316 27.4787 13.8453 27.4787 11.775C27.4787 9.70465 26.6595 7.71841 25.2 6.24999ZM23.4375 15.575L15.675 23.3375C15.5867 23.4267 15.4815 23.4975 15.3657 23.5458C15.2498 23.5941 15.1255 23.619 15 23.619C14.8745 23.619 14.7502 23.5941 14.6343 23.5458C14.5185 23.4975 14.4133 23.4267 14.325 23.3375L6.5625 15.5375C5.5822 14.5354 5.03326 13.1893 5.03326 11.7875C5.03326 10.3857 5.5822 9.03956 6.5625 8.03749C7.56144 7.05123 8.90872 6.4982 10.3125 6.4982C11.7163 6.4982 13.0636 7.05123 14.0625 8.03749C14.1787 8.15465 14.317 8.24765 14.4693 8.31111C14.6216 8.37457 14.785 8.40724 14.95 8.40724C15.115 8.40724 15.2784 8.37457 15.4307 8.31111C15.583 8.24765 15.7213 8.15465 15.8375 8.03749C16.8364 7.05123 18.1837 6.4982 19.5875 6.4982C20.9913 6.4982 22.3386 7.05123 23.3375 8.03749C24.3313 9.02643 24.8982 10.3652 24.9169 11.7671C24.9356 13.169 24.4046 14.5224 23.4375 15.5375V15.575Z");
            heart.children[1].setAttribute("fill", "white");
            heart.removeEventListener("click", onEmptyHeartClick);
            heart.addEventListener("click", onFilledHeartClick);
        }

        heart.addEventListener("click", onEmptyHeartClick);
    }
}


function commentHandler() {
    // COMMENTS HANDLER
    let comment_containers = document.getElementsByClassName("comment-container");
    let comments = []

    for (var i=0; i<comment_containers.length; i++) {
        let ct          = comment_containers[i]
        let comment     = ct.contentDocument.children[0]
        comments.push(comment)
    }

    for (var i=0; i < comments.length; i++) {   
        let comment = comments[i];
        comment.addEventListener("click", openCommentPopup);
    }    
}

function repostHandler() {
    let repost_containers = document.getElementsByClassName("repost-container");
    let reposts = []

    for (var i=0; i<repost_containers.length; i++) {
        let ct          = repost_containers[i]
        let repost     = ct.contentDocument.children[0]
        reposts.push(repost)
    }

    for (var i=0; i < reposts.length; i++) {
        let repost = reposts[i];

        function onFilledRepostClick(event) {
            repost.children[0].setAttribute("fill", "white");
            repost.removeEventListener("click", onFilledRepostClick);
            repost.addEventListener("click", onRepostClick);
        }

        function onRepostClick(event) {
            repost.children[0].setAttribute("fill", "#E22C42");
            repost.removeEventListener("click", onRepostClick);
            repost.addEventListener("click", onFilledRepostClick);
        }

        repost.addEventListener("click", onRepostClick);
    }
}


function shareHandler() {
    // SHARES HANDLER
    let share_containers = document.getElementsByClassName("share-container");
    let shares = []

    for (var i=0; i<share_containers.length; i++) {
        let ct          = share_containers[i]
        let share     = ct.contentDocument.children[0]
        shares.push(share)
    }

    for (var i = 0; i < shares.length; i++) {
        let share  = shares[i]
        share.addEventListener("click", openSharePopup);
    }

}


function createPostContainer(post_clone) {
    // REMOVE INTERACTIONS
    let interactions        = post_clone.getElementsByClassName("interactions")[0];
    post_clone.removeChild(interactions);

    let close_span          = document.createElement('span');
    close_span.className    = "post-detail-close";
    close_span.innerHTML    = "x";

    let new_container       = document.createElement('div');
    new_container.id        = "post-detail";
    new_container.className = "container";
    // new_container.innerHTML = "Test case of new container";
    
    new_container.appendChild(close_span);
    new_container.appendChild(post_clone);

    let grand_container     = document.getElementsByClassName("grand-container")[0];
    grand_container.appendChild(new_container);        

    close_span.addEventListener("click", function(){
        grand_container.removeChild(grand_container.lastElementChild);        
    });

    // FILL THE COMMENTS
    let postKey = post_clone.getElementsByClassName("post-key")[0].innerHTML;
    let responseJson = undefined;
    fetch('/get-post-comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({postkey: postKey})
    }).
    then(async function(response) {
        response.json().then(function(result) {
            responseJson = result;
            // console.log('home-interaction.js::createPostContainer --- ');
            // console.log(responseJson);

            for (comment of responseJson) {
                let comment_container   = document.createElement("div");
                comment_container.className = "comment-div";
                let comment_sender          = document.createElement("div");
                comment_sender.className    = "comment-sender";
                comment_sender.innerHTML    = comment.username;
                let comment_content         = document.createElement("div");
                comment_content.className   = "comment-text";
                comment_content.innerHTML = comment.text;
                comment_container.appendChild(comment_sender);
                comment_container.appendChild(comment_content);
                new_container.appendChild(comment_container);

            }
        });
    });

}

 
function showPostDetailHandler() {
    let posts               = document.getElementsByClassName("post");
    for (post of posts) {
        post.addEventListener("click", function() {
            let post_clone  = this.cloneNode(true);
            let containers  = document.getElementsByClassName("container");
            if (containers.length > 1) {
                let grand_container = document.getElementsByClassName("grand-container")[0];
                grand_container.removeChild(containers[1]);
            }
            createPostContainer(post_clone);
            window.scrollTo(0, 0);
        });        
    }
}


window.addEventListener('load', function () {
    heartHandler();
    commentHandler();
    repostHandler();
    shareHandler();
    showPostDetailHandler();
})
        




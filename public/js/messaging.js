
// function createClassElement(creden, param) {
//     let element_name    = creden.element_name;
//     let class_name      = creden.element_class;

//     let el              = document.createElement(element_name);
//     el.className        = class_name

//     for (key in param) {
//         let par = param[key];
//         el.key  = par;
//     }
//     return el;
// }



function createElement(element_name, class_name, param) {
    let el              = document.createElement(element_name);
    el.className        = class_name

    for (key in param) {
        let par = param[key];
        if (key == "innerHTML") {
            el.innerHTML = par;
            continue;
        }
        el.setAttribute(key, par);
    }
    return el;
}


function createMessagingContainer(param) {
    let current_user        = param.current_user;
    let chat_mate           = param.chat_mate;

    
    fetch('/get-profiles', {method: 'GET'}).then( async function(response) {
        response.json().then(function(result){
            let userProfile = result[chat_mate];
            let profpic     = userProfile.userImage;

            let msg_detail_header   = createElement("div", "msg-detail-header", {});
            let mate_image          = createElement("img",  "msg-mate-pic", {
                src: profpic
            });
            let mate_name           = createElement("p", "msg-mate-name", {
                "innerHTML" : chat_mate
            });
        
            let close_span          = document.createElement('span');
            close_span.className    = "msg-thread-close";
            close_span.innerHTML   = "x";

            let mate_info_div       = createElement("div", "mate-info-div", {});
            let close_span_div      = createElement("div", "close-span-div", {});
            close_span_div.appendChild(close_span);
            mate_info_div.appendChild(mate_image);
            mate_info_div.appendChild(mate_name);

            close_span.addEventListener("click", function(){
                grand_container.removeChild(grand_container.lastElementChild);   
                let applogodiv      = document.getElementById("applogo-container");
                applogodiv.style    = "display: block;"     
            });

            msg_detail_header.appendChild(mate_info_div);
            msg_detail_header.appendChild(close_span_div);
            new_container.insertBefore(msg_detail_header, new_container.children[0]);        
        });
    });


    let new_container       = document.createElement("div");
    new_container.id        = "msg-thread";
    new_container.className = "container";

    let grand_container     = document.getElementsByClassName("grand-container")[0];
    grand_container.appendChild(new_container);        

    fetch('/get-chat-threads', {
        method: 'POST',
         
        headers: {
            'Content-Type' : 'application/json'
        },
        
        body: JSON.stringify({
            current_user: current_user,
            chat_mate: chat_mate
        })
    }).
    then(async function(response){
        response.json().then(function(result){
            threads = result;

            for (key in threads) {
                let chat    = threads[key];
                let message = chat.message;
                let sender      = chat.sender;
                let recipient   = chat.recipient;

                // create message container     
                let msg_container = document.createElement("div");
                if (sender == current_user) {
                    msg_container.className = "message-div-self";
                } else {
                    msg_container.className = "message-div-away";
                }
                let msg_content         = document.createElement("div");
                msg_content.className   = 'message-content';
                msg_content.innerHTML   = message;
                msg_container.appendChild(msg_content);
                new_container.appendChild(msg_container); 
            }

            //create reply container
            let reply_container = createElement("div", "reply-container", {});
            let reply_set       = createElement("div", "reply-set", {});
            let msg_input       = createElement("textarea", "message-reply", {
                "type": "text",
                "placeholder": "reply..."
            });

            //create reply button
            let reply_button = createElement("button", "reply-button", {
                "type":"button",
                "innerHTML":"Send"
            });   
            reply_set.appendChild(msg_input);
            reply_set.appendChild(reply_button);
            reply_container.appendChild(reply_set);
            new_container.appendChild(reply_container);
        });
    })
}


function showMessageDetailHandler() {
    let messageHeaders = document.getElementsByClassName("user-preview");
    for (var i = 0; i < messageHeaders.length; i++) {
        msgHead = messageHeaders[i];
        msgHead.addEventListener("click", function(){
            console.log("message clicked");
            let applogodiv      = document.getElementById("applogo-container");
            applogodiv.style    = "display: none;"
            let current_user    = this.getElementsByClassName("current-user")[0].innerHTML;
            let chat_mate       = this.getElementsByClassName("chat-mate")[0].innerHTML;
            let param = {
                current_user: current_user,
                chat_mate: chat_mate
            }
            let containers  = document.getElementsByClassName("container");
            if (containers.length > 1) {
                let grand_container = document.getElementsByClassName("grand-container")[0];
                grand_container.removeChild(containers[1]);
            }
            createMessagingContainer(param);
        })
    }
}



window.addEventListener("load", function() {
    showMessageDetailHandler();
})
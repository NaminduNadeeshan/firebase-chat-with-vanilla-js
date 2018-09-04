/* fitrbase configurations */
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXyjLUMEyPjXF7I9dp-i6LxcTVnqzdNoo",
    authDomain: "jschat-4a13d.firebaseapp.com",
    databaseURL: "https://jschat-4a13d.firebaseio.com",
    projectId: "jschat-4a13d",
    storageBucket: "jschat-4a13d.appspot.com",
    messagingSenderId: "429500704914"
  };
  firebase.initializeApp(config);
/* end of fitrbase configurations */
/*declaring the global variable */

var username = '';
var chatNode = ''

  if(this.isCoockieExisting()){

    this.username = JSON.parse(this.getCoockie()).username;
    this.chatNode = JSON.parse(this.getCoockie()).chatNode;

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("dbddc626-e5e0-4928-a066-f3f012437eeb").innerHTML = `
    
            <div class="wrapper">
                <div class="a686596e-5a40-4dcb-b3a1-4123e6e00acf">
                    <div class="a910c343-4a0a-46ce-9628-e53c1820e829">
                        <h2>Chat Box</h2>
                        <img   src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16">
                    </div>
                     <div class="cc160e94-a9cc-4a5b-bd62-3420923054ac">
                      <div class="338a1aa1-fce2-4ea2-8076-f1807caa4e7e">
                       <div id="content">
                       <div id='send'></div>
                       <div class="d86c1aa1-5c5d-42c2-881f-7cb8d6b4b55c">
                          <textarea placeholder="Send" id='message'></textarea>
                          <button onclick='sendMessage();'>Send</button>
                       </div>
                       </div>
                     </div>
    
                </div>
            </div>`;
    });

  // this.loadChatHistory();

  }else{
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById("dbddc626-e5e0-4928-a066-f3f012437eeb").innerHTML = `
    
            <div class="wrapper">
                <div class="a686596e-5a40-4dcb-b3a1-4123e6e00acf">
                    <div class="a910c343-4a0a-46ce-9628-e53c1820e829">
                        <h2>Chat Box</h2>
                        <img   src="https://maxcdn.icons8.com/windows10/PNG/16/Arrows/angle_down-16.png" title="Expand Arrow" width="16">
                    </div>
                     <div class="cc160e94-a9cc-4a5b-bd62-3420923054ac">
                      <div class="338a1aa1-fce2-4ea2-8076-f1807caa4e7e">
                       <div id="content">
                        <h1>Subscribe</h1>
                        <label>Subscribe Id</label>
                        <input id="subscribeId" /><br>
                        <label>Your Name</label>
                        <input id="name" /> <br>
                        <button onclick="setChatContent()">start chat</button>
                       </div>
                     </div>
    
                </div>
            </div>`;
    });
  }

// to the set chat content
function setChatContent() {
    this.chatNode = document.getElementById("subscribeId").value;
    this.username = document.getElementById("name").value;
 

    this.setCookie(this.username, this.chatNode);

    document.getElementById("content").innerHTML = `
    <div id='send'></div>
     <div class="d86c1aa1-5c5d-42c2-881f-7cb8d6b4b55c">
        <textarea placeholder="Send" id='message'></textarea>
        <button onclick='sendMessage();'>Send</button>
     </div>`;
}

function sendMessage(){
  
    var messageText = document.getElementById('message').value

    var messageId = firebase.database().ref('chatNode/'+ this.chatNode).push({}).key;
    firebase.database().ref(`chatNode/${this.chatNode}/${messageId}`).set({
        message: messageText,
        username: this.username,
        time: Date(),
        messageId: messageId,
    });
}

function resMessage(resMessage){

    let element = document.querySelector(`#${resMessage.messageId}`);
    if ((!element)) {
        var sendContent = document.createElement("div");
        sendContent.setAttribute("class","msg-receive");
        sendContent.setAttribute("id",`${resMessage.messageId}`);
        var msgeContent = document.createTextNode(resMessage.message);
        sendContent.appendChild(msgeContent);
        document.getElementById("send").appendChild(sendContent);
    }
}

function setSendMessage(sendMessage) {

            let element = document.querySelector(`#${sendMessage.messageId}`);

            if ((!element) || (element.id != sendMessage.messageId)) {
                var sendContent = document.createElement("div");
                sendContent.setAttribute("class","msg-send");
                sendContent.setAttribute("id",`${sendMessage.messageId}`);
                var msgeContent = document.createTextNode(sendMessage.message);
                sendContent.appendChild(msgeContent);
                document.getElementById("send").appendChild(sendContent);
            }
}



/* Realtime updated part */
const realTimeDb = firebase.database().ref(`chatNode/${JSON.parse(this.getCoockie()).chatNode}`);
realTimeDb.on('value', snap => {
    var chatNodeM = snap.val();
    var resMessageList = [];
    var sendMessageList = [];

    for(let key in chatNodeM){
           if(this.username !== chatNodeM[key].username){
                this.resMessage(chatNodeM[key]);
           } else {
                this.setSendMessage(chatNodeM[key]);
           }
       
    }
    // this.resMessage(resMessageList);
    // this.setSendMessage(sendMessageList);

});
/* end of the real time configurationgs */


/* coockie functions */
//create coockie
function setCookie(username,chatNode) {
     
    localStorage.setItem('user',JSON.stringify({
        username: username,
        chatNode: chatNode,
    }));
}

// get coockie
function getCoockie(){
   return localStorage.getItem("user");
}

//check the coockie existing
function isCoockieExisting(){
    var user = JSON.parse(this.getCoockie("user"));

    if (user !== ''  && user !== null && user !== undefined) {
        return true;
    } else {
       return false;
    }
    
}
/*end of the cookie functions */
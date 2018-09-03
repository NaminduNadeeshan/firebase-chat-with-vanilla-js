/* fitrbase configurations */
  // Initialize Firebase
  var config = {
    apiKey: "YOUR_KEY",
    authDomain: "Your_domain",
    databaseURL: "url",
    projectId: "ID",
    storageBucket: "ABC",
    messagingSenderId: "##$#"

  };
  firebase.initializeApp(config);
/* end of fitrbase configurations */
/*declaring the global variable */

var username = '';
var chatNode = ''

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
                    <button onclick="createChatNode()">start chat</button>
                   </div>
                 </div>

            </div>
        </div>`;
});

// to the set chat content
function setChatContent() {
   

    document.getElementById("content").innerHTML = `
    <div id='send'></div>
     <div class="d86c1aa1-5c5d-42c2-881f-7cb8d6b4b55c">
        <textarea placeholder="Send" id='message'></textarea>
        <button onclick='sendMessage();'>Send</button>
     </div>`;

     
}

function sendMessage(){

    var messageText = document.getElementById('message').value

    firebase.database().ref('chatNode/'+ chatNode+ '/user/' + this.username).push({
        message: messageText
    });

    var sendContent = document.createElement("div");
    sendContent.setAttribute("class","msg-send");
    var msgeContent = document.createTextNode(messageText);
    sendContent.appendChild(msgeContent);
    document.getElementById("send").appendChild(sendContent);

    this.populatesSendMessage()
}

//cretes the chat node
function createChatNode(){

    this.chatNode = document.getElementById("subscribeId").value;
    this.username = document.getElementById("name").value;

    try{
        firebase.database().ref('chatNode/'+ chatNode+ '/user/' + this.username).set({
            username: this.username,
        });

        //if it success calling to setchatcontent to chat bubbleset
        this.setChatContent();

    }catch(err){
        console.log(err);
    }
}

// populate the send messages
function populatesSendMessage(){
    messageList = [];

    firebase.database().ref('chatNode/'+ chatNode+ '/user/' + this.username).once("value", snapshot =>{

        messag = snapshot.val()
        for(let ms in messag){
            if(ms !== 'username') {
                firebase.database().ref('chatNode/'+ chatNode+ '/user/' + this.username).once("value", snapshot =>{
                    messageList.push(snapshot.val());
                });
            }
            
        }
    });
}

/* Realtime updated part */
const realTimeDb = firebase.database().ref('chatNode/');
realTimeDb.on('value', snap => {
    var chatNodeM = snap.val();

    for(let ms in chatNodeM){

        if(this.chatNode === ms){

            firebase.database().ref('chatNode/'+ms+ '/user').once("value", snap =>{
                var userIndex = snap.val();
                for(let ui in userIndex ){
                    
                    if(this.username !== ui && this.username !== null && this.username !== '' && this.username !== undefined){
                        console.log(ui);
                        firebase.database().ref('chatNode/'+ chatNode+ '/user/' + ui).once("value", s =>{
                            var mgsIndex = s.val();
                            console.log(mgsIndex);

                            for(let i in mgsIndex) {
                                firebase.database().ref('chatNode/'+ chatNode+ '/user/' + ui + `/${i}`).once("value", snapshot =>{
                                   
                                   var resMessage = snapshot.val();
                                   if(i !== 'username'){
                                    console.log(resMessage);
                                    this.resMessage(resMessage.message);
                                   }
<<<<<<< HEAD
=======

                                   

>>>>>>> parent of 80c37cc... Revert "initial commit"
                                });
                            }

                        });
                    }
                }
            });
        }
    }
    
});
/* end of the real time configurationgs */

function resMessage(resMessage){

    var sendContent = document.createElement("div");
    sendContent.setAttribute("class","msg-receive");
    var msgeContent = document.createTextNode(resMessage);
    sendContent.appendChild(msgeContent);
    document.getElementById("send").appendChild(sendContent);
}
// YOUR CODE HERE:
//ajax call to GET parse server to fetch messages
var getMessage = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    contentType: 'application/json',
    //once messages are returned from the server, runs displayMessages function defined below
    success: displayMessages,
    error: function (data) {
      console.error('chatterbox: Failed to get Message');
    }
  });
};

// this function displays messages in DOM
// 'data' is passed as an argument by the success method of getMessage function
var displayMessages = function(data) {
  //save parsed messages into a usable array
  var messages = data.results;
  console.log(messages);

// iterate over the object with responses
  //if there are no messages, append the messages to the DOM with class of Room Name
  if($("li").length === 0) {
    for (var i = 0; i < 30; i++){
      $(".messages").append(Remove.js("<li class=\"" + messages[i].roomname + "\">" + messages[i].username + ': '
        + messages[i].text + " sent at: " + messages[i].createdAt + "</li>"));
    }
    //otherwise, update existing elements adding class Room Name
  } else {
    for (var i = 29; i >= 0; i--){
      (Remove.js("<li class=\"" + messages[i].roomname + "\">" + messages[i].username + ': '
        + messages[i].text + " sent at: " + messages[i].createdAt + "</li>")).replaceAll( $("li")[i] ); // replaces 'li' element at index i
    }
  }
};


// converts message into a usable object, later translated into JSON by sendMessages function
var messagePackager = function(message) {
  // this helper method extracts username from the url
  var usernameSlicer = function() {
    var nameSection = window.location.search;
    var name = nameSection.slice(nameSection.indexOf("=")+1);
    return name;
  };

  // this is the new object to return
  var messageObject = {
    "roomname": "lobby",
    "text": message,
    "username": usernameSlicer()
  };

  return messageObject;
};


// ajax call to POST parse server to send messages
var sendMessages = function(message){ // argument 'message' is the object resulting from messagePackager
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox', // always use this url
    type: 'POST',
    data: JSON.stringify(message), // converts the object to JSON
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

// sends message when 'submit' button is clicked
$(document).ready(function() {
  $('.submitButton').click(function(){
    // take jquery input text, pass into messagePackager, in turn passing into sendMessages
    sendMessages(messagePackager( $('.messageText').val() ));
    $('.messageText').val(""); //clears input box upon sending the message
  });
});

getMessage(); // invokes function to avoid setInterval delay on first load
setInterval(getMessage, 5000); // refreshes messages every 5 seconds


//rooms process

  //attach a class to all messages that is the room they are/were in to each .li. Lobby if there isn't one.
    //using the message.room property of message

  //have a user choose a specific room
    //list of available rooms along the side? or a dropdown?
    //if a user clicks a link for a specific room,
      //add ?roomName=roomName to URL
      //filter messages for specific rooms
      //let them know what room they're in
      //link to go back to the lobby
      //any messages from that room get a class name with that room



  //allow users to create a room
    //include an option in the list of rooms that is "create a room"
    //show an input to type the name of the room with submit button. at submit:
      //add ?roomName=roomName to URL
      //move person to room by filtering
      //let them know what room they're in
      //any message they have gets a class that is the room. Lobby if there isn't one











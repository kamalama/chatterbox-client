// YOUR CODE HERE:
//ajax call to parse server to fetch messages
var getMessage = $.ajax({
  url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
  type: 'GET',
  contentType: 'application/json',
  //once messages are returned from the server, runs displayMessages, otherwise
  //responseJSON can't be called on the undefined getMessages object
  success: function (data) {
    displayMessages();
  },
  error: function (data) {
    console.error('chatterbox: Failed to get Message');
  }
});


var displayMessages = function() {
  //save parsed messages into a usable array
  var messages = getMessage.responseJSON.results;
  // iterate over the object with responses
  //if there are no messages, append the messages to the DOM
  if($("li").length === 0) {
    for (var i = 0; i < 30; i++){
      $(".messages").append(Remove.js("<li>" + messages[i].username + ': '
        + messages[i].text + " sent at: " + messages[i].createdAt + "</li>"));
    }
    //otherwise, update existing elements
  } else {
    for (var i = 0; i < 30; i++){
      $( "ul li:nth-last-child("+ i +")" ).replaceWith(Remove.js("<li>" + messages[i].username + ': '
          + messages[i].text + " sent at: " + messages[i].createdAt + "</li>"));
    }
  }
};
//runs displayMessages every 5 seconds to get any new messages
setInterval(displayMessages, 5000);


var messagePackager = function(message) {

  var usernameSlicer = function() {
    var nameSection = window.location.search;
    var name = nameSection.slice(nameSection.indexOf("=")+1);
    return name;
  };

  var messageObject = {
    "roomname": "lobby",
    "text": message,
    "username": usernameSlicer()
  };

  return messageObject;
};

var messageToSend = messagePackager("Always be yourself, unless you can be a Unicorn. Then be a Unicorn.");
var sendMessages = function(messageToSend){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(messageToSend),
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


$(document).ready(function() {
  $('.submitButton').click(function(){
    sendMessages(messageToSend)
  });
});


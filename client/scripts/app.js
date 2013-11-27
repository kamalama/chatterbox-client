// YOUR CODE HERE:
//ajax call to parse server to fetch messages

var getMessage = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    contentType: 'application/json',
    //once messages are returned from the server, runs displayMessages, otherwise
    //responseJSON can't be called on the undefined getMessages object
    success: displayMessages,
    error: function (data) {
      console.error('chatterbox: Failed to get Message');
    }
  });
};

var displayMessages = function(data) {
  //save parsed messages into a usable array
  var messages = data.results;

  // iterate over the object with responses
  //if there are no messages, append the messages to the DOM
  if($("li").length === 0) {
    for (var i = 0; i < 30; i++){
      $(".messages").append(Remove.js("<li>" + messages[i].username + ': '
        + messages[i].text + " sent at: " + messages[i].createdAt + "</li>"));
    }
    //otherwise, update existing elements
  } else {
    for (var i = 29; i >= 0; i--){
      (Remove.js("<li>" + messages[i].username + ': '+ messages[i].text + " sent at: " +
        messages[i].createdAt + "</li>")).replaceAll(($("li")[i]));
    }
  }
};



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


var sendMessages = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
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
    sendMessages(messagePackager( $('.messageText').val() ))
    $('.messageText').val("");
  });
});

getMessage();
setInterval(getMessage, 5000);


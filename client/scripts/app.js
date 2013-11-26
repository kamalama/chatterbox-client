// YOUR CODE HERE:
//ajax call to parse server to fetch messages
var getMessage = $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
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
  //if there are no messages, prepend the messages to the DOM
  if($("li").length === 0) {
    for (var i = 0; i < 30; i++){
      $(".messages").prepend(Remove.js("<li>" + messages[i].username + ': '
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
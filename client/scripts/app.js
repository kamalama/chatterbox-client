// YOUR CODE HERE:
var getMessage = $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    displayMessages();
    // console.log(parsedMessages());
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});


var parsedMessages = function() {
  return getMessage.responseJSON.results;
};


var displayMessages = function() {
  // iterate over the object with responses
  var messages = parsedMessages();
  for (var i = 0; i < 10; i++){
    $(".messages").append("<li>" + messages[i].text + "</li>");
  }
};

//   //console.log(JSON.parse(getMessage.responseText));

// var messages = getMessage.responseJSON;
// console.log(messages)





//append a new div to the body with the class "messages"
//use jQuery to append the messages to the ".messages" div as UL.

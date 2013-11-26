// YOUR CODE HERE:
var getMessage = $.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    displayMessages();
  },
  error: function (data) {
    console.error('chatterbox: Failed to get Message');
  }
});


var parsedMessages = function() {
  return getMessage.responseJSON.results;
};


var displayMessages = function() {
  // iterate over the object with responses
  var messages = parsedMessages();
  for (var i = 0; i < messages.length; i++){
    $(".messages").append(Remove.js("<li>" + messages[i].text + "</li>"));
  }
};


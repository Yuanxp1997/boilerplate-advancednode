$(document).ready(function () {
  let socket = io();
  // Listen for user connection/disconnection
  socket.on("user", (data) => {
    $("#num-users").text(data.currentUsers + " users online");
    let message =
      data.username +
      (data.connected ? " has joined the chat." : " has left the chat.");
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });

  // Listen for chat messages
  socket.on("chat message", (data) => {
    $("#messages").append($("<li>").text(data.name + ": " + data.message));
  });
  // Form submittion with new message in field with id 'm'
  $("form").submit(function () {
    var messageToSend = $("#m").val();
    socket.emit("chat message", messageToSend);
    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });
});

var colors = ["red", "orange", "yellow", "green", "blue", "purple"];

colors.forEach(function(color) {
  $("#btnContainer").append(
    "<button class='queryBtn' style='background:" +
      color +
      "'>" +
      color +
      "</button>"
  );
});

// Add button when submit is clicked
// Button has to have text from input
$("#addBtn").on("click", function(send) {
  send.preventDefault();
  $("#btnContainer").append(
    "<button class='queryBtn' style='background:" +
      $("#btnTextInput").val() +
      "'>" +
      $("#btnTextInput").val() +
      "</button>"
  );
  document.getElementById("btnTextInput").value = null;
  addEventListenerToBtns();
});

function addEventListenerToBtns() {
  $(".queryBtn").on("click", function buttonClick(btnEvent) {
    document.querySelector("#giphyResults").innerHTML = "";
    var btnText = btnEvent.target.innerText;
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      btnText +
      "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "Get"
    }).then(function(response) {
      response.data.forEach(function(image_object) {
        var responseImage = $("<img>")
          .attr("src", image_object.images.fixed_height_still.url)
          .addClass("responseImage")
          .attr("data-state", "still")
          .on("click", function(event) {
            if (event.target.getAttribute("data-state") === "still") {
              event.target.setAttribute(
                "src",
                image_object.images.original.url
              );
              event.target.setAttribute("data-state", "animated");
            } else {
              event.target.setAttribute(
                "src",
                image_object.images.original_still.url
              );
              event.target.setAttribute("data-state", "still");
            }
          });

        $("#giphyResults").append(responseImage);
        $("#giphyResults").append(image_object.rating);
      });
    });
  });
}

addEventListenerToBtns();

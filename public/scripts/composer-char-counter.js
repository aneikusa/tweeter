$(document).ready(function() {
  console.log("ready!");

  $('#tweet-text').on("input", function(e) {
    const value = e.target.value;
    console.log(value.length);
    const maxLength = 140;
    const calculateLength = maxLength - value.length;

    $("#characters").text(calculateLength);
    if (calculateLength < 0) {
      $("#characters").css({
        "color": "red"
      })
    } else {
      $("#characters").css({ "color": "gray"})
    }
  })
});
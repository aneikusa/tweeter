$(document).ready(function() {
  $("#tweet-text")
    .on("input", function() {
      //Resize textarea on input
      this.style.height = "";
      this.style.height = this.scrollHeight + 4 + "px";

      // Counter value
      const counter = $(this).closest("form").find(".counter")[0];
      counter.value = 140 - this.value.length;

      // Counter color change
      counter.value < 0
        ? $(counter).css("color", "red")
        : $(counter).css("color", "#545149");
    })
    .focus(() => {
      $(".error").slideUp("fast");
    });
});
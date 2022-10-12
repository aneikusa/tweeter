$(document).ready(() => {
  console.log("DOM loaded");
});

$("#tweet-text").on("input", function () {
  // Counter value
  const counter = $(this).closest("form").find(".counter")[0];
  counter.value = 140 - this.value.length;

  // Counter color change
  counter.value < 0
    ? $(counter).css("color", "red")
    : $(counter).css("color", "#545149");

  // Resize input area
  this.style.height = "1px";
  this.style.height = this.scrollHeight + "px";
});
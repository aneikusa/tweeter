/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Escape method to avoid XSS attacks
  const esc = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Scroll to top
  $(window).on("scroll", function() {
    if ($(this).scrollTop()) {
      $(".fa-angle-double-up").css("display", "flex");
    } else {
      $(".fa-angle-double-up").css("display", "none");
    }
  });

  const scrollToTop = function() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
  };

  $("nav span").on("click", function() {
    scrollToTop();
  });

  // Write new tweet button animation
  const writeTweet = function() {
    if ($(".new-tweet").is(":hidden")) {
      scrollToTop();
      $(".new-tweet").slideDown("slow", () => {
        $("#tweet-text").focus();
      });
    } else {
      $(".new-tweet").slideUp("fast");
    }
  };

  $(".nav-btn").on("click", function() {
    writeTweet();
  });

  $(".fa-angle-double-up").on("click", function() {
    scrollToTop();
    $(".new-tweet").slideDown("slow", () => {
      $("#tweet-text").focus();
    });
  });

  // Tweet creation
  $(".new-tweet form").submit(function(event) {
    event.preventDefault();

    const tweet = $(this).serialize();
    const tweetLength = $(this).children("#tweet-text").val().length;

    // Validation errors
    if (tweetLength > 140) {
      return $(".error")
        .html(`<p>Tweet cannot exceed 140 characters</p>`)
        .slideDown("fast");
    }
    if (tweetLength === 0) {
      return $(".error").html(`<p>Tweet cannot be empty</p>`).slideDown("fast");
    }

    // Add tweet
    $.post("/tweets", tweet, () => loadTweets());

    // Reset new-tweet section
    $("textarea").val("");
    $(".counter").val("140");
    $("#tweet-text").css("height", "40px");
  });

  const createTweetElement = function(tweet) {
    $("#tweets-container").prepend(`
    <article class="tweet">
          <header>
            <div class="tweet-user">
              <img src="${tweet.user.avatars}" alt="user avatar" />
              <p>${tweet.user.name}</p>
            </div>
            <p>${tweet.user.handle}</p>
          </header>
          <div class="tweet-body">
            <p>${esc(tweet.content.text)}</p>
          </div>
          <footer>
            <time>${timeago.format(tweet.created_at)}</time>
            <div class="icons">
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
        </article>
    `);
  };

  // Display tweets on page
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };

  const loadTweets = function() {
    $.get("/tweets", (tweets) => renderTweets(tweets));
  };

  loadTweets();
});
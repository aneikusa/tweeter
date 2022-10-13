/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1665070014923
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1665070014923
//   }
// ];

// $(document).ready(function() {
//   renderTweets(tweetData);
//   $(".new-text form").submit(function(event) {
//     event.preventDefault();
//     console.log($(this).serialize());

//     const tweetText = $(this).find("#tweet-text");
//     const value = tweetText.val();
//     const calculateLength = value.length;
//     const maxLength = 140;
//     if (value === "") {
//       alert("Empty tweet, oh no!");
//       return false;
//     }
//     if (calculateLength > maxLength) {
//       alert("Character count exceeded");
//       return false;
//     }

//   });


//   function loadTweets() {

//     $.ajax('/tweets', {method: 'GET', dataType: 'JSON'})
//       .then(function(tweetData) {
//         console.log("success!:", tweetData);
//         renderTweets(tweetData);
//       });
//   }
//   loadTweets();
// });
// const renderTweets = function(tweets) {
//   console.log("TWEETS", tweets);
//   for (const tweet of tweets) {
//     const element = createTweetElement(tweet);
//     $('#tweets-container').append(element);
//   }
// };
// const createTweetElement = (tweet) => {
//   let $tweet =  `<article class="tweet-container">
//   <header>
//     <div class="tweet-user">
//       <img src=${tweet.user.avatars}>
//       <span class="name-of-user"><strong>${tweet.user.name}</strong></span>
//     </div>
//       <span class="user-name"><strong>${tweet.user.handle}</strong></span>
//   </header>
//     <div class="tweet-body">${tweet.content.text}</div>
//   <footer>
//     <time>${timeago.format(tweet.created_at)}</time>
//     <div class="icons">
//       <i class="fas fa-flag"></i>
//       <i class="fas fa-retweet"></i>
//       <i class="fas fa-heart"></i>
//     </div>
//   </footer>
// </article>`;
//   return $tweet;
// };

//FROMHERE

// $(document).ready(function() {
//   $("#text-form").submit(function(event) {
//     event.preventDefault();
//     const formData = $(this).serialize();
//     const decodeData = decodeURI(formData).slice(5).length;
//     const maxLength = 140;
//     console.log(decodeData);

//     if (!decodeData) {
//       const emptyError = $(".empty-tweet-error").slideDown("slow");
//       return;
//     }
//     if (decodeData > maxLength) {
//       const lengthError = $(".long-tweet-error").slideDown("slow");
//       return;
//     } else {
//       $(".long-tweet-error").slideUp("fast");
//       $(".empty-tweet-error").slideUp("fast");
//     }
      
//   $.ajax('/tweets', {method: 'POST', data: $(this).serialize()})
//       .then(function() {
//         $('#tweets-container').empty();
//         loadTweets();
//         $("#tweet-text").val('');
//         $('#characters').text(140);
//       });
//   });

//   const renderTweets = function(tweets) {
//     console.log("TWEETS", tweets);
//     for (const tweet of tweets) {
//       const element = createTweetElement(tweet);
//       $('#tweets-container').prepend(element);
//     }
//   };

//   function loadTweets() {
//     $.ajax('/tweets', {method: 'GET', dataType: 'JSON'})
//       .then(function (tweetData) {
//         console.log("success!:", tweetData);
//         renderTweets(tweetData);
//       });
//   }
//   loadTweets();
// });

// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// const createTweetElement = (tweet) => {
// let $tweet =  `<article class="tweet-container">
//   <header>
//     <div class="tweet-user">
//       <img src=${tweet.user.avatars}>
//       <span class="name-of-user"><strong>${escape(tweet.user.name)}</strong></span>
//     </div>
//       <span class="user-name"><strong>${escape(tweet.user.handle)}</strong></span>
//   </header>
//     <div class="tweet-body">${escape(tweet.content.text)}</div>
//   <footer>
//     <time>${timeago.format(tweet.created_at)}</time>
//     <div class="icons">
//       <i class="fas fa-flag"></i>
//       <i class="fas fa-retweet"></i>
//       <i class="fas fa-heart"></i>
//     </div>
//   </footer>
// </article>`;
//   return $tweet;
// };



$(document).ready(function () {
  // Escape method to avoid XSS attacks
  const esc = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Scroll to top
  $(window).on("scroll", function () {
    if ($(this).scrollTop()) {
      $(".fa-angle-double-up").css("display", "flex");
    } else {
      $(".fa-angle-double-up").css("display", "none");
    }
  });

  const scrollToTop = function () {
    $("html, body").animate({ scrollTop: 0 }, "fast");
  };

  $("nav span").on("click", function () {
    scrollToTop();
  });

  // Write new tweet button animation
  const writeTweet = function () {
    if ($(".new-tweet").is(":hidden")) {
      scrollToTop();
      $(".new-tweet").slideDown("slow", () => {
        $("#tweet-text").focus();
      });
    } else {
      $(".new-tweet").slideUp("fast");
    }
  };

  $(".nav-btn").on("click", function () {
    writeTweet();
  });

  $(".fa-angle-double-up").on("click", function () {
    scrollToTop();
    $(".new-tweet").slideDown("slow", () => {
      $("#tweet-text").focus();
    });
  });

  // Tweet creation
  $(".new-tweet form").submit(function (event) {
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

  const createTweetElement = function (tweet) {
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
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      createTweetElement(tweet);
    }
  };

  const loadTweets = function () {
    $.get("/tweets", (tweets) => renderTweets(tweets));
  };

  loadTweets();
});
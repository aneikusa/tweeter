/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1665070014923
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1665070014923
  }
];

$(document).ready(function() {
  renderTweets(tweetData);
  $(".new-text form").submit(function(event) {
    event.preventDefault();
    console.log($(this).serialize());

    const tweetText = $(this).find("#tweet-text");
    const value = tweetText.val();
    const calculateLength = value.length;
    const maxLength = 140;
    if (value === "") {
      alert("Empty tweet, oh no!");
      return false;
    }
    if (calculateLength > maxLength) {
      alert("Character count exceeded");
      return false;
    }

  });


  function loadTweets() {

    $.ajax('/tweets', {method: 'GET', dataType: 'JSON'})
      .then(function(tweetData) {
        console.log("success!:", tweetData);
        renderTweets(tweetData);
      });
  }
  loadTweets();
});
const renderTweets = function(tweets) {
  console.log("TWEETS", tweets);
  for (const tweet of tweets) {
    const element = createTweetElement(tweet);
    $('#tweets-container').append(element);
  }
};
const createTweetElement = (tweet) => {
  let $tweet =  `<article class="tweet-container">
  <header>
    <div class="tweet-user">
      <img src=${tweet.user.avatars}>
      <span class="name-of-user"><strong>${tweet.user.name}</strong></span>
    </div>
      <span class="user-name"><strong>${tweet.user.handle}</strong></span>
  </header>
    <div class="tweet-body">${tweet.content.text}</div>
  <footer>
    <time>${timeago.format(tweet.created_at)}</time>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`;
  return $tweet;
};

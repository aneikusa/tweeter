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
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$( document ).ready(function() {
  renderTweets(tweetData);
});

const renderTweets = function(tweets) {
  console.log("TWEETS", tweets)
  for (const tweet of tweets) {
    const element = createTweetElement(tweet)
    $('#tweets-container').append(element);
  }
}

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
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`
return $tweet;
}

// {/* <p>${tweet.created_at}</p> */ UNDERNEATH FOOTER}
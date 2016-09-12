var twit = require('twitter');
var twitter = new twit({
  consumer_key: 'UuI70QdTAGKSK2EOdPE3mpdc4',
  consumer_secret: '61j1yXxAMVzIMcBNk8zC85gGq3zQYG3jT84Fa9uvHRvpTlG4U0',
  access_token_key: '740845096422281216-caK0UFfpVF6K07iyVKpTiEuoV9ysbKb',
  access_token_secret: '5BwCkD80ktNIP1aOVJ17gkmfP7C8C2uLCou6RAZjyYP4z'
});

var count = 0;
util = require('util');
var AsyncPolling = require('async-polling');


var comp_tweets = 0;

AsyncPolling(function (end) {
    // Do whatever you want.
    console.log("Entered: " + comp_tweets + " competitions successfully!");
    // Then notify the polling when your job is done:
    end();
    // This will schedule the next call.
}, 60000).run();

twitter.stream('statuses/filter', {track: '#competition enter RT, #giveaway enter RT, #win enter RT'}, function(stream){
  stream.on('data', function(data){
    //console.log(util.inspect(data));

    //check if me retweeting...

    var user = "";
    try{
      user = data.user.screen_name;
    } catch(ex){
      //do nothing
    }
    if(user == '_R_Shackleford'){
      //console.log("twas me that RT'd - better sit this one out...");
    }
    else {
    //determine if the tweet is original or RT
    var _message = null;
    try{
      var rt = data.retweeted_status;
      //console.log("This is a RT original message: " + util.inspect(rt));
      _message = rt;
    } catch(ex){
    //  console.log("Not an RT.....");
      _message = data;
    }

    processTweet(_message);

  }



  })
});

function processTweet(message){

  //console.log(util.inspect(message));
try{
  var tw_id = message.id_str;
//  console.log("Tweet ID: " + tw_id);
  var usr_id = message.user.id_str;
//  console.log("User ID: " + usr_id);

  retweet(tw_id, usr_id);

} catch(ex) {
 //console.log(ex);
}


}

function befrend(userid){

//    console.log("Dispatching befrend request for: " + userid);

  twitter.post('friendships/create', {user_id: userid, follow: true},  function(error, response){
  //if(error) throw error;
//  console.log(error);  // error
//  console.log(response);  // Raw response object.
});
}

function retweet(tweet_id, usr_id){

  //console.log("Dispatching RT for: " + tweet_id);


  twitter.post('statuses/retweet/'+tweet_id , function(error, tweet, response){
  //if(error) throw error;
  //console.log(error);  // error

  if (error == null){
    comp_tweets++;
    befrend(usr_id);
  }
//  console.log(tweet);
//  console.log(response);  // Raw response object.
});
}

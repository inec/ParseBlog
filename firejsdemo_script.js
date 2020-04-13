(function() {
    // Config
    var timelinePageCount = 3;
const firebaseConfig = {
  apiKey: "AIzaSyDFcIljN78X8NcalSCCvQnbZjdvhc_3Zq0",
  authDomain: "firejsdemo.firebaseapp.com",
  databaseURL: "https://firejsdemo.firebaseio.com",
  projectId: "firejsdemo",
  storageBucket: "firejsdemo.appspot.com",
  messagingSenderId: "527289955347",
  appId: "1:527289955347:web:cc35448f93fb12cf0f3be6"
};
    // Templating functions
    var setUsers = function(users) {
            console.info('called setUsers with these users:', users);
            $('#user-select').html(_.template($('#user-select-template').html())({
                users: users
            })).find('select').on('change', handleUserChange).val(Object.keys(users)[0]).trigger('change');

        },
        setTimeline = function(timeline, userKey, buttons, callback) {
            console.info('called setTimeline with this timeline:', timeline);
            $('#user-timeline').html(_.template($('#user-timeline-template').html())({
                timeline: timeline,
                userKey: userKey,
                loadMore: buttons ? buttons.loadMore || false : false,
                orderByText: buttons ? buttons.orderByText || false : false,
                reset: buttons ? buttons.reset || false : false
            }));

            if (typeof callback === 'function') {
                callback();
            }
        },
        setFollowing = function(following) {
            console.info('called setFollowing with this following:', following);
            
            $('#user-following').html(_.template($('#user-following-template').html())({
                following: following
            }));
        },
        setTweetBox = function(user) {
            console.info('called setTweetBox with this user:', user);
            $('#user-tweet-box').html(_.template($('#user-tweet-box-template').html())({
                user: user
            })).find('textarea').on('keyup', function(e) {
                var characterCount = $(e.target).val().length,
                    tweetLength = $('#tweet-length'),
                    tweetButton = $('#tweet-button');

                tweetLength.text(140 - characterCount);

                if (characterCount <= 140) {
                    tweetLength.css('color', 'gray');

                    if (characterCount > 0) {
                        tweetButton.removeAttr('disabled');
                    }
                } else {
                    tweetLength.css('color', 'red');
                    tweetButton.attr('disabled', 'disabled');
                }
            });
        };

    /*var firebaseRoot = "https://firejsdemo.firebaseio.com/twitterClone/",
	
        usersRef = new Firebase(firebaseRoot + 'users'),
        userObjectsRef = new Firebase(firebaseRoot + 'userObjects');*/
        
	 //var firebaseRoot =	 new Firebase('https://firejsdemo.firebaseio.com/twitterClone');

	 var datab = firebase.database();	 
var usersRef = datab.ref('twitterClone/' + 'users');
var userObjectsRef = datab.ref('twitterClone/' + 'userObjects');
	 
    usersRef.once('value', function(snap) {
      setUsers(snap.val());
    }) 
    
    var timelineRef, 
      timelineHandler,
      tweetBoxClickHandler,
      userRef,
      userHandler, 
      stopListening = function() {
        if(typeof timelineRef === 'object' && typeof timelineHandler) {
          timelineRef.off('value', timelineHandler);
        }
        if(typeof userRef === 'object' && typeof userHandler) {
          userRef.off('value', userHandler);
        }
        
      },
      flatten = function(tweets) {
            var keys = Object.keys(tweets),
                i = keys.length,
                result = [],
                tweet;
            while (i--) {
                tweet = tweets[keys[i]];
                tweet.key = keys[i];
                result.unshift(tweet);
            }
            return result;
        };
    
    var handleUserChange = function(e) {
        var userKey = $(e.target).val();
        
        stopListening();

        if (userKey) {
          
          timelineRef = userObjectsRef.child('timeline').child(userKey);
          timelineHandler = timelineRef.on('value', function(snap) {
            setTimeline(flatten(snap.val()).reverse(), userKey)
          })

          userRef = usersRef.child(userKey);
          
          userHandler = userRef.on('value', function(snap) {
            setTweetBox(snap.val());
          });
          
		  console.log(userObjectsRef.child('following'));
          userObjectsRef.child('following').child(userKey).once('value', function(snap) {
            console.log("127 "+snap.val()+"  127=");
			setFollowing(snap.val());
          })
          
          
          var userTweetBox = $('#user-tweet-box');

          // Prevent duplicate registration of the tweetBoxClickHandler listener
          if (typeof tweetBoxClickHandler === 'function') { 
              userTweetBox.off('click', 'button', tweetBoxClickHandler);
          }
          
          tweetBoxClickHandler = function(e) {
            e.preventDefault();
            
            var tweet = {
              text: userTweetBox.find('textarea').val(),
              created: Firebase.ServerValue.TIMESTAMP
            };
            
            userObjectsRef.child('tweets').child(userKey).push(tweet, function(err) {
              if(err) {
                console.warn('error!', err);
              } else {
                userRef.once('value', function(snap) {
                  var user = snap.val();
                  userObjectsRef.child('timeline').child(userKey).push({
                    created: tweet.created,
                    text: tweet.text,
                    userKey: userKey,
                    user: {
                      email: user.email,
                      key: userKey,
                      name: user.name,
                      username: user.username
                    }
                  });
                });
              }
            })
          }
          
          userTweetBox.on('click', 'button', tweetBoxClickHandler);
        

        } else {
            setTweetBox({});
            setTimeline({});
            setFollowing({});
        }

    };

})();
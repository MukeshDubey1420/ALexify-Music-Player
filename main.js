
var willmute =1;
var Playingnumber = 0  ;
var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var songNumber=1; //initial song number



document.getElementById("demo").innerHTML = new Date().toLocaleDateString("en-EN", {weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  });


//to mute the song mute function is there

 function mute(){
	 var song = document.querySelector('audio');
	 if(song.muted)
	 {
	 song.muted=false;
	 }
      else
	  {
		  song.muted = true;

		  }
 }


//low-high the sound of song volume function is there

 function setvolume(){

	 var song = document.querySelector('audio');
	 song.volume= volumeslider.value/100;
 }




//fuction for Audio Play and Pause..
function toggleSong() {
  var song = document.querySelector('audio');
// it check wheather the Song status paused or not if paused it plays if not it paused.
  if(song.paused == true) {
	   // code For play The Song
    console.log('Music is Playing');
	song.play();
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    
   }
   else {
	    // code for pause the song
    console.log('Music is Paused');
	 song.pause();
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
   
   }
}

	$("#name-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btnSearch").click();
    }
});



	 // javascript function for converting a bulks seconds into a standandard time format
                //here 'time' is a formal parameter which is passed(takes values) by the calling function like 'currentTime' and 'duration'
                            function fancyTimeFormat(time)
                            {
                                                          // Hours, minutes and seconds
                                                            //here second converting into hours like time=47000sec is 47000sec/(60*60)=1hrs and 1100sec that will be like time/3600
                                                          var hrs = ~~(time / 3600);
                                                          //and the left second are converted into minutes like 1100sec/60=18minutes and 20sec that will be (time%3600)/60=total minutea+left seconds
                                                          var mins = ~~((time % 3600) / 60);
                                                          //and the left Seconds now devided by 60 if not possible make it remenders like 20/60 not devisible so remaining seconds are 20 sec
                                                          var secs = time % 60;
                                                          //so the answer is 47000sec=1hrs 18 minutes and 20 seconds in following format
                                                          // Output like "1:01" or "4:03:59" or "123:03:59"
                                                          var ret = "";           //here creates a local variable  string with blank

                                                          if (hrs > 0) {          //condition check if hours values is greater then 0 then go for next
                                                              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");  //if hour value is greater it shows time in this formate like 01: 18 : 20
                                                          }

                                                          ret += "" + mins + ":" + (secs < 10 ? "0" : "");       //or if not hours  it shows like this one 18 : 20
                                                          ret += "" + secs;      //if only seconds are presented in time variable the it will shows like 20
                                                          return ret;           //after that it will return the value to the function from local variable ret to the storge variable
                                                      }

// function for current time and duration calculation of songs
function updateCurrentTime() {

    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime); //it sends the value to the from currenttime to 'time' and after that get value from ret to CurrentTime
    currentTime = fancyTimeFormat(currentTime);

    var duration = Math.floor(song.duration); //it sends the value to the from duration to 'time' and after that get value from ret to duration
    duration = fancyTimeFormat(duration)
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}

// new Smart Function For Doing all songs playing on click by it self
function addSongNameClickEvent(songObj,position) {
	var songName = songObj.fileName; // New Variable
    var id = '#song' + position;   //check for string are match or not with old played song
    $(id).click(function() {
      var audio = document.querySelector('audio');
      var currentSong = audio.src;
      if(currentSong.search(songName) != -1)
      {
      toggleSong();
    }
    else {
      audio.src = songName;
        toggleSong();
        changeCurrentSongDetails(songObj); // Function Call
    }
});
}

// play for next song when 1 song ended
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,5,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }
    else if(currentSongNumber < 5) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})



 
 //function for changing current song details when ever songs chnages
 function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','' + songObj.image) ;  //code for using jQuery to select the element with class 'current-song-image' and dynamically adding images in the somgs plalyed
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}




function setupApp() {
  changeCurrentSongDetails(songs[0]);

  setInterval(function() {
    updateCurrentTime() ;
	updateTimer();
  }) ;


  for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;
  }
}
   

    // Empty the songs variable
    var songs = [] ;
	$('.total-songs').text("Songs: " + songs.length);
    function fetchSongs() {

      $.ajax({
        'url': 'https://jsonbin.io/b/5a15838d52cfe066fb2b7020',
        'dataType': 'json',
        'method': 'GET',
        'success': function (responseData) {
            songs = responseData ;
		  setupApp() ;
		   $('.total-songs').text("Total Songs in the Playlist is :- " + songs.length);
        },
            error: function (responseData) {
                alert("Sorry Response From Backend could not be fetched !! Server Connection Issue !! please try again ..");
                
            }
      }) ;

    }


function doSomething() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "WELCOME, " + name.toUpperCase();
			console.log(message);
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
			  fetchSongs() ;
			// code for calling the function when .play-icon class button is press
			$('.play-icon').on('click', function() {
				toggleSong();
				
		});
		//code for Calling the function when the spacebar(32)and P(80) or p(112) is pressed from keyboard
		$('body').on('keypress',function(event) {
	  if (event.keyCode == 32 || event.keyCode == 80 || event.keyCode == 112)
	  {
		toggleSong();
	  }
		});
		}
		else {
            $('#name-input').addClass('error');
			 alert ("Please Enter Your Name To Further Access (3 Character atleast required) !!!");
        }
		
	}



			// code for calling the function when .play-icon class button is press
			$('.play-icon').on('click', function() {
				
				
		});











document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
}



// -------------------------------------------------------------------------------

                  // function for play next song on click next button
                  $('.next-icon').on('click',function() {
                    var audio = document.querySelector('audio');
                    if(currentSongNumber < songs.length) {    //check for next song it must be less
                      var next = songs[currentSongNumber];
                      audio.src = next.fileName;
                      toggleSong();
                      changeCurrentSongDetails(next);
                      currentSongNumber = currentSongNumber + 1;  //it will increases the song numbers

                    }
                  else{
                  currentSongNumber = 0; //if currentsong equal songs.length it go for first song
                  }
                  })

                  // function for playing previous song
                  $('.back-icon').on('click',function() {
                    var audio = document.querySelector('audio');
                    if(currentSongNumber > 0 && currentSongNumber < songs.length) { //current song must be greater the 0 and also be less then total length
                      var back = songs[currentSongNumber - 1];
                      audio.src = back.fileName;
                      toggleSong();
                      changeCurrentSongDetails(back);
                      currentSongNumber = currentSongNumber - 1;          //so it will decrease the song numbers

                    }
                  })

                  //code for showing the progress of song played
                  function updateTimer(){
                    var song = document.querySelector('audio');
                    var current_time = song.currentTime;
                    var total_time = song.duration;
                    var percentage = (current_time/total_time)*100;   //cullculatin for curreret percentege
                    $('.progress-filled').css('width',percentage+"%");    //by using css width property it show the duration of song played
                    }


                  // code for click on progress bar to increase and decrease song time
                  $('.player-progress').click(function(event){
                    var $this = $(this);
                    var MouseLeft = event.pageX - $this.offset().left; // to detact the mouse pointer click on left of progress bar
                    var TotalWidth = $this.width();
                    var progress = (MouseLeft / TotalWidth) * 100;
                    var song = document.querySelector('audio');
                    song.currentTime = (song.duration*progress)/100;
                  });
				  
				  
//when the song ended it check for shuffle,loop and random song condition and play the next song

$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    //shuffle

	if (willShuffle == 1) {
        var nextSongNumber = randomExcluded(1,6,currentSongNumber); // Calling our function from Stackoverflow
        var nextSongObj = songs[nextSongNumber-1];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = nextSongNumber;
    }


       //start from second song

    else if(currentSongNumber < 6) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber = currentSongNumber + 1;
    }
	// loop
    else if(willLoop == 1) {
        var nextSongObj = songs[0];
        audio.src = nextSongObj.fileName;
        toggleSong();
        changeCurrentSongDetails(nextSongObj);
        currentSongNumber =  1;
    }
    else {
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
    }
})

// code for looping song
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled')
    willLoop = 1 - willLoop;
});

//code for suffale songs$('.fa-random').on('click',function() {
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled')
    willShuffle = 1 - willShuffle;
});

// click on mute icon

$('.fa-volume-up ').on('click', function() {
$('.fa-volume-up ').toggleClass('disabled')
    willmute = 1 - willmute;

 mute();

    });
	
	
// click on volume icon

$('#volumeslider').on('mousemove',function() {
    setvolume();
});


$('.play-all').on('click', function(){
    var audio = document.querySelector('audio');
    console.log(audio);
    var currentsong = audio.src;
    var currentTime = Math.floor(audio.currentTime);
    var duration = Math.floor(audio.duration);
    audio.play();
    if (currentTime == duration) {

    }

    toggleSong();
});


 $('.play-all').on('click', function(){
          $('.click').addClass('fa-pause-circle').removeClass('fa-play-circle');
          var audio = document.querySelector('audio');
          i = 0;
          var playlist = songs;
          var gn = [{"album": "3 PeG",
"artist": "Sharry Mann",
"name": "3 Peg - Sharry Mann (DjPunjab.Com)",
"image": "https://i.imgur.com/eJZZtOY.jpg"},
          {"album": "PB 26",
"artist": "Elly Mangat Ft. MC JD",
"name": "Affair - MC JD (DJJOhAL.Com)",
"image": "https://i.imgur.com/5RG4KSM.jpg"},
          {"album": "Daang",
"artist": "Mankirat Aulakh",
"name": "Daang Mankirt Aulakh",
"image": "https://i.imgur.com/WBzxq5e.jpg"},
          {"album": "Set Jatt",
"artist": "Joban Sandhu",
"name": "Set Jatt - Joban Sandhu (DjPunjab.Com)",
"image": "https://i.imgur.com/nvtRfps.jpg"},
          {"album": "Judwaa 2",
"artist": "Devi Negi Ft. Neha Kakkar",
"name": "Chalti Hai Kya 9 Se 12-(Mr-Jatt.com)",
"image": "https://i.imgur.com/2liw5L4.jpg"},
          {"album": "Tumhari Sulu",
"artist": "Guru Randhawa",
"name": "Ban Ja Rani Guru Randhawa ",
"image": "https://i.imgur.com/thZ2trx.jpg"}];
          audio.addEventListener('ended', function () {
          i = ++i < playlist.length ? i : 0;
          console.log(i)
          audio.src = playlist[i];
          audio.play();
          }, true);
          audio.volume = 0.3;
          audio.loop = false;
          audio.src = playlist[0];
          audio.play();

          
        });
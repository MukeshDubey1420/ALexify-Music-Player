
var willmute =1;
var Playingnumber = 0  ;
var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var songNumber=1; //initial song number



document.getElementById("demo").innerHTML = new Date().toLocaleDateString("en-EN", {weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  });
/*
$('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
			console.log(message);
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
			$('.play-icon').on('click', function() {
  toggleSong();
});
 $('body').on('keypress',function(event) {
	  if (event.keyCode == 32 || event.keyCode == 80 || event.keyCode == 112)
	  {
		toggleSong();
	  }
	}); 
         else {
            $('#name-input').addClass('error');
			 alert ("Please Enter Your Name To Further Access (3 Character atleast required) !!!");
        }
    });

*/

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
	   // code For paly The Song
    console.log('Music is Playing');
    $('.play-icon').removeClass('fa-play').addClass('fa-pause');
    song.play();
   }
   else {
	    // code for pause the song
    console.log('Music is Paused');
    $('.play-icon').removeClass('fa-pause').addClass('fa-play');
    song.pause();
   }
}

function doSomething() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "WELCOME, " + name.toUpperCase();
			console.log(message);
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
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
        

	$("#name-input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btnSearch").click();
    }
});




// Code For Implementing Submit Action By pressing Enter.....
/*
$(document).ready(function() {

  $('#name-input').keypress(function(event) {
    // enter has keyCode = 13, change it if you want to use another button
     if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
			console.log(message);
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
			$('.play-icon').on('click', function() {
  toggleSong();
});
	 }}
    
  });

}); 





	 $('body').on('keypress',function(event) {
	  if (event.keyCode == 32 || event.keyCode == 80 || event.keyCode == 112)
	  {
		toggleSong();
	  }
	}); 
        } else {
            $('#name-input').addClass('error');
			 alert ("Please Enter Your Name To Further Access (3 Character atleast required) !!!");
        }
    });
	*/


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




// // code for jump the song and text go for next
// function timeJump() {
//     var song = document.querySelector('audio')
//     song.currentTime = song.duration - 5;
// }

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


/*
for (var i = 0; i < fileNames.length ; i++) {
    addSongNameClickEvent(fileNames[i],i+1)
}

*/
 
 
	
 /* $('body').on('keypress',function(event){
    var target = event.target;
                            if (event.keyCode == 32 && target.tagName !='INPUT'){
      toggleSong();
   } 
});
 */
 
 //function for changing current song details when ever songs chnages
 function changeCurrentSongDetails(songObj) {
  $('.current-song-image').attr('src','img/' + songObj.image) ;  //code for using jQuery to select the element with class 'current-song-image' and dynamically adding images in the somgs plalyed
  $('.current-song-name').text(songObj.name) ;
  $('.current-song-album').text(songObj.album) ;
}
 /*
 var songList = ['3 Peg - Sharry Mann (DjPunjab.Com)','Affair - MC JD (DjPunjab.Com)','Daang Mankirt Aulakh','Set Jatt - Joban Sandhu (DjPunjab.Com)','Chalti Hai Kya 9 Se 12-(Mr-Jatt.com)','Ban Ja Rani Guru Randhawa ' ]; 

var fileNames = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3','song5.mp3','song6.mp3'];
	  
var artistList = ['Artist #1', 'Artist #2','Artist #3','Artist #4','Artist #5','Artist #6']; 
	
var durationList = ['2:56','3:15','2:34','2:29','2:34','2:29'];	

var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre', 'Ae Dil Hai Mushkil' ,'Befikre', 'Ae Dil Hai Mushkil'];
*/



// Array of objects for storing the Song details

// ---------------------------------- Songs are Added---------------------------------
var songs = [
  {
    'name': '3 Peg - Sharry Mann (DjPunjab.Com)',
    'artist': 'Sharry Mann',
    'album': '3 PeG',
    'duration': '3:24',
   'fileName': 'song1.mp3',
   'image': 'song1.jpg'
  },
  {
    'name': 'Affair - MC JD (DjPunjab.Com)',
    'artist': 'Elly Mangat Ft. MC JD',
    'album': 'PB 26',
    'duration': '3:54',
    'fileName': 'song2.mp3',
   'image': 'song2.jpg'
  }
  ,
  {
    'name': 'Daang Mankirt Aulakh',
    'artist': 'Mankirat Aulakh',
    'album': 'Daang ',
    'duration': '3:41',
    'fileName': 'song3.mp3',
   'image': 'song3.jpg'
  }
  ,
  {
    'name': 'Set Jatt - Joban Sandhu (DjPunjab.Com)',
    'artist': 'Joban Sandhu',
    'album': 'Set Jatt',
    'duration': '1:09',
    'fileName': 'song4.mp3',
   'image': 'song4.jpg'
  }
  ,
  {
    'name': 'Chalti Hai Kya 9 Se 12-(Mr-Jatt.com)',
    'artist': 'Devi Negi Ft. Neha Kakkar',
    'album': 'Judwaa 2',
    'duration': '4:35',
    'fileName': 'song5.mp3',
   'image': 'song5.jpg'
  }
  ,
  {
    'name': 'Ban Ja Rani Guru Randhawa ',
    'artist': 'Guru Randhawa',
    'album': 'Tumhari Sulu',
    'duration': '1:33',
    'fileName': 'song6.mp3',
   'image': 'song6.jpg'
  }
]

//whenever the html document is loaded , only after that , run this function

window.onload = function() {
	changeCurrentSongDetails(songs[0]);
	/*
	$('#song1 .song-name').text(songList[0]);
	$('#song2 .song-name').text(songList[1]);
	$('#song3 .song-name').text(songList[2]);
	$('#song4 .song-name').text(songList[3]);
	$('#song5 .song-name').text(songList[4]);
	$('#song6 .song-name').text(songList[5]);
	$('#song1 .song-artist').text(artistList[0]);
	$('#song2 .song-artist').text(artistList[1]);
	$('#song3 .song-artist').text(artistList[2]);
	$('#song4 .song-artist').text(artistList[3]);
	$('#song5 .song-artist').text(artistList[4]);
	$('#song6 .song-artist').text(artistList[5]);

for(var i =0; i < songList.length;i++) {
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(songList[i]);
    song.find('.song-artist').text(artistList[i]);
    song.find('.song-album').text(albumList[i]); // Added
    song.find('.song-length').text(durationList[i]); // Added
  }
 */
 for(var i =0; i < songs.length;i++) {
    var obj = songs[i];
    var name = '#song' + (i+1);
    var song = $(name);
    song.find('.song-name').text(obj.name);
    song.find('.song-artist').text(obj.artist);
    song.find('.song-album').text(obj.album);
    song.find('.song-length').text(obj.duration);
    addSongNameClickEvent(obj,i+1) ;  //function call by passing object value and position information
  }
 /* 
 $('#song1').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[0]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[0];
    toggleSong();
  }
});
$('#song2').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[1]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[1];
    toggleSong();
  }
});
$('#song3').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[2]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[2];
    toggleSong();
  }
});
$('#song4').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[3]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[3];
    toggleSong();
  }
});
$('#song5').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[4]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[4];
    toggleSong();
  }
});
$('#song6').click(function() {
  var audio = document.querySelector('audio');
  var currentSong = audio.src;
  if(currentSong.search(fileNames[5]) != -1)
  {
    toggleSong();
  }
  else {
    audio.src = fileNames[5];
    toggleSong();
  }
  
});
*/
  updateCurrentTime();

  setInterval(function() {
    updateCurrentTime();
	updateTimer();
  },1000);
  
};

/*
//whenever the html document is loaded , only after that , run this function
            window.onload = function() {
                changeCurrentSongDetails(songs[0]);
                updateCurrentTime();
                setInterval(function() {
                    updateCurrentTime();
                    updateTimer();
                  },1000);
*/

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
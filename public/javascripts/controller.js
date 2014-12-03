var followMeGlobal = false;
var sendHomeGlobal = false;
var voiceOnGlobal = false;
var currentLightColor = 0;

window.onload = function() {
// Prepare Music
 var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', '/jingleBells.mp3');
        // audioElement.setAttribute('autoplay', 'autoplay');
        //audioElement.load()
        $.get();
        audioElement.addEventListener("load", function() {
        audioElement.play();
        }, true);
  //=============================== ROS Connection ==========================//
  var ros = new ROSLIB.Ros();

  ros.on('error', function(error) {
    $('#statusIndicator').html('Error');
  });

  ros.on('connection', function() {
    $('#statusIndicator').html('&nbsp;&nbsp;&nbsp;Connected');
  });

  ros.on('close', function() {
    $('#statusIndicator').html('Closed');
  });

  ros.connect('ws://softshell.cs.washington.edu:9090');

  var voiceListener = new ROSLIB.Topic({
    ros : ros,
    name : '/recognizer/output',
    messageType : '/std_msgs/String',
    throttle_rate : 0
  });

  //============================ Key Behaviour ==========================//

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      moveRobot(0, 0.7);
      $('#left').attr('class', 'btn btn-primary');
      break;

      case 38: // up
      moveRobot(0.3, 0.0);
      $('#forward').attr('class', 'btn btn-primary');
      break;

      case 39: // right
      moveRobot(0, -0.7);
      $('#right').attr('class', 'btn btn-primary');
      break;

      case 40: // down
      moveRobot(-0.3, 0.0);
      $('#backward').attr('class', 'btn btn-primary');
      break;

      case 90: // z
      $("#lampRotateLeft").trigger("click");
      $('#lampRotateLeft').attr('class', 'btn btn-primary');
      break;

      case 88: // x
      $('#lampRotateRight').trigger("click");
      $('#lampRotateRight').attr('class', 'btn btn-primary');
      break;

      default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $(document).keyup(function(e) {
    switch(e.which) {
      case 37: // left
      $('#left').attr('class', 'btn btn-default');
      break;

      case 38: // up
      $('#forward').attr('class', 'btn btn-default');
      break;

      case 39: // right
      $('#right').attr('class', 'btn btn-default');
      break;

      case 40: // down
      $('#backward').attr('class', 'btn btn-default');
      break;

      case 90: // z
      $('#lampRotateLeft').attr('class', 'btn btn-default');
      break;

      case 88: // x
      $('#lampRotateRight').attr('class', 'btn btn-default');
      break;

      default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  //============================ Button Behaviour ==========================//


  $('#instructions').click(function() {
    var ins = "ssh turtlebot@softshell\n";
    ins += "-roscore\n";
    ins += "-roslaunch turtlebot_bringup minimal.launch\n";
    ins += "-roslaunch beginner_tutorials web.launch\n";
    ins += "-roslaunch rosbridge_server rosbridge_websocket.launch\n";
    ins += "-roslaunch turtlebot_bringup 3dsensor.launch\n";
    ins += "-rosrun robot_pose_ekf robot_pose_ekf\n";
    ins += "-rosrun mjpeg_server mjpeg_server\n";
    ins += "-roslaunch pocketsphinx lumi.launch";
    alert(ins);
  });


  function moveRobot(xDir, rotate) {
    var cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : '/mobile_base/commands/velocity',
      messageType : 'geometry_msgs/Twist'
    });
    var twist = new ROSLIB.Message({
      linear : {
        x : xDir,
        y : 0.0,
        z : 0.0
      },
      angular : {
        x : rotate,
        y : rotate,
        z : rotate
      }
    });
    cmdVel.publish(twist);
  }

  var interval;
  $('#forward').on({
    mousedown : function () {
      var el = $(this);
      el.val(parseInt(el.val(), 10) + 1);
      interval = window.setInterval(function(){
        moveRobot(0.3, 0.0);
        el.val(parseInt(el.val(), 10) + 1);
      }, 200);
    },
    mouseup : function () {
      window.clearInterval(interval);
    }
  });

  var interval2;
  $('#backward').on({
    mousedown : function () {
      var el = $(this);
      el.val(parseInt(el.val(), 10) + 1);
      interval2 = window.setInterval(function(){
        moveRobot(-0.3, 0.0);
        el.val(parseInt(el.val(), 10) + 1);
      }, 200);
    },
    mouseup : function () {
      window.clearInterval(interval2);
    }
  });

  var interval3;
  $('#left').on({
    mousedown : function () {
      var el = $(this);
      el.val(parseInt(el.val(), 10) + 1);
      interval3 = window.setInterval(function(){
        moveRobot(0, 0.7);
        el.val(parseInt(el.val(), 10) + 1);
      }, 200);
    },
    mouseup : function () {
      window.clearInterval(interval3);
    }
  });

  var interval4;
  $('#right').on({
    mousedown : function () {
      var el = $(this);
      el.val(parseInt(el.val(), 10) + 1);
      interval4 = window.setInterval(function(){
        moveRobot(0, -0.7);
        el.val(parseInt(el.val(), 10) + 1);
      }, 200);
    },
    mouseup : function () {
      window.clearInterval(interval4);
    }
  });

  $('#lampRotateLeft').click(function() {
    $.get( "/lampRotateLeft" );
  });

  $('#lampRotateRight').click(function() {
    $.get( "/lampRotateRight" );
  });

  $('#lampColor1').click(function() {
var audio = new Audio();
	audio.src ='/red.mp3';
	audio.play();
audioElement.pause();
    if(currentLightColor != 1) {
      currentLightColor = 1;
      $('#lampColor1').attr('class', 'btn btn-primary');
      $('#lampColor2').attr('class', 'btn btn-default');
      $('#lampColor3').attr('class', 'btn btn-default');
	$('#lampColor4').attr('class', 'btn btn-default');
    }
    $.get( "/lampColor1" );
  });

 $('#lampColor2').click(function() {
var audio = new Audio();
	audio.src ='/blue.mp3';
	audio.play();
audioElement.pause();
   if(currentLightColor != 2) {
      currentLightColor = 2;
      $('#lampColor2').attr('class', 'btn btn-primary');
      $('#lampColor1').attr('class', 'btn btn-default');
      $('#lampColor3').attr('class', 'btn btn-default');
	$('#lampColor4').attr('class', 'btn btn-default');
    }
    $.get( "/lampColor2" );
  });

 $('#lampColor3').click(function() {
var audio = new Audio();
	audio.src ='/husky.mp3';
	audio.play();
audioElement.pause();
  if(currentLightColor != 3) {
      currentLightColor = 3;
      $('#lampColor3').attr('class', 'btn btn-primary');
      $('#lampColor1').attr('class', 'btn btn-default');
      $('#lampColor2').attr('class', 'btn btn-default');
	$('#lampColor4').attr('class', 'btn btn-default');
    }
    $.get( "/lampColor3" );
  });

 $('#lampColor4').click(function() {
var audio = new Audio();
	audio.src ='/fiesta.mp3';
	audio.play();
  if(currentLightColor != 4) {
	audioElement.play();
      currentLightColor = 4;
      $('#lampColor3').attr('class', 'btn btn-default');
      $('#lampColor1').attr('class', 'btn btn-default');
      $('#lampColor2').attr('class', 'btn btn-default');
	$('#lampColor4').attr('class', 'btn btn-primary');
    }
    $.get( "/lampColor4" );
  });

	function respondToVoiceCommand() {
	    voiceListener.subscribe(function(voiceCmd) {
		    var stringVoiceCommand = voiceCmd.data;
		console.log(stringVoiceCommand);
		    // logic goes here
		    if (stringVoiceCommand.indexOf("lumi terminate") != -1) {
		    	if(sendHomeGlobal == true) {
            			$('#sendHome').trigger('click');
		    	}
          		if(followMeGlobal == true) {
        			$('#followMe').trigger('click');
          		}
		    } else if (stringVoiceCommand.indexOf("lumi red") != -1) {
		    	$('#lampColor1').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi blue") != -1) {
		    	$('#lampColor2').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi husky") != -1) {
		    	$('#lampColor3').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi fiesta") != -1) {
		    	$('#lampColor4').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi ascend") != -1) {
		    	$('#lampRotateLeft').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi down") != -1) {
		    	$('#lampRotateRight').trigger("click");
		    } else if (stringVoiceCommand.indexOf("lumi follow") != -1) {
		    	if(sendHomeGlobal == true) {
		    		$('#sendHome').trigger('click');
		    	}
          		if(followMeGlobal == false) {
          			$('#followMe').trigger('click');
          		}
		    } else if (stringVoiceCommand.indexOf("lumi home") != -1) {
		    	if(followMeGlobal == true) {
		    		$('#followMe').trigger('click');
		    	}
		    	if(sendHomeGlobal == false) {
		    		$('#sendHome').trigger('click');
		    	}
		    }
	  	});
      // rostopic echo /recognizer/output
	}

  function disableVoiceCommands() {
    voiceListener.unsubscribe();
  }
	
  $('#voiceOn').click( function() {
    if(voiceOnGlobal == true) {
      disableVoiceCommands();
      // $('#sendHome').prop('disabled', false);
      // $('#followMe').prop('disabled', false);
      $('#voiceOn').attr('class', 'btn btn-default');
      voiceOnGlobal = false;
    } else {
      respondToVoiceCommand();
      // $('#sendHome').prop('disabled', true);
      // $('#followMe').prop('disabled', true);
      $('#voiceOn').attr('class', 'btn btn-primary');
      voiceOnGlobal = true;
    }
  });

	$('#followMe').click( function() {
var audio = new Audio();
	audio.src ='/following.mp3';
	audio.play();
     var startTrack = new ROSLIB.Topic({
      ros : ros,
      name : '/beginner_tutorials/string_node',
      messageType : 'std_msgs/String',
      throttle_rate : 0
    });
     if(followMeGlobal == true) {
        var twist = new ROSLIB.Message({
          data : "h0"
        });
       startTrack.publish(twist);
	startTrack.publish(twist);
	startTrack.publish(twist);
       followMeGlobal = false;
       $('#sendHome').prop('disabled', false);
        // $('#voiceOn').prop('disabled', false);
        $('#followMe').attr('class', 'btn btn-default');
    } else {
      var twist = new ROSLIB.Message({
        data : "h1"
      });
       startTrack.publish(twist);
	startTrack.publish(twist);
	startTrack.publish(twist);
       followMeGlobal = true;
       $('#sendHome').prop('disabled', true);
        // $('#voiceOn').prop('disabled', true);
        $('#followMe').attr('class', 'btn btn-primary');
    }
   
    console.log("chatteredFollowMe");
    // rostopic pub /chatter std_msgs/String "h0"
	});

    $('#sendHome').click( function() {
	var audio = new Audio();
	audio.src ='/home.mp3';
	audio.play();
     var startTrack = new ROSLIB.Topic({
      ros : ros,
      name : '/beginner_tutorials/string_node',
      messageType : 'std_msgs/String',
      throttle_rate : 0
    });
     if(sendHomeGlobal == true) {
       var twist = new ROSLIB.Message({
        data : "sh0"
      });
       startTrack.publish(twist);
	startTrack.publish(twist);
	startTrack.publish(twist);
       sendHomeGlobal = false;
       $('#followMe').prop('disabled', false);
        // $('#voiceOn').prop('disabled', false);
        $('#sendHome').attr('class', 'btn btn-default');
    } else {
      var twist = new ROSLIB.Message({
        data : "sh1"
      });
       startTrack.publish(twist);
	startTrack.publish(twist);
	startTrack.publish(twist);
       sendHomeGlobal = true;
        $('#followMe').prop('disabled', true);
        // $('#voiceOn').prop('disabled', true);
        $('#sendHome').attr('class', 'btn btn-primary');
    }
   
    console.log("chatteredSendHome");
    // rostopic pub /chatter std_msgs/String "h0"
  });

}

window.onload = function() {
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

  $('#lampRotateLeft').click(function() {
    $.get( "/lampRotateLeft" );
  });

  $('#lampRotateRight').click(function() {
    $.get( "/lampRotateRight" );
  });


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


  function simulateKeyPress(character) {
    
  }

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

	function goHome() {
		var poseListener = new ROSLIB.Topic({
			ros : ros,
			name : '/robot_pose_ekf/odom_combined',
			messageType : '/geometry_msgs/PoseWithCovarianceStamped',
			throttle_rate : 0
		});
	    poseListener.subscribe(function(pose) {
		    console.log(pose);
		    var poseHome = new ROSLIB.Topic({
				ros : ros,
				name : '/beginner_tutorials/go_home_node',
				messageType : '/geometry_msgs/PoseWithCovarianceStamped'
		    });
		    poseHome.publish(pose);
		    poseListener.unsubscribe();
	  	});
	}
	
	function respondToVoiceCommand() {
		var voiceListener = new ROSLIB.Topic({
			ros : ros,
			name : '/recognizer/output',
			messageType : '/geometry_msgs/PoseWithCovarianceStamped',
			throttle_rate : 0
		});
	    voiceListener.subscribe(function(voiceCmd) {
		    console.log(voiceCmd);
		    // logic goes here
		    voiceListener.unsubscribe();
	  	});
	}

	 var interval0;
	$('#sendHome').on({
	  mousedown : function () {
	    var el = $(this);
	    el.val(parseInt(el.val(), 10) + 1);
	    interval0 = window.setInterval(function(){
	       goHome();
	      el.val(parseInt(el.val(), 10) + 1);
	    }, 200);
	  },
	  mouseup : function () {
	    window.clearInterval(interval0);
	  }
	});


}

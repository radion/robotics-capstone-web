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

  ros.connect('ws://chester.cs.washington.edu:9090');

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

      default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  //============================ Button Behaviour ==========================//

  $('#sendHome').click(function() {
    alert('Sending Home');
  });

  $('#instructions').click(function() {
    var ins = "ssh turtlebot@softshell\n";
    ins += "-roscore\n";
    ins += "-roslaunch turtlebot_bringup minimal.launch\n";
    ins += "-roslaunch rosbridge_server rosbridge_websocket.launch\n";
    ins += "-roslaunch turtlebot_bringup 3dsensor.launch\n";
    ins += "-rosrun mjpeg_server mjpeg_server";
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
}
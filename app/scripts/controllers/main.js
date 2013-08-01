'use strict';

angular.module('mathPlotApp')
  .controller('MainCtrl', function ($scope) {
    $scope.m =  .5;
    $scope.b = 7;
      function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, 120, 30);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
        window.setTimeout(function() {
          context.clearRect(0, 0, 120, 30);;
        },1500);
      }
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }



    $scope.setGraph = function(){
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0, canvas.width, canvas.height);
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;

      // make vertical line
      ctx.beginPath();
      ctx.moveTo(centerX , 0);
      ctx.lineTo(centerX, canvas.height)
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // make horizontal line
      ctx.beginPath();
      ctx.moveTo(0 , centerY);
      ctx.lineTo(canvas.width, centerY)
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
      ctx.closePath();
      return ctx;
    };

      // graph formula
      $scope.lineFormula = function(){
        var ctx = $scope.setGraph();
        var canvas = document.getElementById('canvas');
        var xmax = canvas.width,
          ymax = canvas.height,
          xmin = 0,
          ymin = 0,
          x, y, yStart, yEnd,
          m,
          b;

        m = $scope.m
        b = $scope.b;

        yStart = m*xmax + b;
        yEnd = m*xmin + b;
        ctx.beginPath();
        ctx.moveTo(xmax, yStart);
        ctx.lineTo(xmin, yEnd);
        ctx.stroke();

       $('#canvas').on('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var tolerance = 25;
        debugger;
        var yLine = (m * mousePos.x + b)
        var yLineRound = Math.round((m * mousePos.x + b) / tolerance) * tolerance;
        var yMouse = Math.round(mousePos.y/tolerance) * tolerance;
        if( yMouse == yLineRound){
           var message = '(' + mousePos.x + ',' + mousePos.y + ')';
            writeMessage(canvas, message);
            ctx.beginPath();
            ctx.arc(mousePos.x, yLine, 1,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fillStyle = 'green';
            ctx.fill();
        };
      });
      };


  });

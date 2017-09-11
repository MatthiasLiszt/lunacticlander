
var lLander = angular.module('lLander',[]);

function moonControl(state,action){
 if(state === undefined)
  {return {onoff: 'off', height: 30000, speed: 0, thrust: 0, fuel: 8000}; }
 switch(action.type){
   case 'onoff': return onoffAction(state);
   case 'fireplus': return fireplusAction(state);
   case 'fireminus': return fireminusAction(state);
   case 'time': return timeAction(state);
 }
}

function fireplusStore(){
  console.log("fireplusStore executed");
 }

lLander.controller('MainControl',function($scope){
  var curState={height: 0, speed: 0, fuel: 0, thrust: 0}; //for redux store.getState

  $scope.height=curState.height;
  $scope.speed=curState.speed;
  $scope.fuel=curState.fuel;
  $scope.thrust=curState.thrust;
 
  $scope.startbutton=function(){console.log("startbutton pressed");};
  $scope.resetbutton=function(){console.log("resetbutton pressed");};
  $scope.backgroundbutton=function(){console.log("background button pressed");};

  $scope.fireplus=function(){
                   console.log("fireplus pressed");
                   fireplusStore();
                  };
  $scope.fireminus=function(){
                    console.log("fireminus pressed");
                    //store.dispatch({type: 'fireminus'});
                   };

  $scope.text="it should work now"; // just for testing
});

lLander.directive("w3Directive", function() {
    return {
        template : "<h1>Made by a directive!</h1>"
    };
})

lLander.directive("gameControl", function() {
    return {
        template: "<button ng-click='startbutton()'>Start</button><button ng-click='resetbutton()'>Reset</button>             <button ng-click='backgroundbutton()'>Background Information</button><br></br>",
         
    };
})

lLander.directive("monitor", function() {
    return {
        template: "<canvas style='border:3px solid #000000;border-radius:9px;width:320px;height:320px;float:left;margin:24px;'></canvas>"
        
    };
})

lLander.directive("controlPanel", function() {
    return {
        template : "<h2>control panel</h2><p><strong>height</strong>&nbsp;{{height}}</p><p><strong>speed</strong>&nbsp;{{speed}}</p><p><strong>fuel</strong>&nbsp;{{fuel}}</p><p><strong>thrust</strong>&nbsp;{{thrust}}</p><button ng-click='fireplus()'>+</button> fire <button ng-click='fireminus()'>-</button>"
    };
})


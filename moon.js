

function moonControl(state,action){
 if(state === undefined)
  {return {onoff: 'off', height: 100000, speed: 0, thrust: 0, fuel: 8000}; }
 switch(action.type){
   case 'onoff': return onoffAction(state);
   case 'fireplus': return fireplusAction(state);
   case 'fireminus': return fireminusAction(state);
   case 'time': return timeAction(state);
 }
}

var store=Redux.createStore(moonControl);


// hooking of DOM elements
var onoff=document.getElementById('onoff');
var fireplus=document.getElementById('fireplus');
var fireminus=document.getElementById('fireminus');
var thrust=document.getElementById('thrust');
var speed=document.getElementById('speed');
var fuel=document.getElementById('fuel');
var height=document.getElementById('height');
var monitor=document.getElementById('monitor');

var ctx=monitor.getContext("2d");

function drawSpaceship(x){

 var h=Math.round(((100000-x.height)/100000)*300/3);
 var size=6;

 //ctx.clearRect(0, 0, monitor.width, monitor.height);
 var mx=monitor.width,my=monitor.height;

 monitor.width=mx;
 monitor.height=my;

 ctx.beginPath();
 ctx.arc(160,h+size,size,0,2*Math.PI);

 ctx.lineWidth=3;
 if(x.thrust>0)
  {ctx.strokeStyle = '#ff0000';}
 else
  {ctx.strokeStyle = '#001100';}
 ctx.stroke();
 ctx.closePath();
 ctx.beginPath();
 ctx.strokeStyle = '#001100';
 ctx.moveTo(0,112);
 ctx.lineTo(320,112);
 ctx.stroke();
 ctx.closePath();
 console.log(h);
}

function render(){
 var curState=store.getState();

 onoff.innerHTML=curState.onoff;
 thrust.innerHTML=curState.thrust+" %";
 speed.innerHTML=curState.speed+" m/s";
 fuel.innerHTML=curState.fuel+" kg";
 height.innerHTML=curState.height+" m";
 
 drawSpaceship(curState); 
}

render();
store.subscribe(render);

//adding the eventListener to hooked DOM elements
onoff.addEventListener('click',function(){
      store.dispatch({type: 'onoff'}); 
});

fireplus.addEventListener('click',function(){
       store.dispatch({type: 'fireplus'});  
});

fireminus.addEventListener('click',function(){
       store.dispatch({type: 'fireminus'});  
});

// eventListener for testing

document.body.addEventListener('click',function(){
  console.log("body clicked !");
  
  //store.dispatch({type: 'time'}); disabled because timer set
});

function callTimeAction(){store.dispatch({type: 'time'});}

setInterval(callTimeAction,1000); // reduces this to 81 if you want things going faster


//the various actions functions which return a changed state 

function onoffAction(x){
 if(x.onoff=='off'){return {onoff: 'on', height: x.height, thrust: x.thrust, fuel: x.fuel, speed: x.speed};}
 else {return {onoff: 'off', height: x.height, thrust: x.thrust, fuel: x.fuel, speed: x.speed };}
}

function fireplusAction(x){
 if(x.thrust<100){return {thrust: x.thrust+1, height: x.height, fuel: x.fuel, speed: x.speed, onoff: x.onoff};}
 else {return {thrust: x.thrust, height: x.height, fuel: x.fuel, speed: x.speed, onoff: x.onoff};}
}

function fireminusAction(x){
 if(x.thrust>0){return {thrust: x.thrust-1, height: x.height, fuel: x.fuel, speed: x.speed, onoff: x.onoff};}
 else {return {thrust: x.thrust, height: x.height, fuel: x.fuel, speed: x.speed, onoff: x.onoff};}
}

function timeAction(x){ // still experimental
 var spacecraftMass=16000;
 var xVelocity=3200;
 var moonG=1.62;
 var fuelConsumption=(x.thrust/100)*80;
 var curFuel=x.fuel-fuelConsumption;
 var curMass=curFuel+spacecraftMass;
 var deltaV=xVelocity*fuelConsumption/curMass;
 var curSpeed=x.speed+moonG-deltaV;
 var nv={thrust: x.thrust, height: x.height-curSpeed, fuel: curFuel, speed: curSpeed, onoff: x.onoff};

 if(curFuel<0){nv.fuel=0;}
 if(fuelConsumption>curFuel){nv.curSpeed=x.speed+moonG;nv.thrust=0;nv.height=x.height-nv.curSpeed;}
 if(nv.height<0){nv.height=0;nv.onoff='off';}

 if(x.onoff=='on'){return nv;}
 else{return x;} 
}


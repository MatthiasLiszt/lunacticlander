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


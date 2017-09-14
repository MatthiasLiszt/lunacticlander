/**
 * Reducers update a specific prop in the application state, by operating
 * after the action which describes what to change.
 * To add a new action, add it to the switch statement in the dataReducer function
 *
 * @example
 * case NEW_ACTION_CONSTANT:
 *   return assign({}, state, {
 *     stateVariable: action.var,
 *   });
 *
 * To add a new reducer, add another file like this to the reducers folder, and
 * add it in rootReducer.js.
 */

import * as types from '../constants';

// Set up an initial state to hold data. Use count to assign ids so we can
// remove items from the collection
const initialState = {
  items: [],
  count: 0,
  height: 30000,
  speed: 0,
  fuel: 8000,
  thrust: 0,
  onoff: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    // Assign the next id and add the item to data collection
    case types.ADD_DATA:
      return angular.extend({}, state, {
        count: state.count + 1,
        items: state.items.concat(
          angular.extend({}, action.data, {
            id: state.count + 1,
          })
        ),
      });
    // Remove item from collection by item by overwriting with a filtered copy
    case types.REMOVE_DATA:
      return angular.extend({}, state, {
        items: state.items.filter((item) => {
          return item.id !== action.data;
        }),
      });

    case types.ONOFF:
      return angular.extend({},state,{
        onoff: !state.onoff
      }); 
    case types.RESET:
      return initialState;
    case types.TIME:
      return timeAction(state);
    case types.FIREPLUS:
      return fireplusAction(state);  
    case types.FIREMINUS:
      return fireminusAction(state);   
    default:
      return state;
  }
}

// well, calculates spacecraft data for the game
function timeAction(s){
 var spacecraftMass=16000;
 var xVelocity=3200;
 var moonG=1.62;
 var fuelConsumption=(s.thrust/100)*80;
 var curFuel=s.fuel-fuelConsumption;
 var curMass=curFuel+spacecraftMass;
 var deltaV=xVelocity*fuelConsumption/curMass;
 var curSpeed=s.speed+moonG-deltaV;
 var curThrust=s.thrust;
 var curHeight=s.height-curSpeed;
 var running=true;

 if(curFuel<0){curFuel=0;}
 if(fuelConsumption>curFuel)
  {curSpeed=s.speed+moonG;
   curThrust=0;
   curHeight=s.height-curSpeed;
  }
 if(curHeight<0)
  {curHeight=0;
   if(s.speed>2)
    {curSpeed="crashed with "+s.speed;}
   else
    {curSpeed="landed with "+s.speed;}
   running=false
  }

 curHeight=Math.round(curHeight);
 curFuel=Math.round(curFuel);
 if(curHeight>0)
  {curSpeed=Math.round(curSpeed*100)/100;}
 
 if(s.onoff)
  {return angular.extend({},s,{speed: curSpeed, fuel: curFuel, height: curHeight, thrust: curThrust, onoff: running});
  }
 else
  {return s;}
}

function fireplusAction(s){
 var curThrust=s.thrust;
 if(s.thrust<100)
  {curThrust=s.thrust+1;}
 if(s.onoff)
  {return angular.extend({},s,{thrust: curThrust});}
 else
  {return s;}
}

function fireminusAction(s){
 var curThrust=s.thrust;
 if(s.thrust>0)
  {curThrust=s.thrust-1;}
 if(s.onoff)
  {return angular.extend({},s,{thrust: curThrust});}
 else
  {return s;}
}

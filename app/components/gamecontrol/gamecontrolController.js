import actionTrigger from '../../actions';
import oneTrigger from '../../actions';
import * as types from '../../constants';

export default class GamecontrolController {

  /*@ngInject;*/
  constructor($scope, $ngRedux) {
    this.$ngRedux=$ngRedux;
    // bind redux state to this component, which subsribes to updates like a
    // one way data binding
    const disconnect = $ngRedux.connect((state) => {
      if(state.data.onoff)
       {var buttonvalue="Hold";}
      else 
       {var buttonvalue="Start";}
      return {
        startbuttonValue: buttonvalue,
        onoff: state.data.onoff
      };
    })(this);

    // remove the redux data binding when component is destroyed
    $scope.$on('$destroy', disconnect);
  }
 
  startbutton(){
   console.log("start button pressed");
   this.$ngRedux.dispatch(oneTrigger(types.ONOFF));
  }
  
  resetbutton(){
   console.log("reset-button pressed");
   this.$ngRedux.dispatch(oneTrigger(types.RESET));
  }

  backgroundbutton(){
   console.log("background button pressed");
  }

}

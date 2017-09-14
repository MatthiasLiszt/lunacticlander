import oneTrigger from '../../actions';
import * as types from '../../constants';

export default class ControlpanelController {
  /*@ngInject;*/
  constructor($scope, $ngRedux,$interval) {
    // bind redux state to this component, which subsribes to updates like a
    // one way data binding
    this.$ngRedux=$ngRedux;

    var doTimeCall = function (){
                       //console.log("time call");
                       $ngRedux.dispatch(oneTrigger(types.TIME)); 
                      };
    
    const disconnect = $ngRedux.connect((state) => {
      return {
        data: state.data.height,
        height: state.data.height,
        speed: state.data.speed,
        fuel: state.data.fuel, 
        thrust: state.data.thrust
      };
    })(this);
    
    $interval(doTimeCall,1000);
 
    // remove the redux data binding when component is destroyed
    $scope.$on('$destroy', disconnect);
  }

  fireplus(){
   this.$ngRedux.dispatch(oneTrigger(types.FIREPLUS)); 
  }
  
  fireminus(){
   this.$ngRedux.dispatch(oneTrigger(types.FIREMINUS)); 
  }    
}

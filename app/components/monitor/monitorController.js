import * as types from '../../constants';

export default class MonitorController {
  
  /*@ngInject;*/
  constructor($scope, $ngRedux,$interval) {
    this.$ngRedux=$ngRedux;

           
    // bind redux state to this component, which subsribes to updates like a
    // one way data binding
    var height=0,onoff=false,thrust=0;
    const disconnect = $ngRedux.connect((state) => {
      height=state.data.height;
      onoff=state.data.onoff;
      thrust=state.data.thrust;
      return {
        height: state.data.height,
        onoff: state.data.onoff
      };
    })(this);

    var updateMonitor = function(){
                         //var canvas = element.parent();
                         var canvas=document.getElementById('monitor');
                         var ctx = canvas.getContext("2d");
                         var monitor=canvas;
                                             
                         //console.log("updateMonitor executed");
                         //console.log(height+" -- "+onoff);
                         if(onoff)
                          {var h=Math.round(((30000-height)/30000)*300/3);
                           var size=6;
                           var mx=monitor.width,my=monitor.height;
                           monitor.width=mx;
                           monitor.height=my;   
                           ctx.beginPath();
                           ctx.arc(160,h+size,size,0,2*Math.PI);

                           ctx.lineWidth=3;
                           if(thrust>0)
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
                          }
                        }

    $interval(updateMonitor,1000);

    // remove the redux data binding when component is destroyed
    $scope.$on('$destroy', disconnect);
  }

}

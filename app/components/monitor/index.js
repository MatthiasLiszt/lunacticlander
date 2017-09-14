/**
 * Monitor component
 * This file returns an angular module for the canvas monitor. 
 */

import MonitorController from './monitorController';
//import MonitorDirective from './monitorDirective';
import template from './monitor.html';

export default angular

  .module('app.monitor', [])

  .component('monitor', {
    template,
    controller: MonitorController,
    //directive: MonitorDirective
  })
 
  .name;

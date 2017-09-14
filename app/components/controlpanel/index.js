/**
 * Controlpanel component
 * This file returns an angular module for the game control panel. 
 */

import ControlpanelController from './controlpanelController';
import template from './controlpanel.html';

export default angular

  .module('app.controlpanel', [])

  .component('controlpanel', {
    template,
    controller: ControlpanelController,
  })
 
  .name;

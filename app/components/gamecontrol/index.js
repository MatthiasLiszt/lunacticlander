/**
 * Gamecontrol component
 * This file returns an angular module for the game control buttons.
 */

import GamecontrolController from './gamecontrolController';
import template from './gamecontrol.html';

export default angular

  .module('app.gamecontrol', [])

  .component('gamecontrol', {
    template,
    controller: GamecontrolController,
  })
 
  .name;

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LiveScenePoolsComponent extends Component {
  @service gameApi;
  @service flashMessages;

  @tracked showPool = false;
  @tracked selectSpendPool = false;
  @tracked selectAddPool = false;
  @tracked selectResetPool = false;
  @tracked selectShowPool = false;
  @tracked poolSpendReason = null;
  @tracked poolAddReason = null;
  @tracked poolAddAmount = null;
  @tracked poolSpendAmount = null;

  get scene() {
    return this.args.scene;
  }

  get poseChar() {
    return this.scene && this.scene.poseChar;
  }

  @action
  updateProperty(property, event) {
    this[property] = event.target.value;
  }

  @action
  spendPool() {
    if (!this.poseChar) {
      this.flashMessages.danger("Scene data is not available.");
      return;
    }

    if (!this.poolSpendReason) {
      this.flashMessages.danger("You haven't given a reason for your Pool spend.");
      return;
    }

    if (!this.poolSpendAmount) {
      this.flashMessages.danger("You haven't specified a value for your Pool spend.");
      return;
    }
    
    this.gameApi.requestOne('spendPool', { 
      scene_id: this.scene.id,
      reason: this.poolSpendReason, 
      amount: this.poolSpendAmount, 
      sender: this.poseChar.name 
    }, null)
    .then( (response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      this.selectSpendPool = false;
      this.poolSpendReason = null;
      this.poolSpendAmount = null;
    });
  }

  @action
  addPool() {
    if (!this.poseChar) {
      this.flashMessages.danger("Scene data is not available.");
      return;
    }

    if (!this.poolAddAmount) {
      this.flashMessages.danger("You haven't given a value for your pool add.");
      return;
    }
        
    if (!this.poolAddReason) {
      this.flashMessages.danger("You haven't given a reason for adding to your pool.");
      return;
    }

    this.gameApi.requestOne('addPool', { 
      scene_id: this.scene.id,
      reason: this.poolAddReason, 
      amount: this.poolAddAmount, 
      sender: this.poseChar.name 
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.selectAddPool = false;
      this.poolAddAmount = null;
      this.poolAddReason = null;
    });
  }

  @action
  resetPool() {
    if (!this.poseChar) {
      this.flashMessages.danger("Scene data is not available.");
      return;
    }

    this.gameApi.requestOne('resetPool', { 
      scene_id: this.scene.id,
      sender: this.poseChar.name 
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
      this.selectResetPool = false;
    });
  }

  @action
  desperatePool() {
    if (!this.poseChar) {
      this.flashMessages.danger("Scene data is not available.");
      return;
    }

    this.gameApi.requestOne('desperatePool', { 
      scene_id: this.scene.id,
      sender: this.poseChar.name 
    }, null)
    .then( (response) => {
      if (response.error) {
        return;
      }
    });
  }

  @action
  showPool() {
    if (!this.poseChar) {
      this.flashMessages.danger("Scene data is not available.");
      return;
    }
    
    this.gameApi.requestOne('showPool', { 
      scene_id: this.scene.id,
      sender: this.poseChar.name 
    }, null)
    .then( (response) => {
      if (response.error) {
        console.log(response.error);
        return;
      }
      this.selectShowPool = false;
    });
  }

  @action
  setSelectSpendPool(value) {
    this.selectSpendPool = value;
  }

  @action
  setSelectSpendPoolFalse() {
    this.selectSpendPool = false;
  }

  @action
  setSelectAddPool(value) {
    this.selectAddPool = value;
  }

  @action
  setSelectAddPoolFalse() {
    this.selectAddPool = false;
  }
}
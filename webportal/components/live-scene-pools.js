import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  showPool: false,
  selectSpendPool: false,
  selectAddPool: false,
  selectResetPool: false,
  poolSpendReason: null,
  poolAddReason: null,
  poolAddAmount: null,
  poolSpendAmount: null,
  tagName: '',
  gameApi: service(),
  flashMessages: service(),

  actions: {

    spendPool() {
      let api = this.gameApi;
      let poolSpendReason = this.poolSpendReason;
      let poolSpendAmount = this.poolSpendAmount;
    
      this.set('selectSpendPool', false);
      this.set('poolSpendReason', null);
      this.set('poolSpendAmount', null);
          
      if (!poolSpendReason) {
        this.flashMessages.danger("You haven't given a reason for your Pool spend.");
        return;
      }

      if (!poolSpendAmount) {
        this.flashMessages.danger("You haven't specified a value for your Pool spend.");
        return;
      }
      
      console.log(poolSpendAmount);
      api.requestOne('spendPool', { scene_id: this.get('scene.id'),
        reason: poolSpendReason, amount: poolSpendAmount, sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          console.log(response.error);
          return;
        }
      });
    },

    addPool() {
      let api = this.gameApi;
      let poolAddReason = this.poolAddReason;
      let poolAddAmount = this.poolAddAmount;
    
      this.set('selectAddPool', false);
      this.set('poolAddAmount', null);
      this.set('poolAddReason', null);

      if (!poolAddAmount) {
        this.flashMessages.danger("You haven't given a value for your pool add.");
        return;
      }
          
      if (!poolAddReason) {
        this.flashMessages.danger("You haven't given a reason for adding to your pool.");
        return;
      }

      api.requestOne('addPool', { scene_id: this.get('scene.id'),
        reason: poolAddReason, amount: poolAddAmount, sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
      });
    },

    resetPool() {
      let api = this.gameApi;
    
      this.set('selectResetPool', false);

      api.requestOne('resetPool', { scene_id: this.get('scene.id'),
        sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
      });
    },

    desperatePool() {
      let api = this.gameApi;
    
      this.set('selectResetPool', false);

      api.requestOne('desperatePool', { scene_id: this.get('scene.id'),
        sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
      });
    },

    showPool() {
      let api = this.gameApi;
    
      this.set('selectShowPool', false);
      
      console.log(this.get('scene.poseChar'))      
    
      api.requestOne('showPool', { scene_id: this.get('scene.id'),
        sender: this.get('scene.poseChar.name') }, null)
      .then( (response) => {
        if (response.error) {
          console.log(response.error);
          return;
        }
      });
    }    
  }
});

'use babel';

import UnicodeHotbarView from './unicode-hotbar-view';
import { CompositeDisposable } from 'atom';

export default {

  unicodeHotbarView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.unicodeHotbarView = new UnicodeHotbarView(state.unicodeHotbarViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.unicodeHotbarView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'unicode-hotbar:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.unicodeHotbarView.destroy();
  },

  serialize() {
    return {
      unicodeHotbarViewState: this.unicodeHotbarView.serialize()
    };
  },

  toggle() {
    console.log('UnicodeHotbar was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

'use babel';

import UnicodeHotbar from './unicode-hotbar-hotbar';
import UnicodeHotbarFavourites from './unicode-hotbar-favourites';
import { CompositeDisposable } from 'atom';

export default {

  unicodeHotbar: null,
  unicodeHotbarFavourites: null,
  hotbarModalPanel: null,
  favouritesModelPanel: null,
  subscriptions: null,

  activate(state) {
    this.unicodeHotbar = new UnicodeHotbar(state.unicodeHotbarState);
    this.unicodeHotbarFavourites = new UnicodeHotbarFavourites(state.unicodeHotbarFavouritesState);
    this.hotbarModalPanel = atom.workspace.addModalPanel({
      item: this.unicodeHotbar.getElement(),
      visible: false
    });
    this.favouritesModelPanel = atom.workspace.addModalPanel({
      item: this.unicodeHotbarFavourites.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'unicode-hotbar:show_hide_hotbar': () => this.show_hide_hotbar(),
      'unicode-hotbar:show_hide_favourites': () => this.show_hide_favourites()
    }));
  },

  deactivate() {
    this.hotbarModalPanel.destroy();
    this.favouritesModelPanel.destroy();
    this.subscriptions.dispose();
    this.unicodeHotbarFavourites.destroy();
    this.unicodeHotbar.destroy();
  },

  serialize() {
    return {
      unicodeHotbarState: this.unicodeHotbar.serialize(),
      unicodeHotbarFavouritesState: this.unicodeHotbarFavourites.serialize()
    };
  },

  show_hide_hotbar() {
    console.log("Hotbar Toggled!");
    return(
      this.hotbarModalPanel.isVisible() ? this.hotbarModalPanel.hide() : this.hotbarModalPanel.show()
    )
  },

  show_hide_favourites() {
    console.log("Favourites Menu Toggled!");
    return(
      this.favouritesModelPanel.isVisible() ? this.favouritesModelPanel.hide() : this.favouritesModelPanel.show()
    )
  }

};

'use babel';

export default class UnicodeHotbar {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('unicode-hotbar-hotbar');

    this.genButtons();

  }

  genButtons() {
    while(this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    let unicodeChars = atom.config.get("unicode-hotbar.favourites").split(",");
    if (unicodeChars.length > 0) {
      for (var i = 0; i < unicodeChars.length; i++) {
        let button = document.createElement('button');
        button.classList.add("unicode-button");
        button.setAttribute("role","button");
        button.addEventListener('click', this.onButtonClicked);
        button.innerHTML = String.fromCharCode(parseInt(unicodeChars[i],16));
        this.element.appendChild(button);
      }
    } else {
        let message = document.createElement('p');
        message.classList.add("unicode-warning");
        message.innerHTML = "There are no icons here, set them with the favourites panel or in the package settings.";
        this.element.appendChild(message);
    }
  }

  onButtonClicked(e) {
    let editor
    if (editor = atom.workspace.getActiveTextEditor() ) {
      editor.insertText(e.target.innerHTML);
    } else {
      console.log("Failed to insert character!");
    }
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.cancel();
    this.element.remove();
  }

  attach () {
    this.previouslyFocusedElement = document.activeElement
    this.element.focus()
    this.element.reset()
  }

  cancel () {
    if (this.element != null) {
      this.element.destroy()
    }
    this.element = null
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus()
      this.previouslyFocusedElement = null
    }
  }

  getElement() {
    return this.element;
  }

}

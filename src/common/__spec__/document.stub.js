const append = function (value) {
  this.children.push(value);
};

function HTMLElement (tag) {
  this.tagName = tag;
  this.children = [];
  this.className = '';

  this.append = append.bind(this);
  this.classList = {
    add: (className) => {
      this.className += (
        `${ this.className ? `${ className }` : className }`
      );
    },
  };
}

function DocumentFragment () {
  this.children = [];
  this.append = append.bind(this);
}

export function Document () {
  this.createDocumentFragment = function () {
    return new DocumentFragment();
  };

  this.createElement = function (tag) {
    return new HTMLElement(tag);
  };
}

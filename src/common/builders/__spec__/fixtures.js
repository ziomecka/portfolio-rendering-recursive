const fooProps = {
  HTMLTag: 'div',
  value: 'some foo text',
  className: 'some-foo-class',
};

const barProps = {
  HTMLTag: 'p',
  value: 'some bar text',
  className: 'some-bar-class',
};

const someProps = {
  HTMLTag: 'span',
  value: 'some some text',
  className: 'some-some-class',
};


const someSvg = {
  HTMLTag: 'div',
  children: [
    '<svg id="heading" xmlns="http://www.w3.org/2000/svg"><g><path d="m 68,108. z"></path></g></svg>'
  ]
};

const fooSvg = {
  HTMLTag: 'div',
  children: [
    '<svg id="heading" xmlns="http://www.w3.org/2000/svg"><g><path d="m 68,108. z"/></g></svg>'
  ]
};

const nested = {
  ...fooProps,
  children: [
    {
      ...barProps,
      children: [
        someProps,
      ],
    },
  ]
};

const scenarios = [
  {
    props: fooProps,
    result: `<!DOCTYPE html><html><head></head><body><div id="root"><${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }</${ fooProps.HTMLTag }></div></body></html>`,
  },
  {
    props: {
      ...fooProps,
      children: [
        barProps,
      ]
    },
    result: `<!DOCTYPE html><html><head></head><body><div id="root"><${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }</${ barProps.HTMLTag }></${ fooProps.HTMLTag }></div></body></html>`,
  },
  {
    props: nested,
    result: `<!DOCTYPE html><html><head></head><body><div id="root"><${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }<${ someProps.HTMLTag } class="${ someProps.className }">${ someProps.value }</${ someProps.HTMLTag }></${ barProps.HTMLTag }></${ fooProps.HTMLTag }></div></body></html>`,
  },
  {
    props: someSvg,
    result: `<!DOCTYPE html><html><head></head><body><div id="root"><${ someSvg.HTMLTag }>${ someSvg.children[0] }</${ someSvg.HTMLTag }></div></body></html>`,
  },
  {
    props: fooSvg,
    result: `<!DOCTYPE html><html><head></head><body><div id="root"><${ fooSvg.HTMLTag }>${ someSvg.children[0] }</${ fooSvg.HTMLTag }></div></body></html>`,
  },
];

export default {
  scenarios,
  nested,
  someProps,
  fooProps,
  barProps,
};

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
];

export default {
  scenarios,
  nested,
  someProps,
  fooProps,
  barProps,
};

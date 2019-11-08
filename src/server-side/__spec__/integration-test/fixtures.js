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

const scenarios = [
  {
    props: fooProps,
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }</${ fooProps.HTMLTag }>`,
  },
  {
    props: {
      ...fooProps,
      children: [
        barProps,
      ]
    },
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }</${ barProps.HTMLTag }></${ fooProps.HTMLTag }>`,
  },
  {
    props: fooProps,
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }</${ fooProps.HTMLTag }>`,
  },
  {
    props: {
      ...fooProps,
      children: [
        `<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }</${ barProps.HTMLTag }>`
      ]
    },
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }</${ barProps.HTMLTag }></${ fooProps.HTMLTag }>`,
  },
  {
    props: {
      ...fooProps,
      children: [
        {
          ...barProps,
          children: [
            someProps,
          ],
        },
      ]
    },
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }<${ someProps.HTMLTag } class="${ someProps.className }">${ someProps.value }</${ someProps.HTMLTag }></${ barProps.HTMLTag }></${ fooProps.HTMLTag }>`,
  },
  {
    props: {
      ...fooProps,
      children: [
        {
          ...barProps,
          children: [
            `<${ someProps.HTMLTag } class="${ someProps.className }">${ someProps.value }</${ someProps.HTMLTag }>`
          ],
        },
      ]
    },
    result: `<${ fooProps.HTMLTag } class="${ fooProps.className }">${ fooProps.value }<${ barProps.HTMLTag } class="${ barProps.className }">${ barProps.value }<${ someProps.HTMLTag } class="${ someProps.className }">${ someProps.value }</${ someProps.HTMLTag }></${ barProps.HTMLTag }></${ fooProps.HTMLTag }>`,
  },
  {
    props: {
      HTMLTag: 'main',
      style: {
        backgroundColor: '#ff0000',
        'font-size': '16px',
        display: 'flex',
        flexDirection: 'column',
        animation: 'moveDown',
        WebkitBoxAlign: 'start',
      },
    },
    result: '<main style="background-color:#ff0000; font-size:16px; display:flex; flex-direction:column; animation:moveDown; -webkit-box-align:start"></main>',
  },
];

export default {
  scenarios,
};

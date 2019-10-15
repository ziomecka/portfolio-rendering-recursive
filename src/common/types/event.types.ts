type CustomEvent = {};
type Handler<E> = (event: E) => void;

export type onEvent = Handler<CustomEvent>;

type EventHandler = onEvent | [ onEvent, boolean ];

export type EventHandlers = {
  onClick?: EventHandler;
  onSubmit?: EventHandler;
  onChange?: EventHandler;
  onInput?: EventHandler;
  onKeydown?: EventHandler;
  onBlur?: EventHandler;
  onFocus?: EventHandler;
  [key: string]: EventHandler;
};

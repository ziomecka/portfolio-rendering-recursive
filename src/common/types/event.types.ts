type CustomEvent = {};
type onEvent = EventHandler<CustomEvent>;

type EventHandler<E> = (event: E) => void;

export type EventHandlers = {
  onClick?: onEvent;
  onSubmit?: onEvent;
  onChange?: onEvent;
  onInput?: onEvent;
  onKeydown?: onEvent;
  onBlur?: onEvent;
  onFocus?: onEvent;
} & {
  [key: string]: onEvent;
};

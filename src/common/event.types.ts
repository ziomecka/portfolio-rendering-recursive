type CustomEvent = {};
type onClick = EventHandler<CustomEvent>;
type onSubmit = EventHandler<CustomEvent>;
type onChange = EventHandler<CustomEvent>;

type EventHandler<E> = (event: E) => void;

export type EventHandlers = {
  onClick?: onClick;
  onSubmit?: onSubmit;
  onChange?: onChange;
};

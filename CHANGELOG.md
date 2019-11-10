# @0.1.2 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.10.15]
* Adds useCapture to addEventListener
* Changes EventHandler type to either onEvent or an array of onEvent and useCapture

# @0.1.1 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.10.15]
* Stringifies 'style' attribute in SSRElement's 'attributes' getter
* Modifies CustomHTMLElement type: children property is a string. Modifies Style type: value can be a number
* Adds events e.g. onBlur, onFocus etc to EventHandlers type

# @0.1.2 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.11.08]
* Corrects the way the 'style' attribute is stringified in SSRElement's 'attributes' getter: adds dashes before each capital letter in css property, adds dash before webkit prefix
* Uses xmldom for inline svg

# @0.1.3 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.11.xx]
* Adds xmldom to parse inline svg
* Corrects the way the style attribute is stringified in SSRElement's attributes getter
* Changes Style type from Record to String  indexed object

# @0.1.4 [author: Katarzyna Ziomek-Zdanowicz, date: 2019.11.10]
* Adds all vendors to SSRElement's attributes getter

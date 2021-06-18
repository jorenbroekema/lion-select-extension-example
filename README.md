# Custom Select built on LionSelect

Just a tiny experiment showcasing slotchange and how you could define default options and let your component consumer add extra options.

Keep in mind, if the slottables change over time they will get appended on top of the previously added extra options.
You could write some extra JS to clear the added extra options when a new slotchange event happens for the extra-options slot.

Run the demo

```sh
npm i
npm start
```

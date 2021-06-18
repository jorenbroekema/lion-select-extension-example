import { html, render, SlotMixin } from "@lion/core";
import { LionSelect } from "@lion/select";

class CustomSelect extends SlotMixin(LionSelect) {
  /**
   * Using the SlotMixin slots getter here to project
   * some default options to the native select element.
   * It's important that it ends up in LightDOM, which is
   * also the DOM in which the label will be, they have to be
   * in the same DOM for a11y: screen readers to describe
   * the input field when focused with the label content
   */
  get slots() {
    return {
      input: () => {
        const selectEl = document.createElement("select");
        render(
          html`
            <option value="hotpink">Hotpink</option>
            <option value="teal">Teal</option>
          `,
          selectEl
        );
        return selectEl;
      },
    };
  }

  /**
   * Adding the extra-options slot so the user can declare
   * extra options
   */
  render() {
    return html`
      ${super.render()}
      <slot @slotchange=${this.slotChangeHandler} name="extra-options"></slot>
    `;
  }

  /**
   * When the slotchange event fires for extra-options
   * we can grab its children (expected that they are <option> elements)
   * and insert them into the native select that our custom-select is wrapping
   */
  slotChangeHandler(ev) {
    if (ev.target.assignedNodes().length > 0) {
      const slottable = Array.from(ev.target.assignedNodes())[0];
      if (slottable) {
        const extraOptions = Array.from(
          Array.from(ev.target.assignedNodes())[0].children
        );

        extraOptions.forEach((node) => {
          /**
           * We set this attribute, in case we wanna clear these later,
           * we can filter the native select child options by attr that marks them as "extra option"
           * and remove them from DOM if we want.
           *
           *  Array.from(this._inputNode.children)
           *    .filter(child => child.hasAttribute('data-added-extra-option'))
           *    .forEach(child => child.remove())
           */
          node.setAttribute("data-added-extra-option", "");

          this._inputNode.appendChild(node);
        });

        slottable.remove();
      }
    }
  }
}
customElements.define("custom-select", CustomSelect);

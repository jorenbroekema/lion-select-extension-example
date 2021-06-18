import { html, render, SlotMixin } from "@lion/core";
import { LionSelect } from "@lion/select";

class CustomSelect extends SlotMixin(LionSelect) {
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

  render() {
    return html`
      ${super.render()}
      <slot @slotchange=${this.slotChangeHandler} name="extra-options"></slot>
    `;
  }

  slotChangeHandler(ev) {
    if (ev.target.name === "extra-options") {
      const extraOptions = Array.from(
        Array.from(ev.target.assignedNodes())[0].children
      );

      extraOptions.forEach((node) => {
        this._inputNode.appendChild(node);
      });
    }
  }
}
customElements.define("custom-select", CustomSelect);

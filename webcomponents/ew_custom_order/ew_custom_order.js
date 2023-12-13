fetch("/webcomponents/ew_custom_order/ew_custom_order.html")
  .then((stream) => stream.text())
  .then((text) =>
    customElements.define(
      "ew-custom-order",

      class EWNav extends HTMLElement {
        // Fires when an instance of the element is created or updated
        constructor() {
          super();

          const shadow = this.attachShadow({ mode: "open" });
          const template = document.createElement("template");
          template.innerHTML = text;
          shadow.appendChild(template.content.cloneNode(true));

          console.log("sup");

          shadow.querySelectorAll("[type=radio]").forEach((r) => {
            r.addEventListener("change", (e) => {
              const options_placeholder = shadow.getElementById(
                "options_placeholder"
              );
              options_placeholder.innerHTML = "";

              const v = e.target.value;
              const t = shadow.getElementById(`${v}_options`);
              options_placeholder.appendChild(t.content.cloneNode(true));
            });
          });
        }

        // Fires when an instance was inserted into the document
        connectedCallback() {}

        // Fires when an instance was removed from the document
        disconnectedCallback() {}

        // Fires when an attribute was added, removed, or updated
        attributeChangedCallback(attrName, oldVal, newVal) {}

        // Fires when an element is moved to a new document
        adoptedCallback() {}
      }
    )
  );

fetch("/webcomponents/ew_logo_spin_colors/ew_logo_spin_colors.html")
  .then((stream) => stream.text())
  .then((text) =>
    customElements.define(
      "ew-logospincolors",

      class EWLogoSpinColors extends HTMLElement {
        // Fires when an instance of the element is created or updated
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          const template = document.createElement("template");
          template.innerHTML = text;
          shadow.appendChild(template.content.cloneNode(true));

          this.update = this.update.bind(this);

          this.colors = ["blue", "cyan", "magenta", "black", "lime"];
          this.current_index = 0;
          this.run_t = 0;
        }
        update() {
          this.run_t++;
          if (this.run_t % 120 === 0) {
            this.current_index = (this.current_index + 1) % this.colors.length;
            const second = (this.current_index + 1) % this.colors.length;
            const style = this.shadowRoot.host.style;

            style.setProperty("--color1", this.colors[this.current_index]);
            style.setProperty("--color2", this.colors[second]);
          }
          requestAnimationFrame(this.update);
        }
        // Fires when an instance was inserted into the document
        connectedCallback() {
          requestAnimationFrame(this.update);
        }

        // Fires when an instance was removed from the document
        disconnectedCallback() {}

        // Fires when an attribute was added, removed, or updated
        attributeChangedCallback(attrName, oldVal, newVal) {}

        // Fires when an element is moved to a new document
        adoptedCallback() {}
      }
    )
  );

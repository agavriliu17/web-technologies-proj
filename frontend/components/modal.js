class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const style = `
    <style>
    .modal-overlay {
        display: none;
        position: fixed;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.8);
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
    }

    .modal {
        background-color: #fff;
        border-radius: 2rem;
        width: 70%;
        height: 60%;
        padding: 1rem;
    }
    </style>`;

    const template = `
    <div class="modal-overlay">
        <div class="modal">
            <slot></slot>
        </div>
    </div>
    `;

    this.shadowRoot.innerHTML = `${style} ${template}`;
  }

  open() {
    console.log("im in modal");
    this.shadowRoot.querySelector(".modal-overlay").style.display = "flex";
  }

  close() {
    this.shadowRoot.querySelector(".modal-overlay").style.display = "none";
  }
}

customElements.define("custom-modal", Modal);

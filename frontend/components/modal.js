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
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
    }

    .modal {
      max-width: 700px;
      width: 100%;
      background-color: #fff;
      padding: 40px 60px 40px; 
      padding-bottom: 70px;
      border-radius: 5px;
      box-shadow: 0 5px 10px rgba(0,0,0,0.15);
    }
    .content form .user-details{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 20px 0 12px 0;
    }
    form .user-details .input-box{
      margin-bottom: 15px;
      width: calc(100% / 2 - 20px);
    }

    form .input-box span.details{
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .user-details .input-box input{
      height: 45px;
      width: 100%;
      outline: none;
      font-size: 16px;
      border-radius: 5px;
      padding-left: 15px;
      border: 1px solid #ccc;
      border-bottom-width: 2px;
      transition: all 0.3s ease;
    }
    </style>`;

    const template = `
<div class="modal-overlay">
  <div class="modal">
    <h2>Add Service</h2>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Service's name</span>
            <input id="service-name" type="text" placeholder="Enter the name" required />
          </div>

          <div class="input-box">
            <span class="details">Description</span>
            <input id="service-description" type="text" placeholder="Enter the description" required />
          </div>

          <div class="input-box">
            <span class="details">Picture's link</span>
            <input id="service-photo" type="url" placeholder="Enter the link" required />
          </div>

          <div class="input-box">
            <span class="details">Price</span>
            <input id="service-price" type="text" placeholder="Enter the price" required />
          </div>
        </div>
      </form>
    </div>
  <slot></slot>
  </div>
</div>
    `;

    this.shadowRoot.innerHTML = `${style} ${template}`;
  }

  open() {
    this.shadowRoot.querySelector(".modal-overlay").style.display = "flex";
  }

  close() {
    this.shadowRoot.querySelector(".modal-overlay").style.display = "none";
  }

  async addService() {
    const name = this.shadowRoot.getElementById("service-name").value;
    const description = this.shadowRoot.getElementById(
      "service-description"
    ).value;
    const photo = this.shadowRoot.getElementById("service-photo").value;
    const price = this.shadowRoot.getElementById("service-price").value;

    if (name && description && photo && price) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3010/api/v1/add-service", {
          method: "POST",
          body: JSON.stringify({
            name: name,
            description: description,
            image: photo,
            price: price,
          }),
          headers: { Authorization: token },
        });

        if (res.status === 201) {
          this.close();
          window.location.href = "../services/index.html";
        }
      } catch (e) {
        console.log(e);
      }
    } else alert("All fields must be completed!");
  }
}

customElements.define("custom-modal", Modal);

class ServiceCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const style = `
    <style>
      * {
        margin: 0;
        padding: 0;
        font-family: "Sofia", sans-serif;
      }
      h2 {
        color: #0a4870;
        font-weight: 500;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
      }
      ul .booking-card {
        position: relative;
        width: 300px;
        display: flex;
        flex: 0 0 300px;
        flex-direction: column;
        margin: 20px;
        margin-bottom: 30px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        overflow: hidden;
        background-position: center center;
        background-size: cover;
        text-align: center;
        color: #0a4870;
        transition: 0.3s;
      }
      ul .booking-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(10, 72, 112, 0);
        transition: 0.3s;
      }
      ul .booking-card .book-container {
        height: 200px;
      }
      ul .booking-card .book-container .content {
        position: relative;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        transform: translateY(-200px);
        transition: 0.3s;
      }
      ul .booking-card .book-container .content .btn {
        border: 3px solid #ff7782;
        padding: 10px 15px;
        background: none;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1.3em;
        color: #ff7782;
        cursor: pointer;
        transition: 0.3s;
      }
      ul .booking-card .book-container .content .btn:hover {
        background: #ff7782;
        border: 0px solid #ff7782;
        color: #fff;
      }
      ul .booking-card .informations-container {
        flex: 1 0 auto;
        padding: 20px;
        background: #f0f0f0;
        transform: translateY(206px);
        transition: 0.3s;
      }
      ul .booking-card .informations-container .title {
        position: relative;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
        font-size: 1.2em;
      }
      ul .booking-card .informations-container .title::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        width: 50px;
        margin: auto;
        background: #0a4870;
      }
      ul .booking-card .informations-container .price {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
      ul .booking-card .informations-container .price .icon {
        margin-right: 10px;
      }
      ul .booking-card .informations-container .more-information {
        opacity: 0;
        transition: 0.3s;
      }
      ul
        .booking-card
        .informations-container
        .more-information
        .info-and-date-container {
        display: flex;
      }
      ul
        .booking-card
        .informations-container
        .more-information
        .info-and-date-container
        .box {
        flex: 1 0;
        padding: 15px;
        margin-top: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background: white;
        font-weight: bold;
        font-size: 0.9em;
      }
      ul
        .booking-card
        .informations-container
        .more-information
        .info-and-date-container
        .box
        .icon {
        margin-bottom: 5px;
      }
      ul
        .booking-card
        .informations-container
        .more-information
        .info-and-date-container
        .box.info {
        color: #ec992c;
        margin-right: 10px;
      }
      ul .booking-card .informations-container .more-information .disclaimer {
        margin-top: 20px;
        font-size: 0.8em;
        color: #7d7d7d;
      }
      ul .booking-card:hover::before {
        background: rgba(10, 72, 112, 0.6);
      }
      ul .booking-card:hover .book-container .content {
        opacity: 1;
        transform: translateY(0px);
      }
      ul .booking-card:hover .informations-container {
        transform: translateY(0px);
      }
      ul .booking-card:hover .informations-container .more-information {
        opacity: 1;
      }
      @media (max-width: 768px) {
        ul .booking-card::before {
          background: rgba(10, 72, 112, 0.6);
        }
        ul .booking-card .book-container .content {
          opacity: 1;
          transform: translateY(0px);
        }
        ul .booking-card .informations-container {
          transform: translateY(0px);
        }
        ul .booking-card .informations-container .more-information {
          opacity: 1;
        }
      }
      .credits {
        display: table;
        background: #0a4870;
        color: white;
        line-height: 25px;
        margin: 10px auto;
        padding: 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        text-align: center;
      }
      .credits a {
        color: #e3ebf1;
      }
      h1 {
        margin: 10px 20px;
      }

      .service-details {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .service-details p {
        margin: 5px 0px;
      }

      .section-divider {
        height: 2px;
        width: 60%;
        background-color: #0a4870;
        margin: 5px 0px;
      }

    </style>`;

    const template = `
    <ul>
      <li
        class="booking-card"
        style="
          background-image: url(https://images.unsplash.com/photo-1525138079-9424be9df411?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80);
        "
      >
        <div class="book-container">
          <div class="content">
            <button class="btn">Delete</button>
          </div>
        </div>
        <div class="informations-container">
          <h2 class="title">${
            this.getAttribute("serviceName") ?? "Service name"
          }</h2>
          <p class="sub-title">Short service description</p>
          <p class="price">
            <svg
              class="icon"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z"
              /></svg
            >150 €
          </p>
          <div class="more-information">
            <div class="info-and-date-container">
              <div class="box service-details">
                <p>Total orders: 4234</p>
                <p>Total revenue: 4234</p>

                <divider class="section-divider"></divider>

                <p>Orders in last 24h: 12</p>
                <p>Most popular in: Iasi</p>
              </div>
            </div>
            <p class="disclaimer">
              Too see more detailed statistics, go to analytics page
            </p>
          </div>
        </div>
      </li>
    </ul>
    `;

    this.shadowRoot.innerHTML = `${style} ${template}`;

    this.delete();
  }

  delete() {
    this.shadowRoot.querySelector(".btn").addEventListener("click", () => {
      console.log("delete item");
    });
  }
}

customElements.define("service-card", ServiceCard);

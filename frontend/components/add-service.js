class AddService extends HTMLElement {
  maxTags = 10;
  tags = ["Romania", "Greece"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const style = `
    <style>
    ::selection{
        color: #fff;
        background: #5372F0;
        }
        .wrapper{
        width: 496px;
        background: #fff;
        border-radius: 10px;
        padding: 18px 25px 20px;
        }
        .wrapper :where(.title, li, li i, .details){
        display: flex;
        align-items: center;
        }
        .title img{
        max-width: 21px;
        }
        .title h2{
        font-size: 21px;
        font-weight: 600;
        margin-left: 8px;
        }
        .wrapper .content{
        margin: 10px 0;
        }
        .content p{
        font-size: 15px;
        }
        .content ul{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        margin: 12px 0;
        border-radius: 5px;
        border: 1px solid #a6a6a6;
        }
        .content ul  li{
        color: #333;
        margin: 4px 3px;
        list-style: none;
        border-radius: 5px;
        background: #F2F2F2;
        padding: 5px 8px 5px 10px;
        border: 1px solid #e3e1e1;
        }
        .content ul li i{
        height: 20px;
        width: 20px;
        color: #808080;
        margin-left: 8px;
        font-size: 12px;
        cursor: pointer;
        border-radius: 50%;
        background: #dfdfdf;
        justify-content: center;
        }
        .content ul input{
        flex: 1;
        padding: 5px;
        border: none;
        outline: none;
        font-size: 16px;
        }
        .wrapper .details{
        justify-content: space-between;
        }
        .details button{
        border: none;
        outline: none;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        padding: 9px 15px;
        border-radius: 5px;
        background: #5372F0;
        transition: background 0.3s ease;
        }
        .details button:hover{
        background: #2c52ed;
        }
    </style>`;

    const template = `
    <div class="wrapper">
        <div class="content">
          <p>Press enter or add a comma after each tag</p>
          <ul>
            <input type="text" spellcheck="false" />
          </ul>
        </div>
        <div class="details">
          <p><span>10</span> tags are remaining</p>
        </div>
    </div>
    `;

    this.shadowRoot.innerHTML = `${style} ${template}`;
    this.countTags();
    this.createTag();

    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("keyup", (e) => this.addTag(e));
  }

  countTags() {
    const input = this.shadowRoot.querySelector("input");
    const tagNumb = this.shadowRoot.querySelector(".details span");

    input.focus();
    tagNumb.innerText = this.maxTags - this.tags.length;
  }

  createTag() {
    const ul = this.shadowRoot.querySelector("ul");

    ul.querySelectorAll("li").forEach((li) => li.remove());
    this.tags
      .slice()
      .reverse()
      .forEach((tag, index) => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" id="li-${index}" onclick="${this.removeTag(
          index,
          tag
        )}"></i></li>`;

        ul.insertAdjacentHTML("afterbegin", liTag);
      });
    this.countTags();
  }

  removeTag(elementIndex, tag) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    // element.parentElement.remove();

    const tagNumb = this.shadowRoot.querySelector(`#li-${elementIndex}`);

    this.countTags();
  }

  addTag(e) {
    if (e.key === "Enter") {
      let tag = e.target.value.replace(/\s+/g, " ");
      if (tag.length > 1 && !this.tags.includes(tag)) {
        if (this.tags.length < 10) {
          tag.split(",").forEach((tag) => {
            this.tags.push(tag);
            this.createTag();
          });
        }
      }
      e.target.value = "";
    }
  }
}

customElements.define("add-service", AddService);

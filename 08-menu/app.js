const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "stacke",
    category: "dinner",
    price: 66.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const btContainer = document.querySelector(".btn-container");

// dom content load
window.addEventListener("DOMContentLoaded", () => {
  filterBtnShow(menu);
  displayMenu(menu);
});

// show filter button
const filterBtnShow = (filter) => {
  let displayFilter = filter.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const displayFilterBtn = displayFilter.map((btn) => {
    return `<button class="filter-btn" type="button" data-id="${btn}">${btn}</button>`;
  });
  btContainer.innerHTML = displayFilterBtn.join("");
  const filterBtn = document.querySelectorAll(".filter-btn");
  filterBtnItems(filterBtn);
};

// filter items
const filterBtnItems = (btnFilter) => {
  btnFilter.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayMenu(menu);
      } else {
        displayMenu(menuCategory);
      }
      animate(sectionCenter);
    });
  });
};

// show menu content items
const displayMenu = (menuItem) => {
  let displayMenu = menuItem.map(({ title, price, img, desc }) => {
    return `<article class="menu-item">
          <img src="${img}" class="photo" alt="" />
          <div class="item-info">
            <header>
              <h4>${title}</h4>
              <h4 class="price">${price}</h4>
            </header>
            <p class="item-text">
              ${desc}
            </p>
          </div>
        </article>`;
  });

  sectionCenter.innerHTML = displayMenu.join("");
  const singleMenuItem = sectionCenter.querySelectorAll(".menu-item");

  singleMenuItem.forEach((item) => {
    animate(item);
  });
};

function animate(element) {
  transition.begin(element, [
    ["transform", "scale(.5)", "scale(1)", "0.5s", "ease-in-out"],
    ["opacity", "0", "1", "0.1s", "ease-in-out"],
  ]);
}

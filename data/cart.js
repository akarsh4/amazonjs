export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productid: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "2",
    },
    {
      productid: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
      quantity: 2,
      deliveryOptionId: "1",
    },
  ];
}

function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addTocart(productid, total) {
  const newProduct = {
    productid,
    quantity: total.productId === productid ? total.value : 1,
  };

  const product = cart.find((product) => product.productid === productid);
  if (product) {
    product.quantity = product.quantity + (total.value ? total.value : 1);
  } else {
    cart.push({ ...newProduct, deliveryOptionId: "1" });
  }
  saveToLocalStorage();
}

export function deletFromCart(productId) {
  let newcart = [];
  newcart = cart.filter((item) => {
    return item.productid !== productId;
  });
  console.log(newcart);
  cart = newcart;
  saveToLocalStorage();
}

export function updateDeliveryOption(productid, deliveryOptionID) {
  let mathingItem;
  cart.forEach((element) => {
    if (productid === element.productid) {
      mathingItem = element;
    }
  });
  mathingItem.deliveryOptionId = deliveryOptionID;
  console.log(cart);
  saveToLocalStorage();
}

// function add(a, b, c) {
//   return a + b + c;
// }

// const once = function (add) {
//   let counter = 0;
//   return function (...args) {
//     counter++;
//     if (counter === 1) {
//       return add(...args);
//     }
//     return undefined;
//   };
// };

// const onceAdd = once(add)(1, 2, 3);

// console.log(onceAdd);

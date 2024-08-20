export const cart = [];

export function addTocart(productid) {
  const newProduct = {
    productid,
    quantity: total.productId === productid ? total.value : 1,
  };

  const product = cart.find((product) => product.productid === productid);
  if (product) {
    product.quantity = product.quantity + (total.value ? total.value : 1);
  } else {
    cart.push({ ...newProduct });
  }
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

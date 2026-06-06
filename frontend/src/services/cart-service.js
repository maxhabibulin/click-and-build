const saveCart = (cart) => {
  localStorage.setItem("shopping_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCart = () => {
  const cart = localStorage.getItem("shopping_cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find(
    (item) => Number(item.id) === Number(product.id),
  );
  const qtyToAdd = product.quantity ? Number(product.quantity) : 1;

  if (existingProduct) {
    existingProduct.quantity += qtyToAdd;
  } else {
    cart.push({
      id: Number(product.id),
      product_name: product.product_name,
      product_price: Number(product.product_price),
      product_cpu: product.product_cpu,
      product_gpu: product.product_gpu,
      product_ram: product.product_ram,
      product_ssd: product.product_ssd,
      product_os: product.product_os,
      product_img: product.product_img,
      quantity: qtyToAdd,
    });
  }

  saveCart(cart);
};

export const updateQuantity = (productId, amount) => {
  let cart = getCart();
  const product = cart.find((item) => Number(item.id) === Number(productId));

  if (!product) return;

  product.quantity += amount;

  if (product.quantity <= 0) {
    cart = cart.filter((item) => Number(item.id) !== Number(productId));
  }

  saveCart(cart);
};

export const getCartTotal = () => {
  return getCart().reduce(
    (total, item) => total + item.product_price * item.quantity,
    0,
  );
};

export const getCartCount = () => {
  return getCart().reduce((total, item) => total + item.quantity, 0);
};

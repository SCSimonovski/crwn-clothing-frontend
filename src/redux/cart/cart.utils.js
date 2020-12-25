export const addItemToCart = (items, itemToAdd) => {
  const updatedItems = [];

  items.forEach((item) => {
    if (item.id === itemToAdd.id) {
      itemToAdd = { ...item, quantity: item.quantity + 1 };
      updatedItems.push(itemToAdd);
    } else {
      updatedItems.push(item);
    }
  });

  if (!itemToAdd.hasOwnProperty("quantity") || items.length === 0) {
    updatedItems.push({ ...itemToAdd, quantity: 1 });
  }

  return updatedItems;
};

export const removeItemFromCart = (items, itemToRemove) => {
  const checkItem = items.find((item) => item.id === itemToRemove.id);

  if (checkItem.quantity > 1) {
    return items.map((item) =>
      item.id === itemToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else {
    return items;
  }
};

export const clearItemFromCart = (items, itemToClear) =>
  items.filter((item) => item.id !== itemToClear.id);

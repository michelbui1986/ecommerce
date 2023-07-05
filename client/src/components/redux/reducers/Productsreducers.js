const initialState = {
  products: [],
};

export const getProductsreducer = (state = initialState, action) => {
  switch (action.type) {
    case "SUCCESS_GET_PRODUCTS":
      return { products: action.payload };
    case "FAIL_GET_PRODUCTS":
      return { products: action.payload };
    default:
      return state;
  }
};

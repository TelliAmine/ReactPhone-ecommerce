import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct, // we wcan use reference
    cart: [],
    count: 0,
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let temporaryproducts = [];
    storeProducts.map(item => {
      const singleItem = { ...item }; // copy the value from the object
      temporaryproducts = [...temporaryproducts, singleItem];
    });
    console.log(temporaryproducts, "zeze");
    this.setState(() => {
      return { products: temporaryproducts };
    });
  };

  getItem = id => {
    const productget = this.state.products.find(item => item.id === id);
    return productget;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    let count = this.state.count;
    this.setState({ count: count + 1 });
    let temporaryProducts = [...this.state.products];
    const index = temporaryProducts.indexOf(this.getItem(id));
    const product = temporaryProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products: temporaryProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  // tester = () => {
  //   console.log("State products", this.state.products[0].inCart);
  //   console.log("Data products", storeProducts[0].inCart);
  //   const tempProducts = [...this.state.products];
  //   tempProducts[0].inCart = true;
  //   this.setState(
  //     () => {
  //       return { products: tempProducts };
  //     },
  //     () => {
  //       console.log("State products", this.state.products[0].inCart);
  //       console.log("Data products", storeProducts[0].inCart);
  //     }
  //   );
  // };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = id => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(() => {
      return {
        cart: [...tempCart]
      };
    }, this.addTotals);
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(() => {
        return { cart: [...tempCart] };
      }, this.addTotals);
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];

    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    this.setState(() => {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      };
    }, this.addTotals);
  };
  clearCart = () => {
    this.setState(() => {
      return {
        cart: []
      };
    });
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };

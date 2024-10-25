import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CartProduct } from "../../config/types/marketTypes";
import { addToUserCart, getCartProducts, removeFromCart, userSubmitPurchase } from "../../services/repositories/user-repository";
import { promptMessage } from "../../store/slices/promptSlice";
import PurchaseSummary from "../../components/PurchaseSummary/PurchaseSummary";
import "./UserCart.scss";

const UserCart = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((x) => x.auth);
  const [cartProducts, setCartProducts] = useState<Array<CartProduct>>([]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const cartProductsResult = await getCartProducts();
      setCartProducts(Array.isArray(cartProductsResult) ? cartProductsResult : []);
    };
    fetchCartProducts();
  }, [auth]);

  const submitPurchase = async () => {
    try {
      await userSubmitPurchase();
      const msgConfig = "תודה על קנייתך, נשמח לראותך שוב";
      dispatch(promptMessage({ message: msgConfig, type: "success" }));
      setCartProducts([]);
    } catch {
      dispatch(promptMessage({ message: "שגיאה ברכישה", type: "error" }));
    }
  };

  const increment = async (product: CartProduct) => {
    try {
      await addToUserCart(product.product);
      setCartProducts((x) => {
        const newProductsState = [...x];
        const productIndex = newProductsState.findIndex(
          (x) => x.product._id === product.product._id
        );
  
        newProductsState[productIndex].quantity++;
  
        return newProductsState;
      });
    } catch {
      dispatch(promptMessage({ message: "שגיאה בהוספה", type: "error" }));
    } 
  };

  const decrement = async (product: CartProduct) => {
    try {
      await removeFromCart(product.product);
      setCartProducts((x) => {
        const newProductsState = [...x];
        const productIndex = newProductsState.findIndex(
          (x) => x.product._id === product.product._id
        );
        newProductsState[productIndex].quantity--;
        if (newProductsState[productIndex].quantity <= 0) {
          newProductsState.splice(productIndex, 1);
        }
        return newProductsState;
      });
    } catch {
      dispatch(promptMessage({ message: "שגיאה בהחסרה", type: "error" }));
    }
  };

  return (
    <div className="my-cart">
      <PurchaseSummary
        products={cartProducts}
        submitCallback={submitPurchase}
        increment={increment}
        decrement={decrement}
        quantity
        expand
        title="סל המוצרים"
      />
    </div>
  );
};
export default UserCart;

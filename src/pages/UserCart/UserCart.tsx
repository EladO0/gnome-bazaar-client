import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CartProduct } from "../../config/types/marketTypes";
import { getCartProducts } from "../../services/repositories/user-repository";
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
    const msgConfig = "!תודה על קנייתך, פרטי ההזמנה ישלחו במייל";
    dispatch(promptMessage({ message: msgConfig, type: "success" }));

    ///////////// TODO Submit on server side /////////////

    setCartProducts([]);
  };

  const increment = (product: CartProduct): void => {
    setCartProducts((x) => {
      const newProductsState = [...x];
      const productIndex = newProductsState.findIndex(
        (x) => x.product.id === product.product.id
      );

      newProductsState[productIndex].quantity++;

      return newProductsState;
    });
  };

  const decrement = (product: CartProduct): void => {
    setCartProducts((x) => {
      const newProductsState = [...x];
      const productIndex = newProductsState.findIndex(
        (x) => x.product.id === product.product.id
      );
      newProductsState[productIndex].quantity--;
      if (newProductsState[productIndex].quantity <= 0) {
        newProductsState.splice(productIndex, 1);
      }
      return newProductsState;
    });
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

import { useMemo } from "react";
import {
  AddCircle,
  Cancel,
  CheckCircle,
  Close,
  RemoveCircle,
  ShoppingBag,
} from "@mui/icons-material";
import { CartProduct } from "../../config/types/marketTypes";
import PriceTag from "../PriceTag/PriceTag";
import millify from "millify";
import ImagePreview from "../ImagePreview/ImagePreview";
import "./PurchaseSummary.scss";

interface PurchaseSummaryProps {
  products: Array<CartProduct>;
  submitCallback?: () => void;
  increment?: (product: CartProduct) => void;
  decrement?: (product: CartProduct) => void;
  quantity: boolean;
  title: string;
  expand?: boolean;
  maxQuantity?: boolean;
}
const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  products,
  submitCallback,
  increment,
  decrement,
  quantity = true,
  title = "",
  expand,
  maxQuantity = true,
}) => {
  const disabled = useMemo(() => {
    return products.length === 0;
  }, [products]);

  const total = useMemo(() => {
    const sum = products.reduce((sum, current) => {
      return sum + current.product.price * current.quantity;
    }, 0);
    return millify(sum, {
      precision: 3,
      lowercase: true,
    });
  }, [products]);
  return (
    <div className={`purchase-summary ${expand && "expand"}`}>
      <div className="header">
        <ShoppingBag />
        {title}
      </div>
      <div className="cart-products">
        {disabled && (
          <div className="warning-title">
            לא נמצאו מוצרים בעגלה <Cancel />
          </div>
        )}
        {products.map((p, i) => (
          <div className="product" key={i}>
            {quantity && (
              <div className="quantity">
                {increment && <AddCircle onClick={() => increment(p)} />}
                <div className="amount">x{p.quantity}</div>
                {decrement && <RemoveCircle onClick={() => decrement(p)} />}
              </div>
            )}
            <ImagePreview src={p.product.img} />
            <PriceTag
              credits={p.product.price * p.quantity}
              title={p.product.name}
              description={p.product.description}
              quantity={maxQuantity ? p.product.quantity : undefined}
            />
          </div>
        ))}
      </div>
      <div className="payment-container">
        <div className="info">
          <div className="title">סה"כ קרדיטים 💰 </div>
          <div className="total">{total} </div>
        </div>
        <div className="seperator"></div>
        <button
          disabled={disabled}
          className={`payment ${disabled && "disabled"}`}
          onClick={submitCallback}
        >
          {submitCallback && (
            <>
              לתשלום
              <br />
              לחצו
            </>
          )}
          <CheckCircle />
          <Close className="block" />
        </button>
      </div>
    </div>
  );
};
export default PurchaseSummary;

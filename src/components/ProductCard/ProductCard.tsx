import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Product } from "../../config/types/marketTypes";
import { translateCategory } from "../../services/utilities/market-utility";
import { shorten } from "../../services/utilities/common-utility";
import PriceTag from "../PriceTag/PriceTag";
import "./ProductCard.scss";

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const addToCart = () => {};

  const addToWishList = () => {};

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.img}
        crossOrigin="anonymous"
        alt="product-image"
      />

      <div className="actions">
        <Favorite className="liked" onClick={addToWishList} />
        <ShoppingCart className="cart" onClick={addToCart} />
      </div>
      <div className="product-info">
        <div className="headers">
          <div className="title">{product.name}</div>
          <div className="tags">
            <div className="tag">{translateCategory(product.category)}</div>
            <div className="tag">{product.quantity}x</div>
          </div>
        </div>
        <PriceTag
          credits={product.price}
          description={shorten(product.description)}
          title="פירוט"
          small
        />
      </div>
    </div>
  );
};
export default ProductCard;

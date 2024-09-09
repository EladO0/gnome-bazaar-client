import { useEffect, useState } from "react";
import { Product } from "../../config/types/marketTypes";
import { getProducts } from "../../services/repositories/market-repository";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Market.scss";

const Market = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const productsResult = await getProducts();
      setProducts(productsResult);
    };
    fetchMarketData();
  }, []);
  return (
    <div className="market">
      {products.map((product, i) => (
        <div
          key={i}
          className="product-container"
          style={{ animationDelay: `${i * 0.175}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
export default Market;

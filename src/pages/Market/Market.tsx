import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../../config/types/marketTypes";
import { getProducts } from "../../services/repositories/market-repository";
import { useAppSelector } from "../../store/hooks";
import { ENTRIES_PER_PAGE } from "../../config/constants";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Market.scss";

const Market = () => {
  const marketRef = useRef<HTMLDivElement | null>(null);
  const searchFilters = useAppSelector((x) => x.filters);
  const [products, setProducts] = useState<Product[]>([]);
  const [entriesToSkip, setEntriesToSkip] = useState<number>(0);

  useEffect(() => {
    const fetchMarketData = async () => {
      marketRef.current?.scrollTo({ top: 0 });
      const productsResult = await getProducts(searchFilters, ENTRIES_PER_PAGE);
      setProducts(productsResult);
      setEntriesToSkip(ENTRIES_PER_PAGE);
    };
    fetchMarketData();
  }, [searchFilters]);

  const handleScroll = useCallback(async () => {
    const scrollTop = marketRef.current?.scrollTop || 0;
    const clientHeight = marketRef.current?.clientHeight || 0;
    const scrollHeight = marketRef.current?.scrollHeight || 1;

    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
      const productsResult = await getProducts(
        searchFilters,
        ENTRIES_PER_PAGE,
        entriesToSkip
      );
      setEntriesToSkip((x) => x + ENTRIES_PER_PAGE);
      setProducts((x) => {
        return [...x, ...productsResult];
      });
    }
  }, [searchFilters, entriesToSkip]);

  useEffect(() => {
    const scrollElement = marketRef.current;
    if (!scrollElement) return;
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="market" ref={marketRef}>
      {products.map((product, i) => (
        <div key={i} className="product-container">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
export default Market;

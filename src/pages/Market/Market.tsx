import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Category,
  MarketFiltersType,
  Product,
} from "../../config/types/marketTypes";
import { getProducts } from "../../services/repositories/market-repository";
import { useAppSelector } from "../../store/hooks";
import { ENTRIES_PER_PAGE } from "../../config/constants";
import { translateCategory } from "../../services/utilities/market-utility";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Market.scss";

const categories: Array<Category> = [
  "Accessories",
  "Gnome",
  "Hat",
  "Pants",
  "Shirt",
  "Shoes",
];

const Market = () => {
  const marketRef = useRef<HTMLDivElement | null>(null);
  const searchValue = useAppSelector((x) => x.search.searchTerm);
  const [categoryFilter, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [entriesToSkip, setEntriesToSkip] = useState<number>(0);

  const filters: MarketFiltersType = useMemo(() => {
    return {
      searchTerm: searchValue,
      category: categoryFilter,
    };
  }, [searchValue, categoryFilter]);

  const setCategoryFilter = (category: Category): void => {
    setCategory((x) => {
      return x === category ? null : category;
    });
  };

  const isCategorySelected = (category: Category) => {
    return categoryFilter === category ? "filter active" : "filter";
  };
  useEffect(() => {
    const fetchMarketData = async () => {
      marketRef.current?.scrollTo({ top: 0 });
      const productsResult = await getProducts(filters, ENTRIES_PER_PAGE);
      setProducts(productsResult);
      setEntriesToSkip(ENTRIES_PER_PAGE);
    };
    fetchMarketData();
  }, [filters]);

  const handleScroll = useCallback(async () => {
    const scrollTop = marketRef.current?.scrollTop || 0;
    const clientHeight = marketRef.current?.clientHeight || 0;
    const scrollHeight = marketRef.current?.scrollHeight || 1;
    const totalScrolled = Math.ceil(scrollTop + clientHeight + 50);
    if (totalScrolled >= scrollHeight) {
      const productsResult = await getProducts(
        filters,
        ENTRIES_PER_PAGE,
        entriesToSkip
      );
      setEntriesToSkip((x) => x + ENTRIES_PER_PAGE);
      setProducts((x) => {
        return [...x, ...productsResult];
      });
    }
  }, [filters, entriesToSkip]);

  useEffect(() => {
    const scrollElement = marketRef.current;
    if (!scrollElement) return;
    scrollElement.addEventListener("scrollend", handleScroll);

    return () => {
      scrollElement.removeEventListener("scrollend", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="market">
      <div className="filters">
        {categories.map((c, i) => (
          <div
            className={isCategorySelected(c)}
            key={i}
            onClick={() => setCategoryFilter(c)}
          >
            {translateCategory(c)}
          </div>
        ))}
      </div>
      <div className="products" ref={marketRef}>
        {products.map((product, i) => (
          <div key={i} className="product-container">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Market;

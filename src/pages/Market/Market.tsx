import { useCallback, useEffect, useRef, useState } from "react";
import { Category, Product } from "../../config/types/marketTypes";
import { getProducts } from "../../services/repositories/market-repository";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ENTRIES_PER_PAGE } from "../../config/constants";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Market.scss";
import { translateCategory } from "../../services/utilities/market-utility";
import { updateSearchCategory } from "../../store/slices/filtersSlice";

const categories: Array<Category> = [
  "Accessories",
  "Gnome",
  "Hat",
  "Pants",
  "Shirt",
  "Shoes"
]

const Market = () => {
  const dispatch = useAppDispatch();
  const marketRef = useRef<HTMLDivElement | null>(null);
  const searchFilters = useAppSelector((x) => x.filters);
  const [products, setProducts] = useState<Product[]>([]);
  const [entriesToSkip, setEntriesToSkip] = useState<number>(0);

  const setCategoryFilter = (category: Category): void => {
    dispatch(updateSearchCategory(category));
  }

  const isCategorySelected = (category: Category) => {
    return searchFilters.category === category ? "filter active" : "filter";
  }
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
      <div className="filters">
        {categories.map((c, i) => (
          <div className={isCategorySelected(c)} key={i}
            onClick={() => setCategoryFilter(c)}>
            {translateCategory(c)}
          </div>
        ))}
      </div>
      <div className="products">
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

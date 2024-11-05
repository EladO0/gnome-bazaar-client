import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Category,
  MarketFiltersType,
  Product,
} from "../../config/types/marketTypes";
import { getProducts, getCategories } from "../../services/repositories/market-repository";
import { useAppSelector } from "../../store/hooks";
import { ENTRIES_PER_PAGE } from "../../config/constants";
import { translateCategory } from "../../services/utilities/market-utility";
import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./Market.scss";

const Market = () => {
  const marketRef = useRef<HTMLDivElement | null>(null);
  const searchValue = useAppSelector((x) => x.search.searchTerm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryFilter, setCategory] = useState<Category | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [entriesToSkip, setEntriesToSkip] = useState<number>(0);

  const filters: MarketFiltersType = useMemo(() => {
    return {
      productName: searchValue,
      category: categoryFilter,
    };
  }, [searchValue, categoryFilter]);

  useEffect(() => {
    const fetchMarketData = async () => {
      marketRef.current?.scrollTo({ top: 0 });
      const productsResult = await getProducts(filters, ENTRIES_PER_PAGE);
      setProducts(Array.isArray(productsResult) ? productsResult : []);
      setEntriesToSkip((x) => x + ENTRIES_PER_PAGE);
    };
    fetchMarketData();
  }, [filters]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesResult = await getCategories();
      setCategories(Array.isArray(categoriesResult) ? categoriesResult : []);
    };
    fetchCategories();
  }, []);


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

  const resetSkipEntries = (): void => {
    setEntriesToSkip(0);
  };
  return (
    <div className="market">
      <CategoryFilter
        categories={categories}
        mutatationFunc={setCategory}
        extraCallback={resetSkipEntries}
        translationFunc={translateCategory}
        selectedFilter={categoryFilter}
      />
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

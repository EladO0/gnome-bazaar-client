import { useEffect, useMemo, useState } from "react";
import { AddCircle, AutoGraph, Whatshot } from "@mui/icons-material";
import { categories } from "../../config/constants";
import { translateCategory } from "../../services/utilities/market-utility";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Category } from "../../config/types/marketTypes";
import { Product } from "../../config/types/marketTypes";
import {
  getCategorySalesInfo,
  getSupplierProducts,
  getSupplierSalesInfo,
} from "../../services/repositories/supplier-repository";
import { createProductTableConfig } from "../../config/table-configurations/products-table";
import { emitUnAuthorized } from "../../services/utilities/events-utility";
import { DiagramData, PieChartData } from "../../config/types/graphTypes";
import { openPopup } from "../../store/slices/popupSlice";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import TablePreview from "../../components/TablePreview/TablePreview";
import PieChart from "../../components/Graphs/PieChart/PieChart";
import Diagram from "../../components/Graphs/Diagram/Diagram";
import ProductForm from "../../forms/ProductsForm/ProductForm";
import "./SupplierPanel.scss";

const SupplierPanel = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((x) => x.auth);
  const [categoryFilter, setCategory] = useState<Category | undefined>();
  const [products, setProducts] = useState<Array<Product>>([]);
  const [categorySalesInfo, setCategorySalesInfo] = useState<PieChartData[]>(
    []
  );
  const [supplierSalesInfo, setSupplierSalesInfo] = useState<DiagramData[]>([]);
  const searchValue = useAppSelector((x) => x.search.searchTerm);

  useEffect(() => {
    if (!auth.isSupplier) {
      emitUnAuthorized();
    }
  }, [auth.isSupplier]);

  const filteredProducts = useMemo(() => {
    let filteredData = products;
    if (categoryFilter) {
      filteredData = filteredData.filter((x) => x.category === categoryFilter);
    }
    filteredData = filteredData.filter((x) =>
      x.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredData;
  }, [products, categoryFilter, searchValue]);

  const productConfiguration = useMemo(() => {
    return createProductTableConfig();
  }, []);

  useEffect(() => {
    const fetchSupplierData = async () => {
      const productsResult = await getSupplierProducts();
      setProducts(productsResult);

      const categorySalesInfoResult = await getCategorySalesInfo();
      const parsedCategorySalesInfoResult: PieChartData[] =
        categorySalesInfoResult.map((x) => ({
          label: translateCategory(x.label),
          value: x.value,
        }));
      setCategorySalesInfo(parsedCategorySalesInfoResult);

      const supplierSalesInfoResult = await getSupplierSalesInfo();
      setSupplierSalesInfo(supplierSalesInfoResult);
    };
    fetchSupplierData();
  }, []);

  const newProduct = () => {
    dispatch(openPopup({ component: <ProductForm />, theme: "light" }));
  };
  return (
    <div className="supplier-panel">
      <PieChart
        data={categorySalesInfo}
        title="קטגוריות חמות"
        Icon={Whatshot}
      />
      <div className="my-products">
        <div className="filters">
          <CategoryFilter
            categories={categories}
            mutatationFunc={setCategory}
            translationFunc={translateCategory}
            selectedFilter={categoryFilter}
          />
          <button className="add-product" onClick={newProduct}>
            מוצר חדש
            <AddCircle />
          </button>
        </div>
        <TablePreview
          rowClass="product-entry"
          headerClass="headerClass"
          data={filteredProducts}
          configuration={productConfiguration}
        />
      </div>
      <Diagram data={supplierSalesInfo} title="מדד מכירות" Icon={AutoGraph} />
    </div>
  );
};
export default SupplierPanel;

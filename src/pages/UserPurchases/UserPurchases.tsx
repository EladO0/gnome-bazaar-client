import { useEffect, useMemo, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ArrowBackIosNew, SearchOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Purchase } from "../../config/types/marketTypes";
import { getUserPurchases } from "../../services/repositories/user-repository";
import { openPopup } from "../../store/slices/popupSlice";
import { isBeforeDate } from "../../services/utilities/date-utility";
import PurchaseSummary from "../../components/PurchaseSummary/PurchaseSummary";
import PriceTag from "../../components/PriceTag/PriceTag";
import "./UserPurchases.scss";

const UserPurchases = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((x) => x.auth);
  const [purchases, setPurchases] = useState<Array<Purchase>>([]);
  const searchValue = useAppSelector((x) => x.search.searchTerm);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [ToDate, setToDate] = useState<Dayjs | null>(null);

  const onFromDateChange = (newVal) => {
    setFromDate(newVal);
  };

  const onToDateChange = (newVal) => {
    setToDate(newVal);
  };

  const filteredData = useMemo(() => {
    return purchases.filter(
      (p) =>
        isBeforeDate(dayjs(p.date), ToDate) &&
        isBeforeDate(fromDate, dayjs(p.date)) &&
        p.uuid.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [purchases, searchValue, fromDate, ToDate]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      const purchasesResult = await getUserPurchases();
      setPurchases(purchasesResult);
    };
    fetchCartProducts();
  }, [auth]);

  const calcTotal = (purchase: Purchase): number => {
    return purchase.products.reduce((prev, current) => {
      return prev + current.product.price * current.quantity;
    }, 0);
  };

  const viewPurchase = (purchase: Purchase): void => {
    const title = `פירוט הזמנה ${new Date(purchase.date).toLocaleDateString(
      "he"
    )}`;
    dispatch(
      openPopup({
        component: (
          <PurchaseSummary
            products={purchase.products}
            quantity
            title={title}
          />
        ),
        theme: "dark",
      })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="user-purchases">
        <div className="filters">
          <div className="row">
            <DatePicker
              className="my-date-picker"
              label="החל מתאריך"
              value={fromDate}
              format="DD-MM-YYYY"
              onChange={onFromDateChange}
              views={["year", "month", "day"]}
            />
            <ArrowBackIosNew />
            <DatePicker
              className="my-date-picker"
              label="עד תאריך"
              value={ToDate}
              format="DD-MM-YYYY"
              onChange={onToDateChange}
              views={["year", "month", "day"]}
            />
          </div>
        </div>
        <div className="records">
          {filteredData.length === 0 && (
            <div className="purchase-preview warning">
              גמד החשבון לא מצא רכישות בחשבונך
              <SearchOff />
            </div>
          )}
          {filteredData.map((purchase, i) => (
            <div
              className="purchase-preview"
              key={i}
              onClick={() => viewPurchase(purchase)}
            >
              <PriceTag
                credits={calcTotal(purchase)}
                description={purchase.uuid}
                title={new Date(purchase.date).toLocaleDateString("he")}
              />
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};
export default UserPurchases;

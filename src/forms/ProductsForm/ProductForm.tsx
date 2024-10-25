import React, { ChangeEvent, useMemo, useState } from "react";
import { Category, Product } from "../../config/types/marketTypes";
import { AddCircle, Delete, Done, RemoveCircle } from "@mui/icons-material";
import { categories } from "../../config/constants";
import { translateCategory } from "../../services/utilities/market-utility";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import FileDropArea from "../../components/FileDropArea/FileDropArea";
import "./ProductForm.scss";

interface ProductFormProps {
  productData?: Product;
  callback?: (product: Product) => Promise<void>;
  deleteCallback?: (product: Product) => Promise<void>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productData,
  callback = () => {},
  deleteCallback = () => {},
}) => {
  const defaultFormValue: Product = useMemo(() => {
    if (productData) return productData;
    return {
      _id: "",
      img: "",
      name: "",
      price: 100,
      quantity: 1,
      description: "",
      category: "Gnome",
    };
  }, [productData]);

  const [product, setProduct] = useState<Product>(defaultFormValue);
  const [shouldPublish, setShouldPublish] = useState(false);

  const title = useMemo(() => {
    if (!productData) {
      return "מוצר חדש";
    }
    return `${productData?.name}/עריכה `;
  }, [productData]);

  const updateProductImage = async (file: File) => {
    const fileReadr = new FileReader();
    fileReadr.onloadend = function () {
      setProduct((x) => {
        const newProductState = { ...x };
        newProductState.img = fileReadr.result as string;
        return newProductState;
      });
    };
    fileReadr.readAsDataURL(file);
    document.getElementById("product-image")?.classList.remove("error");
  };

  const removeImage = () => {
    setProduct((x) => {
      const newProductState = { ...x };
      newProductState.img = "";
      return newProductState;
    });
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (newVal.length <= 15) {
      setProduct((x) => {
        const newProductState = { ...x };
        newProductState.name = newVal;
        return newProductState;
      });

      document.getElementById("name")?.classList.remove("error");
    }
  };

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    if (newVal > 0)
      setProduct((x) => {
        const newProductState = { ...x };
        newProductState.price = newVal;
        return newProductState;
      });
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = parseInt(e.target.value);
    if (newVal > 0)
      setProduct((x) => {
        const newProductState = { ...x };
        newProductState.quantity = newVal;
        return newProductState;
      });
  };

  const onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    if (newVal.length < 50)
      setProduct((x) => {
        const newProductState = { ...x };
        newProductState.description = newVal;
        return newProductState;
      });
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value as Category;
    setProduct((x) => {
      const newProductState = { ...x };
      newProductState.category = newVal;
      return newProductState;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (!product.name || product.name.length === 0) {
      document.getElementById("name")?.classList.add("error");
      isValid = false;
    }
    if (!product.img) {
      document.getElementById("product-image")?.classList.add("error");
      isValid = false;
    }
    if (!isValid) return;

    if (shouldPublish) {
      publishProduct();
    }
    await callback(product);
  };

  const publishProduct = async () => {
    console.log("published");
  };

  const deleteProduct = async () => {
    await deleteCallback(product);
  };

  const publishHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.checked;
    setShouldPublish(newVal);
  };
  return (
    <form className="product-form" onSubmit={onSubmit}>
      <div className="headers">
        <div className="title">
          <div className="actions">
            {title}
            {productData && (
              <Delete className="delete" onClick={deleteProduct} />
            )}
          </div>
          <FileDropArea
            id="product-image"
            uploadCallback={updateProductImage}
          />
          {product.img && (
            <button className="remove" onClick={removeImage}>
              הסרת תמונה
              <RemoveCircle />
            </button>
          )}
        </div>
        <ImagePreview src={product.img} />
      </div>
      <div className="fields">
        <div className="field-entry" id="name">
          <div className="field-name">שם מוצר</div>
          <input
            type="text"
            className="field-value"
            value={product.name}
            onChange={onNameChange}
          />
        </div>

        <div className="field-entry">
          <div className="field-name">מחיר</div>
          <input
            type="number"
            className="field-value"
            value={product.price}
            onChange={onPriceChange}
          />
        </div>

        <div className="field-entry">
          <div className="field-name">במלאי</div>
          <input
            type="number"
            className="field-value"
            value={product.quantity}
            onChange={onQuantityChange}
          />
        </div>

        <div className="field-entry">
          <div className="field-name">תיאור</div>
          <textarea
            className="field-value"
            value={product.description}
            onChange={onDescChange}
          />
        </div>

        <div className="field-entry">
          <div className="field-name">סוג</div>
          <select
            className="field-value select"
            value={product.category}
            onChange={onCategoryChange}
          >
            {categories.map((category, i) => (
              <option value={category} key={i}>
                {translateCategory(category)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!productData && (
        <div className="notify">
          <input
            id="notify"
            type="checkbox"
            onChange={publishHandler}
            checked={shouldPublish}
          />
          <label htmlFor="notify">אני מעוניין לפרסם את המוצר</label>
        </div>
      )}
      <button className="submit" type="submit">
        {!productData ? (
          <>
            יצירה
            <AddCircle />
          </>
        ) : (
          <>
            שמירה
            <Done />
          </>
        )}
      </button>
    </form>
  );
};
export default ProductForm;

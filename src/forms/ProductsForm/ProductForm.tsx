import { useMemo, useState } from "react";
import { Product } from "../../config/types/marketTypes";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import FileDropArea from "../../components/FileDropArea/FileDropArea";
import "./ProductForm.scss";

interface ProductFormProps {
  productData?: Product;
  callback?: (product: Product) => void;
}
const ProductForm: React.FC<ProductFormProps> = ({
  productData,
  callback = () => {},
}) => {
  const defaultFormValue: Product = useMemo(() => {
    if (productData) return productData;
    return {
      id: "",
      img: "",
      name: "",
      price: 0,
      quantity: 1,
      description: "",
      category: "Gnome",
    };
  }, [productData]);

  const [product, setProduct] = useState<Product>(defaultFormValue);

  if (productData) {
    callback(productData);
  }

  const title = useMemo(() => {
    if (!productData) {
      return "מוצר חדש";
    }
    return `${productData?.name} עריכת מוצר: `;
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
  };

  const removeImage = () => {
    const inputElement = document.getElementById(
      "file-input"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = "";
    }
    setProduct((x) => {
      const newProductState = { ...x };
      newProductState.img = "";
      return newProductState;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form className="product-form" onSubmit={onSubmit}>
      <div className="headers">
        <div className="title">
          {title}
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
      <div className="fields"></div>
      <button className="submit" type="submit">
        יצירה
        <AddCircle />
      </button>
    </form>
  );
};
export default ProductForm;

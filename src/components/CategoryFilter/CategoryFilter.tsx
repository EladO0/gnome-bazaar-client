import { Category } from "../../config/types/marketTypes";
import "./CategoryFilter.scss";

interface categoryFilterProps {
  categories: Array<Category>;
  selectedFilter?: Category;
  mutatationFunc: React.Dispatch<React.SetStateAction<Category | undefined>>;
  extraCallback?: () => void;
  translationFunc: (category: Category) => string;
}
const CategoryFilter: React.FC<categoryFilterProps> = ({
  categories,
  selectedFilter,
  mutatationFunc,
  translationFunc,
  extraCallback,
}) => {
  const setCategoryFilter = (category: Category): void => {
    if (extraCallback) {
      extraCallback();
    }
    mutatationFunc((x) => {
      return x === category ? undefined : category;
    });
  };

  const isCategorySelected = (category: Category) => {
    return selectedFilter === category ? "filter active" : "filter";
  };
  return (
    <div className="category-filter">
      {categories.map((c, i) => (
        <div
          className={isCategorySelected(c)}
          key={i}
          onClick={() => setCategoryFilter(c)}
        >
          {translationFunc(c)}
        </div>
      ))}
    </div>
  );
};
export default CategoryFilter;

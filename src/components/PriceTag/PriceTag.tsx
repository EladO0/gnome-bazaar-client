import millify from "millify";
import "./PriceTag.scss";

interface PriceTagProps {
  credits: number;
  title?: string;
  description?: string;
  small?: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({
  credits,
  title,
  description,
  small = false,
}) => {
  return (
    <div className={`price-tag ${small && "small"}`}>
      <div className="credit-count">
        {millify(credits, {
          precision: 3,
          lowercase: true,
        })}
      </div>
      {title && description && (
        <div className="my-credits">
          <header>{title}</header>
          <div className="description">{description}</div>
        </div>
      )}
    </div>
  );
};
export default PriceTag;

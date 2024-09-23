import imageStyles from "./ImagePreview.module.scss";

const ImagePreview = ({ src }) => {
  return src ? (
    <img src={src} alt="image-preview" className={imageStyles.imagePreview} />
  ) : (
    <div className="image-preview"></div>
  );
};
export default ImagePreview;

import tagStyles from "./Tag.module.scss";

interface TagProps {
  title: string;
  Icon?: any;
}
const Tag: React.FC<TagProps> = ({ title, Icon }) => {
  return (
    <div className={tagStyles.tag}>
      {Icon && <Icon className={tagStyles.icon} />}
      {title}
    </div>
  );
};
export default Tag;

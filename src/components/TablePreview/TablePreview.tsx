import { TableConfiguration } from "../../config/types/commonTypes";
import "./TablePreview.scss";

interface TableProps {
  data: Array<any>;
  configuration: TableConfiguration;
  onRowClick?: (data: any) => any;
}

const TablePreview: React.FC<TableProps> = ({
  data,
  configuration,
  onRowClick = () => {},
}) => {
  return (
    <div className="table-preview">
      <div className="row headers">
        {configuration.map((field, i) => (
          <div key={i} className="field" style={{ flex: field.flex }}>
            {field.header}
          </div>
        ))}
      </div>
      <div className="data-entries">
        {data.map((entry, i) => (
          <div className="entry row" key={i} onClick={onRowClick}>
            {configuration.map((field, j) => (
              <div key={j} className="field" style={{ flex: field.flex }}>
                {field.getter(entry)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TablePreview;

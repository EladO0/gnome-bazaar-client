import { TableConfiguration } from "../../config/types/commonTypes";
import "./TablePreview.scss";

interface TableProps {
  data: Array<any>;
  configuration: TableConfiguration;
  onRowClick?: (data: any) => any;
  rowClass?: string;
  headerClass?: string;
  fieldClass?: string;
}

const TablePreview: React.FC<TableProps> = ({
  data,
  configuration,
  rowClass,
  headerClass,
  fieldClass,
  onRowClick = () => {},
}) => {
  return (
    <div className="table-preview">
      <div className={`row headers ${headerClass}`}>
        {configuration.map((field, i) => (
          <div key={i} className="field" style={{ flex: field.flex }}>
            {field.header}
          </div>
        ))}
      </div>
      <div className="data-entries">
        {data.map((entry, i) => (
          <div
            className={`entry row ${rowClass}`}
            key={i}
            onClick={() => onRowClick(entry)}
          >
            {configuration.map((field, j) => (
              <div
                key={j}
                className={`field ${fieldClass}`}
                style={{ flex: field.flex }}
              >
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

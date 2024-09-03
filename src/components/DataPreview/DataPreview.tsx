import { dataPreviewType } from '../../config/types/commonTypes';
import './DataPreview.scss'

const defaultData: dataPreviewType = [];
const DataPreview = ({ title = "", data = defaultData }) => {
    return (
        <div className="data-preview">
            <header>
                {title}
            </header>
            <div className="data-frame">
                {data.map((entry, i) => (
                    <div key={i} className='entry'>
                        <header>({entry.value}/{entry.total}) {entry.title}</header>
                        <div className="row-container">
                            <div className="row"
                                style={{
                                    width: `${100 * entry.value / entry.total}%`
                                }}>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default DataPreview;
import { useAppSelector } from '../../store/hooks';
import './Loader.scss'

const Loader = ()=>{
    const loader = useAppSelector(x=>x.loader);
    return(
        loader.isLoading  &&
        <div className="loader">

        </div>
    )
}
export default Loader
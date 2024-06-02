import { Product } from '../interfaces/Product';
import './app.css'

type Props={
    onClose:()=> void;
    data:Product;
}

const ViewProduct = (props:Props) => {
    const {onClose, data} = props;
    return (
        <div id="myModal" className="modal">


            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>{data.name}</p>
                <div>
                    <img src={data.imageurl} alt="" />
                    <div>
                        <span>{data.name}</span>
                        <span>{data.price}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default ViewProduct;
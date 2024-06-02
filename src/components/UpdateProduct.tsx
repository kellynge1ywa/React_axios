import { useState } from "react";
import { Product } from "../interfaces/Product";
import axios from "axios";

type Props={
    onClose:()=> void;
    toBeUpdated:Product
}
const UpdateProduct=(props:Props)=>{
    const {onClose,toBeUpdated}=props;
    const [name, setName]= useState(props.toBeUpdated.name);
    const [imageurl, setImageURL]= useState(props.toBeUpdated.imageurl);
    const [price, setPrice]= useState(props.toBeUpdated.price);

    const handleNameChange=(event:any)=>{
        setName(event.target.value)
    }

    const handleImgaeURLChange=(event:any)=>{
        setImageURL(event.target.value)
    }

    const handlePriceChange=(event:any)=>{
        setPrice(event.target.value)
    }
    const editProduct= async (updated:Product)=>{
        if(name !=="" && imageurl !== "" && price > 0)
         {
            updated={id:toBeUpdated.id,name:name,imageurl:imageurl,price: price};
            await axios.put(`http://localhost:3000/products/${updated.id}`,updated)
            .then(()=>{
                alert("Product updated!!!")
            })
        }

    }
    return (
        <div>
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <form onSubmit={()=>editProduct(toBeUpdated)}>
                        <h2>Add Product</h2>
                        <div>
                            <label>Name</label>
                            <input type="text" value={name} onChange={handleNameChange} />
                        </div>
                        <div>
                            <label>Image url</label>
                            <input type="text" value={imageurl} onChange={handleImgaeURLChange} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="text" value={price} onChange={handlePriceChange} />
                        </div>
                        <button>Add Product</button>
                    </form>
                </div>

            </div>

        </div>
    );
}
export default UpdateProduct;
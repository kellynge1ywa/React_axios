import { useState } from "react";
import { Product } from "../interfaces/Product";
import {v4 as uuid} from 'uuid'
import axios from "axios";

type Props={
    onClose:()=> void;
}
const AddProduct = (props:Props) => {
    const {onClose} = props;
    const [name, setName]= useState("");
    const [imageurl, setImageURL]= useState("");
    const [price, setPrice]= useState(0);

    const handleNameChange=(event:any)=>{
        setName(event.target.value)
    }

    const handleImgaeURLChange=(event:any)=>{
        setImageURL(event.target.value)
    }

    const handlePriceChange=(event:any)=>{
        setPrice(event.target.value)
    }
    
    const addProduct=()=>{
        if(name !=="" && imageurl !== "" && price > 0){
            const newProduct:Product={id:uuid(),name:name,imageurl:imageurl,price: price};
            axios.post('http://localhost:3000/products',
                newProduct
            ).then(()=>{
                alert("Product added!!!")
            })

        } else{
            alert("Please fill all fields!!")
        }

    }

    return (
        <div>
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <form onSubmit={addProduct}>
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
export default AddProduct;
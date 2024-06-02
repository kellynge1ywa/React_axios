import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import axios from "axios";
import './app.css'
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import ViewProduct from "./ViewProduct";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [product,setProduct]=useState(null as Product | null);
    const [viewProduct,setViewProduct]= useState(false);
    const[showAddForm, setShowAddForm]=useState(false);
    const[showEditForm, setShowEditForm]=useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/products')
            .then((response) => {
                setProducts(response.data)
            })

    }, [])

    const showAddFormModal=()=>{
        setShowAddForm(true);
    }

    const showEditFormModal=(updatedProduct:Product)=>{
        setProduct(updatedProduct)
        setShowEditForm(true)
    }

    const showProductModal=(data:Product)=>{
        setProduct(data);
        setViewProduct(true);
    }

    const handleDelete=async (id:string)=>{

        await axios.delete(`http://localhost:3000/products/${id}`)
        .then(()=>{
            setProducts(products.filter((product)=>product.id !==id))
            alert("Product deleted!!")
        })
    }

    const closeAddForm=()=>setShowAddForm(false);
    const closeEditForm=()=> setShowEditForm(false);
    const closeProductModal=()=> setViewProduct(false);
    return (
        <div>
            <div>
                <button onClick={showAddFormModal}>Add Product</button>
            </div>
            <div className="card">
                {
                    products.map((product) => {
                        return (
                            <div key={product.id} className="product">
                                <img className="image" src={product.imageurl} alt="" /> <br />
                                <div className="text">
                                    <span >{product.name}</span> <br />
                                    <span>Ksh.{product.price}</span>

                                </div>
                                <div>
                                    <button onClick={()=>showProductModal(product)}>View</button>
                                    <button onClick={()=>showEditFormModal(product)}>Edit</button>
                                    <button onClick={()=> handleDelete(product.id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {showAddForm && <AddProduct onClose={closeAddForm}/>}
            </div>
            <div>
                {showEditForm && product !== null && <UpdateProduct onClose={closeEditForm} toBeUpdated={product} />}
            </div>
            <div>
                { viewProduct && product !==null && <ViewProduct onClose={closeProductModal} data={product}/>}
            </div>

        </div>
    );
}

export default Products;
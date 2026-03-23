import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const GetProducts = () => {
    //hooks
    const [products, setproducts] = useState([])//empty array..to handle the data from the backend
    const [loading, setloading] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()//navigate from one component to another
    //images url
    const images_url = "https://deborahkiboko.alwaysdata.net/static/images/"
    //fuction to get the products
    const getProducts = async () => {
        setloading("please wait...")
        try {
            //connect to our backend ApI
            const response = await axios.get("https://deborahkiboko.alwaysdata.net//api/get_product_details")
            console.log(response.data)
            setproducts(response.data)//updating the products hook with the data from the backend(from the response)
            //after getting the data reset the loading hook
            setloading("")
        } catch (error) {
            setloading("")
            setError("something went wrong")

        }
    }
    useEffect(() => {
        getProducts()
    }, [])//empty dependancy to ensure our functions runs only once when the component renders/mounts
    return (
        <div className="row">
            <h3 className="display-4 mt-3 text-center">Available Products</h3>
            {loading}
            {error}
            {products.map((product) => (

                <div className="text-center col-md-3 mb-4 body">
                    {/* card with equal size */}
                    <div className="card shadow">
                        <img src={images_url + product.product_photo} alt="images" className="product_img"/>
                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <b className="text-warning">{product.product_cost}KES</b>
                            <button className="btn btn-dark mt-2 w-100"
                            onClick={() =>navigate('/mpesapayment',{state:{product}})}
                            >Buy Now</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default GetProducts
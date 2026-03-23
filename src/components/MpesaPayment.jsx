import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const MpesaPayment = () => {
    //receive the product sent from get products 
    const { product } = useLocation().state || {}
    //hook
    const [phone, setPhoneNumber] = useState("")
    const [message, setMessage] = useState("")

    //img url
    const img_url = "https://deborahkiboko.alwaysdata.net/static/images/"
    console.log("res", product)
    //create a function to handle the form submission
const submit = async(e)=>{
    e.preventDefault()
    try{
        //create a form data object
        const data = new FormData()
        data.append('phone',phone)//phone number is from our stae variable
        data.append('amount',product.product_cost)//the cost of the product is coming from the received object
        //post data to the backend API
        const response = await axios.post("http://deborahkiboko.alwaysdata.net/api/mpesa_payment",data)
        //update message hook
        setMessage(response.data.message)
    }catch(error){
        setMessage("something went wromg please try again")
    }
}
    return (
        <div className="row justify-content-center mt-4 ">
            <div className=" col-md-6 card shadow">
                <h3 className="text-center text-success ">LIPA NA M-PESA</h3>
                <img src={img_url + product.product_photo} alt="product" className="product_img" />
                <p className="mb-1"><strong>product:</strong>{product.product_name}</p>
                <p className="mb-2"><strong>price:</strong>{product.product_cost}</p>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Enter Phone Number,254..." className="form-control mb-2"
                        value={phone}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {phone}
                    <button type="submit"
                     className="btn btn-success w-100">Pay Now</button>
                </form>
                <p className="text-center mt-2">{message}</p>
            </div>
        </div>
    )
}
export default MpesaPayment
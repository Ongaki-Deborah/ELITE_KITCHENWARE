import axios from "axios";
import React, { useState } from "react";
const AddProduct = () => {
    const [productname, setproductname] = useState("")
    const [productdescription, setproductdescription] = useState("")
    const [productcost, setproductcost] = useState("")
    const [productphoto, setproductphoto] = useState("")
    //
    const [error, seterror] = useState("")
    const [loading, setloading] = useState("")
    const [success, setsuccess] = useState("")

    const submit = async (e) => {
        e.preventDefault()
        setloading("please wait")
        try {
            const data = new FormData()
            data.append('product_name', productname)
            data.append('product_description', productdescription)
            data.append('product_cost', productcost)
            data.append('product_photo', productphoto)

            const response = await axios.post("http://deborahkiboko.alwaysdata.net//api/add_products", data)
            setloading("")
            setsuccess(response.data.message)

            setproductname("")
            setproductdescription("")
            setproductcost("")
            setproductphoto("")
        }catch(error){
            setloading("")
            seterror(error.message)
        }
    }
    return (
        <div className="row justify-content-center mt-4 p-2">
            <div className="col-md-6 card shadow">
                {loading}
                {error}
                {success}
                <h2 className="text-dark">Upload Products</h2>
                <form onSubmit={submit}>
                    <input type="text" placeholder="Enter product name"
                        className="form-control"
                        required
                        value={productname}
                        onChange={(e) => setproductname(e.target.value)}
                    /><br /><br />
                    {productname}

                    <textarea className="form-control" placeholder="describe your product" required
                        value={productdescription}
                        onChange={(e) => setproductdescription(e.target.value)}>
                    </textarea><br />
                    {productdescription}

                    <input type="number" placeholder="Enter product cost"
                        className="form-control"
                        required
                        value={productcost}
                        onChange={(e) => setproductcost(e.target.value)}
                    /><br />
                    {productcost}

                    {/* call setproductphoto onchange to update product photo hook */}
                    <br /><b>Browse/Upload Product Image</b>
                    <input
                        type="file"
                        className="form-control"
                        required
                        accept="image/*"
                        onChange={(e) => setproductphoto(e.target.files[0])}
                    />
                    <br />

                    <input type="submit" value="upload product" className="btn btn-primary" /><br /><br />
                </form>
            </div>
        </div>
    )
}
export default AddProduct
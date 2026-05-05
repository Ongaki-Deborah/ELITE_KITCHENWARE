import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    //
    const [loading, setLoading] = useState("")// a message as we wait for the user to be signed up
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    //function handle submit
    const submit = async (e) => {
        e.preventDefault()//prevent the browser from refreshing
        //update the loading hook with a message
        setLoading("please wait as we upload your data")
        //error handling
        try {
            //put updated data from hooks in a data variable,and create a form data
            const data = new FormData()
            data.append('username', username)
            data.append('email', email)
            data.append('password', password)
            data.append('phone', phone)
            //post the data to the packed Api with the help of axios
            const response = await axios.post("http://deborahkiboko.alwaysdata.net/api/signup", data)
            //after posting the data to the backend reset the loading hook to be empty
            setLoading("")
            //update the success hook with success message from backend
            setSuccess(response.data.success)
            //after signing up successfully clear the input fields
            setUsername("")
            setEmail("")
            setPassword("")
            setPhone("")
        } catch (error) {
            //reset these loading hook to be empty
            setLoading("")
            //capture the error message
            setError(error.message)
        }
    }

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow">
                {loading}
                {error}
                {success}
                <h2 className="text-primary text-center">Sign up </h2><br />
                <form onSubmit={submit}>
                    <input type="text" placeholder=" 👤Enter  Username"
                        className="form-control"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br /><br />
                    {username}

                    <input type="email" placeholder="📧 Enter  Email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br /><br />
                    {email}
                    <input type="password" placeholder="🔑 Enter Password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />
                    {password}
                    <input type="text" placeholder=" 📱Enter  Phone"
                        className="form-control"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /><br /><br />
                    {phone}
                    <div className="text-center">
                        <input type="submit" value="Sign Up" className="btn btn-info" />
                    </div>
                </form>

                <p className="text-center">Already have an account?<br /><Link to="/signin">Sign In</Link></p>
            </div>
        </div>
    )
}
export default SignUp
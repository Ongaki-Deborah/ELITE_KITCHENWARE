import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
    const [username, setUsername] = useState("")//username hook
    const [password, setPassword] = useState("")//password hook
    //
    const [loading, setLoading] = useState("")//loading hook
    const [error, setError] = useState("")//error hook
    const navigate = useNavigate()
    //function to handle submit
    const submit = async (e) => {
        e.preventDefault()
        //update the loading hook
        setLoading("please wait as we upload your data")
        try {
            //create a new object-firm data to add username and password
            const data = new FormData()
            data.append('username', username)
            data.append('password', password)
            //connection to our backend api
            const response = await axios.post("http://deborahkiboko.alwaysdata.net/api/signin", data)
            //console the response and observe it in the browser
            console.log(response)
            //after a successful log in reset the loading hook to one empty
            setLoading("")
            //check if the response is a user item
            if (response.data.user) {
                //if user is found save the details in local storage
                localStorage.setItem("user", JSON.stringify(response.data.user))
                //redirect to home page
                navigate("/")
            } else {
                //if user not found show an error
                setError(response.data.message)
            }
            setUsername("")
            setPassword("")


        } catch (error) {
            setLoading("")
            setError(error.data.message)

        }
    }
    return (
        <div className="row justify-content-center mt-4 p-2">
            <div className="col-md-6 card shadow">
                {loading}
                {error}
                <h2 className="text-dark">sign in</h2><br />
                <form onSubmit={submit} >
                    <label htmlFor="">please wait as we log you in</label><br />
                    <input type="text" placeholder="👀 username"
                        className="form-control"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    {username}

                    <input type="password" placeholder="🔑 password"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />
                    {password}

                    <div className="text-center">
                        <input type="submit" value="sign in" className="btn btn-primary w-100" />
                    </div>
                    <p className="text-center">Dont have an account?<br /><Link to="/signup">sign up</Link></p>
                </form>
            </div>

        </div>
    )
}
export default SignIn

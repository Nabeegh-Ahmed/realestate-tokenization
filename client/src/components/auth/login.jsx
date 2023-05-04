import { useState } from "react"
import useEth from "../../contexts/EthContext/useEth"
import web3 from "web3"

const Login = () => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const { state: { contracts, accounts } } = useEth()

    const loginHandler = async () => {
        await contracts.get("auth-keeper").methods.login(password).send({ from: accounts[0] })
        const loginRes = await contracts.get("auth-keeper").methods.checkUserLoggedIn().call({ from: accounts[0] })

        if (loginRes) {
            setError("")
            setMessage("Logged in successfully")
        } else {
            setError("Login failed")
            setMessage("")
        }
    }
    return (
        <div className="w-full p-12 flex flex-col space-y-2">
            {error && <div className="p-2 rounded-md text-white bg-red-500">{error}</div>}
            {message && <div className="p-2 rounded-md text-white bg-green-400">{message}</div>}
            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="rounded-md p-4 bg-green-500 shadow-md text-white" onClick={loginHandler}>Login</button>
        </div>
    )
}

export default Login
import { useState } from "react"
import useEth from "../../contexts/EthContext/useEth"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnic, setCNIC] = useState("")

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const { state: { contracts, accounts } } = useEth()

    const registerHandler = async () => {
        const alreadyExists = await contracts.get("auth-keeper").methods.checkUserExists().call({ from: accounts[0] });
        if (!alreadyExists) {
            setError("")
            await contracts.get("auth-keeper").methods.addUser(password, email, cnic).send({ from: accounts[0] })
            setMessage("Registered successfully")

        } else {
            setError("User already exists")
            setMessage("")
        }
    }
    return (
        <div className="w-full p-12 flex flex-col space-y-2">
            {error && <div className="p-2 rounded-md text-white bg-red-500">{error}</div>}
            {message && <div className="p-2 rounded-md text-white bg-green-400">{message}</div>}
            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="CNIC" type="text" value={cnic} onChange={(e) => setCNIC(e.target.value)} />
            <button className="rounded-md p-4 bg-green-500 shadow-md text-white" onClick={registerHandler}>Register</button>
        </div>
    )
}

export default Register
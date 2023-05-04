import { useState } from "react"
import useEth from "../../contexts/EthContext/useEth"

const AddProperty = () => {
    const [name, setName] = useState("")
    const [area, setArea] = useState("")

    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const { state: { contracts, accounts } } = useEth()

    const addPropertyHandler = async() => {
        const loginRes = await contracts.get("auth-keeper").methods.checkUserLoggedIn().call({ from: accounts[0] })
        if (loginRes) {
            await contracts.get("property-keeper").methods.addProperty(name, area).send({ from: accounts[0] })
            setError("")
            setMessage("Property added")
        } else {
            setError("Login failed")
            setMessage("")
        }
    }

    return (
        <div className="w-full p-12 flex flex-col space-y-2">
            {error && <div className="p-2 rounded-md text-white bg-red-500">{error}</div>}
            {message && <div className="p-2 rounded-md text-white bg-green-400">{message}</div>}

            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="Property Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="border-2 border-gray rounded-md p-2 focus:border-green-500 focus:outline-none" placeholder="Property Area" type="text" value={area} onChange={(e) => setArea(e.target.value)} />
            <button className="rounded-md p-4 bg-green-500 shadow-md text-white" onClick={addPropertyHandler}>Add Property</button>
        </div>
    )
}

export default AddProperty
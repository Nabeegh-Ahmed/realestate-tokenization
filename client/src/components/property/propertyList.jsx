import { useState, useEffect } from "react"
import useEth from "../../contexts/EthContext/useEth"

const PropertyList = () => {
    const [properties, setProperties] = useState()
    const { state: { contracts, accounts } } = useEth()

    const getProperties = async() => {
        const loginRes = await contracts.get("auth-keeper")?.methods.checkUserLoggedIn().call({ from: accounts[0] })
        if (loginRes) {
            const properties = await contracts.get("property-keeper").methods.getAllProperties().call({ from: accounts[0] })
            setProperties(properties)
        }
    }

    useEffect(() => {
        getProperties()
    }, [contracts])

    return (
        <div className="w-full p-12 flex flex-col space-y-2">
            <div className="flex justify-between bg-green-500 rounded-md text-white p-2 text-lg font-bold">
                <div>Property Name</div>
                <div>Area</div>
            </div>
            <div className="px-2">
            {
                properties?.map((property, index) => {
                    return (
                        <div className="flex justify-between" key={index}>
                            <div>{property[0]}</div>
                            <div>{property[1]}</div>
                        </div>
                    )
                })
            }
            {
                !properties && <div className="text-center">No properties found</div>
            }
            </div>
        </div>
    )
}

export default PropertyList
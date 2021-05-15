import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeSection(props) {
    const { product } = props
    var sectionStyle = {
        width: "100%",
        height: "400px",
        // backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "cover"
    };
    return (
        <div>
            <div className="style1" key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <img className="" src={product.image} alt={product.name} />
                </Link>
                
            </div>

        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
export default function Product(props) {
    const { product } = props
    return (
        <div>
            <div className="card pd-card" key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <img className="medium" src={product.image} alt={product.name} />
                </Link>
                <div className="card-body">
                    <Link to={`/product/${product._id}`}>
                        <h2 className="text-center pb-4 pt-3 text-dark">{product.name}</h2>
                    </Link>
                    <Link to={`/product/${product._id}`}>
                        <div className="card-body-button">
                            <button>ORDER</button>
                        </div>
                    </Link> 
                </div>
            </div>

        </div>
    )
}
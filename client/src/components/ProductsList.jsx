import React from 'react'
import { Link } from 'react-router-dom'

export const ProductsList = ( { products } ) => {
    return (
        <div className="products__wrapper">
            {products.map( ( product, id ) => {
                return (
                    <div key={id}
                        className="products__list">
                        <Link to={`products/${product.id}`}>
                            <div className="card__wrapper">
                                <figure>
                                    <img src={`${product.imageUrl}`}
                                        alt={product.name} />
                                </figure>
                                <div className="card__content">
                                    <p>{product.name}</p>
                                    <span>${product.price}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            } )}
        </div>
    )
}

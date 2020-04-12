import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export const Product = ( { match } ) => {
    const { params: { productId }, } = match
    // console.log( match, "match" )
    const [product, setProduct] = useState( {} )
    const [loading, setLoading] = useState( false )

    useEffect( () => {
        setLoading( true )
        const getProduct = async () => {
            const response = await fetch( `/api/products/${productId}` )
            const result = await response.json()
            // console.log( result, "single product" )
            if ( product ) {
                setLoading( false )
                setProduct( result )
            }
        }
        getProduct()
        // eslint-disable-next-line 
    }, [] )

    return (
        <div className="container">
            <div className="back__nav">
                <h1>Los Productos</h1>
                <Link to="/">
                    <p>Back to Products</p>
                </Link>
            </div>

            <div className="product__detail">
                {loading ? (
                    <div className="loading__bar">
                        <h3>...loaaadin'</h3>
                    </div>
                ) : (
                        <div className="product"
                            key={productId}>
                            <figure>
                                <img src={`${product.imageUrl}`}
                                    alt={product.name} className="product__img"
                                />
                            </figure>
                            <div className="product__info">
                                <h3>{product.name}</h3>
                                <span className="span__caption">
                                    {product.inStock === true ? "In Stock" : "Out of stock currently"}
                                </span>
                                <br />
                                <span>${product.price}</span>
                                <br />
                                <br />
                                <span className="sales__caption">{product.salePrice !== null ? `SALES only $${product.salePrice}` : ""}</span>
                                <br />
                                <p>{product.description}</p>
                                <div className="btns__row">
                                    <button className="product__btn" type="button>">
                                        Add to cart
                                        </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

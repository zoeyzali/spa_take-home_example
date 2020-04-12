import React, { useState, useEffect } from 'react'
import { ProductsList } from './ProductsList'


export const HomePage = () => {
    const [products, setProducts] = useState( [] )
    const [loading, setLoading] = useState( false )
    const [currentPage, setCurrentPage] = useState( 1 )
    const [perPage, setPerPage] = useState( 4 )

    useEffect( () => {
        const getProducts = async () => {
            setLoading( true )
            try {
                const response = await fetch( `/api/products/?pageSize=${12}` )
                if ( !response.ok ) {
                    setLoading( true )
                    // console.log( response, "res" )
                    throw Error( response.statusText )
                } else {
                    if ( response.ok ) {
                        const result = await response.json()
                        console.log( result, "result" )
                        setLoading( false )
                        setProducts( result.content )
                        // setCurrentPage( result.pageNumber)
                        setPerPage( ( result.total / result.pageSize ) * perPage )
                    }
                }
            } catch ( error ) {
                console.log( error, "error" )
            }
        }
        getProducts()
        // eslint-disable-next-line 
    }, [] )



    const handlePageChange = ( e ) => {
        // e.preventDefault()
        setCurrentPage( Number( e.target.id )
        )
        // console.log( e.target.id, "current" )
    }

    const indexOfLastProduct = currentPage * perPage
    const indexOfFirstProduct = indexOfLastProduct - perPage
    const currentProducts = products.slice( indexOfFirstProduct, indexOfLastProduct )


    const pageNumbers = []
    for ( let i = 1; i <= Math.ceil( products.length / perPage ); i++ ) {
        pageNumbers.push( i )
    }

    const renderPageNumbers = pageNumbers.map( ( number, i ) => {
        let active = currentPage === number ? "active" : ""
        // console.log( active, "nums" )
        return (
            <li
                className={`${active}`}
                key={number}
                id={number}
                onClick={handlePageChange}
            >
                {number}
            </li>
        )
    } )
    // console.log( pageNumbers, "nrsArray" )

    // console.log( perPage, "perpage", pageNumbers )
    return (
        <div className="container">
            <div className="home__wrapper">
                <h1>Welcome to Los Productos</h1>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>

                {loading ? (
                    <div className="loading__bar">
                        <h3>...Loaaadin'</h3>
                    </div>
                ) : (
                        <ProductsList products={currentProducts} />
                    )
                }
            </div>
        </div>
    )
}

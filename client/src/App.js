import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/HomePage'
import { ProductsList } from './components/ProductsList'
import { Product } from './components/Product'

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={Layout} />
                <Route exact path="/products" component={ProductsList} />
                <Route exact path="/products/:productId" component={Product} />
            </div>
        </Router>
    )
}

export default App


function Layout() {
    return (
        <div className="container">
            <div className="nav__wrapper">
                <nav>
                    <Link to="/">
                        <h3>Los Productos</h3>
                    </Link>
                    <p>SPA Quickie</p>
                </nav>
            </div>
            <HomePage />
        </div>
    )
}

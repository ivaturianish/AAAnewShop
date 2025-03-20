import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"

// Pages
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
// import Checkout from "./pages/Checkout"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import NotFound from "./pages/NotFound"

// Context
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/checkout" element={<Checkout />} /> */}
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/register" element={<Register />} /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App


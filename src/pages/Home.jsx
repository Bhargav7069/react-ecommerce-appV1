import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
    const dispatch = useDispatch();
    const { items, categories, status, total } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const skip = (currentPage - 1) * itemsPerPage;
        dispatch(fetchProducts({ limit: itemsPerPage, skip, category: selectedCategory }));
    }, [dispatch, currentPage, selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const totalPages = Math.ceil(total / itemsPerPage);

    if (status === 'loading' && items.length === 0) {
        return <div className="text-center mt-2">Loading products...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center mt-2 error-msg">Error loading products. Please try again.</div>;
    }

    return (
        <div className="container home-container">
            <div className="controls-bar">
                <h2>Our Products</h2>
                <div className="category-filter">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="all">All Categories</option>
                        {categories.map((cat, idx) => (

                            <option key={idx} value={cat.slug || cat}>
                                {cat.name || cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="products-grid">
                {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {items.length > 0 && (
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {[...Array(Math.min(5, totalPages))].map((_, idx) => {

                        return null;
                    })}
                    <span style={{ display: 'flex', alignItems: 'center', margin: '0 1rem' }}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {items.length === 0 && status === 'succeeded' && (
                <div className="text-center">No products found.</div>
            )}
        </div>
    );
};

export default Home;

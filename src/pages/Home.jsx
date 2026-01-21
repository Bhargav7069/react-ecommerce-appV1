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
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const skip = (currentPage - 1) * itemsPerPage;
            dispatch(fetchProducts({ limit: itemsPerPage, skip, category: selectedCategory, search: searchTerm }));
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [dispatch, currentPage, selectedCategory, searchTerm]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSearchTerm(''); // Clear search when category changes
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setSelectedCategory('all'); // Clear category when searching
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const totalPages = Math.ceil(total / itemsPerPage);

    return (
        <div className="home-wrapper">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Discover the Rare.<br />
                        <span className="text-gradient">Embrace the Unique.</span>
                    </h1>
                    <p className="hero-subtitle">
                        Explore our curated collection of premium products designed to elevate your lifestyle.
                        Quality meets innovation in every item.
                    </p>
                </div>
            </header>

            <div className="container home-container">
                <div className="controls-bar">
                    <div className="filter-group">
                        <div className="search-wrapper">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                            <span className="search-icon">🔍</span>
                        </div>

                        <span className="filter-label">Filter by:</span>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="custom-select"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat.slug || cat}>
                                    {cat.name || cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="showing-result" style={{ color: 'var(--text-secondary)' }}>
                        Showing {items.length} results
                    </div>
                </div>

                {status === 'loading' ? (
                    <div className="text-center" style={{ padding: '4rem', color: 'var(--text-secondary)' }}>
                        <div className="loading-spinner">Loading experiences...</div>
                    </div>
                ) : (
                    <>
                        <div className="products-grid">
                            {items.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {items.length > 0 ? (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    ←
                                </button>

                                <span className="glass-panel" style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    color: 'var(--primary-color)'
                                }}>
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    className="page-btn"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    →
                                </button>
                            </div>
                        ) : (
                            <div className="text-center" style={{ marginTop: '4rem', color: 'var(--text-secondary)' }}>
                                No products found in this category.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

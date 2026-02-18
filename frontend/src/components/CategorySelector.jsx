import { useState, useEffect } from 'react';
import * as categoryApi from '../api/category.api.js';

/**
 * Category Selector Component
 * Dropdown for selecting task category
 * Referenced in Sprint Backlog: SB06
 */
function CategorySelector({ value, onChange, showAll = false }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoryApi.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to load categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        setAdding(true);
        setError('');
        try {
            const created = await categoryApi.createCategory({ name: newCategoryName.trim() });
            setCategories(prev => [...prev, created]);
            onChange(created.id);       // auto-select the newly created category
            setNewCategoryName('');
            setShowInput(false);
        } catch (err) {
            setError('Failed to add category');
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();         // prevent accidental form submission
            handleAddCategory();
        }
        if (e.key === 'Escape') {
            setShowInput(false);
            setNewCategoryName('');
            setError('');
        }
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

  return (
    <>
        <label>Category:</label>

        {/* Selector + Plus Button row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{showAll ? 'All Categories' : 'No Category'}</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {/* + Button */}
            <button
                type="button"
                onClick={() => setShowInput(prev => !prev)}
                title="Add new category"
                style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,        // prevents the button from being squeezed
                    padding: 0,
                }}
            >
                +
            </button>
        </div>

        {/* Inline input — sits below, doesn't push the row */}
        {showInput && (
            <div style={{ display: 'flex', gap: '6px', marginTop: '6px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="New category name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{
                        width: '100%',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box',
                    }}
                />
                <button type="button" onClick={handleAddCategory} disabled={adding}
                    style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flexShrink: 0,
                    }}
                >
                    {adding ? '...' : 'Add'}
                </button>
                {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
            </div>
        )}
    </>
);
}

export default CategorySelector;

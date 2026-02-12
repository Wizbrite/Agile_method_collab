import { useState, useEffect } from 'react';
import * as categoryApi from '../api/category.api.js';

/**
 * Category Selector Component
 * Dropdown for selecting task category
 * Referenced in Sprint Backlog: SB06
 */
function CategorySelector({ value, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            // TODO: Implement category loading (SB06)
            const data = await categoryApi.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Failed to load categories:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading categories...</p>;
    }

    return (
        <label>
            Category:
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">No Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default CategorySelector;

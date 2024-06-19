import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNews } from '../../store/slices/newsSlice';  

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.news);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newsData = {
            title,
            content,
            createDate: new Date().toISOString(),
            author,
            image,
            status: true
        };
        dispatch(createNews(newsData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Blog</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 p-2 w-full border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="content"
                            className="mt-1 p-2 w-full border rounded"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-gray-700">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            className="mt-1 p-2 w-full border rounded"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="image"
                            className="mt-1 p-2 w-full border rounded"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;

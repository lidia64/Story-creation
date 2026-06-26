import {useState} from 'react'
import {createStory} from '../Services/StoryServices'

export default function AddStory() {
    const [Author, setAuthor] = useState('');
    const [Content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const HandleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!Author.trim() || !Content.trim()) {
            setErrorMessage('Please fill in author and content.');
            return;
        }

        const storyData = {
            authorName: Author.trim(),
            content: Content.trim()
        };

        try {
            setIsSubmitting(true);
            const response = await createStory(storyData);
            console.log('Story created:', response);
            alert('Story created successfully!');
            setAuthor('');
            setContent('');
        }
        catch (error) {
            console.error('Error creating story:', error);
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                'Failed to create story. Please try again.';

            setErrorMessage(message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return(
        <form onSubmit={HandleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add a New Story</h2>
            {errorMessage && (
                <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {errorMessage}
                </p>
            )}
            <div className="mb-4"> 
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                    Author
                </label>
                <input
                    id="author"
                    type="text"
                    value={Author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter author name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                    Content
                </label>
                <textarea
                    id="content"
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter story content"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {isSubmitting ? 'Creating...' : 'Create Story'}
            </button>
        </form>
    );
}

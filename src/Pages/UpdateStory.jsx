import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getStoryById, updateStory} from '../Services/StoryServices'

export default function UpdateStory() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);   
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchStoryDetails = async () => { 
            const story = await getStoryById(id);
            setAuthor(story.authorName);
            setContent(story.content);
            setLoading(false);
        }

        fetchStoryDetails();
    },[id]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedStory = {
            authorName: author.trim(),
            content: content.trim()
        };  
        await updateStory(id, updatedStory);
        alert('Story updated successfully!');
    }
    if(loading){
        return <div className="text-center text-gray-500">Loading...</div>
    }
    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Update Story</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Story
                </button>
            </form>
        </div>
    )
}

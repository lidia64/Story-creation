import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { deleteStory,getStories } from "../Services/StoryServices";

export default function StoryList(){
    const[stories,setStories] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStories = async () => {
        try {
            const data = await getStories();
            setStories(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching stories:', error);
            setLoading(false);
        }
        };

        loadStories();
    }, []);

    const handleDeleteStory = async (storyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this story?");
        if (!confirmDelete) {
            return;
        }

        await deleteStory(storyId);
        setStories((currentStories) =>
            currentStories.filter((story) => story.id !== storyId)
        );
        alert("Story deleted successfully!");
    };
    if(loading){
        return <div className="text-center text-gray-500">Loading...</div>
    }
    return(
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Stories</h2>    
        <ul className="space-y-4">
            {stories.map((story) => (
                <li key={story.id} className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">By: {story.authorName}</h3>
                    <p className="mt-2 text-gray-700">{story.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                            to={`/Story/${story.id}`}
                            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                        >
                            View
                        </Link>
                        <Link
                            to={`/UpdateStory/${story.id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Update
                        </Link>
                        <button
                            onClick={() => handleDeleteStory(story.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        > 
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        </div>
    );
}

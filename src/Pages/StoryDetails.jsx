import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getStoryById} from '../Services/StoryServices'

export default function StoryDetails() {
    const {id} = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
        const fetchStoryDetails = async () => {
        try {
            const data = await getStoryById(id);
            setStory(data);
            setLoading(false);
        }       catch (error) {
            console.error('Error fetching story details:', error);
            setLoading(false);
        }   
        };

        fetchStoryDetails();
    },[id]);
    if(loading){
        return <div className="text-center text-gray-500">Loading...</div>
    }   
    if(!story){
        return <div className="text-center text-gray-500">Story not found.</div>
    }
    return(
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Story Details</h2>  
            <p className="text-gray-600 mb-2">By: {story.authorName}</p>
            <p className="text-gray-700">{story.content}</p>
        </div>
    );
}

import {deleteStory} from '../Services/StoryServices'

export default function DeleteStory({storyId, onDeleted}) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this story?");
        if (!confirmDelete) {
            return;
        }

        await deleteStory(storyId);
        onDeleted?.(storyId);
        alert("Story deleted successfully!");
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
            Delete
        </button>
    );
}

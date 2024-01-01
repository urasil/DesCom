import {useState} from "react";
import "./style.css";
import {createFakeComments} from "./api.js";
function App() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [comments, setComments] = useState([])
    const [formData, setFormData] = useState({
        productName: "",
        commentType: "",
        commentCount: "",
    })

    const handleChange = e => {
        setFormData({
            ...formData, //creates a new object with all existing kv pairs from formData
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await createFakeComments(formData);

            if (res?.error) {
                setError(true);
                setComments([]);
            } else {
                setComments(res);
                setError(false);
            }
        } catch (error) {
            console.error(error.message);
            setError(true);
            setComments([]);
        } finally {
            setLoading(false);
        }
}
    //If value is falsy, it will evaluate to True (0, "")
    const isDisabled = Object.values(formData).some(value => !value) || loading

    return (
        <div className="max-w-screen-md mx-auto py-10">
            <h1 className="text-xl flex items-center font-bold mb-4">Fake Comment Generator</h1>

            <form onSubmit={handleSubmit} className="w-full mb-5 flex items-center gap-x-3">
                <input
                    type="text"
                    onChange={handleChange}
                    value={formData.productName}
                    name="productName"
                    placeholder="Product name"
                    className="h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-auto"
                />
                <select
                    name="commentType"
                    onChange={handleChange}
                    value={formData.commentType}
                    className="appearance-none h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-auto"
                >
                    <option value="">Comment Type</option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                </select>
                <input
                    type="text"
                    onChange={handleChange}
                    value={formData.commentCount}
                    name="commentCount"
                    placeholder="Number of comments"
                    className="h-10 rounded border border-zinc-300 outline-none px-4 text-sm flex-auto"
                />
                <button
                    disabled={isDisabled}
                    className="h-10 px-10 rounded bg-blue-500 text-white text-sm disabled:opacity-50 disabled:pointer-events-none">
                    {loading? "..." : "Generate"}
                </button>
            </form>

            {error && (
                <div className="bg-red-200 text-red-600 p-4 rounded-md">
                    You have entered an invalid product or number of comments, please try again!
                </div>
            )}
            {comments.length > 0 && (
                <div className="grid gap-y-4">
                    {comments.map(({comment, author}, key) => (
                        <section className="p-4 rounded border border-zinc-300">
                            <header className="text-sm font-semibold mb-4">
                                <h6 className="bg-blue-500 text-white py-1.5 px-3 inline rounded-md">
                                    {author}
                                </h6>
                            </header>
                            <p className="text-sm text-black">
                                {comment}
                            </p>
                        </section>
                    ))
                    }
                </div>
            )}
        </div>
    )
}

export default App
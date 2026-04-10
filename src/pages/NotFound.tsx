import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <div className="flex items-center justify-center w-full h-screen mx-auto px-4 py-8 bg-primary">
                <div className="flex flex-col items-center justify-center border gap-4 border-border rounded-2xl bg-secondary p-5">
                    <h1 className="text-4xl font-bold text-secondarytext">404 Not Found</h1>
                    <p className="text-text">The page you are looking for does not exist.</p>
                    <Link to="/" className="text-secondarytext hover:underline">
                        <button className="border border-border px-3 py-2 bg-primary rounded-xl cursor-pointer">
                            Go to Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default NotFound
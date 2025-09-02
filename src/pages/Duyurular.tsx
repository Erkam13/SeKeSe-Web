import { blogs } from "../data/blogs";
import BlogCard from "../BlogCard";

const Duyurular = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-6">Duyurular & Haberler</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {blogs.map((post, i) => (
                    <BlogCard key={i} {...post} />
                ))}
            </div>
        </div>
    );
};

export default Duyurular;
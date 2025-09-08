const Metadata = () => {
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 relative h-[calc(100vh-8rem)] overflow-y-auto"
            >
                {/* Page ID */}
                <div>
                    <label htmlFor="page_id" className="block text-sm font-medium">
                        Page
                    </label>
                    <select
                        id="page_id"
                        name="page_id"
                        value={form.page_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2"
                        required
                    >
                        {data?.page && (
                            <option value={data.page.id}>{data.page.title}</option>
                        )}
                    </select>
                </div>

                {/* Language */}
                <div>
                    <label
                        htmlFor="language_id"
                        className="block text-sm font-medium"
                    >
                        Language
                    </label>
                    <select
                        id="language_id"
                        name="language_id"
                        value={form.language_id}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    >
                        <option value="">Pilih Bahasa</option>
                        {languages?.map((language: any) => (
                            <option key={language.id} value={language.id}>
                                {language.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Meta Title */}
                <div>
                    <label htmlFor="meta_title" className="block text-sm font-medium">
                        Meta Title
                    </label>
                    <input
                        id="meta_title"
                        type="text"
                        name="meta_title"
                        value={form.meta_title}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="Judul untuk SEO"
                        required
                    />
                </div>

                {/* Meta Description */}
                <div>
                    <label
                        htmlFor="meta_description"
                        className="block text-sm font-medium"
                    >
                        Meta Description
                    </label>
                    <textarea
                        id="meta_description"
                        name="meta_description"
                        value={form.meta_description}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="Deskripsi singkat halaman..."
                        rows={3}
                    />
                </div>

                {/* Meta Keywords */}
                <div>
                    <label htmlFor="meta_keywords" className="block text-sm font-medium">
                        Meta Keywords
                    </label>
                    <input
                        id="meta_keywords"
                        type="text"
                        name="meta_keywords"
                        value={form.meta_keywords}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="Pisahkan dengan koma: keyword1, keyword2"
                    />
                </div>

                {/* OG Image */}
                <div>
                    <label htmlFor="og_image" className="block text-sm font-medium">
                        OG Image (URL)
                    </label>
                    <input
                        id="og_image"
                        type="url"
                        name="og_image"
                        value={form.og_image}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* OG Type */}
                <div>
                    <label htmlFor="og_type" className="block text-sm font-medium">
                        OG Type
                    </label>
                    <input
                        id="og_type"
                        type="text"
                        name="og_type"
                        value={form.og_type}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="website, article, profile..."
                    />
                </div>

                {/* Twitter Card */}
                <div>
                    <label
                        htmlFor="twitter_card"
                        className="block text-sm font-medium"
                    >
                        Twitter Card
                    </label>
                    <input
                        id="twitter_card"
                        type="text"
                        name="twitter_card"
                        value={form.twitter_card}
                        onChange={handleChange}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="summary, summary_large_image"
                    />
                </div>

                <div className="mt-0">
                    <button
                        type="submit"
                        className="bg-blue-700 cursor-pointer hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition-colors duration-300 w-full"
                    >
                        Save Metadata
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Metadata;
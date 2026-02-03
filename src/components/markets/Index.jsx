import { useState } from "react";
import { FaPlus, FaTag } from "react-icons/fa"
import items from '../../data/product'
import { useNavigate } from "react-router";

const Index = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isLoading] = useState(false);
    const navigater = useNavigate();
    const itemsData = items;
    const posters = [
        { id: 1, title: "Grand Opening", discount: "20% Cashback", bg: "bg-gradient-to-r from-indigo-600 to-blue-500/0", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000" },
        { id: 2, title: "Flash Sale", discount: "Ends in 2h", bg: "bg-gradient-to-r from-rose-600 to-orange-500/0", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000" },
        { id: 3, title: "New Season", discount: "Explore Now", bg: "bg-gradient-to-r from-emerald-600 to-teal-500/0", image: "https://di-uploads-pod41.dealerinspire.com/performancefordbountiful/uploads/2023/09/PerF-Valet_Mobile-Ford-1900x200-1.png" },
    ];
    const addToCart = (product) => {
        if (product.in_stock_qty <= 0) return alert("Out of stock!");
        setCart(prev => {
            const existing = prev.find(item => item.item_id === product.item_id);
            if (existing) {
                return prev.map(item =>
                    item.item_id === product.item_id
                        ? { ...item, quantity: Math.min(item.quantity + 1, product.in_stock_qty) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, unit_price: 10.0, discount: 0 }];
        });
    };
    return (
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">
            {/* Poster Carousel */}
            <section className="relative group overflow-hidden rounded-lg h-48 md:h-72 shadow-2xl">
                <div className="flex h-full transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {posters.map((poster) => (
                        <div key={poster.id} className={`min-w-full h-full relative ${poster.bg}`}>
                            <img src={poster.image} alt={poster.title} className="w-full h-full object-cover mix-blend-overlay" />
                            <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1 bg-white/20 backdrop-blur rounded text-[10px] font-black uppercase tracking-widest">{poster.discount}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black mb-4">{poster.title}</h2>
                                <button className="px-8 py-3 bg-white text-gray-900 rounded-xl text-sm font-black w-fit hover:scale-105 transition-transform active:scale-95 shadow-lg">Grab Deals</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Dots */}
                <div className="absolute bottom-6 left-12 flex gap-2">
                    {posters.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx ? 'w-10 bg-white' : 'w-2 bg-white/40'}`}
                        />
                    ))}
                </div>
            </section>

            {/* Category Selector */}
            <section className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Beverage', 'Oil', 'Snacks', 'Pantry'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${activeCategory === cat
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-indigo-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </section>

            {/* Product Grid */}
            <section>
                <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <FaTag className="text-rose-500 rotate-90" /> Promotion
                </h3>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {itemsData?.data?.map((item, index) => index <= 5 && (
                            <div
                                key={item.item_id}
                                onClick={() => navigater(`product/view/${index}`)}
                                className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-gray-700 mb-4">
                                    <img src={item.images[0]?.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    {item.discount > 0 && <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md px-2 py-1 rounded-lg text-md font-black text-white border border-white dark:border-gray-600">
                                        - {item.discount}%
                                    </div>}
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="absolute bottom-3 right-3 p-4 bg-indigo-600 text-white rounded-2xl shadow-xl translate-y-0 lg:translate-y-20 lg:group-hover:translate-y-0 transition-all duration-500 hover:bg-black"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="px-2">
                                    <h4 className="font-black text-gray-800 dark:text-gray-100 text-sm truncate uppercase tracking-tighter">{item.item_name}</h4>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-2">#{item.item_code}</p>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-black text-lg">$10.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {/* Product Grid */}
            <section>
                <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 uppercase tracking-tight">
                    <FaTag className="text-rose-500 rotate-90" /> Recommended For You
                </h3>

                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[2.5rem]" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {itemsData?.data?.map((item, idx) => (
                            <div
                                key={item.item_id}
                                onClick={() => navigater(`product/view/${idx}`)}
                                className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-gray-700 mb-4">
                                    <img src={item.images[0]?.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    {item.discount > 0 && <div className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md px-2 py-1 rounded-lg text-md font-black text-white border border-white dark:border-gray-600">
                                        - {item.discount}%
                                    </div>}
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="absolute bottom-3 right-3 p-4 bg-indigo-600 text-white rounded-2xl shadow-xl translate-y-0 lg:translate-y-20 lg:group-hover:translate-y-0 transition-all duration-500 hover:bg-black"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="px-2">
                                    <h4 className="font-black text-gray-800 dark:text-gray-100 text-sm truncate uppercase tracking-tighter">{item.item_name}</h4>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-2">#{item.item_code}</p>
                                    <p className="text-indigo-600 dark:text-indigo-400 font-black text-lg">$10.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Index;
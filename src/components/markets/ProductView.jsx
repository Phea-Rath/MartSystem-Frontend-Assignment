import React, { useEffect, useState } from 'react';
import {
    FaShoppingCart, FaTag, FaBoxOpen, FaCheckCircle,
    FaChevronRight, FaStar, FaShieldAlt
} from 'react-icons/fa';
import items from '../../data/product';
import { useNavigate, useParams } from 'react-router';

const ProductView = () => {
    const { id } = useParams();
    const navigater = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const itemRec = items?.data?.filter(
            (i, idx) => idx <= 5 && idx != id
        );
        setProduct(items?.data?.[id]);
        setMainImage(items?.data?.[id].images[0].image_url);
        setRecommendations(itemRec);
    }, [id, items]);
    // Recommended items mock



    const [mainImage, setMainImage] = useState();
    const [selectedAttr, setSelectedAttr] = useState("xl");
    const [quantity, setQuantity] = useState(1);

    const discountedPrice = (parseFloat(product.unit_price) - parseFloat(product.discount)).toFixed(2);

    return (
        <div className="min-h-screen bg-transparent text-gray-800 dark:text-gray-100 p-4 md:p-8 transition-colors">
            <div className=" mx-auto">

                {/* Product Section */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                            <img src={mainImage} alt={product.item_name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product?.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img.image_url)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${mainImage === img.image_url ? 'border-indigo-600' : 'border-transparent opacity-60'}`}
                                >
                                    <img src={img.image_url} className="w-full h-full object-cover" alt="thumb" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                                {product.brand_name}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-black mt-3">{product.item_name}</h1>
                            <p className="text-gray-400 text-sm mt-1">Code: {product.item_code}</p>
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                                ${discountedPrice}
                            </div>
                            {parseFloat(product.discount) > 0 && (
                                <div className="text-lg text-gray-400 line-through">${product.unit_price}</div>
                            )}
                            <div className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded font-bold">
                                SAVE ${product.discount}
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Attributes (Dynamic from JSON) */}
                        {product?.attributes?.map((attr, i) => (
                            <div key={i} className="mb-8">
                                <h3 className="text-sm font-bold uppercase mb-3 flex items-center gap-2">
                                    Select {attr.attr_name}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {attr.attr_values.map((val) => (
                                        <button
                                            key={val}
                                            onClick={() => setSelectedAttr(val)}
                                            className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${selectedAttr === val ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300'}`}
                                        >
                                            {val.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Add to Cart Actions */}
                        <div className="mt-auto space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center font-bold">-</button>
                                    <span className="w-10 text-center font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 flex items-center justify-center font-bold">+</button>
                                </div>
                                <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-[10px] uppercase font-bold text-gray-400">
                                <div className="flex items-center gap-2"><FaShieldAlt /> 1 Year Warranty</div>
                                <div className="flex items-center gap-2"><FaCheckCircle /> In Stock (Phnom Penh)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black">Recommended for You</h2>
                        <button onClick={() => navigater('/market')} className="text-indigo-600 cursor-pointer dark:text-indigo-400 font-bold flex items-center gap-1 text-sm">
                            View All <FaChevronRight size={10} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {recommendations.map((item, idx) => (
                            <div key={item.item_id} onClick={() => navigater(`/market/product/view/${idx}`)} className="group bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all">
                                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 mb-4">
                                    <img src={item.images[0]?.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h3 className="font-bold text-sm mb-1 truncate">{item.item_name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-black">${item.unit_price}</span>
                                    <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <FaShoppingCart size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductView;
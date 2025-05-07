import productCategory from "../helpers/productCatagory";
import { useEffect, useState } from "react";
import CategoryThreeBox from "../components/SearchThreeProducts.js";
import SummaryApi from "../common/index.js";

const CategoryProducts = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const defaultCategory = "best-seller";
    const initialSelect = productCategory.reduce((acc, cat) => {
        acc[cat.value] = cat.value === defaultCategory;
        return acc;
    }, {});
    const [filterCategory, setFilterCategory] = useState([defaultCategory]);
    const [selectCategory, setSelectCategory] = useState(initialSelect);

    const [sortOption, setSortOption] = useState("");


    const handleSelectCategory = (e) => {
        const { value, checked } = e.target

        setSelectCategory((preve) => {
            return {
                ...preve,
                [value]: checked
            }
        })

    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch(SummaryApi.filterProduct.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    category: filterCategory,
                    sort: sortOption 
                }),
            });
            const json = await res.json();
            setData(json.data || []);
            setLoading(false);
        };
        if (filterCategory.length || sortOption) fetchData();
    }, [filterCategory,sortOption]);
    console.log("filterCategory:", filterCategory);



    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null
        }).filter(el => el)

        setFilterCategory(arrayOfCategory)
    }, [selectCategory])
    return (
        <div className="mt-40 container mx-auto p-4">

            {/* Desktop Version */}
            <div className="hidden lg:grid grid-cols-[280px,1fr]">
                {/* Left Side */}
                <div className=" shadow-xl border border-pink-800 p-4 min-h-[calc(100vh-120px)]">

                    {/* Sort By */}
                    <div>
                        <h3 className="text-lg uppercase font-medium text-pink-800 border-b pb-1 border-pink-800">Sort by</h3>

                        <form className="text-lg flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="lowToHigh"
                                    checked={sortOption === "lowToHigh"}
                                    onChange={(e) => setSortOption(e.target.value)}
                                />
                                <label>Price - Low to High</label>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="highToLow"
                                    checked={sortOption === "highToLow"}
                                    onChange={(e) => setSortOption(e.target.value)}
                                />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>

                    {/* Filter By */}
                    <div>
                        <h3 className="text-lg uppercase font-medium text-pink-800 border-b pb-1 border-pink-800">Category</h3>

                        <form className="text-lg flex flex-col gap-2 py-2">
                            {
                                productCategory.map((categoryName, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2 text-black">
                                            <input
                                                type="checkbox"
                                                name="category"
                                                value={categoryName.value}
                                                checked={!!selectCategory[categoryName.value]}
                                                id={categoryName.value}
                                                onChange={handleSelectCategory}
                                            />
                                            <label htmlFor={categoryName?.value}>{categoryName?.name}</label>
                                        </div>
                                    );
                                })
                            }
                        </form>
                    </div>
                </div>

                {/* Right Side (Product) */}
                <div className="flex items-center flex-wrap gap-5 h-[calc(100vh-190px)] overflow-y-scroll">
                    {
                        data.length !== 0 && !loading && (
                            <CategoryThreeBox
                                products={data}
                            />
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default CategoryProducts;
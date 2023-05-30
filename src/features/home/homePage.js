import Navbar from "@/components/common/Navbar";
import { categoryAPI } from "@/features/category/categoryAPI";
import { newsAPI } from "@/features/news/newsAPI";
import { sourceAPI } from "@/features/source/sourceAPI";
import { useEffect, useState } from "react";
import Select from "react-select";
import { CSSTransition } from "react-transition-group";
import { DateRangePicker } from "rsuite";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "@/app/axios/axiosConfigs"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurentUser } from "@/features/auth/authSlice";

const HomePage = () => {
    const user = useSelector(selectCurentUser)

    const [isFilterShowed, setIsFilterShowed] = useState(true);

    const [filterKeyword, setFilterKeyword] = useState("");
    const [filterSources, setFilterSources] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterDate, setFilterDate] = useState({
        startDate: "",
        endDate: "",
    });

    const [listSources, setListSources] = useState([]);
    const [listCategories, setListCategories] = useState([]);

    const [listNews, setListNews] = useState([]);
    const [nextLoadLink, setNextLoadLink] = useState("");

    const getNews = async () => {
        newsAPI.get({
            categories: filterCategories.join(","),
            start_date: filterDate.startDate,
            end_date: filterDate.endDate,
            sources: filterSources.join(","),
            search: filterKeyword,
            limit: 8,
        }, true)
            .then((response) => {
                if (response?.data) {
                    setListNews(response?.data?.data)
                    setNextLoadLink(response?.data?.links?.next)
                }
            })
            .catch(e => console.log(e.message))
            .finally(() => { });
    };

    const loadNext = () => {
        if (nextLoadLink) {
            api.get(nextLoadLink)
                .then((response) => {
                    const result = response?.data
                    if (result?.data) {
                        setListNews(prevState => [...prevState, ...result?.data?.data])
                        setNextLoadLink(result?.data?.links?.next)
                    }
                })
                .catch(e => console.log(e.message))
        }
    }

    useEffect(() => {
        const loadSources = () => {
            if (user?.preferences?.sources?.length > 0 || false) {
                setListSources(user?.preferences?.sources?.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                }))
            } else {
                sourceAPI.get(null, true)
                    .then((response) => {
                        if (response?.data) {
                            const mapped = response.data.map(item => {
                                return {
                                    value: item.id?.toString(),
                                    label: item.name,
                                }
                            })
                            setListSources(mapped)
                        }
                    })
                    .catch((e) => console.log(e.message))
            }
        }

        const loadCategories = () => {
            if (user?.preferences?.categories?.length > 0 || false) {
                setListCategories(user?.preferences?.categories?.map(item => {
                    return {
                        value: item.id,
                        label: item.name,
                    }
                }))
            } else {
                categoryAPI.get(null, true)
                    .then((response) => {
                        if (response?.data) {
                            const mapped = response.data.map(item => {
                                return {
                                    value: item.id?.toString(),
                                    label: item.name,
                                }
                            })
                            setListCategories(mapped)
                        }
                    })
                    .catch((e) => console.log(e.message))
            }
        }

        loadSources()
        loadCategories()
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            getNews()
        }, 500)

        return () => clearTimeout(timer)
    }, [filterKeyword, filterSources, filterCategories, filterDate])

    return (
        <>
            <Navbar />
            <div className="bg-white py-6 sm:py-6 md:py-8 lg:py-10">
                <div className="mx-auto max-w-screen-2xl px-2 md:px-4">
                    {/* text - start */}
                    <div className="mb-2 md:mb-0 px-2 md:px-4">
                        <h2 className="mb-1 md:mb-2 text-center text-2xl font-bold text-gray-800 lg:text-3xl">News</h2>
                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Read news online preferences for you.</p>
                    </div>
                    <div className="px-2 md:px-4">
                        <div className="flex justify-end">
                            <span
                                onClick={() => {
                                    setIsFilterShowed(!isFilterShowed)
                                }}
                                className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline cursor-pointer mr-1"
                            >
                                {isFilterShowed ? 'Hide Filter' : 'Show Filter'}
                            </span>
                        </div>
                    </div>
                    <CSSTransition in={isFilterShowed} timeout={300} classNames="slide-down" unmountOnExit>
                        <div className="grid grid-cols-1 gap-2 gap-x-8 mb-8 md:mb-10 md:grid-cols-2 xl:grid-cols-4 px-2 md:px-4">
                            <div>
                                <label
                                    htmlFor="filter-search"
                                    className="block text-sm text-gray-500 dark:text-gray-300"
                                >
                                    Filter by keywords
                                </label>
                                <input
                                    id="filter-search"
                                    type="text"
                                    placeholder="Type keyword here..."
                                    onChange={e => setFilterKeyword(e.target.value)}
                                    className="block  mt-2 w-full placeholder-gray-700/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:text-gray-300 dark:focus:border-blue-300"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="filter-category"
                                    className="block text-sm text-gray-500 dark:text-gray-300"
                                >
                                    Filter by category
                                </label>
                                <Select
                                    isMulti
                                    name="colors"
                                    options={listCategories}
                                    value={
                                        listCategories.filter(option => filterCategories.includes(option.value))
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select category here..."
                                    onChange={selected => setFilterCategories(selected.map(e => e.value))}
                                    classNames={{
                                        control: (base) => `block mt-2 w-full px-5 py-1`,
                                    }}
                                    menuPortalTarget={document.body}
                                    styles={{
                                        menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 20,
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="filter-source"
                                    className="block text-sm text-gray-500 dark:text-gray-300"
                                >
                                    Filter by source
                                </label>
                                <Select
                                    isMulti
                                    name="colors"
                                    value={
                                        listSources.filter(option => filterSources.includes(option.value))
                                    }
                                    options={listSources}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select source here..."
                                    onChange={selected => setFilterSources(selected.map(e => e.value))}
                                    classNames={{
                                        control: (base) => `block mt-2 w-full px-5 py-1`,
                                    }}
                                    menuPortalTarget={document.body}
                                    styles={{
                                        menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 20,
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="filter-date"
                                    className="block text-sm text-gray-500 dark:text-gray-300"
                                >
                                    Filter by date
                                </label>
                                <DateRangePicker
                                    placeholder="Pick a date here..."
                                    size="lg"
                                    className={"block mt-2 w-full"}
                                    format="yyyy-MM-dd"
                                    value={[filterDate.startDate, filterDate.endDate]}
                                    onChange={(date) => {
                                        setFilterDate({
                                            startDate: date[0],
                                            endDate: date[1],
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </CSSTransition>
                    {/* text - end */}
                    <div className="mt-2 md:mt-4">
                        <InfiniteScroll
                            dataLength={listNews.length}
                            next={loadNext}
                            hasMore={nextLoadLink && true}
                            loader={
                                <div className="flex items-center justify-center">
                                    <p className="text-md font-bold">Loading...</p>
                                </div>
                            }
                            endMessage={
                                <div className="flex items-center justify-center">
                                    <p className="text-md font-bold">No more data to load.</p>
                                </div>
                            }
                        >
                            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 px-2 md:px-4">
                                {
                                    listNews.map((news) => {
                                        return (
                                            <div key={news.id}>
                                                {/* article - start */}
                                                <div className="flex flex-col overflow-hidden rounded-lg border bg-white h-full">
                                                    <Link to={news.original_url} target="_blank" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                                        <img src={news.image || '/placeholder-news.webp'} loading="lazy" alt={news.title} className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                                                    </Link>
                                                    <div className="flex flex-1 flex-col p-4 sm:p-6">
                                                        <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                                            <Link to={news.original_url} target="_blank" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">{news.title}</Link>
                                                        </h2>
                                                        <p className="mb-8 text-gray-500">
                                                            {news.description
                                                                ? news.description +
                                                                (news.description.length > 150 ? "..." : "")
                                                                : ""}
                                                        </p>
                                                        <div className="mt-auto flex items-end justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <div>
                                                                    <span className="block font-semibold text-indigo-500">{news.author.name}</span>
                                                                    <span className="block text-sm text-gray-400">{format(new Date(news.published_at), "MMMM do, yyyy")}</span>
                                                                </div>
                                                            </div>
                                                            <span className="rounded border px-2 py-1 text-sm text-gray-500" style={{maxWidth: 120}}>{news.source.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* article - end */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
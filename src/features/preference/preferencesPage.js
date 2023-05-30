import Navbar from "@/components/common/Navbar";
import { selectCurentUser, updateUser } from "@/features/auth/authSlice";
import { authorAPI } from "@/features/author/authorAPI";
import { categoryAPI } from "@/features/category/categoryAPI";
import { setLoaderLoading } from "@/features/loader/loaderSlice";
import { preferenceAPI } from "@/features/preference/preferenceAPI";
import { sourceAPI } from "@/features/source/sourceAPI";
import { Button, Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PreferencePage = () => {
    const user = useSelector(selectCurentUser);

    const [listSources, setListSources] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listAuthors, setListAuthors] = useState([]);

    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const dispatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        const firstInit = () => {
            if (!user) {
                navigate('/login')
            } else {
                setSelectedSources(user.preferences.sources?.map(e => e.id.toString()))
                setSelectedCategories(user.preferences.categories?.map(e => e.id.toString()))
                setSelectedAuthors(user.preferences.authors?.map(e => e.id.toString()))
            }
        }

        const loadSources = () => {
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

        const loadCategories = () => {
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

        const loadAuthors = () => {
            authorAPI.get(null, true)
                .then((response) => {
                    if (response?.data) {
                        const mapped = response.data.map(item => {
                            return {
                                value: item.id?.toString(),
                                label: item.name,
                            }
                        })
                        setListAuthors(mapped)
                    }
                })
                .catch((e) => console.log(e.message))
        }

        firstInit()
        loadSources()
        loadCategories()
        loadAuthors()
    }, [])

    const handleCheckAll = (checked, setChecked, list) => {
        if (checked) {
            setChecked(list.map(i => i.value));
        } else {
            setChecked([]);
        }
    }

    const handleChecked = (e, checkedValues, setChecked) => {
        const { value, checked } = e.target;
        if (checked) {
            setChecked([...checkedValues, value])
        } else {
            setChecked(checkedValues.filter(val => val !== value))
        }
    }

    const doSavePreferences = () => {
        dispatch(setLoaderLoading(true))
        preferenceAPI.save({
            sources: selectedSources.join(','),
            categories: selectedCategories.join(','),
            authors: selectedAuthors.join(','),
        }, true)
            .then((response) => {
                if (response?.message) {
                    toast.success(response?.message)
                }
                if (response?.data?.preferences) {
                    dispatch(updateUser({user: response.data}));
                }
            })
            .catch((e) => console.log(e.message))
            .finally(() => {
                dispatch(setLoaderLoading(false))
            })
    }

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 md:py-12 lg:py-16 xl:py-20 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-screen-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <form 
                            action="#"
                            onSubmit={(e) => {
                                e.preventDefault()
                                doSavePreferences()
                            }}
                        >
                            <div className="p-6 space-y-4 md:space-y-5 sm:p-8">
                                <div className="border-b dark:border-gray-600 pb-5">
                                    <h1 className="mb-1 md:mb-2 text-center text-2xl font-bold text-gray-800 lg:text-3xl">
                                        Preferences
                                    </h1>
                                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Set up your preferences for your news.</p>
                                </div>
                                <div className="border-b dark:border-gray-600 pb-5">
                                    <h4 className="font-bold leading-tight tracking-tight text-gray-900 text-lg md:text-lg dark:text-white">
                                        Sources
                                    </h4>
                                    <div className="flex flex-col sm:flex-row sm:justify-between">
                                        <p className="text-gray-500 text-md mt-1">Select your preferences sources.</p>
                                        <p className="text-gray-500 text-md font-bold mt-1">{listSources.length || 0} sources availables.</p>
                                    </div>
                                    {listSources.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`source-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedSources, listSources)
                                                    }}
                                                    checked={selectedSources.length === listSources.length}
                                                />
                                                <Label htmlFor={`source-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listSources.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listSources.length ? listSources.map((item, index) => {
                                                return (
                                                    <div className="flex items-center gap-2" key={index}>
                                                        <Checkbox
                                                            id={`source-${index}`}
                                                            value={item.value}
                                                            onChange={(e) => {
                                                                handleChecked(e, selectedSources, setSelectedSources)
                                                            }}
                                                            checked={selectedSources.includes(item.value)}
                                                        />
                                                        <Label htmlFor={`source-${index}`}>
                                                            {item.label}
                                                        </Label>
                                                    </div>
                                                )
                                            }) : (
                                                <p className="text-gray-500 text-md text-center font-bold mt-1">No sources found.</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="border-b dark:border-gray-600 pb-5">
                                    <h4 className="font-bold leading-tight tracking-tight text-gray-900 text-lg md:text-lg dark:text-white">
                                        Categories
                                    </h4>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500 text-md mt-1">Select your preferences categories.</p>
                                        <p className="text-gray-500 text-md font-bold mt-1">{listCategories.length || 0} categories availables.</p>
                                    </div>
                                    {listCategories.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`category-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedCategories, listCategories)
                                                    }}
                                                    checked={selectedCategories.length === listCategories.length}
                                                />
                                                <Label htmlFor={`category-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listCategories.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listCategories.length ? listCategories.map((item, index) => {
                                                return (
                                                    <div className="flex items-center gap-2" key={index}>
                                                        <Checkbox
                                                            id={`category-${index}`}
                                                            value={item.value}
                                                            onChange={(e) => {
                                                                handleChecked(e, selectedCategories, setSelectedCategories)
                                                            }}
                                                            checked={selectedCategories.includes(item.value)}
                                                        />
                                                        <Label htmlFor={`category-${index}`}>
                                                            {item.label}
                                                        </Label>
                                                    </div>
                                                )
                                            }) : (
                                                <p className="text-gray-500 text-md text-center font-bold mt-1">No categories found.</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="border-b dark:border-gray-600 pb-5">
                                    <h4 className="font-bold leading-tight tracking-tight text-gray-900 text-lg md:text-lg dark:text-white">
                                        Authors
                                    </h4>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500 text-md mt-1">Select your preferences authors.</p>
                                        <p className="text-gray-500 text-md font-bold mt-1">{listAuthors.length || 0} authors availables.</p>
                                    </div>
                                    {listAuthors.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`author-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedAuthors, listAuthors)
                                                    }}
                                                    checked={selectedAuthors.length === listAuthors.length}
                                                />
                                                <Label htmlFor={`author-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listAuthors.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listAuthors.length ? listAuthors.map((item, index) => {
                                                return (
                                                    <div className="flex items-center gap-2" key={index}>
                                                        <Checkbox
                                                            id={`author-${index}`}
                                                            value={item.value}
                                                            onChange={(e) => {
                                                                handleChecked(e, selectedAuthors, setSelectedAuthors)
                                                            }}
                                                            checked={selectedAuthors.includes(item.value)}
                                                        />
                                                        <Label htmlFor={`author-${index}`}>
                                                            {item.label}
                                                        </Label>
                                                    </div>
                                                )
                                            }) : (
                                                <p className="text-gray-500 text-md text-center font-bold mt-1">No authors found.</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <Button 
                                        type="submit" 
                                        className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Submit
                                    </Button>
                                    <Link to="/" className="w-1/2">
                                        <button type="button" className="w-full py-2.5 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                            Back to homepage
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section >
        </>
    )
}

export default PreferencePage;
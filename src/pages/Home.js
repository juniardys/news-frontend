import Navbar from "@/components/common/Navbar";
import { useState } from "react";
import Select from "react-select";
import { CSSTransition } from "react-transition-group";
import { DateRangePicker } from "rsuite";

const HomePage = () => {
    const [isFilterShowed, setIsFilterShowed] = useState(true);

    const colourOptions = [
        { value: 'ocean', label: 'Ocean'},
        { value: 'blue', label: 'Blue'},
        { value: 'purple', label: 'Purple'},
        { value: 'red', label: 'Red'},
        { value: 'orange', label: 'Orange'},
        { value: 'yellow', label: 'Yellow'},
        { value: 'green', label: 'Green'},
        { value: 'forest', label: 'Forest'},
        { value: 'slate', label: 'Slate'},
        { value: 'silver', label: 'Silver'},
    ];

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
                                    options={colourOptions}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select category here..."
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
                                    options={colourOptions}
                                    className="react-select"
                                    classNamePrefix="select"
                                    placeholder="Select source here..."
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
                                    htmlFor="search"
                                    className="block text-sm text-gray-500 dark:text-gray-300"
                                >
                                    Filter by date
                                </label>
                                <DateRangePicker
                                    placeholder="Pick a date here..."
                                    size="lg"
                                    className={"block mt-2 w-full"}
                                />
                            </div>
                        </div>
                    </CSSTransition>
                    {/* text - end */}
                    <div className="grid gap-4 sm:grid-cols-2 mt-2 md:mt-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8 px-2 md:px-4">
                        {/* article - start */}
                        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                            <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                <img src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Minh Pham" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </a>
                            <div className="flex flex-1 flex-col p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">New trends in Tech</a>
                                </h2>
                                <p className="mb-8 text-gray-500">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>
                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="block font-semibold text-indigo-500">Mike Lane</span>
                                            <span className="block text-sm text-gray-400">July 19, 2021</span>
                                        </div>
                                    </div>
                                    <span className="rounded border px-2 py-1 text-sm text-gray-500">New York Times</span>
                                </div>
                            </div>
                        </div>
                        {/* article - end */}
                        {/* article - start */}
                        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                            <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Lorenzo Herrera" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </a>
                            <div className="flex flex-1 flex-col p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">Working with legacy stacks</a>
                                </h2>
                                <p className="mb-8 text-gray-500">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>
                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="block font-semibold text-indigo-500">Jane Jackobs</span>
                                            <span className="block text-sm text-gray-400">April 07, 2021</span>
                                        </div>
                                    </div>
                                    <span className="rounded border px-2 py-1 text-sm text-gray-500">New York Times</span>
                                </div>
                            </div>
                        </div>
                        {/* article - end */}
                        {/* article - start */}
                        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                            <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                <img src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Magicle" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </a>
                            <div className="flex flex-1 flex-col p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">10 best smartphones for devs</a>
                                </h2>
                                <p className="mb-8 text-gray-500">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>
                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="block font-semibold text-indigo-500">Tylor Grey</span>
                                            <span className="block text-sm text-gray-400">March 15, 2021</span>
                                        </div>
                                    </div>
                                    <span className="rounded border px-2 py-1 text-sm text-gray-500">New York Times</span>
                                </div>
                            </div>
                        </div>
                        {/* article - end */}
                        {/* article - start */}
                        <div className="flex flex-col overflow-hidden rounded-lg border bg-white">
                            <a href="#" className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64">
                                <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Martin Sanchez" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                            </a>
                            <div className="flex flex-1 flex-col p-4 sm:p-6">
                                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                    <a href="#" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">8 High performance Notebooks</a>
                                </h2>
                                <p className="mb-8 text-gray-500">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text.</p>
                                <div className="mt-auto flex items-end justify-between">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <span className="block font-semibold text-indigo-500">Ann Park</span>
                                            <span className="block text-sm text-gray-400">January 27, 2021</span>
                                        </div>
                                    </div>
                                    <span className="rounded border px-2 py-1 text-sm text-gray-500">New York Times</span>
                                </div>
                            </div>
                        </div>
                        {/* article - end */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;
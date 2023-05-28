import Navbar from "@/components/common/Navbar";
import { selectCurentUser } from "@/features/auth/authSlice";
import { Button, Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PreferencesPage = () => {
    const user = useSelector(selectCurentUser);

    const [listItems, setListItems] = useState([]);

    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const firstInit = () => {
            if (!user) {
                navigate('/login')
            }

            setListItems([
                { label: 'Afghanistan', value: 'AF' },
                { label: 'Åland Islands', value: 'AX' },
                { label: 'Albania', value: 'AL' },
                { label: 'Algeria', value: 'DZ' },
                { label: 'American Samoa', value: 'AS' },
                { label: 'AndorrA', value: 'AD' },
                { label: 'Angola', value: 'AO' },
                { label: 'Anguilla', value: 'AI' },
                { label: 'Antarctica', value: 'AQ' },
                { label: 'Antigua and Barbuda', value: 'AG' },
                { label: 'Argentina', value: 'AR' },
                { label: 'Armenia', value: 'AM' },
                { label: 'Aruba', value: 'AW' },
                { label: 'Australia', value: 'AU' },
                { label: 'Austria', value: 'AT' },
                { label: 'Azerbaijan', value: 'AZ' },
                { label: 'Bahamas', value: 'BS' },
                { label: 'Bahrain', value: 'BH' },
                { label: 'Bangladesh', value: 'BD' },
                { label: 'Barbados', value: 'BB' },
                { label: 'Belarus', value: 'BY' },
                { label: 'Belgium', value: 'BE' },
                { label: 'Belize', value: 'BZ' },
                { label: 'Benin', value: 'BJ' },
                { label: 'Bermuda', value: 'BM' },
                { label: 'Bhutan', value: 'BT' },
                { label: 'Bolivia', value: 'BO' },
                { label: 'Bosnia and Herzegovina', value: 'BA' },
                { label: 'Botswana', value: 'BW' },
                { label: 'Bouvet Island', value: 'BV' },
                { label: 'Brazil', value: 'BR' },
                { label: 'British Indian Ocean Territory', value: 'IO' },
                { label: 'Brunei Darussalam', value: 'BN' },
                { label: 'Bulgaria', value: 'BG' },
                { label: 'Burkina Faso', value: 'BF' },
                { label: 'Burundi', value: 'BI' },
                { label: 'Cambodia', value: 'KH' },
                { label: 'Cameroon', value: 'CM' },
                { label: 'Canada', value: 'CA' },
                { label: 'Cape Verde', value: 'CV' },
                { label: 'Cayman Islands', value: 'KY' },
                { label: 'Central African Republic', value: 'CF' },
                { label: 'Chad', value: 'TD' },
                { label: 'Chile', value: 'CL' },
                { label: 'China', value: 'CN' },
                { label: 'Christmas Island', value: 'CX' },
                { label: 'Cocos (Keeling) Islands', value: 'CC' },
                { label: 'Colombia', value: 'CO' },
                { label: 'Comoros', value: 'KM' },
                { label: 'Congo', value: 'CG' },
                { label: 'Congo, The Democratic Republic of the', value: 'CD' },
                { label: 'Cook Islands', value: 'CK' },
                { label: 'Costa Rica', value: 'CR' },
                { label: 'Cote D\'Ivoire', value: 'CI' },
                { label: 'Croatia', value: 'HR' },
                { label: 'Cuba', value: 'CU' },
                { label: 'Cyprus', value: 'CY' },
                { label: 'Czech Republic', value: 'CZ' },
                { label: 'Denmark', value: 'DK' },
                { label: 'Djibouti', value: 'DJ' },
                { label: 'Dominica', value: 'DM' },
                { label: 'Dominican Republic', value: 'DO' },
                { label: 'Ecuador', value: 'EC' },
                { label: 'Egypt', value: 'EG' },
                { label: 'El Salvador', value: 'SV' },
                { label: 'Equatorial Guinea', value: 'GQ' },
                { label: 'Eritrea', value: 'ER' },
                { label: 'Estonia', value: 'EE' },
                { label: 'Ethiopia', value: 'ET' },
                { label: 'Falkland Islands (Malvinas)', value: 'FK' },
                { label: 'Faroe Islands', value: 'FO' },
                { label: 'Fiji', value: 'FJ' },
                { label: 'Finland', value: 'FI' },
                { label: 'France', value: 'FR' },
                { label: 'French Guiana', value: 'GF' },
                { label: 'French Polynesia', value: 'PF' },
                { label: 'French Southern Territories', value: 'TF' },
                { label: 'Gabon', value: 'GA' },
                { label: 'Gambia', value: 'GM' },
                { label: 'Georgia', value: 'GE' },
                { label: 'Germany', value: 'DE' },
                { label: 'Ghana', value: 'GH' },
                { label: 'Gibraltar', value: 'GI' },
                { label: 'Greece', value: 'GR' },
                { label: 'Greenland', value: 'GL' },
                { label: 'Grenada', value: 'GD' },
                { label: 'Guadeloupe', value: 'GP' },
                { label: 'Guam', value: 'GU' },
                { label: 'Guatemala', value: 'GT' },
                { label: 'Guernsey', value: 'GG' },
                { label: 'Guinea', value: 'GN' },
                { label: 'Guinea-Bissau', value: 'GW' },
                { label: 'Guyana', value: 'GY' },
                { label: 'Haiti', value: 'HT' },
                { label: 'Heard Island and Mcdonald Islands', value: 'HM' },
                { label: 'Holy See (Vatican City State)', value: 'VA' },
                { label: 'Honduras', value: 'HN' },
                { label: 'Hong Kong', value: 'HK' },
                { label: 'Hungary', value: 'HU' },
                { label: 'Iceland', value: 'IS' },
                { label: 'India', value: 'IN' },
                { label: 'Indonesia', value: 'ID' },
            ])
        }

        firstInit()
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

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 md:py-12 lg:py-16 xl:py-20 mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 max-w-screen-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <form action="#">
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
                                        <p className="text-gray-500 text-md font-bold mt-1">34 sources available.</p>
                                    </div>
                                    {listItems.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`source-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedSources, listItems)
                                                    }}
                                                    checked={selectedSources.length === listItems.length}
                                                />
                                                <Label htmlFor={`source-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listItems.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listItems.length ? listItems.map((item, index) => {
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
                                        <p className="text-gray-500 text-md font-bold mt-1">34 categories available.</p>
                                    </div>
                                    {listItems.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`category-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedCategories, listItems)
                                                    }}
                                                    checked={selectedCategories.length === listItems.length}
                                                />
                                                <Label htmlFor={`category-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listItems.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listItems.length ? listItems.map((item, index) => {
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
                                        <p className="text-gray-500 text-md font-bold mt-1">34 authors available.</p>
                                    </div>
                                    {listItems.length > 0 && (
                                        <div className="mt-5">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`author-all`}
                                                    onChange={(e) => {
                                                        handleCheckAll(e.target.checked, setSelectedAuthors, listItems)
                                                    }}
                                                    checked={selectedAuthors.length === listItems.length}
                                                />
                                                <Label htmlFor={`author-all`}>
                                                    Select All
                                                </Label>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`mt-5 ${listItems.length
                                            ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-cols-max gap-2'
                                            : ''
                                            }`}
                                    >
                                        {
                                            listItems.length ? listItems.map((item, index) => {
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
                                    <Button type="submit" className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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

export default PreferencesPage;
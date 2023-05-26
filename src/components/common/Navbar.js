import { Avatar, Navbar as BaseNavbar, Button, Dropdown } from 'flowbite-react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedId, setLoggedIn] = useState(false);

    return (
        <nav className='relative border border-gray-200 z-10 bg-white'>
            <div className='mx-auto max-w-screen-2xl px-0 md:px-6 py-2'>
                <BaseNavbar
                    fluid={true}
                    rounded={true}
                    className="px-5"
                    placement="bottom"
                >
                    <BaseNavbar.Brand href="/">
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            News Magazine
                        </span>
                    </BaseNavbar.Brand>
                    <div className="flex md:order-2">
                        {isLoggedId ?
                            (
                                <Dropdown
                                    arrowIcon={false}
                                    inline={true}
                                    label={
                                        <>
                                            <span className="mx-3 text-md">Bonnie Green</span>
                                            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />
                                        </>
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            Bonnie Green
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            name@flowbite.com
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item>
                                        Preferences
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        Sign out
                                    </Dropdown.Item>
                                </Dropdown>
                            ) : (
                                <Link to="/login">
                                    <Button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                                        Login
                                    </Button>
                                </Link>
                            )
                        }

                    </div>
                </BaseNavbar>
            </div>
        </nav>
    )
}

export default Navbar;
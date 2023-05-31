import Navbar from "@/components/common/Navbar";
import { authAPI } from "@/features/auth/authAPI";
import { selectCurentUser, setCredentials } from "@/features/auth/authSlice";
import { setLoaderLoading } from "@/features/loader/loaderSlice";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
    const user = useSelector(selectCurentUser);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const doRegister = async () => {
        dispatch(setLoaderLoading(true))
        await authAPI.register(formData)
            .then((response) => {
                if (response?.data && response?.data?.token && response?.data?.user) {
                    const token = response?.data?.token;
                    const user = response?.data?.user;

                    dispatch(setCredentials({ user, token }))
                    navigate('/preferences')
                    toast.success('Successfully registered!')
                }
            })
            .catch((error) => {
                const response = error.response?.data;
                if (response?.message) {
                    toast.error(response?.message);
                }
            })
            .finally(() => {
                dispatch(setLoaderLoading(false))
            })
    }

    return (
        <>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 -mt-8">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up your account
                            </h1>
                            <form 
                                className="space-y-4 md:space-y-6" 
                                action="#"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    doRegister()
                                }}
                            >
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="name"
                                            value="Full Name"
                                        />
                                    </div>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="your name"
                                        onChange={onChange}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="email"
                                            value="Email"
                                        />
                                    </div>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="name@example.com"
                                        onChange={onChange}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password"
                                            value="Password"
                                        />
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        onChange={onChange}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="password_confirmation"
                                            value="Password Confirmation"
                                        />
                                    </div>
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        onChange={onChange}
                                        required={true}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign Up
                                </Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?&nbsp;
                                    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in instead</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;
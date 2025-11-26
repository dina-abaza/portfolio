"use client";
import { LuPhone, LuMail, LuMapPin, LuPin, LuFacebook, LuInstagram, LuTwitter, LuLinkedin } from "react-icons/lu";
import { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});


export default function Com_ContactUs() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        ideaDescription: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});

    // console.log("--------------------------------")
    // console.log(errors)

    const handleChange = (e) => {
        const { name, value } = e.target;

        //add value to formData
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // console.log(name  , value)
        // console.log("name"  , "value")

        // 🔍 check for empty fields
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: !value.trim()
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // 🔍 check for empty fields
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = true;
        if (!formData.email.trim()) newErrors.email = true;
        if (!formData.phone.trim()) newErrors.phone = true;
        if (!formData.ideaDescription.trim()) newErrors.ideaDescription = true;

        setErrors(newErrors);

        // ❌ لو فيه حقول فاضية.. هنعمل توقف
        if (Object.keys(newErrors).length > 0) {
            setLoading(false);
            // toast.error("Please fill all required fields.");
            return;
        }

        // لو كله تمام → كمل ارسال
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Message sent successfully!');
                setStatus('success');
                setFormData({ fullName: '', email: '', phone: '', ideaDescription: '' });
                setErrors({});
            } else {
                toast.error('Failed to send message.');
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while sending the message.');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };



    return (

        <section className="w-full overflow-x-hidden font-sans mb-10 -mt-6 flex justify-center">
            <div className="w-full max-w-[1440px] px-6 md:px-12 lg:px-24 mx-auto flex flex-col justify-center items-center mt-10">

                <Header
                    title="START YOUR PROJECT WITH US TODAY"
                    description="Whether you have a new idea or an existing project that needs development, our team is ready to help you build a successful digital experience."
                />

                {/* الفورم + معلومات التواصل */}
                <div className="flex flex-col sm:flex-row gap-9 md:gap-10 justify-center items-start w-full">

                    {/* النموذج */}
                    <form onSubmit={handleSubmit} className="space-y-6 w-full sm:w-[573px] font-bold text-black bg-[#fff] p-[32px] flex flex-col gap-[32px] rounded-[16px] h-[768px] sm:h-[798px]">

                        <h5 className={`text-[20px] font-bold ${inter.className}
                        `}>
                            Start Your Project
                        </h5>

                        <p className={`text-[14px] mt-[-40px] m-0 font-normal ${inter.className}`}>
                            Tell us about your project and let's create something extraordinary together.
                        </p>

                        <input
                            type="text"
                            name="fullName"
                            // required
                            placeholder="FULL NAME"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`placeholder:text-[#000] placeholder:text-[14px] sm:placeholder:text-[16px] w-full border-[2px] m-0 border-black rounded-[16px] px-[16px] py-[8px] text-black focus:outline-none  focus:ring-black-500 ${errors.fullName ? "border-red-500 placeholder:text-[#ff2525]" : "border-black"}`}
                        />
                        <input
                            type="email"
                            name="email"
                            // required
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`placeholder:text-[#000] placeholder:text-[14px] sm:placeholder:text-[16px] w-full border-[2px] m-0 border-black rounded-[16px] px-[16px] py-[8px] text-gray-700 focus:outline-none focus:ring-red-500 ${errors.email ? "border-red-500 placeholder:text-[#ff2525]" : "border-black"}`}
                        />
                        <input
                            type="tel"
                            name="phone"
                            // required
                            placeholder="PHONE"
                            value={formData.phone}
                            onChange={handleChange}
                            className=
                            {`placeholder:text-[#000] placeholder:text-[14px] sm:placeholder:text-[16px] w-full border-[2px] border-black rounded-[16px] px-[16px] py-[8px] text-gray-700 focus:outline-none m-0 focus:ring-red-500 ${errors.phone ? "border-red-500 placeholder:text-[#ff2525]" : "border-black"}`}
                        />
                        <p className="text-[#000] m-0 font-bold text-[16px]">A brief description of the idea</p>
                        <textarea
                            rows="5"
                            name="ideaDescription"
                            // required
                            placeholder="Add text"
                            value={formData.ideaDescription}
                            onChange={handleChange}
                            className={`placeholder:text-[#424242] placeholder:text-[14px] sm:placeholder:text-[16px] placeholder:font-normal border-[2px] border-black rounded-[16px] px-[16px] py-[8px] m-0 h-[849px] sm:h-[235px] text-gray-700 focus:outline-none focus:ring-red-500 ${errors.ideaDescription ? "border-red-500 placeholder:text-[#ff2525]" : "border-black"}`}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`relative bg-black text-white font-medium px-6 py-3 rounded-[16px] w-full transition-all duration-300
        ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}
    `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                </div>
                            ) : status === 'success' ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-green-500 text-lg">✔</span>
                                    <span>Sent!</span>
                                </div>
                            ) : status === 'error' ? (
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-red-500 text-lg">✖</span>
                                    <span>Failed</span>
                                </div>
                            ) : (
                                'SEND'
                            )}
                        </button>

                    </form>

                    {/* معلومات التواصل */}
                    <div className="w-full sm:w-[649px] h-auto sm:h-[798px] flex flex-col sm:gap-12 gap-5 text-[#FFFFFF] text-left">

                        {/* الإيميل */}
                        <div className="flex flex-col  px-[32px] rounded-[16px] bg-[#fff] items-start gap-2 h-[110px] sm:h-[155px] py-[30px] sm:py-[47px]">
                            <div className="flex flex-col gap-2 h-[70px]">
                                <div className="flex items-center text-[#000] gap-2">
                                    <LuMail
                                        size={30}
                                        className="stroke-black fill-white w-[24px] h-[24px]"
                                    />
                                    <span className="font-bold">Email address</span>
                                </div>
                                <p className="text-[#424242] p-0">aurorasoftwarehouse@gmail.com
                                </p>
                            </div>
                        </div>

                        {/* الهاتف */}
                        <div className="flex flex-col px-[32px] h-[110px] sm:h-[155px] py-[30px] sm:py-[47px] rounded-[16px] bg-[#fff] items-start gap-2">
                            <div className="flex items-center text-[#000] text-[16px] gap-2">
                                <LuPhone
                                    size={24}
                                    className="stroke-black fill-white w-[24px] h-[24px]"
                                />
                                <span className="font-bold">Phone number</span>
                            </div>
                            <p className="text-[#424242] text-[16px]">+20 101 087 1431</p>
                        </div>

                        {/* الموقع */}
                        <div className="flex flex-col px-[32px] h-[150px] sm:h-[190px] py-[30px] sm:py-[47px] rounded-[16px] bg-[#fff] items-start gap-2">
                            <div className="flex items-center text-[#000] gap-2">
                                <LuPin className="w-[24px] h-[24px]" />
                                <span className="font-bold">Location</span>
                            </div>
                            <p className="text-[#424242]">Cairo, Egypt</p>
                            <p className="text-[#424242] text-[14px]">
                                We work with our clients from all around the world.
                            </p>
                        </div>

                        {/* السوشيال ميديا */}
                        <div className="flex flex-col px-[32px] h-[110px] sm:h-[155px] py-[30px] sm:py-[47px] rounded-[16px] bg-[#fff] items-start gap-[16px]">
                            <span className="font-bold text-[#000]">Our social media</span>
                            <div className="flex items-center text-[#000] gap-[16px]">
                                <LuLinkedin className="w-[24px] h-[24px]" />
                                <LuFacebook className="w-[24px] h-[24px]" />
                                <LuInstagram className="w-[24px] h-[24px]" />
                                <LuTwitter className="w-[24px] h-[24px]" />
                            </div>
                        </div>
                    </div>
                </div>
            
            <div className="w-full m-3 block sm:hidden">

                <p className="font-bold text-[24px] text-start mt-[10px]">FAQ  <span className="ml-[8px] relative top-[-5px]"> ⌵
                </span>
                </p>
            </div>

                {/* قسم الأسئلة FAQ */}
                <div className="w-full lg:w-[1264px] bg-[#fff] p-[32px] flex flex-col gap-5 text-[#000] rounded-[16px] justify-center text-left mt-3 sm:mt-10">
                    <p className="font-bold text-[24px] mb-[10px] hidden sm:block">FAQ</p>
                    <p className="font-bold text-[18px]">
                        Do I need to have a complete idea?
                        <span className="text-[#424242] font-normal"> No, we help you from the very first stage.</span>
                    </p>
                    <p className="font-bold text-[18px]">
                        Do you provide support after delivery?
                        <span className="text-[#424242] font-normal"> Yes, we offer maintenance packages.</span>
                    </p>
                    <p className="font-bold text-[18px]">
                        Is it possible for you to start with a small project?
                        <span className="text-[#424242] font-normal"> Of course, we work with startups and individuals.</span>
                    </p>
                </div>

            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition={Slide} />
        </section>
    );
}

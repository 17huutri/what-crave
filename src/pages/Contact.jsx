import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [emailMessage, setEmailMessage] = useState('');
    const [emailTextColor, setEmailTextColor] = useState('');
    const form = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            setEmailMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [emailMessage]);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_3cxrbq7', 'template_mn7mbkf', form.current, 'yoy5vDlCrzY_vUBZb')
            .then((result) => {
                setEmailMessage('Email của bạn đã được gửi :)');
                setEmailTextColor('text-green-500');
            }, (error) => {
                setEmailMessage('Email của bạn gửi không thành công :(');
                setEmailTextColor('text-red-500');
            });
        e.target.reset();
    };

    return (
        <div>
            <div className='mt-40 text-center text-black px-4 mb-5'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-bold font-inter'>Hãy liên hệ với chúng tôi</h2>
            </div>
            <section className='section-sm lg:pt-[250px]'>
                <div className='container mx-auto'>
                    <div className='flex flex-col lg:flex-row lg:gap-x-[74px] bg-contact bg-no-repeat bg-cover min-h-[600px]' data-aos='zoom' data-aos-offset='400'>
                        <div className='flex-1 flex flex-col justify-center pl-8' data-aos='fade-down' data-aos-delay='600' data-aos-offset='500'>
                            <h2 className='text-4xl font-bold mb-3 lg:mb-7 font-beVn italic'>
                                Xin vui lòng liên hệ với chúng tôi để biết thêm thông tin và đăng ký tham gia trải nghiệm tại quán Thèm Gì Cơ </h2>
                            <p className='mb-7 lg:mb-0'>
                                Nếu bạn muốn thưởng thức những món tráng trộn độc đáo, hãy ghé thăm quán Thèm Gì Cơ nhé. Chắc chắn bạn sẽ có một trải nghiệm ẩm thực thú vị tại đây. Hãy liên hệ trước để đặt chỗ nếu cần.
                            </p>
                        </div>
                        <form onSubmit={sendEmail} ref={form} className='flex-1 bg-white shadow-lg rounded-2xl p-5 lg:p-10 flex flex-col gap-y-5 max-h-[600px] lg:-mt-20' data-aos='fade-up' data-aos-delay='600' data-aos-offset='500'>
                            <input className='border border-black p-5 rounded-lg' placeholder='Họ ' type='text' name='user_firstname' required />
                            <input className='border border-black p-5 rounded-lg' placeholder='Tên' type='text' name='user_lastname' required />
                            <input className='border border-black p-5 rounded-lg' placeholder='Địa chỉ Email' type='email' name='user_email' required />
                            <textarea className='border border-black p-5 rounded-lg h-[165px] resize-none' placeholder='......' name='user_message' />
                            <button className='bg-main_color_1 text-white font-bold rounded-lg py-3 px-6 hover:bg-orange-600 transition duration-300'>Gửi</button>
                            <p className={emailTextColor}>{emailMessage}</p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

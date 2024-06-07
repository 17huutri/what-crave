import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';


const BlogContent = [
    {
        id: 1,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_297.png',
        date: "Ngày 3 tháng 1 năm 2024",
        name: "Vẻ đẹp Tây Ninh",
        "author": "Hoàng Anh",
        status: true
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm",
        "author": "Hoàng Anh",
        status: true

    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm",
        "author": "Hoàng Anh",
        status: true
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm",
        "author": "Hoàng Anh",
        status: true
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm",
        "author": "Hoàng Anh",
        status: true
    }
]

const BlogPage = () => {
    return (
        <div className='mt-20 max-w-7xl mx-auto justify-items-center'>
            <div className='font-cabin italic text-center m-10'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic'>Blog & Bài viết</h2>
                <p>Chúng tôi coi tất cả các yếu tố thúc đẩy sự thay đổi đều cung cấp cho bạn</p>
                <p>những thành phần bạn cần thay đổi để tạo ra điều thực sự xảy ra.</p>
            </div>

            <div className='grid xl:grid-cols-4 gap-4 lg:grid-cols-3 grid-cols-2 mx-6 xl:mx-0'>
                <div className='xl:col-span-3 col-span-2 grid grid-cols-2 gap-4 m-w-7xl mb-20 xl:grid-cols-3'>
                    {BlogContent.map((item) => (
                        <Link key={item.id} to={`/blog/${item.id}`}>
                            <div className='h-[430px] bg-background_3 shadow-xl max-w-full' key={item.id}>
                                <div className='p-4'>
                                    <img className='w-full' src={item.img} alt="1" />
                                </div>
                                <div className='p-6 overflow-hidden'>
                                    <h1 className='font-bold text-lg'>{item.name}</h1>
                                    <h4 className='opacity-80'>{item.author}</h4>
                                    <h4 className='opacity-80'>{item.date}</h4>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                </div>
                <div className='pl-4'>
                    <h1 className='text-2xl font-bold pb-6'>Latest Blogs</h1>
                    {BlogContent.slice(0, 7).map((item) => (
                        <Link key={item.id} to={`/blog/${item.id}`}>
                            <h1 className='font-bold text-lg gap-1 border-spacing-y-8'>{item.name}</h1>
                            <div className='flex align-middle border-b-2 mb-4 pb-2 hover:text-red-500'>
                                <h1 >Đọc ngay</h1>
                                <div className='inline-block px-4 text-2xl '><FaArrowRight /></div>
                            </div>
                        </Link>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogPage;

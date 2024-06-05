import React from 'react'


const BlogContent = [
    {
        id: 1,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_297.png',
        date: "Ngày 3 tháng 1 năm 2024",
        name: "Vẻ đẹp Tây Ninh",
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm"
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm"
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm"
    },
    {
        id: 2,
        img: 'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
        date: "Ngày 3 tháng 3 năm 2024",
        name: "Vì sao Tây Ninh lại nổi tiếng với muối tôm"
    }
]

const BlogPage = () => {
    return (
        <div className='mt-20 max-w-7xl items-start mx-auto justify-items-center'>
            <div className='font-cabin italic text-center m-10'>
                <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic'>Blog & Bài viết</h2>
                <p>Chúng tôi coi tất cả các yếu tố thúc đẩy sự thay đổi đều cung cấp cho bạn</p>
                <p>những thành phần bạn cần thay đổi để tạo ra điều thực sự xảy ra.</p>
            </div>
            <div className='grid grid-cols-2 gap-4 m-w-7xl mb-20 md:grid-cols-3 lg:grid-cols-4'>
                {BlogContent.map((item) => (
                    <div className='h-[340px] w-[306px] bg-background_3 rounded-xl overflow-hidden shadow-md' key={item.id}>
                        <div>
                            <img className='h-[200px] w-[306] object-cover' src={item.img} alt="1" />
                            <div className='m-6'>
                                <h4 className='leading-10 opacity-80'>{item.date}</h4>
                                <h1 className='font-bold text-lg'>{item.name}</h1>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default BlogPage;

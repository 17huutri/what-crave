import React, { useState, useEffect } from 'react';

const AboutContent = [
    {
        id: 1,
        title: "TÔ TƯỢNG",
        note: "100% tiền thu từ hoạt động từ thiện sẽ được dùng cho mục đích từ thiện",
        detail: [
            "Tại Cafe Bamos, hoạt động tô tượng có giá từ 50k, bao gồm màu cọ sẵn để bạn thỏa sức sáng tạo. Ngoài ra, chúng tôi còn có các sản phẩm như lego, tranh đính đá, và nhiều loại đồ handmade khác, với mức giá hợp lý từ 30k. Đây không chỉ là cơ hội để bạn thể hiện tài năng nghệ thuật mà còn là dịp để tận hưởng thời gian vui vẻ cùng gia đình và bạn bè.",
            "Toàn bộ lợi nhuận từ hoạt động này sẽ được dành để mua quà, bánh và hỗ trợ trẻ em cơ nhỡ hoặc các hoàn cảnh khó khăn ở khu vực Thành Phố Hồ Chí Minh. Điều này mang lại niềm vui và hy vọng cho những trẻ em, nhờ sự chia sẻ và đóng góp từ tất cả mọi người.❤️"
        ],
        images: [
            'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_298.png',
            'https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_297.png'
        ],
        content_img: [
            {
                name: "Mức giá",
                detail: "Giá tượng từ 50K/ con"
            },
            {
                name: "Bamos cung cấp",
                detail: "Miễn phí Cọ, màu tô"
            },
            
        ]
    }
];

const AboutPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(current => (current + 1) % AboutContent[0].images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mx-auto mt-20 px-8 pb-8 bg-red-400">
            {AboutContent.map((item) => (
                <div key={item.id} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className='px-16 py-20 text-white'>
                        <h1 className="font-bold text-center mb-4 uppercase text-6xl pb-6 ">{item.title}</h1>
                        <p className="mb-4 font-bold text-xl">{item.note}</p>
                        <div className="">
                            {item.detail.map((detail, idx) => (
                                <div key={idx} className="mb-4">
                                    <p className='text-xl'>{detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="">
                            <img src={item.images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} className="w-full" />
                        </div>
                        <div className="bg-white text-center flex justify-center p-4">
                            {item.content_img.map((content, idx) => (
                                <div key={idx} className="p-6 block border-l-4 first:border-none">
                                    <h3 className="text-red-600 text-2xl font-bold pb-4">{content.name}</h3>
                                    <p className='text-text_color_base leading-6 text-xl'>{content.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutPage;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/landing_pages/logo3.png';
import image2 from '../assets/landing_pages/logo2.png';

const AboutContent = [
    {
        id: 1,
        title: "GIỚI THIỆU VỀ THÈM",
        note: [
            "Ẩm Thực Đa Dạng",
            "Nguyên Liệu Tươi Ngon, An Toàn",
            "Không Gian Thoải Mái, Thân Thiện",
            "Dịch Vụ Tận Tâm",
            "Cộng Đồng và Trách Nhiệm",
            "Lời Kết"
        ],
        detail: [
            "Chào mừng bạn đến với Thèm – thiên đường ẩm thực dành cho những tín đồ ăn vặt! Tại Thèm, chúng tôi luôn nỗ lực để mang đến cho bạn những trải nghiệm ẩm thực tuyệt vời nhất với sự kết hợp hoàn hảo giữa hương vị truyền thống và sự sáng tạo hiện đại.",
            "Thèm tự hào về thực đơn phong phú và đa dạng, bao gồm hàng loạt các món ăn vặt hấp dẫn từ khắp mọi miền đất nước. Từ những món ăn quen thuộc như bánh tráng trộn, gỏi cuốn, bánh xèo, đến những món ăn độc đáo và mới lạ như bánh mì nướng muối ớt, sữa chua nếp cẩm, trà sữa nhà làm, chúng tôi cam kết mang đến cho bạn những hương vị tinh túy và độc đáo nhất.",
            "Chúng tôi hiểu rằng chất lượng của nguyên liệu là yếu tố quan trọng nhất để tạo nên những món ăn ngon. Vì vậy, Thèm luôn lựa chọn những nguyên liệu tươi ngon, đảm bảo an toàn vệ sinh thực phẩm. Mỗi món ăn tại Thèm đều được chế biến cẩn thận, tỉ mỉ, từ khâu chuẩn bị nguyên liệu đến khâu trình bày, để đảm bảo bạn có thể thưởng thức một cách trọn vẹn nhất.",
            "Không gian tại Thèm được thiết kế để tạo cảm giác thoải mái và gần gũi, là nơi lý tưởng để bạn tụ họp cùng bạn bè, gia đình, hay đơn giản là thư giãn sau một ngày dài. Với phong cách trang trí trẻ trung, năng động nhưng không kém phần ấm cúng, chúng tôi mong muốn mang đến cho bạn những khoảnh khắc thật sự thư giãn và vui vẻ.",
            "Đội ngũ nhân viên tại Thèm luôn sẵn sàng phục vụ bạn với thái độ nhiệt tình, chuyên nghiệp và thân thiện. Chúng tôi luôn lắng nghe và sẵn sàng đáp ứng mọi yêu cầu của bạn để đảm bảo bạn có những trải nghiệm tuyệt vời nhất khi đến với Thèm. Sự hài lòng của bạn chính là động lực để chúng tôi không ngừng hoàn thiện và phát triển.",
            "Thèm không chỉ là một quán ăn vặt, mà còn là một phần của cộng đồng. Chúng tôi luôn ý thức về trách nhiệm xã hội và môi trường, từ việc sử dụng các sản phẩm thân thiện với môi trường, đến việc tham gia các hoạt động từ thiện và cộng đồng. Chúng tôi tin rằng, việc kinh doanh không chỉ là lợi nhuận, mà còn là sự đóng góp tích cực cho xã hội.",
            "Hãy đến với Thèm để khám phá một thế giới ẩm thực đa dạng và phong phú, nơi bạn có thể thỏa mãn mọi cơn thèm ăn và tận hưởng những giây phút thư giãn tuyệt vời bên người thân và bạn bè. Chúng tôi tin rằng, với sự tận tâm và chất lượng, Thèm sẽ trở thành điểm đến yêu thích của bạn mỗi khi muốn thưởng thức những món ăn vặt ngon miệng và hấp dẫn."
        ],
        images: [
            image1, image2
        ]
    }
];

const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(current => (current + 1) % AboutContent[0].images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto mt-20 px-8 pb-8 bg-[#FEEECC]">
            {AboutContent.map((item) => (
                <div key={item.id} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div key={item.id} className='px-16 py-20'>
                        <h1 className="font-bold font-beVn text-left mb-4 uppercase text-6xl pb-6 text-[#fe5801]">{item.title}</h1>
                        <div className="">
                            {item.detail.map((detail, idx) => (
                                <div key={idx} className="mb-4">
                                    <h2 className="font-bold text-xl md:text-2xl pb-2 text-[#ff8500]">{item.note[idx]}</h2>
                                    <p className='text-base md:text-lg font-beVn text-neutral-600'>
                                        {detail.split('Thèm').map((part, index) => (
                                            index !== 0 ? <><strong className='text-[#ff9201]'><em>Thèm</em></strong>{part}</> : part
                                        ))}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="justify-center items-center" key={`image-${item.id}`}>
                        <motion.img
                            src={item.images[currentImageIndex]}
                            alt={`Image ${currentImageIndex + 1}`}
                            className="pt-10 md:pt-0 max-w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default About;

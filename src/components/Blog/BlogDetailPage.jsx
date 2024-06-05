import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    let { id } = useParams();

    const BlogDetailData = {
        "id": 1,
        "title": "Bánh tráng có thật sự ngon ?",
        "content": "Liên quan đến việc Hà Nội và vùng phụ cận trong sáng 5-6 phải đón nhận hơn 7.000 cú sét đánh xuống đất, ông Nguyễn Đức Phương - Trưởng phòng rada thời tiết, Trung tâm Mạng lưới khí tượng thủy văn quốc gia (Tổng cục Khí tượng Thủy văn) cho biết hiện nay mạng lưới định vị sét của Việt Nam có 18 trạm định vị sét. Mạng lưới định vị sét này được kết nối với hệ thống định vị sét quốc tế.\n \nMạng lưới định vị sét của nước ta hiện nay được thiết kế để phát hiện, định vị, phân tích, hiển thị, lưu trữ và phân phối số liệu theo thời gian thực các sự kiện sét trong mây và xuống mặt đất(CG) và trong mây(IC).\nVới mạng lưới các đầu đo hiện tại thì khoảng cách mà các đầu đo có thể phát hiện được sét trong dải từ 400-600 km.\nNhư vậy ngoài khu vực đất liền của Việt Nam thì các trạm định vị sét có thể phát hiện cả sét trên biển và khu vực gần biên giới của các nước lân cận Việt Nam.",
        "createDate": "2024-05-29T00:00:00",
        "author": "Hoàng Anh",
        "image": "https://cdn.jsdelivr.net/gh/DangMinhNhat1509/image/image_307.png",
        "status": true
    };

    return (
        <div className='mt-20 max-w-7xl mx-auto'>
            <div className='font-cabin italic text-center m-10 text-xl '>
                <h2 className='text-5xl lg:text-7xl leading-snug font-thin mb-5 font-cabin italic'>{BlogDetailData.title}</h2>
                <div className='flex py-10'>
                    <p className='text-right px-5'>Tác giả: {BlogDetailData.author}</p>
                    <p>Lúc: {BlogDetailData.createDate}</p>
                </div>
                <img className='w-3/4 justify-self-center inline-block' src={BlogDetailData.image} alt={BlogDetailData.title} />
                <p className='py-10 text-justify leading-10'>{BlogDetailData.content.split('\n')}</p>
            </div>
        </div>
    )
}

export default BlogDetail;
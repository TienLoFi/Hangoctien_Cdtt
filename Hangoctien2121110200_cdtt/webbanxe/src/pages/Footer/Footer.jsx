import React from 'react';
import "./style.css"    
const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: '10px', padding: '20px 0', borderTop: '1px solid #e2e2e2', background: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <section className="clearfix footer__top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a href="/tin-tuc/tat-tan-tat-ve-chuong-trinh-uu-dai-app-qua-tang-vip-link-tai-va-cach-su-dung-1481677#gioithieu">Tích điểm Quà tặng VIP</a></li>
                        <li><a href="/lich-su-mua-hang">Lịch sử mua hàng</a></li>
                        <li><a href="/tra-gop">Tìm hiểu về mua trả góp</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a href="https://mwg.vn">Giới thiệu công ty</a></li>
                        <li><a href="https://vieclam.thegioididong.com">Tuyển dụng</a></li>
                        <li><a href="/lien-he">Gửi góp ý, khiếu nại</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a href="https://mwg.vn">Tìm siêu thị (3.301 shop)</a></li>
                        <li><a href="https://vieclam.thegioididong.com">Chính sách đổi trả</a></li>
                        <li><a href="/lien-he">In hóa đơn điện tử</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a href="https://mwg.vn">Tổng đài hỗ trợ (Miễn phí gọi)</a></li>
                        <li><a href="https://vieclam.thegioididong.com">Khiếu nại: 1800.1062 (8:00 - 21:30)</a></li>
                        <li><a href="/lien-he">Bảo hành: 1800.1064 (8:00 - 21:00)</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                {/* ... (add other columns) */}
            </section>
            <div className="copyright" style={{ marginTop: '20px' }}>
                <section>
                    <p>
                        © 2018. Công ty cổ phần Ptech. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 238/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 04/06/2020.
                        <br />
                        Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP.Hồ Chí Minh. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: cskh@thegioididong.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: Tot.huynhvan@thegioididong.com.
                        <a href="/thoa-thuan-su-dung-trang-mxh">Xem chính sách sử dụng</a>
                    </p>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
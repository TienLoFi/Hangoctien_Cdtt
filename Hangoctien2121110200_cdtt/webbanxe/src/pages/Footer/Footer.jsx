import React from 'react';
import "./style.css"    
const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: '10px', padding: '20px 0', borderTop: '1px solid #e2e2e2', background: '#fff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <section className="clearfix footer__top" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className="footer__col">
                    <ul className="f-listmenu">
                    <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="">Trung Tâm Trợ Giúp</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/lich-su-mua-hang">Shop SnowNghi Blog</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Hướng Dẫn Mua Hàng</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Hướng Dẫn Bán Hàng</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Thanh toán</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">SnowNghi Xu</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Vận chuyển</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Chăm sóc khách hàng</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                    <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Trả hàng và Hoàn tiền</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Chính sách bảo mật</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Chính hãng</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Ưu đãi</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/tra-gop">Kênh người bán</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://mwg.vn">Giới thiệu công ty</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://vieclam.thegioididong.com">Tuyển dụng</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/lien-he">Gửi góp ý, khiếu nại</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://mwg.vn">Tìm siêu thị (3.301 shop)</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://vieclam.thegioididong.com">Chính sách đổi trả</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/lien-he">In hóa đơn điện tử</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                <div className="footer__col">
                    <ul className="f-listmenu">
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://mwg.vn">Tổng đài hỗ trợ (Miễn phí gọi)</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="https://vieclam.thegioididong.com">Khiếu nại: 1800.1062 (8:00 - 21:30)</a></li>
                        <li><a style={{ fontSize: '1rem', fontStyle: 'italic',color:'#757575' }} href="/lien-he">Bảo hành: 1800.1064 (8:00 - 21:00)</a></li>
                        {/* ... (add other list items) */}
                    </ul>
                </div>
                {/* ... (add other columns) */}
            </section>
            <div className="copyright" style={{ marginTop: '10px' , textAlign:'center', alignItems:'center', display:'flex', justifyContent:'center'}}>
                <section>
                    <p >
                    Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam.<br/>
                     Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn<br/>
                    Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)<br/>
                            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                                            © 2015 - Bản quyền thuộc về Công ty TNHH Shopee     <br />
                        <a href="/thoa-thuan-su-dung-trang-mxh">Xem chính sách sử dụng</a>
                    </p>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
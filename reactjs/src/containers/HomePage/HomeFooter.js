import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './style1.css';
class HomeFooter extends Component {
  render() {
    return (
      // <div className="home-footer">
      //   <p>
      //     &copy; 2022 Trần Quốc Khải. More information, please visit my
      //     facebook.
      //     <a
      //       target="blank"
      //       href="https://www.facebook.com/KhaiTran.TQK"
      //     >
      //       &#8594;Click here &#8592;
      //     </a>
      //   </p>
      // </div>

      <section class="footer">

        <div class="box-container">

          <div class="box">
            <h3>quick links</h3>
            <a href="#"> <i class="fas fa-chevron-right"></i> Trang chủ </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Dịch vụ </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Về chúng tôi </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Bác sĩ </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Cẩm nang </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Đánh giá </a>

          </div>

          <div class="box">
            <h3>our services</h3>
            <a href="#"> <i class="fas fa-chevron-right"></i> Chăm sóc toàn diện </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Liệu pháp xoa bóp </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Tim mạch</a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Chuẩn đoán </a>
            <a href="#"> <i class="fas fa-chevron-right"></i> Dịch vụ xe cứu thương</a>
          </div>

          <div class="box">
            <h3>contact info</h3>
            <a href="#"> <i class="fas fa-phone"></i> 0968618841 </a>
            <a href="#"> <i class="fas fa-phone"></i> 0968618842 </a>
            <a href="#"> <i class="fas fa-envelope"></i> trankhai1478@gmail.com </a>
            <a href="#"> <i class="fas fa-envelope"></i> trankhai412001@gmail.com </a>

          </div>

          <div class="box">
            <h3>follow us</h3>
            <a href="#"> <i class="fab fa-facebook-f"></i> Facebook </a>
            <a href="#"> <i class="fab fa-twitter"></i> Twitter </a>
            <a href="#"> <i class="fab fa-twitter"></i> Gmail </a>
            <a href="#"> <i class="fab fa-instagram"></i> Instagram </a>


          </div>

        </div>



      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);

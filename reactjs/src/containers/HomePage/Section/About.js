import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về Medicare
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/qVQlc9fTbfk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Với 27 năm hình thành và phát triển, Bệnh viện Đại học Y Dược
              TPHCM là địa chỉ chăm sóc sức khỏe uy tín của hàng triệu người
              bệnh. Bệnh viện luôn nỗ lực phát huy những giá trị cốt lõi bền
              vững, đó là: TIÊN PHONG trong điều trị người bệnh, nghiên cứu khoa
              học, đào tạo và quản trị; THẤU HIỂU nỗi đau về thể xác lẫn tinh
              thần của người bệnh để đưa ra những giải pháp điều trị tối ưu; Giữ
              vững sự CHUẨN MỰC của người Thầy giáo – Thầy thuốc, luôn là tấm
              gương sáng để thế hệ tiếp nối noi theo; Quản lý chất lượng, đảm
              bảo AN TOÀN cho người bệnh và nhân viên y tế.
            </p>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);

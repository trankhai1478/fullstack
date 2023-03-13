import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./ForgotPassword.scss";

import { postUserForgotPassword } from "../../services/userService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const handleForgotPassword = async () => {
    // alert(email.trim().length);
    // alert(email.length);
    if (email.trim().length === 0) {
      toast.error("Bạn chưa nhập email!");
      return;
    }
    let res = await postUserForgotPassword({
      email: email.trim(),
    });
    if (res && res.errCode === 0) {
      toast.success("Đã gửi đường link xác nhận vào email!");
    } else {
      toast.error("Không tìm thấy email, vui lòng kiểm tra lại");
    }
  };
  return (
    <>
      <div className="login-background">
        <div className="forgot-password-container">
          <div className="login-content row">
            <div className="col-12 text-login">Quên mật khẩu</div>

            <div className="col-12 form-group login-input">

              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email để gửi đường dẫn xác nhận lấy lại mật khẩu"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  handleForgotPassword();
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;

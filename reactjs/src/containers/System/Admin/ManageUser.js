import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class ManageUser extends React.Component {

    render() {
        // let {
        //     email,
        //     password,
        //     firstName,
        //     lastName,
        //     phoneNumber,
        //     address,
        //     gender,
        //     position,
        //     role,
        //     avatar,
        // } = this.state;
        let { userInfo } = this.props;
        console.log("check user", userInfo);

        return (
            <div>
                <div>Quản lý thông tin cá nhân</div>
                <div className="col-3">
                    <label>
                        <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                        className="form-control"
                        type="email"

                        value={userInfo.email}
                        onChange={(event) => {
                            this.onChangeInput(event, "email");
                        }}
                        disabled
                    />
                </div>
                <div className="col-3">
                    <label>
                        <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                        className="form-control"
                        type="password"
                        value={'**********'}
                        onChange={(event) => {
                            this.onChangeInput(event, "password");
                        }}
                    //   disabled={
                    //     this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    //   }
                    />
                </div>
                <div className="col-3">
                    <label>
                        <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={userInfo.firstName}
                        onChange={(event) => {
                            this.onChangeInput(event, "firstName");
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>
                        <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={userInfo.lastName}
                        onChange={(event) => {
                            this.onChangeInput(event, "lastName");
                        }}
                    />
                </div>
                <div className="col-3">
                    <label>
                        <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={userInfo.phonenumber}
                        onChange={(event) => {
                            this.onChangeInput(event, "phoneNumber");
                        }}
                    />
                </div>
                <div className="col-9">
                    <label>
                        <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        value={userInfo.address}
                        onChange={(event) => {
                            this.onChangeInput(event, "address");
                        }}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);

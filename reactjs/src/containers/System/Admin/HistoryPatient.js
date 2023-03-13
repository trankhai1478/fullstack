
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getHistoryPatient } from "../../../services/userService";
import _ from "lodash";
import axios from "axios";
class HistoryPatient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ArrHistory: [],


        }
    }

    async componentDidMount() {
        let { userInfo } = this.props;
        let res = await getHistoryPatient({
            patientId: userInfo.id,
        });
        if (res && res.errCode === 0) {

            //  let ArrHistory = res.data;
            // console.log("check data", ArrHistory)
            this.setState({
                ArrHistory: res.data
            })
        }


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {

        let ArrHistory = this.state.ArrHistory;
        console.log("check arr", ArrHistory)
        return (
            <div>
                <div>Lịch sử khám bệnh</div>
                <table id="customers">
                    <tbody>
                        <tr> <th>STT</th>
                            <th>Ngày khám</th>
                            <th>Tên Bác sĩ điều trị</th>
                            <th>Toa thuốc - Hướng dẫn</th>
                            <th>Nơi khám bệnh</th>
                            <th>Khoa khám bệnh</th>
                        </tr>
                        {ArrHistory && ArrHistory.length > 0 &&
                            ArrHistory.map((item, index) => {

                                return (
                                    <tr key={`table-his-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{`${item.User.firstName} ${item.User.lastName}`}</td>
                                        <td>{item.description}</td>
                                        <td>{item.User.Doctor_Infor.nameClinic}</td>
                                        <td>{item.User.Doctor_Infor.specialtyData.name}</td>



                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPatient);

import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import LoadingOverlay from "react-loading-overlay";
import { css } from "@emotion/react";
import BounceLoader from "react-spinners/BounceLoader";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    let { userInfo } = this.props;
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,





    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
    console.log("check log", event.target.value);
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedOption) => {
    this.setState({ selectedGender: selectedOption });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
            .unix(+dataTime.date / 1000)
            .locale("en")
            .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  handleDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return "";
  };
  handleConfirmBooking = async () => {
    this.setState({ isShowLoading: true });

    //validate input
    // !data.email || !data.doctorId || !data.timeType || !data.date
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.handleDoctorName(this.props.dataTime);
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      this.setState({ isShowLoading: false });
      toast.success("Booking a new appointment succeed!");
      this.props.closeBookingClose();
    } else {
      this.setState({ isShowLoading: true });
      toast.error("Booking a new appointment error!");
    }
  };
  render() {
    let { isOpenModal, closeBookingClose, dataTime, userInfo, isLoggedIn } = this.props;

    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";
    //this.state.email= userInfo.email;
    console.log(this.state);
    // console.log("check userinfo", userInfo);


    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner={<BounceLoader color={"#86e7d4"} size={60} />}
      >
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="lg"
          centered
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingClose}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-infor">
                <ProfileDoctor
                  doctorId={doctorId}
                  isShowDescriptionDoctor={false}
                  dataTime={dataTime}
                  isShowLinkDetail={false}
                  isShowPrice={true}
                />
              </div>
              {isLoggedIn === true &&
                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.fullName" />
                    </label>
                    <input
                      className="form-control"
                      //value={this.state.fullName}
                      // value={`${userInfo.firstName} ${userInfo.lastName}`}
                      value={this.state.fullName = userInfo.lastName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")

                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.phoneNumber" />
                    </label>
                    <input
                      className="form-control"
                      // value={userInfo.phonenumber}
                      value={this.state.phoneNumber = userInfo.phonenumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      className="form-control"

                      value={this.state.email = userInfo.email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email1")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      className="form-control"
                      //value={userInfo.address}
                      value={this.state.address = userInfo.address}

                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      onChange={this.handleOnChangeDatePicker}
                      className="form-control"
                      value={this.state.birthday}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                </div>
              }
              {isLoggedIn === false &&
                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.fullName" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.fullName}

                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.phoneNumber" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                  <div className="col-12 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      onChange={this.handleOnChangeDatePicker}
                      className="form-control"
                      value={this.state.birthday}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                </div>
              }
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              </button>
              <button
                className="btn-booking-cancel"
                onClick={closeBookingClose}
              >
                <FormattedMessage id="patient.booking-modal.btnCancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language, genders: state.admin.genders,
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

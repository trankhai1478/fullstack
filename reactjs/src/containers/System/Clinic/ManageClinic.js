import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageClinic from "../Clinic/TableManageClinic";
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      ClinicEditId: '',
      previewImgURL: '',
      isOpen: false,
    };
  }

  async componentDidMount() { }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64
      })
    }
  }
  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true
    })
  }
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Clinic succeeds!");
      this.setState({
        name: "",
        imageBase64: "",
        address: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs!");
    }
  };
  handleEditClinicFromParent = (clinic) => {
    let imageBase64 = '';
    if (clinic.image) {
      imageBase64 = new Buffer(clinic.image, 'base64').toString('binary');
    }
    this.setState({

      name: clinic.name,
      address: clinic.address,
      imageBase64: '',
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
      previewImgURL: clinic.image,
      action: CRUD_ACTIONS.EDIT,
      ClinicEditId: clinic.id

    })
    console.log('clinic', clinic)
  }
  handleSaveEditClinic = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit clinic
      this.props.fetchEditClinicRedux({
        id: this.state.ClinicEditId,
        name: this.state.name,
        address: this.state.address,
        imageBase64: this.state.previewImgURL,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,

      })
    }
  }
  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            {/* <input className='form-control-file' type='file'/> */}
            <div className='preview-img-container'>
              <input id='previewImg' type='file' hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
              <div className='preview-image'
                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                onClick={() => this.openPreviewImage()}
              >
              </div>
            </div>
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              Save
            </button>
            <button className='btn-save-clinic2' onClick={() => this.handleSaveEditClinic()}>Lưu thay đổi</button>
          </div>
          {this.state.isOpen === true &&
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          }
        </div>
        <TableManageClinic
          handleEditClinicFromParentKey={this.handleEditClinicFromParent}
          action={this.state.action}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinic()),
    fetchEditClinicRedux: (data) => dispatch(actions.editClinic(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);

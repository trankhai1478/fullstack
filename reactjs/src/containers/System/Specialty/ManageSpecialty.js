import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageSpecialty from "../Specialty/TableManageSpecialty";
import Lightbox from "react-image-lightbox";
import * as actions from "../../../store/actions";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      SpecialtyEditId: '',
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

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);

    if (res && res.errCode === 0) {
      toast.success("Add new specialty succeeds!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs!");
    }
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }
    this.setState({

      name: user.name,
      imageBase64: '',
      descriptionHTML: user.descriptionHTML,
      descriptionMarkdown: user.descriptionMarkdown,
      previewImgURL: user.image,
      action: CRUD_ACTIONS.EDIT,
      SpecialtyEditId: user.id

    })
    console.log('user', user)
  }
  handleSaveEditSpecialty = () => {
    let { action } = this.state;
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.fetchEditSpecialyRedux({
        id: this.state.SpecialtyEditId,
        name: this.state.name,
        imageBase64: this.state.previewImgURL,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,

      })
    }
  }
  render() {
    // let data = this.state;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh chuyên khoa</label>
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
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
            </button>
            <button className='btn-save-specialty' onClick={() => this.handleSaveEditSpecialty()}>Lưu thay đổi</button>
          </div>
          {this.state.isOpen === true &&
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          }
          <div>
            <TableManageSpecialty
              handleEditUserFromParentKey={this.handleEditUserFromParent}
              action={this.state.action}
            />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSpecialyRedux: () => dispatch(actions.fetchAllSpecialty()),
    fetchEditSpecialyRedux: (data) => dispatch(actions.editSpecialty(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);

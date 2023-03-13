import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getAllSpecialty,
  getAllClinic,
  deleteClinicService,
  editClinicService,
  editSpecialtyService,
  deleteSpecialtyService,
} from "../../services/userService";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed!");
        dispatch(createUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createUserFailed());
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log("createUserFailed error", e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users error!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed error", e);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user error!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user error!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("Update the user error!");
      dispatch(editUserFailed());
      console.log("EditUserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("10");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("Save Infor Detail Doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor Detail Doctor error!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save Infor Detail Doctor error!");
      console.log("SAVE_DETAIL_DOCTOR_FAILED", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log("fetchRequiredDoctorInforFailed error", e);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  allRequiredData: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
export const fetchAllClinic = () => {

  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic("ALL");

      if (res && res.errCode === 0) {

        dispatch(fetchAllSClinicSuccess(res.data))

      } else {
        toast.error("Fetch all the clinic error ! ");
        dispatch(fetchAllClinicFailed());
      }
    } catch (e) {
      toast.error("Fetch all the clinic error ! ");
      dispatch(fetchAllClinicFailed());
      console.log('fetch All Clinic Failed: ', e)

    }
  }
}
export const fetchAllSClinicSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
  clinic: data
})
export const fetchAllClinicFailed = () => ({
  type: actionTypes.FETCH_ALL_CLINIC_FAILED,
})
//xoa phong kham
export const deleteClinic = (ClinicId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(ClinicId);

      if (res && res.errCode === 0) {
        toast.success("Delete succeed ! ");
        dispatch(deleteClinicSucess());
        dispatch(fetchAllClinic());

      } else {
        toast.error("Delete  error ! ");
        dispatch(deleteClinicFailed());
      }
    } catch (e) {
      toast.error("Delete  error ! ");
      dispatch(deleteClinicFailed());

    }
  }
}

export const deleteClinicSucess = () => ({
  type: actionTypes.DELETE_CLINIC_SUCCESS
})
export const deleteClinicFailed = () => ({
  type: actionTypes.DELETE_CLINIC_FAILED
})
//sua phong kham 
export const editClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinicService(data);

      if (res && res.errCode === 0) {
        toast.success("Update the user succeed ! ");
        dispatch(editClinicSucess());
        dispatch(fetchAllClinic());

      } else {
        toast.error("Update the user error ! ");
        dispatch(editClinicFailed());
      }
    } catch (e) {
      toast.error("Update the user error ! ");
      dispatch(editClinicFailed());
      console.log(e);

    }
  }
}
export const editClinicSucess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS
})
export const editClinicFailed = () => ({
  type: actionTypes.EDIT_CLINIC_FAILED
})
//chuyen khoa
export const fetchAllSpecialty = () => {

  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty("ALL");

      if (res && res.errCode === 0) {

        dispatch(fetchAllSpecialtySuccess(res.data))

      } else {
        toast.error("Fetch all the user error ! ");
        dispatch(fetchAllSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Fetch all the user error ! ");
      dispatch(fetchAllSpecialtyFailed());
      console.log('fetchAllUserFailed: ', e)

    }
  }
}
export const fetchAllSpecialtySuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
  specialy: data
})
export const fetchAllSpecialtyFailed = () => ({
  type: actionTypes.FETCH_ALL_SPECIALTY_FAILED,
})
//xoa chuyenn khoa
export const deleteSpecialty = (SpecialtyId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpecialtyService(SpecialtyId);

      if (res && res.errCode === 0) {
        toast.success("Delete succeed ! ");
        dispatch(deleteSpecialtySucess());
        dispatch(fetchAllSpecialty());

      } else {
        toast.error("Delete  error ! ");
        dispatch(deleteSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Delete  error ! ");
      dispatch(deleteSpecialtyFailed());

    }
  }
}

export const deleteSpecialtySucess = () => ({
  type: actionTypes.DELETE_SPECIALTY_SUCCESS
})
export const deleteSpecialtyFailed = () => ({
  type: actionTypes.DELETE_SPECIALTY_FAILED
})
//////////////////////////////////////////
export const editSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);

      if (res && res.errCode === 0) {
        toast.success("Update the user succeed ! ");
        dispatch(editSpecialtySucess());
        dispatch(fetchAllSpecialty());

      } else {
        toast.error("Update the user error ! ");
        dispatch(editSpecialtyFailed());
      }
    } catch (e) {
      toast.error("Update the user error ! ");
      dispatch(editSpecialtyFailed());
      console.log(e);

    }
  }
}
export const editSpecialtySucess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS
})
export const editSpecialtyFailed = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAILED
})

// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const SidebarConfigPatient = [
  {
    title: "Thông tin cá nhân",
    //path: "/user-dashboard/manage-user",
    path: "/admin-dashboard/doctor/manage-user",
    icon: getIcon("healthicons:i-schedule-school-date-time"),
  },
  {
    title: "Lịch sử khám bệnh",
    path: "/admin-dashboard/doctor/history-patient",
    icon: getIcon("medical-icon:i-inpatient"),
  },
];

export default SidebarConfigPatient;

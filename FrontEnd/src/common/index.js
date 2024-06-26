const backendDomain = 'http://localhost:8080'

const SummaryApi = {
  signUP : {
    url : `${backendDomain}/api/signup`,
    method: "post"
  },
  LogIn : {
    url : `${backendDomain}/api/login`,
    method: "post"
  },
  current_user : {
    url : `${backendDomain}/api/user-details`,
    method: "get"
  },
  logout_user : {
    url : `${backendDomain}/api/userLogout`,
    method: "get"
  },
  all_user : {
    url : `${backendDomain}/api/alluser`,
    method: "get"
  },
  update_user : {
    url : `${backendDomain}/api/update-user`,
    method: "post"
  },
}

export default SummaryApi


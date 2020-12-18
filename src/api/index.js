import request from "@/utils/request";
var siteName = "http://106.14.165.150:8083";

// 查询数据
export function getList() {
  return request.post(`/city/getList`);
};

//登录
export function login(params) {
  return request({
    url: siteName + "/customer/login",
    method: "post",
    data: params,
  });
}
// 注册
export function addCustomer(params) {
  // console.log("注册成功");
  console.log(params);
  // debugger;
  return request({
    url: siteName + "/customer/addCustomer",
    method: "post",
    data: params,
  });
}

//修改密码
export function updatePwd(params) {
  var _params = {
    ...params,
    userId: JSON.parse(sessionStorage.getItem("id")),
    userAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
  };
  console.log(_params);
  // debugger;
  return request({
    url: siteName + "/customer/updatePwdById",
    method: "get",
    params: _params,
  });
}
//退出
export function loginOut(params) {
  return request({
    url: siteName + "/customer/loginOut",
    method: "get",
    params: params,
  });
}

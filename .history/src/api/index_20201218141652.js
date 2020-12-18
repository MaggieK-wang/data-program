import request from "@/utils/request";
var siteName = "http://106.14.165.150:8083";
// var siteName = "http://3d160t5497.goho.co/";

// 查询数据
export function getList() {
  return request.post(`/city/getList`);
};


//获取详情
export function getCate(params) {
  return request({
    url: siteName + "/cate/listCateTree",
    method: "get",
    params,
  });
}
export function getGoods(params) {
  var _params = {
    ...params,
    skuStatus: "0",
  };
  return request({
    url: siteName + "/goods/listGoods",
    method: "post",
    data: _params,
  });
}
export function getBanner(params) {
  return request({
    url: siteName + "/picture/listPic",
    method: "post",
    data: params,
  });
}
//获取购物车列表
export function getCart(params) {
  //console.log("购物车列表请求参数");
  var _params = {
    ...params,
    userId: JSON.parse(sessionStorage.getItem("id")),
  };
  console.log(_params);
  return request({
    url: siteName + "/shoppingcar/findGoodsFromCar",
    method: "get",
    params: _params,
  });
}

//购物车添加
export function addCart(data) {
  var _data = {
    ...data,
    loginAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
  };
  console.log("添加成功");
  // alert("添加成功");
  // console.log(_data);
  return request({
    url: siteName + "/shoppingcar/addShoppingCar",
    method: "post",
    data: _data,
  });
}
//购物车删除
export function deleteCart(params) {
  console.log(params);
  return request({
    url: siteName + "/shoppingcar/deleteGoodsFromCar",
    method: "post",
    data: params,
  });
}
export function getOrder(params) {
  console.log(params);

  return request({
    url: siteName + "/order/appListOrders",
    method: "post",
    data: params,
  });
}
export function addOrder(params) {
  console.log(params);

  return request({
    url: siteName + "/order/addOrder",
    method: "post",
    data: params,
  });
}
//获取商品详情
export function getGoodbySkuCode(params) {
  console.log("商品详情请求参数");
  console.log(params);
  //debugger
  return request({
    url: siteName + "/goods/findGoodsBySkuCode",
    method: "get",
    params,
  });
}
//登录
export function login(params) {
  console.log("登录成功");
  console.log(params);

  // debugger;
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
// 订单列表
export function getOrderList(params) {
  var _data = {
    ...params,
    loginAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
  };
  console.log("订单列表请求参数");
  console.log(_data); //debugger
  return request({
    url: siteName + "/order/appFindOrderDetails",
    method: "get",
    params: _data,
  });
}
export function createOrder(data) {
  //传入的不是一个json是一个list
  var _data = data.A_orderVos.reduce((acc, cur) => {
    acc.push({
      businessCode: cur.businessCode,
      loginAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
      shopNum: cur.shopNum,
      skuCode: cur.skuCode,
    });
    return acc;
  }, []);
  console.log("创建订单返回参数");
  console.log(_data);
  //debugger
  return request({
    url: siteName + "/order/addOrder",
    method: "post",
    data: _data,
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
  // var _params = {
  // 	...params,
  // 	userAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
  // };

  return request({
    url: siteName + "/customer/loginOut",
    method: "get",
    params: params,
  });
}
//获取用户详情
export function getCustomer(params) {
  var _params = {
    id: JSON.parse(sessionStorage.getItem("id")),
  }; // console.log(_params); // debugger
  return request({
    url: siteName + "/customer/findCustomerById",
    method: "get",
    params: _params,
  });
}
//修改密码
// export function updatePwd(params) {
// 	var _params = {
// 		...params,
// 		userId: JSON.parse(sessionStorage.getItem("id")),
// 		userAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
// 	}; // console.log(_params); // debugger
// 	return request({
// 		url: siteName + "/customer/updatePwdById",
// 		method: "get",
// 		params: _params,
// 	});
// }

//修改积分
export function updateScore(params) {
  var _params = {
    ...params,
    userId: JSON.parse(sessionStorage.getItem("id")),
    userAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
  }; // console.log(_params); // debugger
  return request({
    url: siteName + "/customer/updateScore",
    method: "get",
    params: _params,
  });
}
//删除账号
export function deleteCustomer(params) {
  var _params = {
    id: JSON.parse(sessionStorage.getItem("id")),
  }; // console.log(_params); // debugger
  return request({
    url: siteName + "/customer/deleteCustomerById",
    method: "get",
    params: _params,
  });
}
//用户修改
export function updateCustomer(data) {
  var _data = {
    ...data,
    userAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
    loginAccount: JSON.parse(sessionStorage.getItem("loginAccount")),
    id: JSON.parse(sessionStorage.getItem("id")),
    frontScore: JSON.parse(sessionStorage.getItem("score")),
    userSex: JSON.parse(sessionStorage.getItem("userSex")),
  };
  console.log("修改成功");
  console.log(_data);
  debugger;
  return request({
    url: siteName + "/customer/findCustomerById",
    method: "post",
    data: _data,
  });
}

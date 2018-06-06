//import {ChinaAddressData} from 'vux'
import ChinaAddressData1 from '@/../static/china_address.json'
import Validate from '@/assets/js/validate.js'
const common = {

  // 格式化日期
 //  date: function (date, fmt) {
	// if (!date || !fmt) {
	//   return date;
	// }
	// if (date.length == 8) {
	//   date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
	// }
	// //date = new Date(date.toString().replace(/-/g, "/"));
	// var o = {
	//   "M+": date.getMonth() + 1, //月份
	//   "d+": date.getDate(), //日
	//   "h+": date.getHours(), //小时
	//   "m+": date.getMinutes(), //分
	//   "s+": date.getSeconds(), //秒
	//   "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	//   "S": date.getMilliseconds() //毫秒
	// };
	// if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	// for (var k in o)
	//   if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	// return fmt;
 //  },
  // 根据身份证获取出生年月
  getBirthdayByIdCard(idCard) {
	if (!Validate.isIdCard(idCard)) {
	  return;
	}
	let tmpStr;
	if (idCard.length == 15) {
	  tmpStr = idCard.substring(6, 12);
	  tmpStr = "19" + tmpStr;
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	} else {
	  tmpStr = idCard.substring(6, 14);
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	}
  },

  // 根据身份证获取性别
  getSexByIdCard(idCard) {
	if (!Validate.isIdCard(idCard)) {
	  return;
	}
    var sex = 0;
    if(idCard.length==15){
        sex = parseInt(idCard.substr(14, 1)) % 2
    } else {
        sex = parseInt(idCard.substr(16, 1)) % 2
    }
    
	return sex
  },
  getAddress(arr,str){
      var a,b,c;
      for(let item of ChinaAddressData1){
        if(item.value == arr[0]){
          a = item.name
        }
        if(item.value == arr[1]){
          b = item.name
        }
        if(item.value == arr[2]){
          c = item.name
        }
      }
      var name = a+b+c+str
      return name
  },
 //  convert(id,value){//转换

	// if(id == "HDL000003"|| id == "HDL000004"){
	// 	return (value / 10000);
	// };
	// return value;
	// },


    //根据出生日期算出年龄，入参：1990-01-01
    jsGetAge: function(strBirthday) {
        if (!strBirthday) {
            return null;
        }
        let returnAge;
        let strBirthdayArr = strBirthday.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0; //同年 则为0岁
        } else {
            let ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff <= 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    let monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge; //返回周岁年龄
    },

    // 获取 时间长度
    getYear: function(d) {
        if (!d) {
            return null;
        }
        let returnYear;
        let strBirthdayArr = d.split("-");
        let birthYear = strBirthdayArr[0];
        let birthMonth = strBirthdayArr[1];
        let birthDay = strBirthdayArr[2];

        let nd = new Date();
        let nowYear = nd.getFullYear();
        let nowMonth = nd.getMonth() + 1;
        let nowDay = nd.getDate();

        if (nowYear == birthYear) {
            returnYear = 0; //同年 则为0岁
        } else {
            let ageDiff = birthYear - nowYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    let dayDiff = birthDay - nowDay; //日之差
                    if (dayDiff > 0) {
                        returnYear = ageDiff;
                    } else {
                        returnYear = ageDiff - 1;
                    }
                } else {
                    let monthDiff = birthMonth - nowMonth; //月之差
                    if (monthDiff > 0) {
                        returnYear = ageDiff;
                    } else {
                        returnYear = ageDiff - 1;
                    }
                }
            } else {
                returnYear = ageDiff;
            }
        }
        return returnYear;

    },
    //获取num年前的今天的日期
    getBirth(num) {
        const today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        //return Date.parse((year - num) + "-" + month + "-" + day);
        return (year - num) + "-" + month + "-" + day;
    },
    // 获取y年前d天前的日期
    handleDate: function(y, d) {
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        if (typeof d != "undefined") {
            let newDate1 = new Date(newDate - d * 24 * 3600 * 1000);
            year = newDate1.getFullYear();
            month = newDate1.getMonth() + 1;
            day = newDate1.getDate();
        }
        if (y != "undefined") {
            year = year - y;
        }
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        return year + "-" + month + "-" + day;
    },
    // 获取y年后d天后的日期
    laterDate: function(y, d) {
      let newDate = new Date();
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let day = newDate.getDate();
      if (typeof d != "undefined") {
        newDate.setDate(newDate.getDate()+d);//获取AddDayCount天后的日期
        year = newDate.getFullYear();
        month = newDate.getMonth()+1;
        day = newDate.getDate();
      }
      if (y != "undefined") {
        year = year + y;
      }
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      return year + "-" + month + "-" + day;
    },
    expiryDate: function(a,c){   //判断身份证证件有效期
      //a代表年龄c代表证件有效期
        let isRight;
        let returnYear;
        let expiryArr = c.split("-");
        let expiryYear = expiryArr[0];
        let expiryMonth = expiryArr[1];
        let expiryDay = expiryArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == expiryYear) {
            returnYear = 0; //同年 则为0岁
        } else {
            let ageDiff = expiryYear - nowYear  ; //年之差
            if (ageDiff > 0) {
                if (nowMonth == expiryMonth) {
                    let dayDiff = expiryDay - nowDay; //日之差
                    if (dayDiff > 0) {
                        returnYear = ageDiff + 1;
                    } else {
                        returnYear = ageDiff;
                    }
                } else {
                    let monthDiff = expiryMonth - nowMonth; //月之差
                    if (monthDiff > 0) {
                        returnYear = ageDiff + 1;
                    } else {
                        returnYear = ageDiff;
                    }
                }
            } else {
                returnYear = -1; //返回-1 有效期小于当前时间
            }
        }
        if(returnYear== -1){
            isRight = false  //有效期小于当前时间
        }else if(a<16 && returnYear>5){
            isRight = false;
        }else if(a>=16 && a<=25 && returnYear>10){
            isRight = false;
        }else if(a>25 && a<=45 && returnYear>20){
            isRight = false;
        }else if(a>45 && returnYear>20 && c!='9999-12-31'){
            isRight = false;
        }else {
            isRight = true;
        }
        return isRight;
    },
    isBeforeToday(c){
        let returnYear;
        let expiryArr = c.split("-");
        let expiryYear = expiryArr[0];
        let expiryMonth = expiryArr[1];
        let expiryDay = expiryArr[2];

        let d = new Date();
        let nowYear = d.getFullYear();
        let nowMonth = d.getMonth() + 1;
        let nowDay = d.getDate();

        if (nowYear == expiryYear) {
            returnYear = 0; //同年 则为0岁
        } else {
            let ageDiff = expiryYear - nowYear  ; //年之差
            if (ageDiff > 0) {
                if (nowMonth == expiryMonth) {
                    let dayDiff = expiryDay - nowDay; //日之差
                    if (dayDiff >= 0) {
                        returnYear = ageDiff + 1;
                    } else {
                        returnYear = ageDiff;
                    }
                } else {
                    let monthDiff = expiryMonth - nowMonth; //月之差
                    if (monthDiff > 0) {
                        returnYear = ageDiff + 1;
                    } else {
                        returnYear = ageDiff;
                    }
                }
            } else {
                returnYear = -1; //返回-1 有效期小于当前时间
            }
        }
        if(returnYear == -1){
            return true;
        }else{
            return false;
        }
    },
  cloneObj : function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
      return;
    } else if(window.JSON){
      str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
      for(var i in obj){
        newobj[i] = typeof obj[i] === 'object' ?
          cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
    toDecimal2: function(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return '';
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        return s;
    },

    returnFloat: function(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
            value = value.toString() + ".00";
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString() + "0";
            }
            return value;
        }
    },


    isEmptyObject: function(obj) {
        for (let key in obj) {
            return false
        }
        return true
    },

    multiply: function(a, b) {
        var o1 = this.toInteger(a)
        var o2 = this.toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var result = (n1 * n2) / (t1 * t2);
        return result.toFixed(2);
    },

    toInteger: function(floatNum) {
        var ret = { times: 1, num: 0 }
        var isNegative = floatNum < 0
        if (Math.floor(floatNum) === floatNum) {
            ret.num = floatNum
            return ret
        }
        var strfi = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len = strfi.substr(dotPos + 1).length
        var times = Math.pow(10, len)
        var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
        ret.times = times
        if (isNegative) {
            intNum = -intNum
        }
        ret.num = intNum
        return ret
    },

    // 解决乘法精度问题
    mul: function(a, b) {
        var c = 0,
            d = a.toString(),
            e = b.toString();
        try {
            c += d.split(".")[1].length;
        } catch (f) {}
        try {
            c += e.split(".")[1].length;
        } catch (f) {}
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
    },

    // 解决除法精度问题
    division: function(arg1 = 0, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try { t1 = arg1.toString().split(".")[1].length } catch (e) {}
        try { t2 = arg2.toString().split(".")[1].length } catch (e) {}
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return this.mul(r1 / r2, Math.pow(10, t2 - t1));
    },

   decimal(val,matrixing){
  	var Rate  = 100;
  	if(matrixing){Rate=matrixing;};
	if(isNaN(val)){
	  return (0).toFixed(2);
	};
	if(!isNaN(Rate)){
		return (parseFloat(val)/Rate).toFixed(2);
	};
	return (parseFloat(val)).toFixed(2);
  }

 //  DisableScroll(status,node){
 //  	let Node = (node&&document.querySelector(node))||'';

	// if(status){
	//   Events.on((Node||document), 'touchmove', stopTouchmove);
	// }else{
	//   Events.off((Node||document), 'touchmove', stopTouchmove);
	// };
	// function stopTouchmove(e){
	// 	e.preventDefault();
	// }
 //  }
};

export default common

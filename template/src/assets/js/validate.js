const MOBILE_REG = /^[1][3,4,5,6,7,8,9][0-9]{9}$/, // 手机号码
    // EMAIL_REG = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/,
    EMAIL_REG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, // email
    MONEY_REG = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
    NAME_REG = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/,
    CHINESE_REG = /^[\u4e00-\u9fa5]+$/,
    CHINESE_NAME_REG = /^[\u4e00-\u9fa5]([\·]{0,1}[\u4e00-\u9fa5])*$/,
    ENGLISH_NAME_REG = /^([A-Za-z]+[\s]{0,1}[A-Za-z]+)+$/,
    BANKNO_REG = /^\d{16,19}$/,
    PWD_REG = /(\d(?!\d{5})|[A-Za-z](?![A-Za-z]{5})){6}/,
    INTEGER_REG = /^[0-9]\d*$/,
    ADDRESS_REG = /[\u4e00-\u9fa5]/g,
    ZIPCODE_REG = /^[0-9][0-9]{5}$/;

function isRule(regText, value) {
    if (!value || value.length == 0)
        return true

    const reg = new RegExp(regText)
    //console.log(reg.test(value));
    //console.log(value);
    if (!reg.test(value)) {
        return false
    }
    return true
}

function isChineseName(name) {
    return isRule(CHINESE_NAME_REG, name)
}

function isEnglishName(name) {
    return isRule(ENGLISH_NAME_REG, name)
}

const validate = {

    isFromWeixin: () => {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    isIos() {
        let userAgent = navigator.userAgent;
        let IsiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return IsiOS;
    },
    isMobile: (mobile) => {
        var isMobile = /^1[3|4|5|6|7|8|9][0-9](?!(\d)\1{7})\d{8}/.test(mobile)
        return isRule(MOBILE_REG, mobile) && isMobile
    },

    isEmail: (email) => {
        return isRule(EMAIL_REG, email)
    },
    isZipCode: (code) => {
        return isRule(ZIPCODE_REG, code)
    },
    isMoney: (money) => {
        return isRule(MONEY_REG, money)
    },

    isUsername: (name) => {
        return isRule(NAME_REG, name)
    },
    isChinese: (name) => {
        return isRule(CHINESE_REG, name)
    },
    isBankNo: (name) => {
        return isRule(BANKNO_REG, name)
    },

    isNotEmpty: (data) => {
        return data && (data.length > 0)
    },

    isPwd: (pwd) => {
        return isRule(PWD_REG, pwd)
    },
    isSame: (data1, data2) => {
        return data1 === data2
    },
    isIdCard: (card) => {
        //if (!card) return true;
        var num = card.toUpperCase();
        //校验身份证号码前两位是否在下面列举的数字范围内：11-15 京津冀晋蒙， 21-23辽吉黑， 31-37沪苏浙皖闽赣鲁， 41-46 豫鄂湘粤桂琼 ， 50-54渝川贵云藏， 61-65陕甘青宁新， 81-82港澳。只校验前两位，如不在上述数字范围内，则校验失败，提示：证件号码有误
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        var two_num = num.substr(0, 2);
        if (!((two_num >= 11 && two_num <= 15) || (two_num >= 21 && two_num <= 23) || (two_num >= 31 && two_num <= 37) || (two_num >= 41 && two_num <= 46) || (two_num >= 50 && two_num <= 54) || (two_num >= 61 && two_num <= 65) || (two_num >= 81 && two_num <= 82))) {
            return false;
        }
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            return false;
        }
        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, re;
        var birthday, sex, genderCode;
        len = num.length;
        if (len == 15) {

            //获取出生日期
            birthday = '19' + card.substring(6, 8) + "-" + card.substring(8, 10) + "-" + card.substring(10, 12);
            //获取性别
            sex = parseInt(card.substr(14, 1)) % 2 == 1 ? 'M' : 'F';
            genderCode = parseInt(card.substr(14, 1)) % 2 == 1 ? '1' : '2';

            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //将15位身份证转成18位
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;

                num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                num += arrCh[nTemp % 11];
            }
        } else if (len == 18) {

            //获取出生日期
            birthday = card.substring(6, 10) + "-" + card.substring(10, 12) + "-" + card.substring(12, 14);
            //获取性别
            sex = parseInt(card.substr(16, 1)) % 2 == 1 ? 'M' : 'F';
            genderCode = parseInt(card.substr(16, 1)) % 2 == 1 ? '1' : '2';

            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var arrSplit = num.match(re);

            //检查生日日期是否正确
            var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            var bGoodDay;
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0,
                    i;
                for (i = 0; i < 17; i++) {
                    nTemp += num.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != num.substr(17, 1)) {
                    return false;
                }
            }
        }
        return {
            birthday: birthday,
            sex: sex,
            genderCode: genderCode
        }
    },
    isInteger: (value) => {
        return isRule(INTEGER_REG, value);
    },
    // num 的整数倍
    isIntegerBy(value,num){
        var re = /^[0-9]*[0-9]$/i;       //校验是否为数字
        if(re.test(value) && value%num===0) {
          return true;
        }else {
          return false;
        }
    },

    isNotName: (value) => {
        let re = /  /g;
        if (!value || value == '') {
            return '姓名不能为空'
        } else if (re.test(value)) {
            return '姓名填写有误'
        } else {
            // let newValue = value.replace(/ /g, '');
            let len = value.replace(/[\u4e00-\u9fa5]/g, "aaa").length;
            if (isChineseName(value) && len < 6) {
                return '姓名少于两个汉字'
            } else if (isEnglishName(value) && len < 3) {
                return '姓名小于3个字符'
            } else if (isChineseName(value) && len > 60) {
                return '姓名长度不能超过20汉字'
            } else if (isEnglishName(value) && len > 40) {
                return '姓名长度不能超40字符'
            } else if (!isChineseName(value) && !isEnglishName(value)) {
                return '姓名填写有误'
            }
        }
        return false;
    },

    isAddress: (type, value, str) => {
        if (type == '1') return;
        if (!value) { return '现住址不能为空' }
        if (value.match(ADDRESS_REG) == null && str.length > 11) return '';
        if (value.match(ADDRESS_REG) == null && str.length <= 11) {
            return '现住址低于12个汉字';
        } else if (value.match(ADDRESS_REG).length + str.length <= 11) {
            return '现住址低于12个汉字';
        }
        return false;
    },
    isMailAddress: (type, value, str) => {
        if (type == '2') {
            if (!value || value == '') {
                return '通讯地址不能为空';
            } else if (value.match(ADDRESS_REG) == null && str.length <= 11) {
                return '通讯地址低于12个汉字';
            } else if (value.match(ADDRESS_REG) == null && str.length > 11) {
                return '';
            } else if (value.match(ADDRESS_REG).length + str.length <= 11) {
                return '通讯地址低于12个汉字';
            }
        }
        return '';
    },
    ZipCode(num1, num2) {
        // num1 为省地区前两位 num2为省邮编前两位
        let province = num1.slice(0, 2);
        let zipcode = num2.slice(0, 2);
        console.log('province,zipcode', province, zipcode)
        let obj = {
            "11": ["10"],
            "12": ["30"],
            "13": ["05", "06", "07"],
            "14": ["03", "04"],
            "15": ["01", "02", "13", "16"],
            "21": ["11", "12"],
            "22": ["13"],
            "23": ["15", "16"],
            "31": ["20"],
            "32": ["21", "22"],
            "33": ["31", "32"],
            "34": ["23", "24"],
            "35": ["35", "36"],
            "36": ["33", "34"],
            "37": ["25", "26", "27"],
            "41": ["45", "46", "47"],
            "42": ["43", "44"],
            "43": ["41", "42"],
            "44": ["51", "52"],
            "45": ["53", "54"],
            "46": ["57"],
            "50": ["40"],
            "51": ["61", "62", "63", "64"],
            "52": ["55", "56"],
            "53": ["65", "66", "67"],
            "54": ["85"],
            "61": ["71", "72"],
            "62": ["73", "74"],
            "63": ["81"],
            "64": ["75"],
            "65": ["83", "84"],
            "99": ["99"]
        }
        for (let i of Object.keys(obj)) {
            if (i == province) {
                let result = obj[i].find((item) => item == zipcode);
                if (!result) { return false } else { return true };
            }
        }
    }




}

export default validate

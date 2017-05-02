/**
 * Created by lifubang on 2015/5/14.
 */
if (!Object.extend) {
    Object.extend = function (destination, source, ignore) {
        //console.log('Object.extend');
        for (var property in source) {
            //console.log(property);
            var blExt = !(ignore && ignore[property]==true);

            if (blExt == true)
                destination[property] = source[property];
        }
        return destination;
    };

    Object.copy = function (destination, source, modelMapper, ignore) {
        modelMapper = modelMapper ? modelMapper : source;
        //console.log('Object.extend');
        for (var property in modelMapper) {
            //console.log(property);
            var blExt = !(ignore && ignore[property]==true);

            if (blExt == true)
                destination[property] = source[property];
        }
        return destination;
    };

    Object.extend(Object, {
        inspect: function (object) {
            try {
                if (Object.isUndefined(object)) return 'undefined';
                if (object === null) return 'null';
                return object.inspect ? object.inspect() : String(object);
            } catch (e) {
                if (e instanceof RangeError) return '...';
                throw e;
            }
        },

        toJSON: function (object) {
            var type = typeof object;
            switch (type) {
                case 'undefined':
                case 'function':
                case 'unknown':
                    return;
                case 'boolean':
                    return object.toString();
                case 'number':
                    return object;
                case 'string':
                    return '\'' + object.FormatJSON() + '\'';
            }

            if (object === null) return 'null';
            if (object.toJSON) return object.toJSON();
            if (Object.isElement(object)) return;

            var results = [];
            if (Object.isObject(object)) {
                for (var property in object) {
                    if (!Object.isFunction(property)) {
                        var value = Object.toJSON(object[property]);
                        if (!Object.isUndefined(value))
                            results.push(property + ': ' + value);
                    }
                }
                //debugger
                return '{' + results.join(', ') + '}';
            }
        },

        toQueryString: function (object) {
            return $H(object).toQueryString();
        },

        toHTML: function (object) {
            return object && object.toHTML ? object.toHTML() : String.interpret(object);
        },

        keys: function (object) {
            var keys = [];
            for (var property in object)
                keys.push(property);
            return keys;
        },

        values: function (object) {
            var values = [];
            for (var property in object)
                values.push(object[property]);
            return values;
        },

        clone: function (object) {
            if (Object.isArray(object)) {
                var newArray = new Array();
                for (var i = 0; i < object.length; i++) {
                    newArray[i] = Object.clone(object[i]);
                }
                return newArray;
            } else {
                return Object.extend({}, object);
            }
        },

        isElement: function (object) {
            return !!(object && object.nodeType == 1);
        },

        isArray: function (object) {
            return object != null && typeof object == "object" &&
                'splice' in object && 'join' in object;
        },

        isHash: function (object) {
            return object instanceof Hash;
        },

        isObject: function (object) {
            return (object != null && (typeof object == "object"));
        },

        isFunction: function (object) {
            return typeof object == "function";
        },

        isString: function (object) {
            return typeof object == "string";
        },

        isBoolean: function (object) {
            return typeof object == "boolean";
        },

        isNumber: function (object) {
            return typeof object == "number";
        },

        isUndefined: function (object) {
            return typeof object == "undefined";
        },

        isNull: function (object) {

            return ((typeof object == "undefined")
            || (object == null)
            );
        },

        isNullString: function (obj) {
            var ret = Object.isNull(obj);
            if (!ret) {
                ret = (obj.toString().length == 0);
            }
            return ret;
        }
    });

    Object.extend(Array, {
        remove: function (arr, idx) {
            var ret = null;
            if (idx < arr.length) {
                ret = arr[idx];
                if (idx < arr.length - 1) {
                    for (var i = idx; i < arr.length - 1; i++) {
                        arr[i] = arr[i + 1];
                    }
                }

                arr[arr.length - 1] = null;
                arr.length = arr.length - 1;
            }
            return ret;
        }
    });
    var Try = {
        these: function () {
            var returnValue;

            for (var i = 0, length = arguments.length; i < length; i++) {
                var lambda = arguments[i];
                try {
                    returnValue = lambda();
                    break;
                } catch (e) {
                    document.write(e);
                }
            }

            return returnValue;
        }
    };
    var Class = (function() {

        var IS_DONTENUM_BUGGY = (function(){
            for (var p in { toString: 1 }) {
                if (p === 'toString') return false;
            }
            return true;
        })();

        function subclass() {};
        function create() {
            var parent = null, properties = $A(arguments);
            if (Object.isFunction(properties[0]))
                parent = properties.shift();

            function klass() {
                this.initialize.apply(this, arguments);
            }

            Object.extend(klass, Class.Methods);
            klass.superclass = parent;
            klass.subclasses = [];

            if (parent) {
                subclass.prototype = parent.prototype;
                klass.prototype = new subclass;
                parent.subclasses.push(klass);
            }

            for (var i = 0, length = properties.length; i < length; i++)
                klass.addMethods(properties[i]);

            if (!klass.prototype.initialize)
                klass.prototype.initialize = Prototype.emptyFunction;

            klass.prototype.constructor = klass;
            return klass;
        }

        function addMethods(source) {
            var ancestor   = this.superclass && this.superclass.prototype,
                properties = Object.keys(source);

            if (IS_DONTENUM_BUGGY) {
                if (source.toString != Object.prototype.toString)
                    properties.push("toString");
                if (source.valueOf != Object.prototype.valueOf)
                    properties.push("valueOf");
            }

            for (var i = 0, length = properties.length; i < length; i++) {
                var property = properties[i], value = source[property];
                if (ancestor && Object.isFunction(value) &&
                    value.argumentNames()[0] == "$super") {
                    var method = value;
                    value = (function(m) {
                        return function() { return ancestor[m].apply(this, arguments); };
                    })(property).wrap(method);

                    value.valueOf = (function(method) {
                        return function() { return method.valueOf.call(method); };
                    })(method);

                    value.toString = (function(method) {
                        return function() { return method.toString.call(method); };
                    })(method);
                }
                this.prototype[property] = value;
            }

            return this;
        }

        return {
            create: create,
            Methods: {
                addMethods: addMethods
            }
        };
    })();
}
var Lib = new Object();

if (!Object.getOwnPropertyNames) {
    Object.extend(Object, {
        getOwnPropertyNames: function (obj) {
            var ret = [];
            for (var property in obj) {
                ret.push(property);
            }
            return ret;
        }
    });
}
if (!String.prototype.startWith) {
    String.prototype.startWith = function(searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = 0;
        }

        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
if (!Array.prototype.sliceBlank) {
    Array.prototype.sliceBlank = function() {
        var arr = this, i, len;
        for (i = arr.length - 1;  i >0; i--) {
            if (Object.isNullString(arr[i])) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }
}
if (!Array.RandomSequence) {
    Array.RandomSequence = function (total)
    {

        var sequence = [];
        var output = [];

        for (var i = 0; i < total; i++)
        {
            sequence[i] = i;
        }

        var end = total - 1;

        for (var i = 0; i < total; i++)
        {
            var num = parseInt(Math.random() * (end + 1));
            output[i] = sequence[num];
            sequence[num] = sequence[end];
            end--;
        }

        return output;
    }
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (position === undefined || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}
if (!String.prototype.contain) {
    String.prototype.contain = function(searchString, split) {
        var subjectString = this.toString();
        if (split === undefined) {
            split = ',';
        }

        return ('{0}{1}{0}'.Format(split, subjectString).indexOf('{0}{1}{0}'.Format(split, searchString)) > -1);
    };
}
if (!String.prototype.endsReplace) {
    String.prototype.endsReplace = function(searchString) {
        var subjectString = this.toString();
        while (subjectString.endsWith(searchString))
            subjectString = subjectString.substring(0, subjectString.length - searchString.length - 1);
        return subjectString;
    };
}
if (!String.prototype.VarcharLen) {
    String.prototype.VarcharLen = function () {
        var i, sum;
        sum = 0;
        for (i = 0; i < this.length; i++) {
            var iCode = this.charCodeAt(i);
            if (iCode == 10)
                sum += 2;
            else if (iCode == 13)
                ;
            else if ((iCode >= 0) && (iCode <= 255))
                sum = sum + 1;
            else
                sum = sum + 2;
        }
        return sum;
    }
}
if (!String.prototype.NVarcharLen) {
    String.prototype.NVarcharLen = function () {
        var i, sum;
        sum = 0;
        for (i = 0; i < this.length; i++) {
            var iCode = this.charCodeAt(i);
            if (iCode == 10)
                sum += 2;
            else if (iCode == 13)
                ;
            else if ((iCode >= 0) && (iCode <= 255))
                sum = sum + 1;
            else
                sum = sum + 1;
        }
        return sum;
    }
}
if (!String.prototype.NVarcharLenObj) {
    String.prototype.NVarcharLenObj = function () {
        var i, sum, p, w;
        sum = 0;
        p = 0;
        w = 0;
        for (i = 0; i < this.length; i++) {
            var iCode = this.charCodeAt(i);
            if (iCode == 10)
                p += 2;
            else if (iCode == 13)
                ;
            else if ((iCode >= 0) && (iCode <= 255))
                w = w + 1;
            else
                w = w + 1;
        }
        return {
            p: p
            , w: w
        };
    }
}
if (!String.isNull) {
    String.isNull = function (ori, v) {
        if (ori == undefined || ori == null || ori == '')
            return v;
        else
            return ori;
    }
}
if (!String.isNullString) {
    String.isNullString = function (ori) {
        if (ori == undefined || ori == null || ori == '')
            return true;
        else
            return false;
    }
}
if (!String.prototype.RandomURL) {
    String.prototype.RandomURL = function () {
        var strRet = this.toString();
        if (strRet.indexOf('?') > -1)
            strRet += '&';
        else
            strRet += '?';
        strRet += ('.r=' + Math.random().toString());
        return strRet;
    }
}
if (!String.prototype.subBefore) {
    String.prototype.subBefore = function (before) {
        var strRet = this.toString();
        var idx = strRet.indexOf(before);
        if (idx > -1)
            return strRet.substring(0, idx);
        else
            return strRet;
    }
}
//格式化字符串
if (!String.prototype.Format) {
    String.prototype.Format = function () {
        var strRet = this.toString();
        for (var i = 0; i < arguments.length; i++) {
            while (strRet.indexOf('{' + i + '}') > -1) {
                strRet = strRet.replace('{' + i + '}', arguments[i]);
            }
        }
        return strRet;
    }
}
//删除字符串
if (!String.prototype.Replace) {
    String.prototype.Replace = function (strrep, strtar) {
        var strRet = this.toString();
        strrep = strrep.toLowerCase();
        var strL = strRet.toLowerCase();
        var irepLen = strrep.length;
        var itarlen = strtar.length;

        if (strRet.length > 0) {
            var iPos = strL.indexOf(strrep);
            while (iPos > -1) {
                var strLeft = strRet.substring(0, iPos);
                var strRight = strRet.substring(iPos + irepLen);
                strRet = strLeft + strtar + strRight;
                strL = strRet.toLowerCase();
                iPos = strL.indexOf(strrep, iPos + itarlen);
            }
        }
        return strRet;
    }
}
//删除字符串
if (!String.prototype.RemoveSomeChar) {
    String.prototype.RemoveSomeChar = function (ac) {
        var strRet = this;
        while (strRet.indexOf(ac) > -1) {
            strRet = strRet.replace(ac, '');
        }
        return strRet;
    }
}
//去掉空白区域
if (!String.prototype.RemoveWhiteSpace) {
    String.prototype.RemoveWhiteSpace = function () {
        var strRet = this;
        strRet = strRet.RemoveSomeChar('\r');
        strRet = strRet.RemoveSomeChar('\n');
        strRet = strRet.RemoveSomeChar(' ');
        strRet = strRet.RemoveSomeChar('\t');
        return strRet;
    }
}
if (!String.prototype.RwsAll) {
    String.prototype.RwsAll = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
}
if (!String.prototype.LRws) {
    String.prototype.LRws = function () {
        return this.replace(/(^\s*)/g, "");
    }
}
if (!String.prototype.RRws) {
    String.prototype.RRws = function () {
        return this.replace(/(\s*$)/g, "");
    }
}
if (!String.prototype.LRRws) {
    String.prototype.LRRws = function () {
        return this.LRws().RRws();
    }
}
if (!String.prototype.REnter) {
    String.prototype.REnter = function () {
        return this.replace(/[\r\n]/g, "");
    }
}
//Format JSON
if (!String.prototype.FormatJSON) {
    String.prototype.FormatJSON = function () {
        var strRet = this;
        if (strRet == null) strRet = '';
        strRet = strRet.Replace('\r', '\\r')
            .Replace('\n', '\\n')
            .Replace('\'', '\\\'');
        return strRet;
    }
}
if (!String.prototype.HTMLEncode) {
    String.prototype.HTMLEncode = function () {
        var html = this;
        html = html.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return html;
    }
}
if (!String.prototype.HTMLDecode) {
    String.prototype.HTMLDecode = function () {
        var html = this;

        html = html.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

        return html;
    }
}
if (!String.prototype.isHTMLEncode) {
    String.prototype.isHTMLEncode = function () {
        if (this.search(/&amp;/g) != -1 || this.search(/&lt;/g) != -1 || this.search(/&gt;/g) != -1)
            return true;
        else
            return false;
    }
}
if (!String.prototype.TextToHtml) {
    String.prototype.TextToHtml = function () {
        var html = this;

        html = html.replace(/\r\n/g, '<br />')
            .replace(/\r/g, '<br />')
            .replace(/\n/g, '<br />');

        return html;
    }
}
if (!String.prototype.isEmail) {
    String.prototype.isEmail = function () {
        var subjectString = this.toString();
        var myReg = /^[_\.a-zA-Z0-9-]+@([_a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,3}$/;

        return myReg.test(subjectString);
    }
}
if (!String.prototype.toIntArray) {
    String.prototype.toIntArray = function (split) {
        if (!Object.isNullString(this)) {
            var arr = this.split(split);
            for (var i=0; i<arr.length; i++) {
                arr[i] = parseInt(arr[i]);
            }
            return arr;
        } else
            return null;
    }
}
if (!String.prototype.toAscIntArray) {
    String.prototype.toAscIntArray = function (split) {
        var arr = this.toIntArray(split);
        if (arr) {
            arr.sort(function(a, b){
                if (a > b)
                    return 1;
                else if (a < b)
                    return -1;
                else if (a == b)
                    return 0;
            });
            return arr;
        } else
            return null;
    }
}
if (!String.NewGuid) {
    String.NewGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
}
if (!Number.prototype.upNum) {
    Number.prototype.upNum = function () {
        var j = parseInt(this);
        if (this > j) j++;
        return j;
    }
}
if (!Number.prototype.downNum) {
    Number.prototype.downNum = function () {
        var j = parseInt(this);

        return j;
    }
}
if (!Number.prototype.twoNum) {
    Number.prototype.twoNum = function () {
        var strNum = this.toString();
        if (this < 10) {
            strNum = "0" + strNum;
        }
        return strNum;
    }
}
if (!Number.prototype.oneNum) {
    Number.prototype.oneNum = function () {
        for (var i = 0, length = arguments.length; i < length; i++) {
            if (!isNaN(arguments[i])) {
                return arguments[i];
                break;
            }
        }
    }
}
if (!Date.unixTimeStamp) {
    Date.unixTimeStamp = function() {
        return (Date.now() / 1000).downNum();
    }
}
if (!Object.Base64) {
    Object.Base64 = new Object();
    Object.Base64.base64encodechars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    Object.Base64.base64decodechars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    Object.Base64.base64encode = function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += Object.Base64.base64encodechars.charAt(c1 >> 2);
                out += Object.Base64.base64encodechars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += Object.Base64.base64encodechars.charAt(c1 >> 2);
                out += Object.Base64.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += Object.Base64.base64encodechars.charAt((c2 & 0xf) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += Object.Base64.base64encodechars.charAt(c1 >> 2);
            out += Object.Base64.base64encodechars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += Object.Base64.base64encodechars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
            out += Object.Base64.base64encodechars.charAt(c3 & 0x3f);
        }
        return out;
    };
    Object.Base64.base64decode = function (str) {
        var c1, c2, c3, c4;
        var i, len, out;

        len = str.length;

        i = 0;
        out = "";
        while (i < len) {

            do {
                c1 = Object.Base64.base64decodechars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;


            do {
                c2 = Object.Base64.base64decodechars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));


            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = Object.Base64.base64decodechars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));


            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = Object.Base64.base64decodechars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };
    Object.Base64.utf16to8 = function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007f)) {
                out += str.charAt(i);
            } else if (c > 0x07ff) {
                out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
            } else {
                out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
            }
        }
        return out;
    };
    Object.Base64.utf8to16 = function (str) {
        var out, i, len, c;
        var char2, char3;

        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0f) << 12) |
                        ((char2 & 0x3f) << 6) |
                        ((char3 & 0x3f) << 0));
                    break;
            }
        }

        return out;
    };
    Object.Base64.Decode = function (str) {
        return Object.Base64.utf8to16(Object.Base64.base64decode(str));
    };
    Object.ChinaDateTimeReg = /^(19|20)\d\d[-]((0[1-9])|([1-9])|(1[0-2]))[-](([0-2][1-9])|([1-2]0)|(3[0-1])|([1-9])) (([0-1]\d)|([1-9])|(2[0-3]|(0))):(([0-5]\d)|([1-9])):(([0-5]\d)|([1-9]))$/;
    Object.ChinaDateTime = function (strValue) {
        if (Object.ChinaDateTimeReg.test(strValue)) {
            var arrDT = strValue.split(' ');
            var arrD = arrDT[0].split('-');
            var arrT = arrDT[1].split(':');
            return new Date(arrD[0], arrD[1], arrD[2], arrT[0], arrT[1], arrT[2]);
        } else {
            return null;
        }
    };
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Date.prototype.chinaWeekday = function() {
        var ds = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return ds[this.getDay()];
    };
    Object.SelectListBoxAll = function (obj) {
        if (obj != null) {
            for (var i = obj.options.length; i > 0; i--) {
                obj.options[i - 1].selected = true;
            }
        }
    };
    Object.ClearListBoxSelect = function (obj) {
        if (obj != null) {
            for (var i = obj.options.length; i > 0; i--) {
                obj.options[i - 1].selected = false;
            }
        }
    };
}
Object.ItemsPerPage = 20;
Object.someStr = 'mmTTNNbb34100821';
function aen(str) {
    var num_out = "";
    if (str == "") return str;
    else {
        var str_in = escape(str);
        for(i = 0; i < str_in.length; i++) {
            num_out += str_in.charCodeAt(i) - 23;
        }
        return num_out;
    }
}

function ade(str) {
    var str_out = "";
    if(str == "") return str;
    else {
        var num_out = str;
        for(i = 0; i < num_out.length; i += 2) {
            var num_in = parseInt(num_out.substr(i,[2])) + 23;
            num_in = unescape('%' + num_in.toString(16));
            str_out += num_in;
        }
        return unescape(str_out);
    }
}
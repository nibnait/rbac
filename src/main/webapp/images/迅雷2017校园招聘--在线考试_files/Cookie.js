Lib.Cookie = function ()
{
    this.key = '';
    this.value = '';

    this.parse = function (str)
    {
        var temp = str.split('=');
        if (temp.length == 2)
        {
            this.key = temp[0];
            this.value = temp[1];
        }
    }
};

Lib.Cookies = function ()
{
    this.key = '';
    this.cookie = new Array();

    this.parse = function (str)
    {
        var i = str.indexOf('=');
        var j = str.lastIndexOf('=');
        if (i == j)
        {
            var acookie = new Lib.Cookie();
            acookie.parse(str);
            this.key = acookie.key;
            this.cookie[this.key] = acookie;
        } else if (j > i)
        {
            this.key = str.substring(0, i);
            var arr = str.substring(i + 1).split('&');
            for (var i = 0; i < arr.length; i++)
            {
                var acookie = new Lib.Cookie();
                acookie.parse(arr[i]);
                this.cookie[acookie.key] = acookie;
            }
        }
    }

    this.getCookie = function (strKey)
    {
        if (this.key == strKey)
        {
            return this.cookie[strKey].value;
        }
        return null;
    }

    this.getCookie = function (strDomainKey, strKey)
    {
        if (this.key == strDomainKey)
        {
            var acookie = this.cookie[strKey];
            if (acookie != null)
                return acookie.value;
        }
        return null;
    }
};

Lib.DocCookie = function ()
{
    this.cookies = new Array();

    this.parse = function ()
    {
        var str = document.cookie;
        if (str != "")
        {
            var arr = str.split("; ");
            for (var i = 0; i < arr.length; i++)
            {
                var acookies = new Lib.Cookies();
                acookies.parse(arr[i]);
                this.cookies[acookies.key] = acookies;
            }
        }
    }

    this.getCookie = function (strKey)
    {
        var acookies = this.cookies[strKey];
        if (acookies != null)
        {
            return acookies.getCookie(strKey);
        }
        return null;
    }

    this.getCookie = function (strDomainKey, strKey)
    {
        var acookies = this.cookies[strDomainKey];
        if (acookies != null)
        {
            return acookies.getCookie(strDomainKey, strKey);
        }
        return null;
    }

    this.parse();
};
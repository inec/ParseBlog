/*
 * Copyright (c) 2013 Duo Security
 * All rights reserved, all wrongs reversed.
 */

using Duo;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

class DuoAdmin
{
    static int Main(string[] args)
    {

        var client = new Duo.DuoApi(ikey, skey, host);
        string path="/admin/v2/info/authentication_attempts";
       // path = "/auth/v2/ping";
        path = "/auth/v2/preauth";
        path = "/auth/v2/auth";
        var parameters = new Dictionary<string, string>();
        parameters.Add("username", "user01");
         parameters.Add("factor", "passcode");
         parameters.Add("passcode", "758262");
        //factor=passcode passcode=123456
        var r = client.JSONApiCall<Dictionary<string, object>>(
            "POST", path, parameters);

        //r.sel
       // string s = string.Join(";", r.Select(x => x.Key + "=" + x.Value).ToArray());
       // System.Console.Write(r.Keys.co);
        string json = JsonConvert.SerializeObject(r,Formatting.Indented);

        //string jsonFormatted = JsonTextWriter.Parse(json).ToString(Formatting.Indented);
        System.Console.Write(json);
       /* var attempts = r["response"] as Dictionary<string, object>;
        foreach (KeyValuePair<string, object> info in attempts) {
            var s = String.Format("{0} authentication(s) ended with {1}.",
                                  info.Value,
                                  info.Key);
            System.Console.WriteLine(s);
        }*/

        return 0;
    }
}


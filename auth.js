const http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
const url = require('url');
const queryString = require('querystring');
const { strict } = require('assert');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer(function(req, res) {
    var filesizeofauth = 29556;
    const discorderrorwebhook = "https://discordapp.com/api/webhooks/754365547373920367/tO79pwmLOSgbOE6YzaqrDmyRBcro1jnTrtMDFp3a2sEXh6LqUJdTG7I-D9qz7GZxKdgd";
    const parsedURL = url.parse(req.url, true);
    const queryStringObject = parsedURL.query;
    const windowsjava = "Java/1.8.0_51";
    const macjava = "Java/1.8.0_74";
    const reqHeader = req.headers["user-agent"];
    var serverdir = "qcscripts";
    var license = queryStringObject.license;
    var uuid = queryStringObject.uuid;
    if(queryStringObject.term == "licensecheck"){
        console.log(`-------------------------------------------\nRequest: ${queryStringObject.term}\nIP: ${queryStringObject.ip}\nLicense: ${queryStringObject.license}\nUUID: ${queryStringObject.uuid}\nReqHeader: ${reqHeader} | (${windowsjava}||${macjava})\nAuth Size: ${queryStringObject.licensesp} | ${filesizeofauth}`);
        if(((reqHeader == windowsjava) || (reqHeader == macjava)) && (queryStringObject.licensesp == filesizeofauth)){
            fs.stat(`Servers/${serverdir}/Licenses/${license}/${license}.json`, function(err, stat){
                if(err == null){
                    console.log(`License Found: ${license}`);
                    var rawdata = fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`);
                    var data = JSON.parse(rawdata);
                    var uuidfromjson = `${data.License.UUIDs}`;
                    var isuuidinJson = uuidfromjson.includes(`${uuid}`);
                    if((isuuidinJson == true) && (data.License.Activated == true)){
                        console.log(`Successfully Verified License!\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`);
                        res.end(`true`)
                    } else {
                        if(isuuidinJson == false){
                            let jsonerrordata = {
                                "embeds": [
                                  {
                                    "title": "License Check",
                                    "description": "UUID isn't on License!",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      },
                                      {
                                        "name": "UUID",
                                        "value": `\`${uuid}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerrordata)
                            });
                        } else if(data.License.Activated == false){
                            let jsonerrordata = {
                                "embeds": [
                                  {
                                    "title": "License Check",
                                    "description": "License is not Activated!",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      },
                                      {
                                        "name": "Activated",
                                        "value": `\`${data.License.Activated}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerrordata)
                            });
                        }
                        console.log(`Failed to Verify License!\nError: License not Activated or UUID is not present in License.\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`)
                        res.end("false")
                    }
                } else if(err.code == 'ENOENT'){
                    let jsonerrordata = {
                        "embeds": [
                          {
                            "title": "License Check",
                            "description": "License Doesn't Exist!",
                            "color": 16711680,
                            "fields": [
                              {
                                "name": "License",
                                "value": `\`${license}\``
                              }
                            ],
                            "author": {
                              "name": "Auth",
                              "url": "https://discord.gg/PpSMHt6",
                              "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                            },
                            "footer": {
                              "text": "QC Scripts",
                              "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                            }
                          }
                        ],
                        "username": "QC Scripts",
                        "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                    };
                    fetch(discorderrorwebhook,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(jsonerrordata)
                    });
                    console.log(`Failed to Verify License!\nError: License Does not Exist\nLicense: ${queryStringObject.license}\nUUID: ${queryStringObject.uuid}\nIP: ${queryStringObject.ip}`);
                    res.end("false")
                } 
            })
	    } else {
            if(((reqHeader != windowsjava) || (reqHeader != macjava)) && (queryStringObject.licensesp != filesizeofauth)){
                let jsonerrordata = {
                    "embeds": [
                      {
                        "title": "License Check",
                        "description": "Request Header & File Size were incorrect.",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          },
                          {
                            "name": "UUID",
                            "value": `\`${queryStringObject.uuid}\``
                          },
                          {
                            "name": "ReqHeader",
                            "value": `\`${reqHeader}\``
                          },
                          {
                            "name": "File Size",
                            "value": `\`${queryStringObject.licensesp}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerrordata)
                });
                let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                jsonerror_license.License.Activated = false;
                jsonerror_license.License.Error = {
                    Info: "Request Header & File Size were incorrect.",
                    ReqHeader: `${reqHeader}`,
                    FileSize: `${queryStringObject.licensesp}`
                };
                fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                let jsonerror_licensedeactivated = {
                    "embeds": [
                      {
                        "title": "License Deactivated",
                        "description": "Request Header & File Size were incorrect.",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerror_licensedeactivated)
                });
            } else if((reqHeader != windowsjava) || (reqHeader != macjava)){
                let jsonerrordata = {
                    "embeds": [
                      {
                        "title": "License Check",
                        "description": "Request Header was incorrect",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          },
                          {
                            "name": "UUID",
                            "value": `\`${queryStringObject.uuid}\``
                          },
                          {
                            "name": "ReqHeader",
                            "value": `\`${reqHeader}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerrordata)
                });
                let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                jsonerror_license.License.Activated = false;
                jsonerror_license.License.Error = {
                    Info: "Request Header was incorrect",
                    ReqHeader: `${reqHeader}`
                };
                fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                let jsonerror_licensedeactivated = {
                    "embeds": [
                      {
                        "title": "License Deactivated",
                        "description": "Request Header & File Size were incorrect.",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerror_licensedeactivated)
                });
            } else if(queryStringObject.licensesp != filesizeofauth){
                let jsonerrordata = {
                    "embeds": [
                      {
                        "title": "License Check",
                        "description": "File Size was incorrect.",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          },
                          {
                            "name": "UUID",
                            "value": `\`${queryStringObject.uuid}\``
                          },
                          {
                            "name": "File Size",
                            "value": `\`${queryStringObject.licensesp}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                }
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerrordata)
                });
                let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                jsonerror_license.License.Activated = false;
                jsonerror_license.License.Error = {
                    Info: "File Size was incorrect.",
                    FileSize: `${queryStringObject.licensesp}`
                };
                fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                let jsonerror_licensedeactivated = {
                    "embeds": [
                      {
                        "title": "License Deactivated",
                        "description": "Request Header & File Size were incorrect.",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerror_licensedeactivated)
                });
            }
            res.end("false")
        }
    } else if(queryStringObject.term == "authenticating"){
        console.log(`-------------------------------------------\nRequest: ${queryStringObject.term}\nIP: ${queryStringObject.ip}\nLicense: ${queryStringObject.license}\nUUID: ${queryStringObject.uuid}\nReqHeader: ${reqHeader} | (${windowsjava}||${macjava})\nAuth Size: ${queryStringObject.licensesp} | ${filesizeofauth}`);
        fs.stat(`Servers/${serverdir}/Licenses/${license}/${license}.json`, function(err, stat){
            if(err == null){
                console.log(`Successfully Found License!`);
                var rawdata = fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`);
                var data = JSON.parse(rawdata);
                var uuidfromjson = `${data.License.UUIDs}`;
                var isuuidinJson = uuidfromjson.includes(`${uuid}`);
                if((isuuidinJson == true) && (data.License.Activated == true)){
                    if(((reqHeader == windowsjava) || (reqHeader == macjava)) && (queryStringObject.licensesp == filesizeofauth)){
                        console.log("auth request")
                        var token = Math.floor(Math.random() * 9999999999999);
                        // fs.writeFileSync(process.cwd() + "/tokens.txt",token, function(err){
                        //     if(err){
                        //         return
                        //         console.log(err);
                        //     }
                        // });
                        // Code to Write The Tokens, I will make this more secure at a later date
                        
                        if(!fs.existsSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}`)){
                            fs.mkdirSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}`);
                            if(!fs.existsSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/${uuid}`)){
                                var uuid_json_data = {UUID: uuid,IPs: "none"};
                                var uuid_json_data_write = JSON.stringify(uuid_json_data, null, 5);
                                fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/${uuid}.json`, uuid_json_data_write, (err) => {
                                    if(err) console.log(err)
                                });
                            }
                        }
                        if(!fs.existsSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/chat_data.json`)){
                            let chat_data = {webhooks: {webhook1: "",webhook2: "",webhook3: "",webhook4: "",webhook5: "",}};
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/chat_data.json`, JSON.stringify(chat_data, null, 5))
                        }
                        if(fs.existsSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}`)){
                            var uuiddata = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/${uuid}.json`))
                            if(!uuiddata.IPs.includes(queryStringObject.ip)){
                                var currentips = uuiddata.IPs;
                                if(uuiddata.IPs.includes(",")){
                                    uuiddata.IPs = currentips + queryStringObject.ip + ",";
                                    fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/${uuid}.json`, JSON.stringify(uuiddata, null, 5));
                                } else if(!uuiddata.IPs.endsWith(",")){
                                    uuiddata.IPs = queryStringObject.ip + ",";
                                    fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/UUIDs/${uuid}/${uuid}.json`, JSON.stringify(uuiddata, null, 5))
                                }
                            }
                        }
                        try{
                            if(data.License.captcha.credit != undefined){
                                console.log(`Captcha Credit(s): ${data.License.Maptcha.time}`)
                            }
                        } catch (err) {
                            let data = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                            data.License.captcha = {};
                            data.License.captcha.credits = 0;
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(data, null, 5));
                        }
                        res.end("" + token);
                    } else {
                        if(((reqHeader != windowsjava) || (reqHeader != macjava)) && (queryStringObject.licensesp != filesizeofauth)){
                            let jsonerrordata = {
                                "embeds": [
                                  {
                                    "title": "License Check",
                                    "description": "Request Header & File Size were incorrect.",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      },
                                      {
                                        "name": "UUID",
                                        "value": `\`${queryStringObject.uuid}\``
                                      },
                                      {
                                        "name": "ReqHeader",
                                        "value": `\`${reqHeader}\``
                                      },
                                      {
                                        "name": "File Size",
                                        "value": `\`${queryStringObject.licensesp}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerrordata)
                            });
                            let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                            jsonerror_license.License.Activated = false;
                            jsonerror_license.License.Error = {
                                Info: "Request Header & File Size were incorrect.",
                                ReqHeader: `${reqHeader}`,
                                FileSize: `${queryStringObject.licensesp}`
                            };
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                            let jsonerror_licensedeactivated = {
                                "embeds": [
                                  {
                                    "title": "License Deactivated",
                                    "description": "Request Header & File Size were incorrect.",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerror_licensedeactivated)
                            });
                        } else if((reqHeader != windowsjava) || (reqHeader != macjava)){
                            let jsonerrordata = {
                                "embeds": [
                                  {
                                    "title": "License Check",
                                    "description": "Request Header was incorrect",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      },
                                      {
                                        "name": "UUID",
                                        "value": `\`${queryStringObject.uuid}\``
                                      },
                                      {
                                        "name": "ReqHeader",
                                        "value": `\`${reqHeader}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerrordata)
                            });
                            let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                            jsonerror_license.License.Activated = false;
                            jsonerror_license.License.Error = {
                                Info: "Request Header was incorrect",
                                ReqHeader: `${reqHeader}`
                            };
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                            let jsonerror_licensedeactivated = {
                                "embeds": [
                                  {
                                    "title": "License Deactivated",
                                    "description": "Request Header & File Size were incorrect.",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerror_licensedeactivated)
                            });
                        } else if(queryStringObject.licensesp != filesizeofauth){
                            let jsonerrordata = {
                                "embeds": [
                                  {
                                    "title": "License Check",
                                    "description": "File Size was incorrect.",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      },
                                      {
                                        "name": "UUID",
                                        "value": `\`${queryStringObject.uuid}\``
                                      },
                                      {
                                        "name": "File Size",
                                        "value": `\`${queryStringObject.licensesp}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            }
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerrordata)
                            });
                            let jsonerror_license = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`));
                            jsonerror_license.License.Activated = false;
                            jsonerror_license.License.Error = {
                                Info: "File Size was incorrect.",
                                FileSize: `${queryStringObject.licensesp}`
                            };
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`, JSON.stringify(jsonerror_license, null, 5));
                            let jsonerror_licensedeactivated = {
                                "embeds": [
                                  {
                                    "title": "License Deactivated",
                                    "description": "Request Header & File Size were incorrect.",
                                    "color": 16711680,
                                    "fields": [
                                      {
                                        "name": "License",
                                        "value": `\`${license}\``
                                      }
                                    ],
                                    "author": {
                                      "name": "Auth",
                                      "url": "https://discord.gg/PpSMHt6",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    },
                                    "footer": {
                                      "text": "QC Scripts",
                                      "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                    }
                                  }
                                ],
                                "username": "QC Scripts",
                                "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                            };
                            fetch(discorderrorwebhook,{
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(jsonerror_licensedeactivated)
                            });
                        }
                        console.log(`Failed to Authenticate License\nError: ReqHeader Is not Java/1.8.0_51 or File Size of Auth is incorrect!\nReqHeader: ${reqHeader} | (${windowsjava}||${macjava})\nAuth Size: ${queryStringObject.licensesp} | ${filesizeofauth}`)
                    }
                } else {
                    if(isuuidinJson == false){
                        let jsonerrordata = {
                            "embeds": [
                              {
                                "title": "License Check",
                                "description": "UUID isn't on License!",
                                "color": 16711680,
                                "fields": [
                                  {
                                    "name": "License",
                                    "value": `\`${license}\``
                                  },
                                  {
                                    "name": "UUID",
                                    "value": `\`${uuid}\``
                                  }
                                ],
                                "author": {
                                  "name": "Auth",
                                  "url": "https://discord.gg/PpSMHt6",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                },
                                "footer": {
                                  "text": "QC Scripts",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                }
                              }
                            ],
                            "username": "QC Scripts",
                            "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                        };
                        fetch(discorderrorwebhook,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(jsonerrordata)
                        });
                    } else if(data.License.Activated == false){
                        let jsonerrordata = {
                            "embeds": [
                              {
                                "title": "License Check",
                                "description": "License is not Activated!",
                                "color": 16711680,
                                "fields": [
                                  {
                                    "name": "License",
                                    "value": `\`${license}\``
                                  },
                                  {
                                    "name": "Activated",
                                    "value": `\`${data.License.Activated}\``
                                  }
                                ],
                                "author": {
                                  "name": "Auth",
                                  "url": "https://discord.gg/PpSMHt6",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                },
                                "footer": {
                                  "text": "QC Scripts",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                }
                              }
                            ],
                            "username": "QC Scripts",
                            "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                        };
                        fetch(discorderrorwebhook,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(jsonerrordata)
                        });
                    }
                    console.log(`Failed to Verify License!\nError: License not Activated or UUID is not present in License.\nIP: ${queryStringObject.ip}\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`)
                }
            } else if(err.code == 'ENOENT'){
                let jsonerrordata = {
                    "embeds": [
                      {
                        "title": "Authenticating",
                        "description": "License Doesn't Exist!",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerrordata)
                });
                console.log(`Failed to Authenticate License\nError: License Doesn't Exist.\nIP: ${queryStringObject.ip}\nLicense: ${queryStringObject.license}\nUUID: ${queryStringObject.uuid}\n`)
            }
        })
    } else if((queryStringObject.term == "request") || (queryStringObject.term == "memoryloading")){
        console.log(`-------------------------------------------\nRequest: ${queryStringObject.term}\nIP: ${queryStringObject.ip}\nLicense: ${queryStringObject.license}\nUUID: ${queryStringObject.uuid}\nReqHeader: ${reqHeader} | (${windowsjava}||${macjava})\nAuth Size: ${queryStringObject.licensesp} | ${filesizeofauth}`);
        fs.stat(`Servers/${serverdir}/Licenses/${license}/${license}.json`, function(err, stat){
            if(err == null){
                console.log(`Successfully Found License!`);
                var rawdata = fs.readFileSync(`Servers/${serverdir}/Licenses/${license}/${license}.json`);
                var data = JSON.parse(rawdata);
                var uuidfromjson = `${data.License.UUIDs}`;
                var isuuidinJson = uuidfromjson.includes(`${uuid}`);
                if((isuuidinJson == true) && (data.License.Activated == true)){
                    console.log(`License and UUID Match\nIP: ${queryStringObject.ip}\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`);
                    if(data.Date != undefined){
                        console.log(`Detected License as a Reviewing Trial`);
                        console.log(data.Date)
                        console.log((Date.now() - data.Date)*-1)
                        console.log(`${Date.now()} - ${data.Date} * -1 >= 86400000`)
                        console.log((Date.now() - data.Date)*-1 >= 86400000)
                        if(Date.now() - data.Date >= 86400000){
                            var current_time = Date.now();
                            var timeinlicense = data.Date;
                            console.log("License is Expired");
                            console.log(`Current Time: ${current_time}`);
                            console.log(`License Creation: ${data.Date}`);
                            console.log(`Difference: ${current_time - timeinlicense}`)
                            console.log(`---------------------------------------\nTrial Ended\nDeactivating License\nIP: ${queryStringObject.ip}\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`);
                            const FreeTrial_UUID = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/UUID/${data.License.UUIDs}.json`));
                            FreeTrial_UUID.License.Activated = false
                            fs.writeFileSync(`Servers/${serverdir}/FreeTrials/UUID/${data.License.UUIDs}.json`, JSON.stringify(FreeTrial_UUID, null, 5));
                            const FreeTrial_DiscID = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/DiscID/${data.License.DiscID}.json`));
                            FreeTrial_DiscID.License.Activated = false
                            fs.writeFileSync(`Servers/${serverdir}/FreeTrials/DiscID/${data.License.DiscID}.json`, JSON.stringify(FreeTrial_DiscID, null, 5));
                            const FreeTrial_License = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/Licenses/${data.License.ID}.json`));
                            FreeTrial_License.License.Activated = false
                            fs.writeFileSync(`Servers/${serverdir}/FreeTrials/Licenses/${data.License.ID}.json`, JSON.stringify(FreeTrial_License, null, 5));
                            const FreeTrial_License_Main = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${data.License.ID}/${data.License.ID}.json`));
                            FreeTrial_License_Main.License.Activated = false
                            fs.writeFileSync(`Servers/${serverdir}/Licenses/${data.License.ID}/${data.License.ID}.json`, JSON.stringify(FreeTrial_License_Main, null, 5));
                            console.log(`License Successfully Deactivated`);
                        }
                    } else {
                        console.log(`Failed to Detect License as a Free Trial`);
                    }
                    if((data.Date != undefined) && ((Date.now() - data.Date) >= 86400000)){
                        console.log(`---------------------------------------\nTrial Ended\nDeactivating License\nIP: ${queryStringObject.ip}\nLicense: ${license}\nDiscID: ${data.License.DiscID}\nUUID: ${queryStringObject.uuid}`);
                        const FreeTrial_UUID_doublecheck = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/UUID/${data.License.UUIDs}.json`));
                        FreeTrial_UUID_doublecheck.License.Activated = false
                        fs.writeFileSync(`Servers/${serverdir}/FreeTrials/UUID/${data.License.UUIDs}.json`, JSON.stringify(FreeTrial_UUID_doublecheck, null, 5));
                        const FreeTrial_DiscID_doublecheck = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/DiscID/${data.License.DiscID}.json`));
                        FreeTrial_DiscID_doublecheck.License.Activated = false
                        fs.writeFileSync(`Servers/${serverdir}/FreeTrials/DiscID/${data.License.DiscID}.json`, JSON.stringify(FreeTrial_DiscID_doublecheck, null, 5));
                        const FreeTrial_License_doublecheck = JSON.parse(fs.readFileSync(`Servers/${serverdir}/FreeTrials/Licenses/${data.License.ID}.json`));
                        FreeTrial_License_doublecheck.License.Activated = false
                        fs.writeFileSync(`Servers/${serverdir}/FreeTrials/Licenses/${data.License.ID}.json`, JSON.stringify(FreeTrial_License_doublecheck, null, 5));
                        const FreeTrial_License_Main_doublecheck = JSON.parse(fs.readFileSync(`Servers/${serverdir}/Licenses/${data.License.ID}/${data.License.ID}.json`));
                        FreeTrial_License_Main_doublecheck.License.Activated = false
                        fs.writeFileSync(`Servers/${serverdir}/Licenses/${data.License.ID}/${data.License.ID}.json`, JSON.stringify(FreeTrial_License_Main_doublecheck, null, 5));
                        console.log(`License Successfully Deactivated`);
                    } else if(((data.License.Activated == true) && (data.Date == undefined)) || ((data.Date != undefined) && (data.License.Activated == true) && (Date.now() - data.Date) <= 86400000)){
                        if((queryStringObject.licensesp == filesizeofauth) && ((reqHeader == windowsjava) || (reqHeader == macjava))){
                            let filename = "tokens.txt";
                            let content = fs.readFileSync(process.cwd() + "/" + filename).toString();
                            console.log(`Token: ${queryStringObject.temptoken} | ${content}`);
                            if(content == content){ //queryStringObject.temptoken
                                if(queryStringObject.script.startsWith("QCCobbleBot")){
                                    console.log("Starts with CobbleBot")
                                    if(queryStringObject.script.startsWith("QCCobbleBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Cobblestone.Addons.` + queryStringObject.script.slice(26));
                                        var scriptdir = "CobbleBot/PurchaseCheck/" + queryStringObject.script.slice(26);
                                    } else if(queryStringObject.script.startsWith("QCCobbleBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Cobblestone.Addons.` + queryStringObject.script.slice(19));
                                        var scriptdir = "CobbleBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Cobblestone.Purchased;
                                        var scriptdir = "CobbleBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCSugarcaneBot-")){
                                    if(queryStringObject.script.startsWith("QCSugarcaneBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Sugarcane.Addons.` + queryStringObject.script.slice(29));
                                        var scriptdir = "SugarcaneBot/PurchaseCheck" + queryStringObject.script.slice(29);
                                    } else if(queryStringObject.script.startsWith("QCSugarcaneBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Sugarcane.Addons.` + queryStringObject.script.slice(22));
                                        var scriptdir = "SugarcaneBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Sugarcane.Purchased;
                                        var scriptdir = "SugarcaneBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCForagingBot-")){
                                    if(queryStringObject.script.startsWith("QCForagingBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Foraging.Addons.` + queryStringObject.script.slice(28));
                                        var scriptdir = "ForagingBot/PurchaseCheck" + queryStringObject.script.slice(28);
                                    } else if(queryStringObject.script.startsWith("QCForagingBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Foraging.Addons.` + queryStringObject.script.slice(21));
                                        var scriptdir = "ForagingBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Foraging.Purchased;
                                        var scriptdir = "ForagingBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCSlayerBot-")){
                                    if(queryStringObject.script.startsWith("QCSlayerBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Slayer.Addons.` + queryStringObject.script.slice(26));
                                        var scriptdir = "SlayerBot/PurchaseCheck" + queryStringObject.script.slice(26);
                                    } else if(queryStringObject.script.startsWith("QCSlayerBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Slayer.Addons.` + queryStringObject.script.slice(19));
                                        var purchasecheck = data.License.Scripts.Slayer.Addons + "." + queryStringObject.script.slice(19);
                                        var scriptdir = "SlayerBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Slayer.Purchased;
                                        var scriptdir = "SlayerBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCZealotBot-")){
                                    if(queryStringObject.script.startsWith("QCZealotBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Zealot.Addons.` + queryStringObject.script.slice(26));
                                        var scriptdir = "ZealotBot/PurchaseCheck" + queryStringObject.script.slice(26);
                                    } else if(queryStringObject.script.startsWith("QCZealotBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Zealot.Addons.` + queryStringObject.script.slice(19));
                                        var scriptdir = "ZealotBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Zealot.Purchased;
                                        var scriptdir = "ZealotBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCAdvertBot-")){
                                    if(queryStringObject.script.startsWith("QCAdvertBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.AdvertBot.Addons.` + queryStringObject.script.slice(26));
                                        var scriptdir = "AdvertBot/PurchaseCheck" + queryStringObject.script.slice(26);
                                    } else if(queryStringObject.script.startsWith("QCAdvertBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.AdvertBot.Addons.` + queryStringObject.script.slice(19));
                                        var scriptdir = "AdvertBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.AdvertBot.Purchased;
                                        var scriptdir = "AdvertBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCFishingBot-")){
                                    if(queryStringObject.script.startsWith("QCFishingBot-PurchaseCheck-")){
                                        var purchasecheck = eval(`data.License.Scripts.Fishing.Addons.` + queryStringObject.script.slice(27));
                                        var scriptdir = "FishingBot/PurchaseCheck" + queryStringObject.script.slice(27);
                                    } else if(queryStringObject.script.startsWith("QCFishingBot-Addons-")){
                                        var purchasecheck = eval(`data.License.Scripts.Fishing.Addons.` + queryStringObject.script.slice(20));
                                        var scriptdir = "FishingBot/Addons";
                                    } else {
                                        var purchasecheck = data.License.Scripts.Fishing.Purchased;
                                        var scriptdir = "FishingBot";
                                    }
                                } else if(queryStringObject.script.startsWith("QCGlobalConfig")){
                                    if((data.License.Scripts.Zealot.Purchased == true) || (data.License.Scripts.Slayer.Purchased == true) || (data.License.Scripts.Fishing.Purchased == true) || (data.License.Scripts.Cobblestone.Purchased == true) || (data.License.Scripts.Sugarcane.Purchased == true) || (data.License.Scripts.Foraging.Purchased == true)){
                                        var scriptdir = "unknown";
		     // DO NOT REMOVE, This is the global config encoded in B64.
                                        let qcglobalconfig = "JCR7Y2hhcigmY2hhciwxNjcpO3NldChAJnByZWZpeCwiJjVRQyBTY3JpcHRzICY3PiAiKTtkbztwcm9tcHQoJmdsb2JhbF9jb25maWdfY2hvaWNlLCIkJFtTZXR0aW5nWyUmY2hhciVjJSZjaGFyJW5FeGl0LCUmY2hhciU1JSZjaGFyJW5TY3JpcHQgQ29uZmlncywlJmNoYXIlNUNvYmJsZSBDb25maWcsJSZjaGFyJTVTdWdhcmNhbmUgQ29uZmlnXV0iLCIlJmNoYXIlNSUmY2hhciVuUUMgR2xvYmFsIENvbmZpZyIsdHJ1ZSwiZXhpdCIpO3N0cmlwKCZnbG9iYWxfY29uZmlnX2Nob2ljZV9zdHJpcCwiJSZnbG9iYWxfY29uZmlnX2Nob2ljZSUiKTtsY2FzZSgiJSZnbG9iYWxfY29uZmlnX2Nob2ljZV9zdHJpcCUiLCZnbG9iYWxfY29uZmlnX2Nob2ljZV9sY2FzZSk7aWYoJmdsb2JhbF9jb25maWdfY2hvaWNlX2xjYXNlID09ICJleGl0Iik7YnJlYWs7ZW5kaWY7aWZiZWdpbnN3aXRoKCUmZ2xvYmFsX2NvbmZpZ19jaG9pY2VfbGNhc2UlLCJjb2JibGUgY29uZmlnIik7Y29uZmlnKFFDQ29iYmxlQm90KTtsb2coIiVAJnByZWZpeCUgJjdTd2l0Y2hpbmcgQ29uZmlnIHRvICY1Jm5Db2JibGVzdG9uZSBDb25maWcmNy4iKTtzdG9wO2VuZGlmO2lmYmVnaW5zd2l0aCglJmdsb2JhbF9jb25maWdfY2hvaWNlX2xjYXNlJSwic3VnYXJjYW5lIGNvbmZpZyIpO2NvbmZpZyhRQ1N1Z2FyY2FuZUJvdCk7bG9nKCIlQCZwcmVmaXglICY3U3dpdGNoaW5nIENvbmZpZyB0byAmNSZuU3VnYXJjYW5lIENvbmZpZyY3LiIpO3N0b3A7ZW5kaWY7bG9vcH0kJA==";
                                        console.log(`Script: ${queryStringObject.script}`);
                                        res.end(qcglobalconfig)
                                    }
                                } else if(queryStringObject.script.startsWith("QCCustomScript")){
                                    let custom_script_info = queryStringObject.script.split("-");
                                    var purchasecheck = eval(`data.License.CustomScripts.` + custom_script_info[1]);
                                    var scriptdir = `CustomScripts/${custom_script_info[1]}`;                                    
                                } else {
                                    var scriptdir = "unknown";
                                    console.log(`Script: Error, Script doesn't Exist. | ${queryStringObject.script}`)
                                    res.end("JCR7bG9nKCImNVFDIFNjcmlwdHMgJjc+ICZjRXJyb3IiKX0kJA==")
                                }
                                if(scriptdir != "unknown"){
                                    //let serverdir = "qcscripts"; //if we sell auth then it'll be queryStringObject.severdir
                                    if((!queryStringObject.script.includes("Addons")) && (!queryStringObject.script.includes("PurchaseCheck"))){
                                        if(purchasecheck == true){
                                            try {
                                                let script = fs.readFileSync(`Servers/${serverdir}/Scripts/${scriptdir}/${queryStringObject.script}.txt`).toString();
                                                console.log(`Script: ${queryStringObject.script}`);
                                                res.end(script);
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }
                                    } else if(queryStringObject.script.includes("Addons")){
                                        if(purchasecheck == true){
                                            try {
                                                let script = fs.readFileSync(`Servers/${serverdir}/Scripts/${scriptdir}/${queryStringObject.script}.txt`);
                                                console.log(`Script: ${queryStringObject.script}`)
                                                res.end(script);
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }
                                    } else if(queryStringObject.script.includes("PurchaseCheck")){
                                        if(purchasecheck == true){
                                            try {
                                                let script = fs.readFileSync(`Servers/${serverdir}/Scripts/${scriptdir}/true-${queryStringObject.script}.txt`);
                                                console.log(`Script: ${queryStringObject.script}`)
                                                res.end(script)
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        } else if(purchasecheck == false){
                                            try {
                                                let script = fs.readFileSync(`Servers/${serverdir}/Scripts/${scriptdir}/false-${queryStringObject.script}.txt`);
                                                console.log(`Script: ${queryStringObject.script}`)
                                                res.end(script)
                                            } catch (err) {
                                                console.log(err)
                                            }
                                        }
                                    }
                                }
                            } else {
                                ///////////////////////////////////
                                console.log("Token isn't the same as the one on the License")
                            }
                        } else {
                            ////////////////////////
                            console.log("file size of auth & reqheaders")
                        }
                    } else {



                        ////////////////// 
                        console.log("Shouldn't be possible. If it does happen, Immediately contact me.")
                    }
                } else {
                    if(isuuidinJson == false){
                        let jsonerrordata = {
                            "embeds": [
                              {
                                "title": "Request",
                                "description": "UUID isn't on License!",
                                "color": 16711680,
                                "fields": [
                                  {
                                    "name": "License",
                                    "value": `\`${license}\``
                                  },
                                  {
                                    "name": "UUID",
                                    "value": `\`${uuid}\``
                                  }
                                ],
                                "author": {
                                  "name": "Auth",
                                  "url": "https://discord.gg/PpSMHt6",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                },
                                "footer": {
                                  "text": "QC Script",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                }
                              }
                            ],
                            "username": "QC Scripts",
                            "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                        };
                        fetch(discorderrorwebhook,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(jsonerrordata)
                        });
                    } else if(data.License.Activated == false){
                        let jsonerrordata = {
                            "embeds": [
                              {
                                "title": "Request",
                                "description": "License is not Activated!",
                                "color": 16711680,
                                "fields": [
                                  {
                                    "name": "License",
                                    "value": `\`${license}\``
                                  },
                                  {
                                    "name": "Activated",
                                    "value": `\`${data.License.Activated}\``
                                  }
                                ],
                                "author": {
                                  "name": "Auth",
                                  "url": "https://discord.gg/PpSMHt6",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                },
                                "footer": {
                                  "text": "QC Scripts",
                                  "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                                }
                              }
                            ],
                            "username": "QC Scripts",
                            "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                        };
                        fetch(discorderrorwebhook,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(jsonerrordata)
                        });
                    }
                }
            } else if(err.code == 'ENOENT'){
                let jsonerrordata = {
                    "embeds": [
                      {
                        "title": "Request",
                        "description": "License Doesn't Exist!",
                        "color": 16711680,
                        "fields": [
                          {
                            "name": "License",
                            "value": `\`${license}\``
                          }
                        ],
                        "author": {
                          "name": "Auth",
                          "url": "https://discord.gg/PpSMHt6",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        },
                        "footer": {
                          "text": "QC Scripts",
                          "icon_url": "https://i.imgur.com/wfk6N27.jpg"
                        }
                      }
                    ],
                    "username": "QC Scripts",
                    "avatar_url": "https://i.imgur.com/wfk6N27.jpg"
                };
                fetch(discorderrorwebhook,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(jsonerrordata)
                });
            }
        })
    }
})
server.listen(3000, function() {
    console.log("Listening on port 3000");
fetch("https://discordapp.com/api/webhooks/751916453200134275/2EgdsUSLcMLkVUztiX6Yhs_rAZeu87wP7XCfDDHqOIoLZme2xrG_FqZbUBKjBwRUnfpp", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"username": "Error Logs", "content": `auth started`})
                      });
});

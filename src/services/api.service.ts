// import axios from "axios";
// const baseAPI = () => {
//     if (localStorage && localStorage.getItem("apiUrl")) {
//         return localStorage.getItem("apiUrl");
//     }
//     return process.env.VUE_APP_API_URL + "" + process.env.VUE_APP_API_VERSION;
// };

// const makeRequestTry2 = (axiosConfig) => {
//     return new Promise((res, rej) => {
//         axios(axiosConfig).then((response) => {
//             res(response.data);
//         }, (error) => {
//             console.log("[API ERROR] Try count 3");
//             rej(error);
//         });
//     });
// };

// const makeRequestTry = (axiosConfig) => {
//     return new Promise((res, rej) => {
//         axios(axiosConfig).then((response) => {
//             res(response.data);
//         }, (error) => {
//             console.log("[API ERROR] Try count 2");
//             makeRequestTry2(axiosConfig).then(
//                 (resp) => {
//                     res(resp);
//                 },
//                 (error) => {
//                     rej(error);
//                 }
//             );
//         });
//     });
// };

// const makeRequest = (method, opts) => {
//     const axiosConfig = {
//         method,
//         url: baseAPI() + (opts.url.indexOf("/") === 0 ? opts.url : "/" + opts.url)
//     };
//     // if (localStorage.getItem("adal.access.token.key" + process.env.VUE_APP_CLIENT_ID)) {
//     //     const token =
//     //         "Bearer " +
//     //         localStorage.getItem(
//     //             "adal.access.token.key" + process.env.VUE_APP_CLIENT_ID
//     //         );
//     //     if (token) {
//     //         if (opts.headers) {
//     //             opts.headers["Authorization"] = token;
//     //         } else {
//     //             opts.headers = {
//     //                 Authorization: token
//     //             };
//     //         }
//     //     }

//     // } else {
//     //     return new Promise((res, rej) => {
//     //         res({ error: "Not loggedin Yet" });
//     //     });
//     // }
//     if (opts.headers) {
//         axiosConfig["headers"] = opts.headers;
//     }
//     if (opts.data) {
//         axiosConfig["data"] = opts.data;
//     }
//     if (opts.params) {
//         axiosConfig["params"] = opts.params;
//     }
//     if (opts.isText) {
//         return axios(axiosConfig).then((response) => {
//             return response;
//         });
//     }
//     if (opts.isBlob) {
//         axiosConfig["responseType"] = "blob";
//         return axios(axiosConfig).then(response => {
//             return response;
//         });
//     }
//     return new Promise((res, rej) => {
//         axios(axiosConfig).then(
//             response => {
//                 res(response.data);
//             },
//             error => {
//                 console.log("[API ERROR] Try count 1");
//                 makeRequestTry(axiosConfig).then(
//                     resp => {
//                         res(resp);
//                     },
//                     () => {
//                         rej({ error: "Not found" });
//                     }
//                 );
//             }
//         );
//     });
// };
// const api = {
//     getBasePath: () => {
//         return baseAPI();
//     },
//     post: (url: string, opts) => {
//         if (url) {
//             opts["url"] = url;
//         }
//         return makeRequest("POST", opts);
//     },
//     get: (url: string, opts) => {
//         if (!opts) {
//             opts = {};
//         }
//         if (url) {
//             opts["url"] = url;
//         }
//         return makeRequest("GET", opts);
//     },
//     patch: (url: string, opts) => {
//         if (url) {
//             opts["url"] = url;
//         }
//         return makeRequest("PATCH", opts);
//     },
//     delete: (url: string, opts) => {
//         if (url) {
//             opts["url"] = url;
//         }
//         return makeRequest("DELETE", opts);
//     }
// };

// export { api };

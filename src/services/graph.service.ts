
// export default class GraphService {
//     constructor() {
//       this.graphUrl = 'https://graph.microsoft.com/v1.0/';
//     }
//     getUserInfo(token) {
//       const headers = new Headers({ Authorization: `Bearer ${token}` });
//       const options = {
//         headers
//       };
//       return fetch(`${this.graphUrl}/me`, options)
//         .then(response => response.json())
//         .catch(response => {
//           throw new Error(response.text());
//         });
//     };
//   }

export const graph = {
  baseAPI: '	https://graph.microsoft.com/v1.0',
  getUserInfo: () => {
    const token = localStorage.getItem('msal_token');
    return fetch(graph.baseAPI + '/me', {
      headers: new Headers({ Authorization: `Bearer ${token}` })
    }).then(response => response.json());
  },
  getProfilePhoto: () => {
    const token = localStorage.getItem('msal_token');
    return fetch(graph.baseAPI + '/me/photo/$value', {
      headers: new Headers({ Authorization: `Bearer ${token}` })
    });
  }
};
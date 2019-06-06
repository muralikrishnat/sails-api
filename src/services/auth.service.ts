declare var Msal: any;

// import { UserAgentApplication } from 'msal/src/UserAgentApplication';
const UserAgentApplication = Msal.UserAgentApplication;
// Configuration object constructed.

// create UserAgentApplication instance
const userAgentApplication = new UserAgentApplication({
    auth: {
        clientId: "574f7932-d2aa-4973-914d-d10b275731e1",
        redirectUri: "http://localhost:8080/sso"
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false
    }
});
const authCallback = (error, response) => {
    console.log('error', error, response);
};
userAgentApplication.handleRedirectCallback(authCallback);
const login = () => {
    const loginRequest = {
        scopes: ["user.read", "profile"]
    }
    const user = userAgentApplication.getAccount();
    if (!user) {
        userAgentApplication.loginRedirect(loginRequest);
    } else {
        // console.log('user', user);
    }
}
export const auth = {
    login() {
        login();
    },
    getToken() {
        return new Promise((res, rej) => {
            const loginRequest = {
                scopes: ["user.read", "profile"]
            }
            userAgentApplication.acquireTokenSilent(loginRequest).then(response => {
                localStorage.setItem('msal_token', response.accessToken);
                res({ token: response });
            });
        });
    }
};
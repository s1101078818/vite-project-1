import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import { msalPlugin } from "./plugins/msalPlugin";
import { msalInstance } from "./authConfig";
import { AuthenticationResult, EventType } from "@azure/msal-browser";

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        msalInstance.setActiveAccount(account);
    }
});

const app = createApp(App);
app.use(msalPlugin, msalInstance);
app.use(router)
router.isReady().then(() => {
    app.mount('#app');
});

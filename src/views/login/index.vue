<template>
    <div class="main">
        <h3 v-if="!isAuthenticated" class="title">统一配置管理</h3>
        <el-button type="primary" @click="loginPopup" class="button">登录</el-button>
        <!-- <el-button @click="getGraphData">获取信息</el-button> -->
    </div>
</template>

<script lang="ts" setup>

import { useIsAuthenticated } from "../../api/login/useIsAuthenticated";
import { InteractionRequiredAuthError, InteractionStatus, PublicClientApplication } from "@azure/msal-browser";
import { useRouter } from "vue-router";
import { loginGetToken, loginRequest } from "../../authConfig"
import { useMsal } from '../../api/login/useMsal';

import { UserInfo } from "../../utils/UserInfo";
import { reactive, watch } from "vue";
import { callMsGraph } from "../../utils/MsGraphApiCall";

const { instance, inProgress } = useMsal();

const isAuthenticated = useIsAuthenticated();

const router = useRouter();

const loginPopup = () => {
    instance.loginPopup(loginRequest);
    getGraphData();
}

const state = reactive({
    resolved: false,
    data: {} as UserInfo
});

async function getGraphData() {
    const response = await instance.acquireTokenSilent({
        ...loginRequest
    }).catch(async (e) => {
        if (e instanceof InteractionRequiredAuthError) {
            await instance.acquireTokenRedirect(loginRequest);
        }
        throw e;
    });
    if (inProgress.value === InteractionStatus.None) {
        const graphData = await callMsGraph(response.accessToken);
        // console.log(graphData);
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("graphData", JSON.stringify(graphData));
        state.data = graphData;
        state.resolved = true;
        stopWatcher();
        // 登录成功后，存储用户名并跳转页面到Home
        if (sessionStorage.getItem("graphData")) {
            getNewToken();
            // getToekn();
            // 等2秒
            setTimeout(() => {
                router.push("/B2C");
            }, 2000)

            // console.log("这里是1111111111111");
            // console.log(sessionStorage.getItem("user_impersonation_token"));
        }
        else {
            alert("登录失败，请重试");
            router.push("/login");
        }
    }
}

// async function getToekn() {
//     const response = await instance.acquireTokenSilent({
//         ...loginGetToken
//     })
//     console.log("在这里哦");

//     console.log(response);

//     sessionStorage.setItem("超级大牛", response.accessToken);
//     console.log(response.accessToken);
// }

const stopWatcher = watch(inProgress, () => {
    if (!state.resolved) {
        getGraphData();
    }
});

// 获取新的accesstoken
const getNewToken = () => {

    instance.acquireTokenSilent({
        ...loginGetToken
    })
        .then(function (accessTokenResponse) {
            // Acquire token silent success
            let accessToken = accessTokenResponse.accessToken;
            // Call your API with token
            // console.log("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈");
            sessionStorage.setItem("user_impersonation_token", accessToken);
            // console.log(sessionStorage.getItem("user_impersonation_token"));

        })
        .catch(function (error) {

            //Acquire token silent failure, and send an interactive request
            if (error instanceof InteractionRequiredAuthError) {
                instance
                    .acquireTokenPopup({
                        ...loginGetToken
                    })
                    .then(function (accessTokenResponse) {
                        // Acquire token interactive success
                        let accessToken = accessTokenResponse.accessToken;
                        // Call your API with token

                        sessionStorage.setItem("user_impersonation_token", accessToken);
                        // console.log(accessToken);
                    })
                    .catch(function (error) {
                        // Acquire token interactive failure

                        console.log(error);
                    });
            }
            // console.log("傻逼");

            console.log(error);
        });
}
</script>

<style>
/* 背景图片要撑满整个屏幕且居中 */

.title {
    font-size: 50px;
    color: black;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, .5);
    margin-bottom: 20px;
}

.button {
    margin-top: 20px;
}
</style>
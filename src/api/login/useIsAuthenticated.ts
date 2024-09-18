import { Ref, ref, watch } from "vue";
import { useMsal } from "./useMsal";

// 这个函数的主要用途是在Vue应用中，根据用户的认证状态来控制某些组件或功能的显示。
// 例如，可以用来决定是否显示登录按钮或用户信息。
// 由于使用了Vue的响应式系统，当accounts发生变化时，isAuthenticated会自动更新，因此不需要手动调用更新函数。
// 如果accounts数组为空，isAuthenticated的值将为false，表示用户未登录。

export function useIsAuthenticated(): Ref<boolean> {
    const { accounts } = useMsal();
    const isAuthenticated = ref(accounts.value.length > 0);

    watch(accounts, () => {
        isAuthenticated.value = accounts.value.length > 0;
    });

    return isAuthenticated;
}
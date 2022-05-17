import { ref, Ref, UnwrapRef } from 'vue';

export function useDrawer<T>(params: {
    drawerDetailValue: T;
    defaultState?: boolean;
}): ({
    isDrawerOpen: Ref<boolean>;
    drawerDetailValue: Ref<UnwrapRef<T>>;
    openDrawer: (infoIn: T) => void
}) {
    const isDrawerOpen = ref(params.defaultState ?? false);
    const drawerDetailValue = ref(params.drawerDetailValue);
    const openDrawer = (infoIn: any) => {
        drawerDetailValue.value = infoIn;
        isDrawerOpen.value = true;
    }
    return {
        isDrawerOpen,
        drawerDetailValue,
        openDrawer
    }
}
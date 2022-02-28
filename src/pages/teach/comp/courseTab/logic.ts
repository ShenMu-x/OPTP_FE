import { useRoute } from 'vue-router';


export const getCourseId = () => {
    const route = useRoute();
    return parseInt(route?.params?.courseId?.[0]);
}
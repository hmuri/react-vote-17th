import axios, { AxiosError } from 'axios';

export const fetchUserPart = async () => {
    try {
        const accessToken = localStorage?.getItem('access')?.replace(/"/g, '');
        const response = await axios.get(`https://ceos-vote.kro.kr/accounts/login/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userName = response.data.data.name;
        const userPart = response.data.data.part;
        return { userPart, userName };
    } catch (error) {
        console.error(error);
        // AxiosError 객체로 캐스팅
        const axiosError = error as AxiosError;

        // response 객체를 통해 상세 정보에 접근
        if (axiosError.response) {
            console.log('Response Data:', axiosError.response.data);
            console.log('Response Status:', axiosError.response.status);
            console.log('Response Headers:', axiosError.response.headers);
        }

        // request 객체를 통해 요청 정보에 접근
        if (axiosError.request) {
            console.log('Request:', axiosError.request);
        }

        // 에러 메시지 출력
        console.log('Error Message:', axiosError.message);
    }
};

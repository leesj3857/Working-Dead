import axios from "axios";

// API 기본 설정
const API_BASE_URL = "https://whend.app";

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: /meetings/{code}/* 형태의 요청에 대해
// 로컬스토리지에 {code} 키로 저장된 JWT(accessToken)를 Bearer로 설정
// 단, 참가자 등록(/participants/register)은 제외
apiClient.interceptors.request.use((config) => {
  try {
    const url = config.url ?? "";

    if (url.includes("/participants/register")) {
      return config;
    }

    const match = url.match(/\/meetings\/([^/]+)/);
    const code = match?.[1];

    if (code) {
      const stored = localStorage.getItem(code);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const token = parsed?.accessToken;
          if (token) {
            config.headers = config.headers ?? {};
            (config.headers as any).Authorization = `Bearer ${token}`;
          }
        } catch {
          // ignore JSON parse error
        }
      }
    }
  } catch {
    // ignore
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 백엔드가 내려가 있는 동안 프론트 개발 시 콘솔이 너무 더러워지는 것을 방지
    // (실패 자체는 각 API 함수에서 try/catch로 더미 fallback 처리)
    console.warn("API 요청 오류:", {
      message: error?.message,
      code: error?.code,
      status: error?.response?.status,
      url: error?.config?.url,
      method: error?.config?.method,
    });
    return Promise.reject(error);
  }
);



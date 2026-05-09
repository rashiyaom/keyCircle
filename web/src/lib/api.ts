const API_URL = "http://localhost:5000/api/v1";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || "An error occurred");
  }
  return data;
}

export const authApi = {
  login: (data: any) => fetchAPI("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  signup: (data: any) => fetchAPI("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  getMe: () => fetchAPI("/auth/me"),
};

export const vehicleApi = {
  list: (params?: any) => {
    const query = params ? new URLSearchParams(params).toString() : "";
    return fetchAPI(`/vehicles${query ? "?" + query : ""}`);
  },
  get: (id: string) => fetchAPI(`/vehicles/${id}`),
  create: (data: any) => fetchAPI("/vehicles", { method: "POST", body: JSON.stringify(data) }),
};

export const userApi = {
  get: (id: string) => fetchAPI(`/users/${id}`),
  update: (id: string, data: any) => fetchAPI(`/users/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

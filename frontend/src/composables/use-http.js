export const useHttp = async (path, options = {}) => {
  let baseURL = process.env.API_BASE_URL || "http://localhost:5000/api";

  const url = `${baseURL}${path}`;

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao fazer a requisição");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Erro ao fazer a requisição");
  }
};

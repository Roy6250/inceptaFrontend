const rawBase = process.env.REACT_APP_SERVER_URL || "/api";
export const API_BASE = rawBase.replace(/^https::\/\//, "https://").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function api(path, { method = "GET", body, signal } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("We couldn't connect to Incepta. Please try again shortly.");
  }
  let result;
  try {
    result = await response.json();
  } catch {
    throw new ApiError("Incepta returned an unexpected response.", response.status);
  }
  if (!response.ok || result.code === "err") {
    const message = typeof result.message === "string" ? result.message : "That request could not be completed.";
    throw new ApiError(message, response.status);
  }
  return result.message === undefined ? result : result.message;
}

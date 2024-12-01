interface EnvConfig {
  thunderforestApiKey: string;
}

export const env: EnvConfig = {
  thunderforestApiKey: import.meta.env.VITE_THUNDERFOREST_API_KEY || "",
};

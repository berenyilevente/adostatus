export const assertEnvVar = (
  envVarKey: string,
  fallbackValue?: string
): string => {
  const envVar = process.env[envVarKey] || fallbackValue;

  if (envVar === undefined) {
    throw new Error(`environment variable ${envVarKey} is missing`);
  }

  return envVar;
};

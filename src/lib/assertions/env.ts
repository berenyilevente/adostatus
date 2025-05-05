export const assertEnvVar = (
  envVarKey: string,
  fallbackValue?: string
): string => {
  const envVar = process.env[envVarKey] || fallbackValue;

  if (envVar === undefined) {
    throw new Error(`Environment variable ${envVarKey} is missing`);
  }

  return envVar;
};

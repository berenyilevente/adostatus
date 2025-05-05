import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();

/**
 * Load env variables outside the nextjs runtime, such as in a root config file for an ORM or test runner
 */
export const loadEnv = () => loadEnvConfig(projectDir);

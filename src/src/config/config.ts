const checkEnv = (envVar: string) => {
  if (!process.env[envVar]) {
    console.log(
      `[-] .env > Please define the environment variable "${envVar}"`
    );
    process.exit(1);
  } else {
    return process.env[envVar];
  }
};

export const PORT: number = Number(checkEnv("PORT_TEST"));

export const TEST_URL = checkEnv("TEST_URL") as string;

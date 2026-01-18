export function applyEnv(value, envs) {
  if (typeof value !== "string") return value;

  let result = value;

  envs.forEach(({ key, value }) => {
    result = result.replaceAll(`{{${key}}}`, value);
  });

  return result;
}

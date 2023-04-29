import { assert } from "~/utils/utils"

export const getENV = () => {
  const env = typeof document === 'undefined' ? process?.env : window?.ENV
  assert(env, `Failed to resolve environment variables`)
  return env
}
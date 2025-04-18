import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const REPORT_FOLDER = process.env.REPORT_FOLDER || 'reports'
export const PARALLEL = process.env.PARALLEL
  ? parseInt(process.env.PARALLEL)
  : 0
export const RETRIES = process.env.RETRIES ? parseInt(process.env.RETRIES) : 0
export const HEADLESS = process.env.HEADLESS === 'true'

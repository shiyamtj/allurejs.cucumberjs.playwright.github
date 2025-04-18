import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  ITestCaseHookParameter,
} from '@cucumber/cucumber'
import test, {
  chromium,
  firefox,
  webkit,
  Browser,
  Page,
  devices,
} from '@playwright/test'

import * as fs from 'fs'
import path from 'path'
import { HEADLESS } from '../constants'
import playwrightConfig from '../playwright.config'

declare global {
  var browser: Browser
}

BeforeAll(function () {
  // console.log('Running BeforeAll hook...')
})

AfterAll(function () {
  // console.log('Running AfterAll hook...')
})

Before(async function (testCase) {
  console.log(`[INFO] Executing: ${testCase.pickle.name}`)
  // Conditionally enable video recording based on the RECORD environment variable
  const recordVideo =
    process.env.RECORD === 'true' ? { dir: 'reports/videos/' } : undefined

  const worldParameters = this.parameters || {}
  this.browser = await initializeBrowser(worldParameters)

  // Extract device configuration from world parameters
  const device = worldParameters?.device ?? devices['Desktop']

  const viewport = worldParameters?.device
    ? {
        width: device.width,
        height: device.height,
      }
    : null
  // Create a new browser context and page before each scenario
  this.context = await this.browser.newContext({
    viewport: viewport,
    recordVideo: recordVideo,
  })
  this.page = await this.context.newPage()
})

After(async function (testCase) {
  const screenshot = await (this.page as Page).screenshot({ fullPage: true })
  this.attach(screenshot, 'image/png')

  await this.page.close()
  await this.context.close()
  await this.browser.close()

  // Log the video path if recording was enabled
  if (process.env.RECORD === 'true') {
    await handleRecordingFilesFunction(testCase, this.page)
  }
  console.log(`[INFO] Completed: ${testCase.pickle.name}`)
})

// This function is called after each scenario to handle video recording
async function handleRecordingFilesFunction(
  testCase: ITestCaseHookParameter,
  page: Page
) {
  const { result } = testCase

  const videoPath = (await page.video()?.path()) as string
  const videoFileName = path.basename(videoPath)

  const currentDirectory = process.cwd()
  const newFileVideoName = `${testCase.pickle.name.replace(
    /[^a-zA-Z0-9]/g,
    '_'
  )}_${result?.status}-${videoFileName}.webm`

  const renamedVideoPath = path.join(
    currentDirectory,
    'reports',
    'videos',
    newFileVideoName
  )

  fs.promises.rename(videoPath, renamedVideoPath).catch((err) => {
    console.error('Error renaming video file:', err)
  })
}

async function initializeBrowser(worldParameters: any): Promise<Browser> {
  const browserType =
    worldParameters.browser || process.env.BROWSER || 'chromium'

  switch (browserType.toLowerCase()) {
    case 'chromium':
      return await chromium.launch({
        headless: HEADLESS,
      })
    case 'firefox':
      return await firefox.launch({
        headless: HEADLESS,
      })
    case 'webkit':
      return await webkit.launch({
        headless: HEADLESS,
      })
    default:
      throw new Error(`Unsupported browser type: ${browserType}`)
  }
}

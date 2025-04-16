import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setWorldConstructor,
} from '@cucumber/cucumber'
import { chromium, Browser, BrowserContext, Page } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

declare global {
  var browser: Browser
}

BeforeAll(async function () {
  // Launch the browser before all tests
  global.browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true',
  })
})

AfterAll(async function () {
  // Close the browser after all tests
  await global.browser.close()
})

Before(async function () {
  // Create a new browser context and page before each scenario
  this.context = await global.browser.newContext()
  this.page = await this.context.newPage()
})

After(async function () {
  // Close the page and context after each scenario
  await this.page.close()
  await this.context.close()
})

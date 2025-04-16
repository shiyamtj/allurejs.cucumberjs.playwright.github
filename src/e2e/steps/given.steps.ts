import { Given } from '@cucumber/cucumber'
import { Page } from '@playwright/test'

let page: Page

Given('I navigate to {string}', async function (url) {
  await this.page.goto(url)
})

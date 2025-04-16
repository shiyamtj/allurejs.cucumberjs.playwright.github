import { Then } from '@cucumber/cucumber'
import { Page, expect } from '@playwright/test'

let page: Page

Then(
  'I should see locator {string} tobeVisible',
  async function (locationString: string) {
    page = this.page
    await expect(page.locator(locationString)).toBeVisible()
  }
)

Then(
  'I should see locator {string} toHaveValue as {string}',
  async function (locationString: string, value: string) {
    await expect(page.locator(locationString)).toHaveValue(value)
  }
)

Then(
  'I should see button role element with text {string} tobeVisible',
  async function (value: string) {
    await expect(page.getByRole('button', { name: value })).toBeVisible()
  }
)

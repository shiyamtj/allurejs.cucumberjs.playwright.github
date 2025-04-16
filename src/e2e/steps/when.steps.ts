import { When } from '@cucumber/cucumber'
import { Page } from '@playwright/test'

let page: Page

When(
  'I fill {string} locator with {string}',
  async function (value: string, locationString: string) {
    page = this.page
    await page.locator(locationString).fill(value)
  }
)

When('I click locator {string}', async function (locationString: string) {
  await page.locator(locationString).click()
})

When(
  'I click button role element with text {string}',
  async function (value: string) {
    await page.getByRole('button', { name: value }).click()
  }
)

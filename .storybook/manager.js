import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

addons.register('TitleAddon', (api) => {
  api.on(STORY_RENDERED, () => {
    document.title = 'JDM Editor'
  })
})

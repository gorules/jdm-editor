import { STORY_RENDERED } from '@storybook/core-events';
import { addons } from '@storybook/manager-api';

addons.register('TitleAddon', (api) => {
  api.on(STORY_RENDERED, () => {
    document.title = 'JDM Editor';
  });
});

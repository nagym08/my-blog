import { useLayoutEffect } from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'light';
      // Reflect the toolbar theme onto <html data-theme> in a layout effect —
      // it runs synchronously after commit, before paint and before the a11y
      // addon evaluates contrast, without mutating the DOM during render.
      useLayoutEffect(() => {
        if (theme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }, [theme]);
      return (
        <div
          style={{
            fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
            color: 'var(--text-primary)',
            background: 'var(--surface-base)',
            padding: '1.5rem',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

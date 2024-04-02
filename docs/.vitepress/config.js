import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ternel",
  description: "A terminal-like application.",
    srcDir: "src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' }
    ],

    sidebar: [
        /*
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
      */

        {
            text: "Introduction",
            items: [
                {text: "About", link: "/docs/"},
                {text: "Apps", link: "/docs/intro/apps.md"}
            ]
        },
     {
        text: 'Write Application',
        items: [
          { text: 'Getting Started', link: '/docs/build/' },
          { text: 'Vanilla HTML/CSS/JS', link: '/markdown-examples' },
          { text: 'With Vue', link: '/api-examples' }
        ]
      },
        {
            text: "Contribute",
            items: [
                {text: "Github", link: "https://github.com/sujaudd1n/ternel"}
            ]
        }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sujaudd1n/ternel' },

      { icon: 'download', link: 'https://github.com/sujaudd1n/ternel' }
    ]
  }
})

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Horizon Protocol',
  tagline: 'Decentralized, gamified coordination for real-world missions',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Production URL
  url: 'https://docs.horizonprotocol.xyz',
  baseUrl: '/',

  // GitHub org/repo for deployment
  organizationName: 'HrznLabs',
  projectName: 'horizon-docs',

  onBrokenLinks: 'throw',

  markdown: {
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      return result;
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/HrznLabs/horizon-docs/tree/main/',
          // Disabled for Vercel deployment (no git history available)
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false, // Disabled for public docs
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/horizon-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'v2_1_launch',
      content:
        '🚀 Horizon Protocol v2.1 is now live on Base Sepolia! <a target="_blank" rel="noopener noreferrer" href="/docs/guides/getting-started">Get started →</a>',
      backgroundColor: '#00FF88',
      textColor: '#0A0A0B',
      isCloseable: true,
    },
    navbar: {
      title: 'Horizon',
      logo: {
        alt: 'Horizon Protocol Logo',
        src: 'img/logo.jpg',
        srcDark: 'img/logo.jpg',
        style: { borderRadius: '50%' },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'protocolSidebar',
          position: 'left',
          label: 'Protocol',
        },
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: 'Architecture',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sdkSidebar',
          position: 'left',
          label: 'SDK',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          position: 'left',
          label: 'API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'guidesSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'useCasesSidebar',
          position: 'left',
          label: 'Use Cases',
        },
        {
          href: 'https://github.com/HrznLabs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Protocol Overview',
              to: '/docs/protocol/overview',
            },
            {
              label: 'Smart Contracts',
              to: '/docs/architecture/smart-contracts',
            },
            {
              label: 'API Reference',
              to: '/docs/api/missions',
            },
            {
              label: 'Getting Started',
              to: '/docs/guides/getting-started',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/HrznLabs',
            },
            {
              label: 'Smart Contracts',
              href: 'https://github.com/HrznLabs/horizon-contracts',
            },
            {
              label: 'TypeScript SDK',
              href: 'https://github.com/HrznLabs/horizon-sdk',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Horizon Labs. MIT License.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'typescript', 'json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [],
};

export default config;

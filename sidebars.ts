import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Horizon Protocol Documentation Sidebars
 */
const sidebars: SidebarsConfig = {
  // Protocol Documentation
  protocolSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Protocol',
      items: [
        'protocol/overview',
        'protocol/mission-engine',
        'protocol/guilds',
        'protocol/economics',
        'protocol/governance',
      ],
    },
  ],

  // Architecture Documentation
  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/base-ecosystem',
        'architecture/mini-app',
        'architecture/smart-contracts',
        'architecture/map-layer',
        'architecture/identity',
      ],
    },
  ],

  // API Reference
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/missions',
        'api/guilds',
        'api/users',
        'api/map',
        'api/xp-nft',
        'api/feed',
        'api/ratings',
        'api/notifications',
        'api/websocket',
      ],
    },
  ],

  // Developer Guides
  guidesSidebar: [
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/getting-started',
      ],
    },
  ],
};

export default sidebars;

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Horizon Protocol Public Documentation Sidebars
 * 
 * This is the PUBLIC documentation for external developers.
 * Contains integration guides, API references, and use cases.
 * NO internal algorithms or proprietary implementation details.
 */
const sidebars: SidebarsConfig = {
  // Main Documentation Sidebar
  protocolSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Protocol',
      collapsed: false,
      items: [
        'protocol/overview',
        'protocol/mission-engine',
        'protocol/guilds',
        'protocol/economics',
        'protocol/governance',
        'protocol/geofencing',
      ],
    },
  ],

  // Architecture Documentation
  architectureSidebar: [
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/base-ecosystem',
        'architecture/mini-app',
        'architecture/smart-contracts',
        'architecture/map-layer',
        'architecture/identity',
      ],
    },
  ],

  // SDK Documentation
  sdkSidebar: [
    {
      type: 'category',
      label: 'SDK',
      collapsed: false,
      items: [
        'sdk/overview',
        'sdk/quickstart',
        'sdk/api-reference',
      ],
    },
  ],

  // API Reference
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
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
        'api/disputes',
        'api/data-vault',
        'api/websocket',
      ],
    },
  ],

  // Developer Guides
  guidesSidebar: [
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/getting-started',
        'guides/creating-missions',
        'guides/achievements',
        'guides/becoming-resolver',
      ],
    },
  ],

  // Use Cases (Verticals)
  useCasesSidebar: [
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'use-cases/overview',
        'use-cases/itake',
        'use-cases/ridesdao',
        'use-cases/builddao',
      ],
    },
  ],
};

export default sidebars;

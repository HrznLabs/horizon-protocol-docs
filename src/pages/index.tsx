import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/">
            Get Started →
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{marginLeft: '1rem'}}
            to="/docs/guides/getting-started">
            Developer Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

function QuickLinks(): ReactNode {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <h3>📜 Smart Contracts</h3>
              <p>Explore MissionEscrow, PaymentRouter, GuildDAO, and other on-chain components.</p>
              <Link to="/docs/architecture/smart-contracts">View Contracts →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <h3>🔌 API Reference</h3>
              <p>REST endpoints for missions, guilds, users, map, XP, and real-time WebSocket events.</p>
              <Link to="/docs/api/overview">Browse API →</Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <h3>🔧 TypeScript SDK</h3>
              <p>ABIs, utilities, and contract addresses for integrating with Horizon Protocol.</p>
              <Link to="https://github.com/HrznLabs/horizon-sdk">View SDK →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Deployments(): ReactNode {
  const contracts = [
    { name: 'MissionFactory', address: '0xee9234954b134c39c17a75482da78e46b16f466c' },
    { name: 'PaymentRouter', address: '0x94fb7908257ec36f701d2605b51eefed4326ddf5' },
    { name: 'GuildFactory', address: '0xfeae3538a4a1801e47b6d16104aa8586edb55f00' },
    { name: 'DisputeResolver', address: '0xb00ac4278129928aecc72541b0bcd69d94c1691e' },
    { name: 'HorizonAchievements', address: '0x568e0e3102bfa1f4045d3f62559c0f9823b469bc' },
  ];

  return (
    <section className={styles.deployments}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Deployed on Base Sepolia
        </Heading>
        <div className={styles.contractGrid}>
          {contracts.map((contract) => (
            <a
              key={contract.name}
              href={`https://sepolia.basescan.org/address/${contract.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contractCard}
            >
              <span className={styles.contractName}>{contract.name}</span>
              <code className={styles.contractAddress}>
                {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
              </code>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="Decentralized, gamified coordination platform for real-world missions on Base L2">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <QuickLinks />
        <Deployments />
      </main>
    </Layout>
  );
}

import {useState, useEffect, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {/* {siteConfig.title} */}
          Horizon Protocol
        </Heading>
        <p className="hero__subtitle">
            {/* {siteConfig.tagline} */}
            Decentralized, gamified coordination for real-world missions
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.heroButton)}
            to="/docs/">
            Get Started <ArrowRightIcon className={styles.arrowRightIcon} />
          </Link>
          <Link
            className="button button--secondary button--lg"
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
        <Heading as="h2" className="sr-only">Quick Links</Heading>
        <div className="row">
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <Heading as="h3"><span aria-hidden="true">📜</span> Smart Contracts</Heading>
              <p id="desc-smart-contracts">Explore MissionEscrow, PaymentRouter, GuildDAO, and other on-chain components.</p>
              <Link to="/docs/architecture/smart-contracts" aria-describedby="desc-smart-contracts">
                View Contracts <ArrowRightIcon className={styles.arrowRightIcon} />
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <Heading as="h3"><span aria-hidden="true">🔌</span> API Reference</Heading>
              <p id="desc-api-reference">REST endpoints for missions, guilds, users, map, XP, and real-time WebSocket events.</p>
              <Link to="/docs/api/overview" aria-describedby="desc-api-reference">
                Browse API <ArrowRightIcon className={styles.arrowRightIcon} />
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.quickLinkCard}>
              <Heading as="h3"><span aria-hidden="true">🔧</span> TypeScript SDK</Heading>
              <p id="desc-ts-sdk">ABIs, utilities, and contract addresses for integrating with Horizon Protocol.</p>
              <Link
                to="https://github.com/HrznLabs/horizon-sdk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View SDK (opens in a new tab)"
                aria-describedby="desc-ts-sdk"
              >
                View SDK <ExternalLinkIcon size={16} className={styles.externalLinkIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyButton({text}: {text: string}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // 🛡️ Sentinel: Fail securely by not exposing clipboard error details to the console
      // eslint-disable-next-line no-console
      console.error('Failed to copy address to clipboard');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(styles.copyButton, copied && styles.copyButtonCopied)}
      aria-label={copied ? "Copied!" : "Copy address"}
    >
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied!" : ""}
      </span>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  );
}

function ExternalLinkIcon({size = 12, className}: {size?: number, className?: string}) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

function ArrowRightIcon({size = 16, className}: {size?: number, className?: string}) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}

// Hoisted static data to prevent recreation on every render
const contracts = [
  { name: 'MissionFactory', address: '0xee9234954b134c39c17a75482da78e46b16f466c' },
  { name: 'PaymentRouter', address: '0x94fb7908257ec36f701d2605b51eefed4326ddf5' },
  { name: 'GuildFactory', address: '0xfeae3538a4a1801e47b6d16104aa8586edb55f00' },
  { name: 'DisputeResolver', address: '0xb00ac4278129928aecc72541b0bcd69d94c1691e' },
  { name: 'HorizonAchievements', address: '0x568e0e3102bfa1f4045d3f62559c0f9823b469bc' },
].map(c => ({
  ...c,
  shortAddress: `${c.address.slice(0, 6)}...${c.address.slice(-4)}`,
}));

function Deployments(): ReactNode {
  return (
    <section className={styles.deployments}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Deployed on Base Sepolia
        </Heading>
        <div className={styles.contractGrid}>
          {contracts.map((contract) => (
            <div
              key={contract.name}
              className={styles.contractCard}
            >
              <Link
                href={`https://sepolia.basescan.org/address/${contract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contractName}
                aria-label={`${contract.name} (opens in a new tab)`}
              >
                {contract.name}
                <ExternalLinkIcon />
              </Link>
              <div className={styles.addressWrapper}>
                <code className={styles.contractAddress}>
                  {contract.shortAddress}
                </code>
                <CopyButton text={contract.address} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  // const {siteConfig} = useDocusaurusContext();
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

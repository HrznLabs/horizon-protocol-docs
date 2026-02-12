import {memo, type ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Mission Escrow',
    emoji: '🎯',
    description: (
      <>
        Post missions with escrowed USDC rewards. Performers accept, complete, 
        and get paid automatically through secure smart contracts.
      </>
    ),
  },
  {
    title: 'Guild Coordination',
    emoji: '⚔️',
    description: (
      <>
        Form guilds to curate mission boards, share reputation, and coordinate 
        as a team. DAO governance for fee settings and treasury management.
      </>
    ),
  },
  {
    title: 'Location Verified',
    emoji: '📍',
    description: (
      <>
        Geofenced missions with privacy-preserving location proofs. Approximate 
        locations before acceptance, precise coordinates after.
      </>
    ),
  },
  {
    title: 'XP & Achievements',
    emoji: '🏆',
    description: (
      <>
        Level up through 25 tiers, earn soulbound NFT achievements, and unlock 
        perks like priority missions and reduced fees.
      </>
    ),
  },
  {
    title: 'On-chain Reputation',
    emoji: '⭐',
    description: (
      <>
        Ratings stored as EAS attestations on Base. Gasless submissions via 
        CDP Paymaster. Verifiable, portable reputation.
      </>
    ),
  },
  {
    title: 'Built on Base',
    emoji: '🔵',
    description: (
      <>
        Native USDC payments, Basenames integration, Coinbase Wallet support, 
        and low-cost transactions on Base L2.
      </>
    ),
  },
];

// ⚡ Bolt: Memoized to prevent unnecessary re-renders
const Feature = memo(function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureEmoji}>{emoji}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
});

// ⚡ Bolt: Memoized to prevent unnecessary re-renders
export default memo(function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
});

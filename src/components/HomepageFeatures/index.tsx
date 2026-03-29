import {type ReactNode} from 'react';
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

// ⚡ Bolt: Removed React.memo() as parent Home component has no state and never re-renders.
// Memoizing static components adds unnecessary initialization overhead and memory allocation without any render-saving benefits.
function Feature({title, emoji, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <div className={styles.featureEmoji} aria-hidden="true">{emoji}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

// ⚡ Bolt: Removed React.memo() as parent Home component has no state and never re-renders.
// Memoizing static components adds unnecessary initialization overhead and memory allocation without any render-saving benefits.
function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="sr-only">Key Features</Heading>
        <div className="row">
          {FeatureList.map((props) => (
            // ⚡ Bolt: Using a unique property (title) as key instead of array index.
            // This ensures stable identity across re-renders, optimizing diffing and preventing potential bugs if the list changes.
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomepageFeatures;

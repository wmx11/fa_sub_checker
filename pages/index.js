import Head from 'next/head';
import { BlueButton } from '../components/Buttons';
import Card from '../components/Card';
import Layout from '../components/Layout';
import { discordLink } from '../config/config';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Freedom Average</title>
        <meta name="description" content="Freedom Average" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Card>
          <h1 className="text-white text-4xl font-bold">
            Freedom Over Average
          </h1>
          <p className="text-white text-xl max-w-md mt-4">
            Freedom Over Average is a group where us like minded individuals
            come together to network, build connections, and build a value for
            value community that wants to choose Financial Freedom over the
            Average 9-5 lifestyle.
          </p>
          <p className="mt-4">
            <BlueButton>
              <a href={discordLink} target="_blank" rel="noreferrer">
                Join us on Discord
              </a>
            </BlueButton>
          </p>
        </Card>
      </Layout>
    </div>
  );
}

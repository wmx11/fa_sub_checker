import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { RedButton } from '../../components/Buttons';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { checkUserExists } from '../../utils/users';

function Verify({ user }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Card>
        {user.discord_id === id ? (
          <>
            <div>
              <h1 className="text-2xl text-white">
                Limited time Discord <strong>premium</strong> role
              </h1>
            </div>
            <div className="mt-4 flex justify-center">
              <RedButton
                onClick={() =>
                  signIn('google', {
                    callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/verify/thank-you?user=${id}`,
                  })
                }
              >
                {!user.isSubscribed ? (
                  <>
                    Grab your <strong>300</strong> role now!
                  </>
                ) : (
                  'Re-check your subscription'
                )}
              </RedButton>
            </div>
          </>
        ) : (
          <>
            <p>This user does not exist</p>
          </>
        )}
      </Card>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const existingUser = await checkUserExists(query.id);
  const user = {
    discord_id: existingUser?.discord_id || null,
    isSubscribed: existingUser?.is_subscribed || null,
  };

  if (!user.discord_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Verify;

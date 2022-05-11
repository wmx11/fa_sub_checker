import axios from 'axios';
import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react';
import { RedButton } from '../../components/Buttons';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import config, { youtubeLink } from '../../config/config';
import { checkUserExists } from '../../utils/users';

function ThankYou({ user }) {
  const [message, setMessage] = useState('');
  const [showNotSubscribedMessage, setShowNotSubscribedMessage] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const setSubState = (response) =>
    axios(
      `/freedom-average/api/youtube/setIsSubscribed?user=${user.id}&isSubscribed=${response}`
    );

  useEffect(() => {
    const checkIsSubscribed = async () => {
      const req = await axios('/freedom-average/api/youtube/verifySub');
      if (req.data) {
        return req.data?.channelId === config.channelId;
      }
      return false;
    };

    if (user.id) {
      checkIsSubscribed()
        .then((res) => {
          if (!res) {
            setMessage('Looks like you are not subscribed to Austin Clark.');
            setShowNotSubscribedMessage(true);
            setIsLoading(false);
            setSubState(res);
            axios.post(
              `${process.env.NEXT_PUBLIC_SET_ROLE_ENDPOINT}/${user.discord_id}?isSubscribed=${res}`
            );
            return;
          }

          setMessage('Thank you for verifying! You may now close this window!');
          setIsLoading(false);
          setSubState(res);
          axios.post(
            `${process.env.NEXT_PUBLIC_SET_ROLE_ENDPOINT}/${user.discord_id}?isSubscribed=${res}`
          );

          // Redirect after 5s
          setTimeout(() => {
            router.push('/');
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setMessage('An error occurred.');
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Layout>
      <div className="max-w-xl mt-4">
        <Card>
          {isLoading ? (
            <p className="font-bold text-white text-2xl">
              We are checking if you are a subscriber...
            </p>
          ) : (
            <>
              <p className="font-bold text-white text-2xl">{message}</p>
              {showNotSubscribedMessage && (
                <>
                  <p className="mt-4 flex justify-center">
                    <RedButton>
                      <a href={youtubeLink} target="_blank" rel="noreferrer">
                        Subscribe to <strong>Austin Clark</strong>
                      </a>
                    </RedButton>
                  </p>
                  <p className="text-white mt-4 italic">
                    *After subscribing, please refresh this page.
                  </p>
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const existingUser = await checkUserExists(query.user);
  const user = {
    id: existingUser?.id || null,
    discord_id: existingUser?.discord_id || null,
    isSubscribed: existingUser?.is_subscribed || null,
  };

  if (!user.id) {
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

export default ThankYou;

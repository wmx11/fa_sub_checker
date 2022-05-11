import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import config from '../../../config/config';

const secret = process.env.JWT_SECRET;
const apiKey = process.env.GOOGLE_API_KEY;

let accessToken = null;

export default async function verifySub(req, res) {
  const token = await getToken({ req, secret });

  if (token) {
    accessToken = token?.access_token;
  }

  if (!accessToken) {
    return res.status(400).json({
      success: false,
      message: 'Missing access token',
    });
  }

  try {
    const request = await axios({
      url: `https://youtube.googleapis.com/youtube/v3/subscriptions`,
      withCredentials: true,
      params: {
        part: 'snippet,contentDetails',
        forChannelId: config.channelId,
        mine: true,
        key: apiKey,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });

    const {
      data: { items },
    } = request;
    const subscription = items[0]?.snippet?.resourceId?.channelId;

    res.status(200).json({
      channelId: subscription,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Uh oh! We are experiencing some issues',
    });
  }
}

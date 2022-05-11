import { setIsSubscribed } from '../../../utils/users';

export default async function setSubscriptionStatus(req, res) {
  const { user, isSubscribed } = req.query;

  try {
    await setIsSubscribed(parseInt(user, 10), JSON.parse(isSubscribed));
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (data) => {
  const entry = await prisma.user.create({
    data: { ...data },
  });

  return entry;
};

const isUsersFull = async (maxAmount = 300) => {
  const count = await prisma.user.count({
    where: {
      is_subscribed: true,
    },
  });

  return { count, isFull: count >= maxAmount };
};

const editUser = async (id, data) => {
  const entry = await prisma.user.update({
    where: {
      id,
    },
    data: { ...data },
  });

  return entry;
};

const setIsSubscribed = async (id, isSubscribed) => {
  try {
    const entry = await editUser(id, {
      is_subscribed: isSubscribed,
    });

    return entry;
  } catch (error) {
    console.log(error);
  }
};

const checkUserExists = async (discord_id) => {
  const entry = await prisma.user.findFirst({
    where: {
      discord_id,
    },
  });

  return entry;
};

module.exports = {
  createUser,
  editUser,
  checkUserExists,
  setIsSubscribed,
  isUsersFull,
};

const users = [
  {
    full_name: "isha",
    email: "isha@gmail.com",
    password: "isha@1234",
    region: "North",
    contact_number:"0123456789",
    user_type: "Admin",
  },
  {
    full_name: "isha",
    email: "isha144399@gmail.com",
    password: "isha@1234",
    region: "North",
    contact_number:"9876543210",
    user_type: "Admin",
  },{

  },
];

const publicPosts = [
  {
    title: "Post 1",
    content: "Post 1 is free",
  },
  {
    title: "Post 2",
    content: "Post 2 is free",
  },
];

const privatePosts = [
  {
    title: "Post 3",
    content: "Post 3 is private",
  },
];

module.exports = { users, publicPosts, privatePosts };

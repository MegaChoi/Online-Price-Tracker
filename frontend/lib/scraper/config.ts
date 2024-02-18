const username = String(process.env.BRIGHTDATA_USERNAME);
const password = String(process.env.BRIGHTDATA_PASSWORD);
const port = 22225;
const session_id = (1000000 * Math.random()) | 0;

const proxyOptions = {
  auth: {
    username: `${username}-session-${session_id}`,
    password,
  },
  host: 'brd.superproxy.io',
  port,
  rejectUnauthorized: false,
};

export default proxyOptions;
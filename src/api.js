import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.airstack.xyz/graphql';
const client = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': `Bearer YOUR_API_KEY`, // جایگزین کردن API Key خودتان
  },
});

const query = `
  query BaseMoxieEarningForFarcasterAccounts {
    FarcasterMoxieEarningStats(
      input: {timeframe: TODAY, blockchain: base, filter: {entityType: {_eq: USER}}}
    ) {
      FarcasterMoxieEarningStat {
        allEarningsAmount
        castEarningsAmount
        entityId
        entityType
        timeframe
      }
    }
  }
`;

export const fetchData = async () => {
  try {
    const data = await client.request(query);
    return data.FarcasterMoxieEarningStats.FarcasterMoxieEarningStat;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

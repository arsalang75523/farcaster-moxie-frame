import { GraphQLClient } from 'graphql-request';

// URL و کلید API
const endpoint = 'https://app.airstack.xyz/query/oK3b0Zx0bp';
const apiKey = '13827f8b8c521443da97ed54d4d6a891d';

// ایجاد نمونه GraphQLClient
const client = new GraphQLClient(endpoint, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',  // معمولا لازم است که نوع محتوا مشخص شود
  },
});

// کوئری GraphQL برای دریافت داده‌ها
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

export const fetchData = async (fid) => {
  try {
    // ارسال درخواست GraphQL با کوئری
    const data = await client.request(query);
    return data.FarcasterMoxieEarningStats.FarcasterMoxieEarningStat;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

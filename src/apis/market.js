import server from '.';

export const getExchangeInfoResult = async () => {
  const { data: response } = await server.get('/exchangeInfo');
  return response;
};

import { apiClientFactory } from './apiFactory';

const url = 'https://api.stackexchange.com';
const client = apiClientFactory({
  baseURL: url
});

/**
 *
 * @param param0
 * @returns promise
 */
export const GETv1Tags = ({
  pageSize = 10,
  page = 1,
  text = ''
}): Promise<any> => {
  const params = {
    page,
    pageSize,
    order: 'desc',
    sort: 'popular',
    site: 'stackoverflow',
    inname: text
  };
  const url = '/2.3/tags';

  return client.get(url, {
    params
  });
};

export const GETv1Questions = ({
  page = 1,
  pageSize = 20,
  tag = ''
}): Promise<any> => {
  const params = {
    page,
    pageSize,
    tagged: tag,
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow'
  };

  const url = '/2.3/questions';

  return client.get(url, {
    params
  });
};

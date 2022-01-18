import instance from "./instance";

export const fetcher = async (...args) =>
  await instance()(...args).then((res) => res.data.data);

export const fetcherwithParams = (search, ...args) =>
  instance()(...args, {
    params: {
      search: search,
    },
  }).then((res) => res.data.data);

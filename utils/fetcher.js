import Cookies from "js-cookie";
import instance from "./instance";

export const fetcher = async (...args) =>
  await instance()(...args).then((res) => res.data.data);

export const fetcherwithParams = (
  category,
  sort,
  search,
  page,
  limit,
  ...args
) =>
  instance()(...args, {
    params: {
      search: search,
      category: category,
      sort: sort,
      page: page || 1,
      limit: limit || 6,
    },
  }).then((res) => res.data.data);

export const fetchWithToken = (...args) =>
  instance()(...args, {
    headers: { Authorization: "Bearer " + Cookies.get("access_token") },
  }).then((res) => res.data.data);

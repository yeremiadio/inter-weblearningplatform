import instance from "./instance";

export const fetcher = async (...args) => {
  const res = await instance()(...args);

  if (!res.data) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.data.data;
    error.status = res.status;
    throw error;
  }

  return res.data.data;
};

export const fetcherwithParams = (search, ...args) =>
  instance()(...args, {
    params: {
      search: search,
    },
  }).then((res) => res.data.data);

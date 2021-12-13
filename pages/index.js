import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export default function Home() {
  const {
    data: pages,
    mutate,
    error,
  } = useSWR([`api/pages`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  return (
    <>
      <div>
        {!pages && error
          ? "No Data"
          : pages?.map((item, i) => (
              <div key={i}>
                <h3>{item.name}</h3>
              </div>
            ))}
      </div>
    </>
  );
}

import useSWR from "swr";
import CustomCard from "../components/Card/Card";
import { fetcher } from "../utils/fetcher";

export default function Home() {
  const { data: pages, error } = useSWR([`api/pages`], (url) => fetcher(url), {
    revalidateOnFocus: false,
  });
  return (
    <>
      <div>
        {!pages && error
          ? "No Data"
          : pages?.map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <CustomCard {...item} />
              </div>
            ))}
      </div>
    </>
  );
}

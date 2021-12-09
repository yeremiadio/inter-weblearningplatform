import Admin from "../../../layouts/Admin";

export default function MaterialPage() {
  return (
    <>
      {/* <Head>
            <title>Dashboard - BUMDes Laut Sakti Daratan Bertuah</title>
          </Head> */}
      <div className="bg-section">
        <h3 className="font-bold text-xl text-primary">Materi</h3>
        <p className="font-base tracking-wide text-secondary">
          Lihat semua materi pembelajaran disini.
        </p>
      </div>
    </>
  );
}

MaterialPage.layout = Admin;

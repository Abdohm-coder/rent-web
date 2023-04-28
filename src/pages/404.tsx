import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import Head from "next/head";
import { useRouter } from "next/navigation";

const ErrorState = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <div className="pb-20 pt-28">
        <EmptyState title="Uh Oh" substitle="Something went wrong!" />{" "}
      </div>
    </>
  );
};

export default ErrorState;

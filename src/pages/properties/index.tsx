import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "@/actions/getListings";
import { SafeListing, SafeUser } from "@/types";
import Head from "next/head";
import Navbar from "@/components/navbar";

export async function getServerSideProps(ctx: any) {
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  const listings = await getListings({ userId: currentUser?.id });
  return {
    props: {
      listings,
      currentUser,
    },
  };
}

interface PropertiesPageProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <>
      <Head>
        <title>My Properties</title>
        <meta name="description" content="My Properties listings page" />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {!currentUser ? (
          <EmptyState title="Unauthorized" substitle="Please login" />
        ) : listings.length === 0 ? (
          <EmptyState
            title="No properties found"
            substitle="Looks like you have no properties."
          />
        ) : (
          <PropertiesClient listings={listings} currentUser={currentUser} />
        )}
      </div>
    </>
  );
};

export default PropertiesPage;

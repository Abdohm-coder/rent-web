import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./FavoritesClient";
import { SafeListing, SafeUser } from "@/types";
import Navbar from "@/components/navbar";
import Head from "next/head";

export async function getServerSideProps(ctx: any) {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  return {
    props: {
      listings,
      currentUser,
    },
  };
}

interface IParams {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesPage: React.FC<IParams> = ({ listings, currentUser }) => {
  return (
    <>
      <Head>
        <title>My Favorites</title>
        <meta name="description" content="My favorites listings page" />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {listings.length === 0 ? (
          <EmptyState
            title="No favorites found"
            substitle="Looks like you have no favorite listings"
          />
        ) : (
          <FavoritesClient listings={listings} currentUser={currentUser} />
        )}
      </div>
    </>
  );
};

export default FavoritesPage;

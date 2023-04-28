import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";
import Navbar from "@/components/navbar";
import { SafeListing, SafeUser, safeReservation } from "@/types";
import Head from "next/head";

export async function getServerSideProps(ctx: any) {
  const listing = await getListingById(ctx.query);
  const reservations = await getReservations(ctx.query);
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  return {
    props: {
      listing,
      currentUser,
      reservations,
    },
  };
}

interface IParams {
  listing: SafeListing & { user: SafeUser };
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

export default function Home({ listing, currentUser, reservations }: IParams) {
  return (
    <>
      <Head>
        <title>Listing | {listing.title}</title>
        <meta name="description" content={listing.description} />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {listing ? (
          <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}

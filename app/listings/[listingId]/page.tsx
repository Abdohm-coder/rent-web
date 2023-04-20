import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

export default async function Home({ params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  if (!listing) return <EmptyState />;
  return (
    <>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
}

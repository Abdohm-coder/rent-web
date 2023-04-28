import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import TripsClient from "./TripsClient";
import { SafeUser, safeReservation } from "@/types";
import Head from "next/head";
import Navbar from "@/components/navbar";

export async function getServerSideProps(ctx: any) {
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  const reservations = await getReservations({ userId: currentUser?.id });
  return {
    props: {
      reservations,
      currentUser,
    },
  };
}

interface TripsPageProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

const TripsPage: React.FC<TripsPageProps> = ({ reservations, currentUser }) => {
  return (
    <>
      <Head>
        <title>My Trips</title>
        <meta name="description" content="My Trips listings page" />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {!currentUser ? (
          <EmptyState title="Unauthorized" substitle="Please login" />
        ) : reservations.length === 0 ? (
          <EmptyState
            title="No trips found"
            substitle="Looks like you havent reserved any trips."
          />
        ) : (
          <TripsClient reservations={reservations} currentUser={currentUser} />
        )}
      </div>
    </>
  );
};

export default TripsPage;

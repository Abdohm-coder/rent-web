import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ReservationsClient from "./ReservationsClient";
import { SafeUser, safeReservation } from "@/types";
import Head from "next/head";
import Navbar from "@/components/navbar";

export async function getServerSideProps(ctx: any) {
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  const reservations = await getReservations({ authorId: currentUser?.id });
  return {
    props: {
      reservations,
      currentUser,
    },
  };
}

interface ReservationPageProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationPage: React.FC<ReservationPageProps> = ({
  reservations,
  currentUser,
}) => {
  return (
    <>
      <Head>
        <title>My Reservations</title>
        <meta name="description" content="My Reservations listings page" />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {!currentUser ? (
          <EmptyState title="Unauthorized" substitle="Please login" />
        ) : reservations.length === 0 ? (
          <EmptyState
            title="No reservations found"
            substitle="Looks like you have no reservations on your properties"
          />
        ) : (
          <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
          />
        )}
      </div>
    </>
  );
};

export default ReservationPage;

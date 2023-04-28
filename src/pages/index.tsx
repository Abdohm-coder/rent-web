import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";
import Navbar from "@/components/navbar";
import { SafeListing, SafeUser } from "@/types";
import Head from "next/head";

export async function getServerSideProps(ctx: any) {
  const listings = await getListings(ctx.query);
  const currentUser = await getCurrentUser({ req: ctx.req, res: ctx.res });
  return {
    props: {
      listings,
      currentUser,
    },
  };
}

interface HomeProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const Home = ({ listings, currentUser }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Rent Web App</title>
        <meta name="description" content="Rent Web Application" />
      </Head>
      <Navbar currentUser={currentUser} />
      <div className="pb-20 pt-28">
        {listings.length === 0 ? (
          <EmptyState showReset />
        ) : (
          <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {listings.map((listing) => {
                return (
                  <ListingCard
                    key={listing.id}
                    currentUser={currentUser}
                    data={listing}
                  />
                );
              })}
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

export default Home;

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";

interface FavoritesClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        substitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((el) => (
          <ListingCard key={el.id} currentUser={currentUser} data={el} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;

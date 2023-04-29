import { font } from "@/pages/_app";
import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/types";

const Navbar = ({ currentUser }: { currentUser?: SafeUser | null }) => {
  return (
    <nav className={`fixed w-full bg-white z-10 shadow-sm ${font.className}`}>
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </nav>
  );
};

export default Navbar;

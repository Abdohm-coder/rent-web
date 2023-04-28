import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      priority
      src="/images/logo-1.png"
      alt="Logo"
      height={20}
      width={50}
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;

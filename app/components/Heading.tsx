"use client";

interface HeadingProps {
  title: string;
  substitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center, substitle }) => {
  return <div className={center ? "text-center" : "text-start"}>
    <div className="text-2xl font-bold">{title}</div>
    <div className="font-light text-neutral-500 mt-2">{substitle}</div>
  </div>
};

export default Heading;

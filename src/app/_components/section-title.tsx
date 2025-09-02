import { Unbounded } from "next/font/google";
const unbounded = Unbounded({
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => {
  return (
    <div>
      <h4 className={`text-center mb-2 text-xl ${unbounded.className}`}>{subtitle}</h4>
      <h2 className={`text-center text-5xl font-semibold ${unbounded.className}`}>{title}</h2>
    </div>
  )
}

export default SectionTitle
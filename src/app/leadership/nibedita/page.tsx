import { redirect } from "next/navigation";

/** Legacy path — profile lives at /leadership/nibedita-nayak */
export default function LegacyNibeditaPage() {
  redirect("/leadership/nibedita-nayak");
}

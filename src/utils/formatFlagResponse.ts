import { type Flag } from "@prisma/client";
import Prando from "prando";

const formatFlagResponse = (flags: Flag[], userId?: string) => {
  const flagObject: { [key: string]: boolean } = {};

  // Generate a seeded random number between 0-100 to determine if user
  // is within the percentage of users to active flag for
  const seededRandom = new Prando(userId);
  const userPercent = seededRandom.nextInt(0, 100);

  for (const flag of flags) {
    const isActive = flag.status && flag.percentage >= userPercent;
    flagObject[flag.key] = isActive;
  }

  return flagObject;
};

export default formatFlagResponse;

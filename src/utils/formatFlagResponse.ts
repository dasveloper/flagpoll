import { type Flag } from "@prisma/client";

const formatFlagResponse = (flags: Flag[]) => {
  const flagObject: { [key: string]: boolean } = {};

  for (const flag of flags) {
    flagObject[flag.key] = flag.status;
  }

  return flagObject;
};

export default formatFlagResponse;

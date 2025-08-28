import clsx, { ClassValue } from 'clsx';

import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-h-1",
        "text-h-2",
        "text-h-3",
        "text-h-4",
        "text-h-5",
        "text-h-6",
        "text-body-l",
        "text-body-m",
        "text-body-r",
        "text-body-s",
        "text-caption-s",
      ],
    },
  },
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(...inputs));
}

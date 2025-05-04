"use client";

import Link from "next/link";
import { capitalize } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { House } from 'lucide-react';

const CommonBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const home = { icon: <House className="mx-3 text-xl md:text-lg"/>, url: "/" };

  const items: MenuItem[] = segments.map((item, index) => {
    return {
      disabled: index === segments.length - 1,
      template: () => (
        <Link
          key={item}
          href={`/${segments.slice(0, index + 1).join("/")}`}
          aria-label={`Go to ${capitalize(item)}`}
          className="mx-2 text-xl md:text-lg"
        >
          {capitalize(item)}
        </Link>
      ),
    };
  });

  return (
    <BreadCrumb
      home={home}
      model={items}
      className="px-2 md:px-20 py-3"
    />
  );
};

export default CommonBreadcrumbs;
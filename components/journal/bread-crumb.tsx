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

  const home = { icon: <House />, url: "/" };

  const items: MenuItem[] = segments.map((item, index) => {
    return {
      disabled: index === segments.length - 1,
      template: () => (
        <Link
          key={item}
          href={`/${segments.slice(0, index + 1).join("/")}`}
          aria-label={`Go to ${capitalize(item)}`}
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
      className="gap-5 px-10 py-6 mb-5 md:mb-10"
    />
  );
};

export default CommonBreadcrumbs;
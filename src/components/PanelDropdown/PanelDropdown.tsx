'use client';

import Link from 'next/link';
import Dropdown from '../Dropdown/Dropdown';

const PANELS = {
  game: {
    name: 'Gaming Panel',
    href: 'https://panel.circlelink.eu'
  },
  web: {
    name: 'Web Hosting Panel',
    href: 'https://nl.web1.circlelink.eu'
  },
  sql: {
    name: 'Php My Admin',
    href: 'https://phpmyadmin.circlelink.eu'
  }
} as const;

export default function PanelDropdown() {
  const defaultPanel = PANELS.game; // Kies een standaardpaneel

  const trigger = (
    <>
      <span className="flex-1 ml-2 text-sm">
        {defaultPanel.name}
      </span>
      <span className="text-xs">▼</span>
    </>
  );

  const items = Object.entries(PANELS).map(([code, { name, href }]) => ({
    content: (
      <Link href={href} className="flex items-center gap-2 w-full">
        <span className="text-sm truncate">{name}</span>
      </Link>
    ),
  }));

  return (
    <Dropdown
      trigger={trigger}
      items={items}
      variant="language"
      width="180px"
    />
  );
}

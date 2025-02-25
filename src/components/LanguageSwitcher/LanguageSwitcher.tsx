'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';

// Voeg hier nieuwe talen toe
const LANGUAGES = {
  nl: {
    name: 'Nederlands',
    flag: '/svg/nl-flag.svg'
  },
  en: {
    name: 'English',
    flag: '/svg/gb-flag.svg'
  },
} as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Haal de huidige route op en vervang de taal
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const trigger = (
    <>
      <span className="flex items-center">
        <Image
          src={LANGUAGES[locale as keyof typeof LANGUAGES].flag}
          alt={`${LANGUAGES[locale as keyof typeof LANGUAGES].name} flag`}
          width={20}
          height={15}
          className="object-cover"
        />
      </span>
      <span className="flex-1 text-sm">
        {LANGUAGES[locale as keyof typeof LANGUAGES].name}
      </span>
      <span className="text-xs">▼</span>
    </>
  );

  const items = Object.entries(LANGUAGES).map(([code, {name, flag}]) => ({
    key: code,
    content: (
      <div className="flex items-center gap-2 w-full">
        <Image 
          src={flag} 
          alt={`${name} flag`} 
          width={20} 
          height={15}
          className="object-cover flex-shrink-0"
        />
        <span className="text-sm truncate">{name}</span>
      </div>
    ),
    onClick: () => switchLocale(code),
    isSelected: code === locale
  }));

  return <Dropdown trigger={trigger} items={items} width="180px" />;
} 
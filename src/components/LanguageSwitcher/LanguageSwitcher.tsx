'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';

// Voeg hier nieuwe talen toe
const LANGUAGES = {
  nl: {
    name: 'Nederlands',
    flag: '/svg/country/nl-flag.svg'
  },
  en: {
    name: 'English',
    flag: '/svg/country/gb-flag.svg'
  },
} as const;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  const trigger = (
    <>
      <span className="flex items-center">
        <Image
          src={LANGUAGES[currentLocale as keyof typeof LANGUAGES].flag}
          alt={`${LANGUAGES[currentLocale as keyof typeof LANGUAGES].name} flag`}
          width={20}
          height={15}
          className="object-cover"
        />
      </span>
      <span className="flex-1 ml-2 text-sm">
        {LANGUAGES[currentLocale as keyof typeof LANGUAGES].name}
      </span>
      <span className="text-xs">▼</span>
    </>
  );

  const items = Object.entries(LANGUAGES).map(([code, {name, flag}]) => ({
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
    onClick: () => switchLanguage(code),
    isSelected: code === currentLocale
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
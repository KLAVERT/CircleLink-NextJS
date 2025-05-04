'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import Image from 'next/image';
import Dropdown from '../Dropdown/Dropdown';

// Voeg hier nieuwe talen toe
const LANGUAGES = {
  de: {
    name: 'Deutsch',
    flag: '/svg/country/de-flag.svg'
  },
  en: {
    name: 'English',
    flag: '/svg/country/gb-flag.svg'
  },
  es: {
    name: 'Español',
    flag: '/svg/country/es-flag.svg'
  },
  fr: {
    name: 'Français',
    flag: '/svg/country/fr-flag.svg'
  },
  it: {
    name: 'Italiano',
    flag: '/svg/country/it-flag.svg'
  },
  nl: {
    name: 'Nederlands',
    flag: '/svg/country/nl-flag.svg'
  },
  pt: {
    name: 'Português',
    flag: '/svg/country/pt-flag.svg'
  }
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
    <div className="flex items-center h-8 gap-2.5 px-1">
      <div className="w-5 h-4 relative">
        <Image
          src={LANGUAGES[currentLocale as keyof typeof LANGUAGES].flag}
          alt={`${LANGUAGES[currentLocale as keyof typeof LANGUAGES].name} flag`}
          fill
          sizes="20px"
          className="object-contain"
        />
      </div>
      <svg
        width="10"
        height="10"
        viewBox="0 0 8 8"
        fill="none"
        className="text-white self-center mt-0.5"
        style={{ display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 6L0.535898 0L7.4641 0L4 6Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );

  const items = Object.entries(LANGUAGES).map(([code, {name, flag}]) => ({
    content: (
      <div className="flex items-center gap-2 w-full transition-all duration-300 ease-in-out transform hover:scale-105">
        <div className="w-6 h-4 relative flex-shrink-0">
          <Image 
            src={flag} 
            alt={`${name} flag`} 
            fill
            sizes="24px"
            className="object-contain"
          />
        </div>
        <span className="text-sm truncate animate-fadeIn">{name}</span>
      </div>
    ),
    onClick: () => switchLanguage(code),
    isSelected: code === currentLocale
  }));

  return (
    <div className="relative inline-block">
      <Dropdown
        trigger={trigger}
        items={items}
        variant="language"
        className="h-8"
      />
    </div>
  );
} 
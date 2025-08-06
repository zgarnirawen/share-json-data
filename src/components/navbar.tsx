import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-sm px-4 sm:px-6'>
      <div className='flex items-center justify-between max-w-4xl mx-auto h-16'>
        {/* Logo + Nav */}
        <div className='flex items-center gap-6'>
          <Link href='/' className='flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg'>
            <ExternalLinkIcon className='h-6 w-6' />
            sharejson.
          </Link>
          <nav>
            <Link
              href='/dashboard'
              className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Auth buttons */}
        <div className='flex items-center gap-4'>
          <SignedOut>
            <SignInButton mode='modal'>
              <Button variant='outline'>Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

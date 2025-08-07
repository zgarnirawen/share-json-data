import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo + Nav */}
        <div className="navbar-left">
          <Link href="/" className="navbar-logo">
            <ExternalLinkIcon className="navbar-logo-icon" />
            sharejson.
          </Link>
          <nav>
            <Link href="/dashboard" className="navbar-link">
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Auth buttons */}
        <div className="navbar-auth">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign in</Button>
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

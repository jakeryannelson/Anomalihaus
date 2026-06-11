import Link from "next/link";
import CartLink from "@/components/CartLink";

export default function Nav() {
  return (
    <header className="nav">
      <nav className="container nav-inner" aria-label="Main">
        <Link href="/" className="wordmark">
          anomalihaus<span className="wordmark-dot">.</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/havn-goods">Havn Goods</Link>
          </li>
          <li>
            <Link href="/artists">Artists</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/keep-us-going">Keep Us Going</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <CartLink />
          </li>
        </ul>
      </nav>
    </header>
  );
}

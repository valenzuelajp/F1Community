import Image from "next/image";
import Link from "next/link";

/**
 * Footer used by the F1 Login page and the H02 specimen on /components-wynn.
 *
 * 4-column wireframe footer: brand (logo, details, socials), two [PAGE]
 * directories, newsletter signup, and the bottom legal notice.
 * Styles live in `src/app/login/login.css` (`.login-footer*`).
 */
export function LoginFooter() {
  return (
    <footer className="login-footer">
      <div className="login-footer-grid">
        {/* Brand Column */}
        <div className="login-footer-brand">
          <div className="login-footer-logo">
            <Image
              src="/imgLogoContainer.png"
              alt="Formula 1 Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <span className="login-footer-details">[Details]</span>
          <div className="login-footer-socials">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-social-pill"
              aria-label="Facebook"
            >
              <Image
                src="/imgFacebook.svg"
                alt="Facebook"
                width={14}
                height={14}
              />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-social-pill"
              aria-label="Twitter"
            >
              <Image
                src="/imgTwitter.svg"
                alt="Twitter"
                width={14}
                height={14}
              />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-social-pill"
              aria-label="Instagram"
            >
              <Image
                src="/imgInstagram.svg"
                alt="Instagram"
                width={14}
                height={14}
              />
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="login-social-pill"
              aria-label="YouTube"
            >
              <Image
                src="/imgYoutube.svg"
                alt="YouTube"
                width={14}
                height={14}
              />
            </Link>
          </div>
        </div>

        {/* Directory Column 1 */}
        <div className="login-footer-links">
          <h3 className="login-footer-col-title">[PAGE]</h3>
          <Link href="#page1" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page2" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page3" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page4" className="login-footer-link">
            [Page]
          </Link>
        </div>

        {/* Directory Column 2 */}
        <div className="login-footer-links">
          <h3 className="login-footer-col-title">[PAGE]</h3>
          <Link href="#page1" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page2" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page3" className="login-footer-link">
            [Page]
          </Link>
          <Link href="#page4" className="login-footer-link">
            [Page]
          </Link>
        </div>

        {/* Newsletter Column */}
        <div className="login-footer-newsletter">
          <h3 className="login-newsletter-title">JOIN THE NEWSLETTER</h3>
          <p className="login-newsletter-desc">
            Subscribe for exclusive drop access and pre-season testing
            details.
          </p>
          <form action="#newsletter" className="login-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="login-newsletter-input"
              aria-label="Email address for newsletter"
            />
            <button type="submit" className="login-newsletter-btn">
              SUBSCRIBE
            </button>
          </form>
          <p className="login-newsletter-terms">
            By subscribing, you agree to our Privacy Policy and Terms of Use.
          </p>
        </div>
      </div>

      {/* Bottom Legal Notice */}
      <div className="login-footer-bottom">
        <p>
          © 2026 Formula One Digital Media Limited. Merchandise Wireframe
          Proposal. All Rights Reserved.
        </p>
        <div className="login-footer-legal">
          <Link href="#privacy">Privacy Policy</Link>
          <span aria-hidden="true">.</span>
          <Link href="#terms">Terms of Use</Link>
          <span aria-hidden="true">.</span>
          <Link href="#cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}

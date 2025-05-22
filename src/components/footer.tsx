import { Shield } from "lucide-react"
import Link from "next/link";

function SocialIcon({ icon }:SocialIconProps) {
  return (
    <a
      href="#"
      className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors"
    >
      <span className="sr-only">{icon}</span>
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
      </svg>
    </a>
  )
}
function FooterLink({ href, label }: FooterLinkProps) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-14 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-8 w-8">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="#6366F1"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#6366F1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">Xegality</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Modern legal solutions for businesses and individuals navigating today's complex legal landscape.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon="twitter" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="facebook" />
              <SocialIcon icon="instagram" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <FooterLink href="#" label="Corporate Law" />
              <FooterLink href="#" label="Contract Review" />
              <FooterLink href="#" label="Intellectual Property" />
              <FooterLink href="#" label="Litigation Support" />
              <FooterLink href="#" label="Regulatory Compliance" />
              <FooterLink href="#" label="Legal Consultation" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <FooterLink href="#" label="About Us" />
              <FooterLink href="#" label="Our Team" />
              <FooterLink href="#" label="Careers" />
              <FooterLink href="#" label="Blog" />
              <FooterLink href="#" label="Press" />
              <FooterLink href="#" label="Privacy Policy" />
              <FooterLink href="#" label="Terms of Service" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <p className="mb-1 font-medium text-white">Address</p>
                <p>123 Legal Avenue, Suite 500</p>
                <p>New York, NY 10001</p>
              </li>
              <li>
                <p className="mb-1 font-medium text-white">Email</p>
                <a href="mailto:contact@xegality.com" className="hover:text-indigo-400 transition-colors">
                  contact@xegality.com
                </a>
              </li>
              <li>
                <p className="mb-1 font-medium text-white">Phone</p>
                <a href="tel:+12125551234" className="hover:text-indigo-400 transition-colors">
                  +1 (212) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Xegality. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">AAA Supplements</h3>
            <p className="text-sm">Handcrafted supplements for your wellbeing since 2023.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-sm">Email: info@aaasupplements.com</p>
            <p className="text-sm">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-700 text-sm text-center">
          <p>© 2023 AAA Supplements. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


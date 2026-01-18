export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white font-semibold mb-3">ReqHub</h3>
          <p>Build, test and deploy APIs faster.</p>
        </div>

        <div>
          <p className="uppercase text-xs mb-3">Product</p>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Pricing</li>
            <li>Docs</li>
          </ul>
        </div>

        <div>
          <p className="uppercase text-xs mb-3">Company</p>
          <ul className="space-y-2">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <p className="text-center mt-12 text-xs">
        © 2026 ReqHub all rights reserved.
      </p>
    </footer>
  );
}

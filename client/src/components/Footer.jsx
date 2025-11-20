import 'react-phone-input-2/lib/style.css';


export default function Footer(){
  return (
  <div className="bg-gradient-to-br from-[#3B6F7B] via-[#4A7B87] to-[#5A8A97] text-white mt-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-3xl flex items-center justify-center border border-white/20">
              <img src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
            <h1 className={`text-5xl font-bold`}>LINKLY MEDIA</h1>
          </div>
          <p className="text-white/90 text-xl mb-8 leading-relaxed font-medium">
            TARGET SMART, GROW FAST.
          </p>
          <p className="text-white/70 leading-relaxed text-lg">
            LINKLY MEDIA is India's premium platform connecting brands with outdoor media and digital creators to amplify brand reach and growth across major cities.
          </p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Legal</h3>
          <ul className="space-y-4 text-white/80 text-lg">
            <li><a href="#" className="hover:text-white transition-colors hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors hover:underline">Cancellation Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Contact Us</h3>
          <div className="space-y-4 text-white/80 text-lg">
            <p>linkly2025@gmail.com</p>
            <p>Mangalore, India</p>
            <p>+91 xxxxxxxxxx</p>
          </div>
        </div>

        {/* Available In */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Available in</h3>
          <ul className="space-y-4 text-white/80 text-lg">
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Mangalore</li>
            <li>Udupi</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 mt-16 pt-10 text-center text-white/70 text-lg">
        <p>© {new Date().getFullYear()} LINKLY MEDIA. All rights reserved. Made with ❤️ in India</p>
      </div>
    </div>
  </div>
  )
}
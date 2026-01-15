import Image from "next/image";
import { Microscope, Dna, Shield, Clock, Users, FileText, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                MEDLINE PATHOCARE
              </h1>
              <p className="text-xl md:text-2xl text-accent-600 dark:text-accent-400 mb-6 font-medium">
                Your trusted partner in diagnostics
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                Providing ultra-accurate, timely, and actionable diagnostic insights to empower healthcare providers in making confident, life-changing decisions for their patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="#services"
                  className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/logo.png"
                  alt="Medline Pathocare Logo"
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              About Us
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-primary-50 dark:bg-primary-900/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the indispensable partner in diagnostic medicine, leveraging pioneering technology and collaborative expertise to illuminate the path to precise patient care.
              </p>
            </div>
            <div className="bg-accent-50 dark:bg-accent-900/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-accent-700 dark:text-accent-400 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To provide our network of clinicians with ultra-accurate, timely, and actionable diagnostic insights. We achieve this by relentlessly pursuing innovation in our testing methodologies, fostering a culture of scientific rigor, and delivering unparalleled support to empower fellow healthcare providers in making confident, life-changing decisions for their patients.
              </p>
            </div>
          </div>

          {/* History */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
              Our History
            </h3>
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Inception: The Pursuit of Precision (Est. 2025)
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Medline Pathocare was founded in 2025 by Sir. Granton Trevar, a respected Medical Laboratory Officer with a vision to create a diagnostic facility focused from the simplest of the tests to complex and esoteric testing. Starting in a modest laboratory space in a Roysambu area of Nairobi, the lab initially specialized in niche endocrinology panels and routine biochemistry screening.
                </p>
              </div>
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Growth and Specialization (2025–2026)
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  As their reputation for precision grew, Medline Pathocare expanded its service offerings to include homecare services. By 2026, the lab had outgrown its original facility and moved to a state-of-the-art diagnostic center, within the same area. This expansion allowed for the introduction of molecular diagnostics, particularly in infectious disease testing and hereditary cancer screening.
                </p>
              </div>
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Technological Integration & Regional Reach (2025–Present)
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The late 2025 saw Medline Pathocare heavily invest in automation and bioinformatics. The integration of a secure, custom-built provider portal streamlined the ordering process and result delivery. By 2026, Medline Pathocare served a network of over 20 clinical partners across three neighboring estates.
                </p>
              </div>
              <div className="border-l-4 border-primary-600 pl-6">
                <h4 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  The Future: Indispensable Partnership (Present Day)
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, Medline Pathocare stands as a leading referral laboratory in its area, accredited and certified by KMLTTB. The laboratory continues to expand its test menu to include cutting-edge advanced pathology services, remaining committed to providing precise, actionable insights that empower fellow healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Services & Testing Menu
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive diagnostic services from routine testing to specialized molecular diagnostics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/services/test-catalog" className="group">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <Microscope className="text-primary-600 dark:text-primary-400" size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                  Test Catalog
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Detailed, searchable list of all available tests, including test format, specimen collection requirements, handling procedures, and turnaround times (TAT).
                </p>
                <div className="flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:translate-x-2 transition-transform">
                  View Catalog <ArrowRight className="ml-2" size={20} />
                </div>
              </div>
            </Link>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Dna className="text-primary-600 dark:text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Specialized Expertise
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Highlighting specific areas of specialization including genetic testing, toxicology, molecular diagnostics, and how these services stand out.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Users className="text-primary-600 dark:text-primary-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Consultative Services
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Supporting providers with test selection and result interpretation to ensure optimal patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Providers Section */}
      <section id="providers" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Information for Providers
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <FileText className="text-primary-600 dark:text-primary-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Specimen Guides
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Detailed resources on proper collection, packaging, and transportation protocols.
              </p>
            </div>

            <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <FileText className="text-primary-600 dark:text-primary-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Supply Ordering
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Simple system for ordering necessary supplies like specimen labels and shipping materials.
              </p>
            </div>

            <Link href="/providers/referral-form" className="group">
              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors cursor-pointer">
                <FileText className="text-primary-600 dark:text-primary-400 mb-4" size={32} />
                <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                  Referral Forms
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Easily accessible and simple online or printable referral forms.
                </p>
              </div>
            </Link>

            <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <FileText className="text-primary-600 dark:text-primary-400 mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Communication
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Clear details on how we communicate updates, results, and handle inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Compliance Section */}
      <section id="quality" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Quality Assurance & Compliance
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <Shield className="text-primary-600 dark:text-primary-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Standard Operating Procedures
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                General descriptions of standard operating procedures for quality assurance, data integrity, and recordkeeping.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <Clock className="text-primary-600 dark:text-primary-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Performance Monitoring
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Information on how the lab monitors performance and handles out-of-specification results.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
              <Shield className="text-primary-600 dark:text-primary-400 mb-4" size={40} />
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-4">
                Confidentiality & HIPAA
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Clear policy on patient information confidentiality and HIPAA compliance.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              <strong className="text-primary-700 dark:text-primary-400">Accredited and certified by KMLTTB</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Contact & Support
            </h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Phone className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Phone
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Contact us via phone for immediate assistance
              </p>
            </div>

            <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Mail className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Email
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Send us an email with your inquiries
              </p>
            </div>

            <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <MapPin className="text-primary-600 dark:text-primary-400 mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Location
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Roysambu, Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-primary-400 mb-4">Medline Pathocare</h3>
              <p className="text-gray-400">
                Your trusted partner in diagnostics. Providing precise, actionable insights for better patient care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#about" className="hover:text-primary-400">About Us</Link></li>
                <li><Link href="#services" className="hover:text-primary-400">Services</Link></li>
                <li><Link href="#providers" className="hover:text-primary-400">For Providers</Link></li>
                <li><Link href="#contact" className="hover:text-primary-400">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-400 mb-4">Contact Info</h3>
              <p className="text-gray-400">
                Roysambu, Nairobi, Kenya
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Medline Pathocare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

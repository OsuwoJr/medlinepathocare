import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Accessibility, Eye, Type, Keyboard, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Medline Pathocare',
  description: 'Accessibility features and commitment of Medline Pathocare to providing accessible diagnostic laboratory services.',
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Accessibility className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Accessibility Statement
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Last updated: {new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="w-24 h-1 bg-primary-600"></div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600 dark:text-primary-400" size={24} />
              Our Commitment
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Medline Pathocare is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant accessibility 
              standards to achieve these goals. Our goal is to provide a website that is accessible to the widest 
              possible audience, regardless of technology or ability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Eye className="text-primary-600 dark:text-primary-400" size={24} />
              Visual Accessibility Features
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Dark Mode
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our website includes a dark mode option that provides better contrast and reduces eye strain. 
                  You can toggle between light and dark themes using the accessibility controls in the bottom-right 
                  corner of the page.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  High Contrast Mode
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We offer a high contrast mode that enhances text and background contrast for improved readability, 
                  especially for users with visual impairments or sensitivity to light.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Color Contrast
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our color scheme is designed to meet WCAG 2.1 Level AA contrast requirements, ensuring text is 
                  readable against background colors for users with color vision deficiencies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Type className="text-primary-600 dark:text-primary-400" size={24} />
              Text and Typography
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Font Size Controls
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Users can adjust font sizes to three levels: Normal, Large, and Extra Large. These controls are 
                  available through the accessibility panel and help users with visual impairments read content more easily.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Scalable Text
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  All text on our website can be scaled up to 200% using browser zoom controls without losing 
                  functionality or readability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Readable Fonts
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use the Inter font family, which is designed for optimal readability on screens and is 
                  accessible for users with dyslexia and other reading difficulties.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Keyboard className="text-primary-600 dark:text-primary-400" size={24} />
              Keyboard Navigation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our website is fully navigable using only a keyboard:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>All interactive elements are accessible via keyboard</li>
              <li>Clear focus indicators show which element is currently selected</li>
              <li>Logical tab order throughout the website</li>
              <li>Skip navigation links for efficient page navigation</li>
              <li>Keyboard shortcuts for common actions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Screen Reader Support
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We have implemented the following features to support screen reader users:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Proper semantic HTML structure with headings, lists, and landmarks</li>
              <li>ARIA labels and roles for interactive elements</li>
              <li>Alt text for all images and graphics</li>
              <li>Descriptive link text that makes sense out of context</li>
              <li>Form labels associated with input fields</li>
              <li>Error messages that are announced to screen readers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Standards and Guidelines
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We strive to conform to the following accessibility standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines 2.1 Level AA standards</li>
              <li><strong>Section 508:</strong> Compliance with Section 508 of the Rehabilitation Act</li>
              <li><strong>ADA:</strong> Alignment with Americans with Disabilities Act principles</li>
              <li><strong>EN 301 549:</strong> European accessibility standard for ICT products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Accessibility Controls
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our website includes an accessibility control panel (located in the bottom-right corner) that allows you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Toggle between light and dark themes</li>
              <li>Enable or disable high contrast mode</li>
              <li>Adjust font size (Normal, Large, Extra Large)</li>
              <li>All preferences are saved to your browser for future visits</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Known Limitations
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              While we strive to ensure accessibility, we are aware of some limitations:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Some third-party content or embedded services may not be fully accessible</li>
              <li>Older PDF documents may not be fully accessible to screen readers</li>
              <li>Some interactive elements may require JavaScript, which should be enabled</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We are continuously working to improve accessibility and address these limitations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Physical Accessibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our physical laboratory facility in Roysambu, Nairobi is committed to accessibility:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Wheelchair-accessible entrances and facilities</li>
              <li>Accessible parking spaces</li>
              <li>Assistance available for patients with disabilities</li>
              <li>Alternative communication methods for patients with hearing or speech impairments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Feedback and Reporting Issues
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We welcome feedback on the accessibility of our website and services. If you encounter any accessibility 
              barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Medline Pathocare</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Roysambu, Nairobi, Kenya
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Email: <a href="mailto:medlinepathocarelab@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">medlinepathocarelab@gmail.com</a>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Phone: <a href="tel:+254796168900" className="text-primary-600 dark:text-primary-400 hover:underline">+254 796 168 900</a>
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              We aim to respond to accessibility feedback within 5 business days and will work to address 
              reported issues in a timely manner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Continuous Improvement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Accessibility is an ongoing effort. We regularly review and update our website to improve accessibility, 
              conduct accessibility audits, and train our team on accessibility best practices. This statement will 
              be updated as we make improvements and address any identified issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Third-Party Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Some content on our website may be provided by third parties. While we strive to ensure all content 
              meets accessibility standards, we may not have full control over third-party content. If you encounter 
              accessibility issues with third-party content, please let us know and we will work with our partners 
              to address them.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

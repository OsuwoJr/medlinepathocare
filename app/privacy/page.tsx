import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, FileText, Users, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Medline Pathocare',
  description: 'Privacy Policy for Medline Pathocare - How we collect, use, and protect your personal and health information.',
};

export default function PrivacyPolicyPage() {
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
              <Shield className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Privacy Policy
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
              <FileText className="text-primary-600 dark:text-primary-400" size={24} />
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Medline Pathocare (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website or use our diagnostic laboratory services. We comply with the Kenya Data Protection Act, 2019, and 
              maintain the highest standards of confidentiality for all patient information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Database className="text-primary-600 dark:text-primary-400" size={24} />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Name, date of birth, and identification details</li>
                  <li>Contact information (phone number, email address, postal address)</li>
                  <li>Payment and billing information</li>
                  <li>Insurance information (if applicable)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Health Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Medical history and clinical information</li>
                  <li>Test requests and results</li>
                  <li>Physician referrals and consultation notes</li>
                  <li>Specimen collection information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Technical Information
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>IP address and browser information</li>
                  <li>Website usage data and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Eye className="text-primary-600 dark:text-primary-400" size={24} />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>To provide diagnostic testing services and process test requests</li>
              <li>To communicate with you about test results, appointments, and services</li>
              <li>To process payments and manage billing</li>
              <li>To comply with legal and regulatory requirements</li>
              <li>To improve our services and website functionality</li>
              <li>To send important updates and notifications (with your consent)</li>
              <li>To maintain quality assurance and accreditation standards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Users className="text-primary-600 dark:text-primary-400" size={24} />
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We do not sell your personal or health information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Healthcare Providers:</strong> With your referring physician or authorized healthcare providers</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or regulatory authorities</li>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in our operations (under strict confidentiality agreements)</li>
              <li><strong>Public Health:</strong> As required for public health reporting and disease surveillance</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Lock className="text-primary-600 dark:text-primary-400" size={24} />
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We implement comprehensive security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure access controls and authentication</li>
              <li>Regular security audits and assessments</li>
              <li>Staff training on data protection and confidentiality</li>
              <li>Compliance with industry security standards</li>
              <li>Secure storage and disposal of physical records</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Under the Kenya Data Protection Act, 2019, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li><strong>Access:</strong> Request access to your personal and health information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
              <li><strong>Objection:</strong> Object to certain processing of your information</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain your personal and health information in accordance with legal and regulatory requirements. 
              Medical records and test results are typically retained for a minimum period as required by Kenyan 
              medical regulations. We securely dispose of information when it is no longer needed for legitimate 
              business or legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Our website uses cookies and similar technologies to enhance your browsing experience, analyze website 
              traffic, and personalize content. You can control cookie preferences through your browser settings. 
              However, disabling cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect 
              personal information from children. If you are a parent or guardian and believe your child has 
              provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal 
              requirements. We will notify you of any material changes by posting the updated policy on our website 
              with a revised &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions, concerns, or wish to exercise your rights regarding your personal information, 
              please contact us:
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
          </section>
        </div>
      </div>
    </main>
  );
}

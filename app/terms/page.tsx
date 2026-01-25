import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Medline Pathocare',
  description: 'Terms of Service for Medline Pathocare - Terms and conditions for using our diagnostic laboratory services.',
};

export default function TermsOfServicePage() {
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
              <Scale className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Terms of Service
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
              Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using the Medline Pathocare website and services, you agree to be bound by these 
              Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing our services. These terms apply to all users, including 
              patients, healthcare providers, and visitors to our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <CheckCircle className="text-primary-600 dark:text-primary-400" size={24} />
              Service Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medline Pathocare provides diagnostic laboratory testing services, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Clinical laboratory testing and analysis</li>
              <li>Specimen collection services</li>
              <li>Test result reporting and interpretation</li>
              <li>Consultative services for healthcare providers</li>
              <li>Supply ordering for healthcare facilities</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              All services are provided in accordance with our accreditation by the Kenya Medical Laboratory 
              Technicians and Technologists Board (KMLTTB) and applicable medical laboratory standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <AlertCircle className="text-primary-600 dark:text-primary-400" size={24} />
              Important Medical Disclaimer
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-semibold mb-2">
                Test results are for informational purposes only and do not constitute a medical diagnosis.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All test results must be interpreted by a qualified healthcare provider in the context of your 
                complete medical history, physical examination, and other relevant clinical information. 
                Do not make medical decisions based solely on test results without consulting your physician.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Test results are not a substitute for professional medical advice, diagnosis, or treatment</li>
              <li>If you are experiencing symptoms, seek immediate medical attention</li>
              <li>Always consult with your healthcare provider before making any treatment decisions</li>
              <li>Emergency situations require immediate medical care - do not rely on test results alone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Eligibility and Age Requirements
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              You must be at least 18 years old to use our services independently. For individuals under 18, 
              services must be requested and authorized by a parent, guardian, or legal representative. 
              Our services are available to residents of Kenya and other locations where we can lawfully 
              provide diagnostic laboratory services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Payment Terms
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Payment Methods
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We accept payment through various methods including mobile payment platforms (M-Pesa, Airtel Money), 
                  credit/debit cards, and bank transfers. All payments are processed in Kenya Shillings (KES) unless 
                  otherwise specified.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Pricing
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Test prices are subject to change. We will provide notice of any significant price changes. 
                  Prices displayed on our website are current at the time of viewing but may be updated without 
                  prior notice. Final pricing will be confirmed at the time of service.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                  Refunds
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Refund policies vary by service type. Generally, refunds are not available for completed tests. 
                  If a test cannot be performed due to specimen issues or laboratory error, we will work with you 
                  to resolve the situation, which may include retesting at no additional charge.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Test Results and Reporting
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Results are typically available within the specified turnaround time (TAT) for each test</li>
              <li>Results will be provided to the requesting healthcare provider and/or patient as authorized</li>
              <li>We maintain strict confidentiality of all test results</li>
              <li>Results are stored securely in accordance with medical record retention requirements</li>
              <li>You may request copies of your results in accordance with our privacy policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4 flex items-center gap-2">
              <Shield className="text-primary-600 dark:text-primary-400" size={24} />
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Medline Pathocare shall not be liable for any indirect, incidental, special, or consequential damages</li>
              <li>Our total liability for any claims shall not exceed the amount paid for the specific test or service</li>
              <li>We are not responsible for decisions made by healthcare providers based on our test results</li>
              <li>We are not liable for delays or failures due to circumstances beyond our reasonable control</li>
              <li>We maintain professional liability insurance as required by Kenyan regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Quality Assurance and Accreditation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Medline Pathocare is accredited by the Kenya Medical Laboratory Technicians and Technologists Board (KMLTTB). 
              We maintain:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Rigorous quality control and quality assurance programs</li>
              <li>Regular proficiency testing and external quality assessment</li>
              <li>Compliance with international laboratory standards</li>
              <li>Continuous staff training and competency assessment</li>
              <li>Regular equipment calibration and maintenance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of 
              Medline Pathocare or its content suppliers and is protected by Kenyan and international copyright laws. 
              You may not reproduce, distribute, modify, or create derivative works from any content without our 
              express written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Prohibited Uses
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Use our services for any unlawful purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to our systems or data</li>
              <li>Interfere with or disrupt our services or website</li>
              <li>Provide false or misleading information</li>
              <li>Use automated systems to access our website without permission</li>
              <li>Reproduce or redistribute test results without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to terminate or suspend your access to our services at any time, with or without 
              cause or notice, for any reason including violation of these Terms of Service. Upon termination, your 
              right to use our services will immediately cease, but provisions regarding liability, intellectual 
              property, and dispute resolution will survive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Governing Law and Dispute Resolution
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              These Terms of Service are governed by the laws of Kenya. Any disputes arising from or relating to 
              these terms or our services shall be subject to the exclusive jurisdiction of the courts of Kenya. 
              We encourage resolution of disputes through good faith negotiation before pursuing legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Material changes will be posted 
              on our website with an updated &quot;Last updated&quot; date. Your continued use of our services after such 
              changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
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

import { ArrowLeft, Dna, FlaskConical, Microscope, Shield, CheckCircle, Sparkles, Activity } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medlinepathocare.vercel.app';

export const metadata: Metadata = {
  title: 'Specialized Expertise - Genetics, Toxicology & Molecular Diagnostics',
  description: 'Explore Medline Pathocare’s specialized diagnostic expertise in genetic testing, toxicology, molecular diagnostics, and endocrinology. Advanced methodologies with expert interpretation in Nairobi, Kenya.',
  alternates: {
    canonical: `${siteUrl}/services/specialized-expertise`,
  },
  openGraph: {
    title: 'Specialized Expertise - Medline Pathocare',
    description: 'Advanced diagnostic capabilities in genetics, toxicology, molecular diagnostics, and endocrinology.',
    url: `${siteUrl}/services/specialized-expertise`,
    images: ['/og.png'],
  },
};

export default function SpecializedExpertisePage() {
  const specializations = [
    {
      icon: Dna,
      title: 'Genetic Testing',
      description: 'Advanced genetic analysis for hereditary conditions, carrier screening, and pharmacogenomics.',
      features: [
        'Hereditary cancer screening (BRCA, Lynch syndrome)',
        'Carrier screening for genetic disorders',
        'Pharmacogenomic testing for medication optimization',
        'Prenatal and preconception genetic testing',
        'Next-generation sequencing (NGS) technology',
        'Comprehensive genetic counseling support'
      ],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-500'
    },
    {
      icon: FlaskConical,
      title: 'Toxicology',
      description: 'Comprehensive toxicology screening and analysis for drug monitoring, workplace testing, and forensic applications.',
      features: [
        'Therapeutic drug monitoring (TDM)',
        'Drug of abuse screening and confirmation',
        'Workplace drug testing programs',
        'Forensic toxicology services',
        'Heavy metal testing (lead, mercury, arsenic)',
        'Alcohol and substance abuse monitoring'
      ],
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-500'
    },
    {
      icon: Microscope,
      title: 'Molecular Diagnostics',
      description: 'Cutting-edge molecular testing for infectious diseases, oncology, and personalized medicine.',
      features: [
        'PCR and real-time PCR testing',
        'Infectious disease detection (viral, bacterial, fungal)',
        'Oncology molecular profiling',
        'Pathogen identification and resistance testing',
        'COVID-19 and respiratory pathogen panels',
        'Custom molecular assay development'
      ],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-500'
    },
    {
      icon: Activity,
      title: 'Endocrinology',
      description: 'Specialized hormone testing and endocrine function analysis for comprehensive patient care.',
      features: [
        'Thyroid function panels (TSH, T3, T4, antibodies)',
        'Adrenal function testing',
        'Reproductive hormone panels',
        'Growth hormone and IGF-1 testing',
        'Diabetes management (HbA1c, C-peptide)',
        'Bone metabolism markers'
      ],
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500'
    }
  ];

  const advantages = [
    {
      icon: Shield,
      title: 'Accredited Excellence',
      description: 'KMLTTB-accredited laboratory ensuring the highest standards of quality and accuracy in all specialized testing.'
    },
    {
      icon: Sparkles,
      title: 'Advanced Technology',
      description: 'State-of-the-art equipment and cutting-edge methodologies for precise and reliable results.'
    },
    {
      icon: CheckCircle,
      title: 'Expert Team',
      description: 'Experienced laboratory scientists and pathologists specializing in complex diagnostic testing.'
    },
    {
      icon: Microscope,
      title: 'Comprehensive Reporting',
      description: 'Detailed, actionable reports with clear interpretation to support clinical decision-making.'
    }
  ];

  return (
    <>
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: siteUrl },
            { name: 'Services', url: `${siteUrl}/services` },
            { name: 'Specialized Expertise', url: `${siteUrl}/services/specialized-expertise` },
          ],
        }}
      />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/services" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Services
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Dna className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Specialized Expertise
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Advanced diagnostic capabilities in genetics, toxicology, molecular diagnostics, and endocrinology
              </p>
            </div>
          </div>
          <div className="w-24 h-1 bg-primary-600"></div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border-l-4 border-primary-600">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            At Medline Pathocare, we specialize in advanced diagnostic testing that goes beyond routine laboratory services. 
            Our specialized expertise encompasses cutting-edge genetic testing, comprehensive toxicology analysis, 
            state-of-the-art molecular diagnostics, and specialized endocrinology testing. Each area of specialization 
            leverages advanced technology, rigorous quality control, and expert interpretation to provide healthcare 
            providers with precise, actionable diagnostic insights.
          </p>
        </div>

        {/* Specializations Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
            Our Specializations
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 ${spec.borderColor} hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`${spec.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className={spec.color} size={32} />
                  </div>
                  <h3 className={`text-2xl font-bold ${spec.color} mb-3`}>
                    {spec.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {spec.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Services:</p>
                    <ul className="space-y-2">
                      {spec.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className={`${spec.color} flex-shrink-0 mt-0.5`} size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Our Specialized Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
            Why Choose Our Specialized Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology & Methodology */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-6 text-center">
            Advanced Technology & Methodology
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-3">
                Next-Generation Sequencing
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Utilizing NGS technology for comprehensive genetic analysis and mutation detection with high accuracy and throughput.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-3">
                Mass Spectrometry
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced LC-MS/MS and GC-MS for precise toxicology screening and therapeutic drug monitoring.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-3">
                Real-Time PCR
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                High-sensitivity molecular detection for infectious diseases and genetic markers with rapid turnaround times.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-600 dark:bg-primary-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Access Our Specialized Services?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contact us to discuss your specialized testing needs or browse our comprehensive test catalog.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services/test-catalog"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Test Catalog
            </Link>
            <Link
              href="/#contact"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        </div>
      </main>
    </>
  );
}

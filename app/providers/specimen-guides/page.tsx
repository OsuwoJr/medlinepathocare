'use client';

import { FileText, ArrowLeft, TestTube, FlaskConical, Droplets, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SpecimenGuidesPage() {
  const tubeTypes = [
    {
      id: 1,
      name: 'Red Cap',
      subtitle: 'Plain / Clot Activator',
      capColor: 'bg-red-600',
      borderColor: 'border-red-500',
      textColor: 'text-red-700 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      additive: 'None or clot activator (silica)',
      specimen: 'Serum',
      commonTests: [
        'Serology (HIV, Hepatitis, VDRL)',
        'Blood bank tests (crossmatch, antibody screening – if no gel)',
        'Hormone assays',
        'Drug levels',
        'Chemistry tests requiring serum'
      ],
      specialRequirements: [
        'Allow blood to clot 20–30 minutes',
        'Centrifuge before testing',
        'Do not mix aggressively'
      ]
    },
    {
      id: 2,
      name: 'Yellow Cap',
      subtitle: 'SST – Serum Separator Tube',
      capColor: 'bg-yellow-500',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      additive: 'Clot activator + gel separator',
      specimen: 'Serum',
      commonTests: [
        'Routine biochemistry',
        'Lipid profile',
        'Liver function tests (LFT)',
        'Renal function tests (RFT)',
        'Thyroid function tests (TFT)'
      ],
      specialRequirements: [
        'Allow complete clotting before centrifugation',
        'Gel forms a barrier between serum and cells'
      ]
    },
    {
      id: 3,
      name: 'Purple / Lavender Cap',
      subtitle: 'EDTA Tube',
      capColor: 'bg-purple-600',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-700 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      additive: 'EDTA (K₂ or K₃)',
      specimen: 'Whole blood',
      commonTests: [
        'Complete Blood Count (CBC / FBC)',
        'Peripheral blood film',
        'HbA1c',
        'ESR (automated methods)',
        'CD4 count'
      ],
      specialRequirements: [
        'Mix gently 8–10 inversions',
        'Do not centrifuge for CBC',
        'Prevent clotting immediately after collection'
      ]
    },
    {
      id: 4,
      name: 'Black Cap',
      subtitle: 'Sodium Citrate (3.8%)',
      capColor: 'bg-gray-900',
      borderColor: 'border-gray-700',
      textColor: 'text-gray-700 dark:text-gray-300',
      bgColor: 'bg-gray-50 dark:bg-gray-800/50',
      additive: 'Sodium citrate (3.8%)',
      specimen: 'Whole blood',
      commonTests: [
        'ESR (Westergren method)'
      ],
      specialRequirements: [
        'Must be filled exactly to the mark',
        'Blood-to-anticoagulant ratio is critical',
        'Mix gently'
      ]
    },
    {
      id: 5,
      name: 'Light Blue Cap',
      subtitle: 'Sodium Citrate (3.2%)',
      capColor: 'bg-blue-400',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-700 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      additive: 'Sodium citrate (3.2%)',
      specimen: 'Plasma',
      commonTests: [
        'Coagulation studies:',
        '  • PT / INR',
        '  • APTT',
        '  • D-dimer',
        '  • Fibrinogen',
        '  • Coagulation factor assays'
      ],
      specialRequirements: [
        'Fill tube completely (9:1 blood-to-citrate ratio)',
        'Mix gently 3–4 times',
        'Centrifuge promptly if plasma is needed'
      ]
    },
    {
      id: 6,
      name: 'Green Cap',
      subtitle: 'Heparin',
      capColor: 'bg-green-600',
      borderColor: 'border-green-500',
      textColor: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      additive: 'Heparin (Lithium or Sodium)',
      specimen: 'Plasma',
      commonTests: [
        'Electrolytes',
        'Blood gases (if specified)',
        'Ammonia',
        'Some emergency chemistry tests'
      ],
      specialRequirements: [
        'Mix immediately to prevent clotting',
        'Not suitable for coagulation or blood bank tests'
      ]
    },
    {
      id: 7,
      name: 'Grey Cap',
      subtitle: 'Sodium Fluoride + Potassium Oxalate',
      capColor: 'bg-gray-500',
      borderColor: 'border-gray-500',
      textColor: 'text-gray-700 dark:text-gray-300',
      bgColor: 'bg-gray-50 dark:bg-gray-800/50',
      additive: 'Sodium fluoride + Potassium oxalate',
      specimen: 'Plasma',
      commonTests: [
        'Fasting blood glucose',
        'Random blood sugar',
        'Oral glucose tolerance test (OGTT)',
        'Lactate'
      ],
      specialRequirements: [
        'Inhibits glycolysis (prevents glucose breakdown)',
        'Mix gently after collection',
        'Ideal for delayed processing'
      ]
    },
    {
      id: 8,
      name: 'White / Pearl Cap',
      subtitle: 'EDTA + Gel Separator',
      capColor: 'bg-gray-200',
      borderColor: 'border-gray-400',
      textColor: 'text-gray-700 dark:text-gray-300',
      bgColor: 'bg-gray-50 dark:bg-gray-800/50',
      additive: 'EDTA + gel separator',
      specimen: 'Plasma',
      commonTests: [
        'Specialized plasma tests requiring separation'
      ],
      specialRequirements: [
        'Mix gently after collection',
        'Centrifuge to separate plasma from cells'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/#providers" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Providers
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <FileText className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Specimen Collection Guides
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Comprehensive guide to proper collection, packaging, and transportation protocols
              </p>
            </div>
          </div>
          <div className="w-24 h-1 bg-primary-600"></div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border-l-4 border-primary-600">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-2">
                Important Guidelines
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Proper specimen collection is critical for accurate test results. Follow the specific requirements 
                for each tube type, including mixing protocols, filling volumes, and processing times. Incorrect 
                collection can lead to inaccurate results and may require sample recollection.
              </p>
            </div>
          </div>
        </div>

        {/* Tube Types Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tubeTypes.map((tube) => (
            <div
              key={tube.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 ${tube.borderColor} hover:shadow-xl transition-all duration-300`}
            >
              {/* Cap Color Indicator */}
              <div className={`${tube.capColor} h-3 w-full`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`${tube.bgColor} p-3 rounded-lg`}>
                    <TestTube className={tube.textColor} size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold ${tube.textColor} mb-1`}>
                      {tube.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {tube.subtitle}
                    </p>
                  </div>
                </div>

                {/* Additive */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <FlaskConical className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Additive:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tube.additive}</p>
                    </div>
                  </div>
                </div>

                {/* Specimen Type */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-2">
                    <Droplets className="text-gray-500 dark:text-gray-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Specimen:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tube.specimen}</p>
                    </div>
                  </div>
                </div>

                {/* Common Tests */}
                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Common Tests:</p>
                  <ul className="space-y-1">
                    {tube.commonTests.map((test, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span className={test.startsWith('  •') ? 'ml-4' : ''}>{test.replace(/^  •\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Special Requirements */}
                <div>
                  <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Special Requirements:
                  </p>
                  <ul className="space-y-1">
                    {tube.specialRequirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-amber-600 dark:text-amber-400 mt-1">⚠</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Infographic */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">
                Blood Collection Tubes Visual Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                A comprehensive visual reference guide showing all blood collection tubes, their additives, sample types, 
                common uses, and the critical order of draw for proper specimen collection.
              </p>
            </div>
            <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <Image
                src="/testphotos/bloodcollection.png"
                alt="Blood Collection Tubes & Their Uses - Comprehensive guide showing different tube types, additives, sample types, common tests, and order of draw"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority={false}
                quality={90}
              />
            </div>
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                    Important: Order of Draw
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    The order of draw shown in the infographic is critical for preventing cross-contamination between tubes. 
                    Always follow this sequence when collecting multiple tubes from a single venipuncture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
          <h2 className="text-xl font-semibold text-primary-700 dark:text-primary-400 mb-4">
            General Collection Guidelines
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
              <span>Always label tubes immediately after collection with patient information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
              <span>Follow the correct order of draw to prevent cross-contamination</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
              <span>Store specimens at appropriate temperatures until transport</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
              <span>Transport specimens promptly to the laboratory</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
              <span>Contact the laboratory if you have questions about specific collection requirements</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

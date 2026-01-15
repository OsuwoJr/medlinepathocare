'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Microscope, Dna, Download, Printer } from 'lucide-react';

export default function ReferralFormPage() {
  const [formData, setFormData] = useState({
    // Patient Information
    fullName: '',
    patientId: '',
    contact: '',
    age: '',
    gender: '',
    
    // Medical History
    allergies: '',
    medications: '',
    conditions: '',
    
    // Requester Information
    requestingPhysician: '',
    department: '',
    signature: '',
    phone: '',
    emailFax: '',
    referringFacility: '',
    
    // Sample Information
    sampleType: '',
    containerPreservative: '',
    collectionDate: '',
    collectionTime: '',
    collectionLocation: '',
    
    // Test Information
    requestedTests1: '',
    requestedTests2: '',
    requestedTests3: '',
    requestedTests4: '',
    requestedTests5: '',
    clinicalIndication1: '',
    clinicalIndication2: '',
    
    // Submission Details
    submissionDate: '',
    submissionTime: '',
    specialInstructions: '',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        .form-field-line {
          border-bottom: 2px dotted #1f2937;
          padding-bottom: 2px;
          min-height: 14px;
          line-height: 1.2;
          margin-bottom: 3px;
          display: block;
          overflow: visible;
        }
        @media print {
          @page {
            margin: 0.1in;
            size: letter;
          }
          html, body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
          }
          /* Hide navigation */
          nav,
          header,
          [role="navigation"] {
            display: none !important;
          }
          /* Hide fixed/sticky elements (accessibility controls, theme buttons) */
          [class*="fixed"],
          [class*="sticky"],
          [style*="position: fixed"],
          [style*="position: sticky"] {
            display: none !important;
          }
          /* Hide all buttons except print button */
          button:not(.print-only) {
            display: none !important;
          }
          /* Hide the no-print class elements */
          .no-print {
            display: none !important;
          }
          /* Show only the form container */
          .form-print-container {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          /* Hide everything else at body level */
          body > *:not(.form-print-container) {
            display: none !important;
          }
          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .form-field-line {
            border-bottom: 1.5px dotted #1f2937 !important;
            padding-bottom: 1px !important;
            min-height: 10px !important;
            line-height: 1 !important;
            margin-bottom: 1px !important;
            display: block !important;
            overflow: visible !important;
          }
          .form-section {
            margin-bottom: 3px !important;
            page-break-inside: avoid !important;
          }
          .form-section-title {
            margin-bottom: 1px !important;
            padding: 1px 0 !important;
            line-height: 1.1 !important;
          }
          label {
            margin-bottom: 0 !important;
            line-height: 1 !important;
          }
        }
      `}</style>
      <div className="min-h-screen bg-white py-8 px-4 print:py-0 print:px-0 form-print-container">
        <div className="max-w-4xl mx-auto bg-white border-2 border-black print:border-0 print:max-w-full print:shadow-none">
          {/* Header with Logo */}
          <div className="flex items-center justify-center gap-3 py-3 px-4 border-b-2 border-black print:border-b print:py-1 print:gap-2">
            <Microscope className="text-primary-500 print:w-8 print:h-8" size={32} />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-primary-600 uppercase tracking-wide print:text-sm print:leading-tight">
                MEDLINE PATHOCARE
              </h1>
              <Dna className="text-gray-400 print:w-4 print:h-4" size={20} />
            </div>
          </div>
          <div className="text-center py-1 px-4 print:py-0.5 print:px-2">
            <p className="text-sm italic text-accent-600 print:text-xs print:leading-tight">
              Your trusted partner in diagnostics
            </p>
          </div>

          {/* Form Title */}
          <div className="text-center py-2 px-4 print:py-0.5 print:px-2">
            <h2 className="text-lg font-bold text-primary-600 uppercase tracking-wide print:text-sm print:leading-none">
              LABORATORY TEST REQUEST FORM
            </h2>
          </div>

          {/* Download/Print Button */}
          <div className="flex justify-center gap-3 py-3 px-4 no-print">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              <Download size={20} />
              Download/Print
            </button>
          </div>

        {/* Form Content */}
        <div className="px-4 pb-2 space-y-2 print:space-y-0.5 print:px-2 print:pb-1">
          {/* Patient Information Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Patient Information
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Full Name:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.fullName || '................................................................................'}</span>
                </div>
              </div>
              <div className="flex gap-3 items-end print:gap-2">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Patient ID/Number:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.patientId || '................................................................................'}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-end print:gap-1">
                  <div className="w-20 print:w-14">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Age:
                    </label>
                    <div className="form-field-line">
                      <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.age || '...........'}</span>
                    </div>
                  </div>
                  <div className="w-24 print:w-16">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Gender:
                    </label>
                    <div className="form-field-line">
                      <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.gender || '.........'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Contact (Address/Phone/Email):
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.contact || '............................................................'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical History Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Medical History
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Known Allergies:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.allergies || '................................................................................'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Current Medications:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.medications || '................................................................................'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Pre-existing Conditions:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.conditions || '................................................................................'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Requester Information Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Requester Information
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Requesting Physician/Doctor/Clinician:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestingPhysician || '................................................................................'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Department:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.department || '................................................................................'}</span>
                </div>
              </div>
              <div className="flex gap-3 items-end print:gap-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Signature:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.signature || '................................................................................'}</span>
                  </div>
                </div>
                <div className="flex gap-2 items-end print:gap-1">
                  <div className="w-32 print:w-24">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Phone:
                    </label>
                    <div className="form-field-line">
                      <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.phone || '....................................'}</span>
                    </div>
                  </div>
                  <div className="w-32 print:w-24">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Email/Fax:
                    </label>
                    <div className="form-field-line">
                      <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.emailFax || '.......................................'}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Referring Facility Name & Location:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.referringFacility || '................................................................................'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Information Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Sample Information
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Sample Type:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.sampleType || '................................................................................'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Container/Preservative Used:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.containerPreservative || '................................................................................'}</span>
                </div>
              </div>
              <div className="flex gap-3 print:gap-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Date of Collection:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.collectionDate || '........................'}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Time:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.collectionTime || '........................'}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Collection Location:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.collectionLocation || '........................'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Information Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Test Information
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Requested Tests:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestedTests1 || '................................................................................'}</span>
                </div>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestedTests2 || '................................................................................'}</span>
                </div>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestedTests3 || '................................................................................'}</span>
                </div>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestedTests4 || '................................................................................'}</span>
                </div>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.requestedTests5 || '................................................................................'}</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Clinical Indication (Symptoms/Diagnosi):
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.clinicalIndication1 || '................................................................................'}</span>
                </div>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.clinicalIndication2 || '................................................................................'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Details Section */}
          <div className="form-section">
            <h3 className="text-sm font-bold text-red-600 text-center mb-1 uppercase print:text-[10px] form-section-title print:mb-0">
              Submission Details <span className="text-black font-normal normal-case text-[10px] print:text-[8px]">[To be filled by the referral Laboratory]</span>
            </h3>
            <div className="space-y-1 print:space-y-0">
              <div className="flex gap-3 print:gap-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Date of Submission:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.submissionDate || '........................'}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Time:
                  </label>
                  <div className="form-field-line">
                    <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.submissionTime || '........................'}</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Any special Instructions:
                </label>
                <div className="form-field-line">
                  <span className="text-black text-[11px] print:text-[9px] leading-none">{formData.specialInstructions || '................................................................................'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instructional Text */}
          <div className="mt-2 pt-1 print:mt-0.5 print:pt-0">
            <p className="text-[10px] text-black leading-tight print:text-[8px] print:leading-tight">
              Please fill in all sections clearly and legibly. Ensure patient identification and sample collection details are accurate. Incomplete forms may delay processing. Attach any relevant documents or clinical notes if necessary.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

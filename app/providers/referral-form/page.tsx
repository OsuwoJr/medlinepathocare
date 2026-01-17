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

  const [serialNumber, setSerialNumber] = useState<string>('');

  const generateSerialNumber = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const microsecond = String(now.getMilliseconds()).padStart(3, '0');
    
    // Format: YYYYMMDD-HHMMSS-MMM
    return `${year}${month}${day}-${hour}${minute}${second}-${microsecond}`;
  };

  const handlePrint = () => {
    const serial = generateSerialNumber();
    setSerialNumber(serial);
    // Small delay to ensure state is updated before print dialog opens
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/documents/MP-LAB.TEST REQUEST FORM_MMC2025.pdf';
    link.download = 'MP-LAB.TEST REQUEST FORM_MMC2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
        .form-field-line::placeholder {
          color: transparent;
        }
        .form-field-line:focus {
          border-bottom: 2px dotted #1f2937;
          outline: none;
        }
        @media print {
          @page {
            margin: 0.1in;
            size: letter;
            page-break-after: avoid;
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
            background: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .form-field-line::placeholder {
            color: transparent !important;
          }
          input.form-field-line {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
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
            {serialNumber && (
              <div className="mt-1 print:mt-0.5">
                <p className="text-xs font-semibold text-gray-700 print:text-[9px] print:leading-tight">
                  Serial Number: <span className="font-mono">{serialNumber}</span>
                </p>
              </div>
            )}
          </div>

          {/* Download/Print Buttons */}
          <div className="flex justify-center gap-3 py-3 px-4 no-print">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              <Download size={20} />
              Download Pdf
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              <Printer size={20} />
              Print
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
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div className="flex gap-3 items-end print:gap-2">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Patient ID/Number:
                  </label>
                  <input
                    type="text"
                    value={formData.patientId}
                    onChange={(e) => handleInputChange('patientId', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="................................................................................"
                  />
                </div>
                <div className="flex gap-2 items-end print:gap-1">
                  <div className="w-20 print:w-14">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Age:
                    </label>
                    <input
                      type="text"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                      placeholder="..........."
                    />
                  </div>
                  <div className="w-24 print:w-16">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Gender:
                    </label>
                    <input
                      type="text"
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                      placeholder="........."
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Contact (Address/Phone/Email):
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="............................................................"
                />
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
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Current Medications:
                </label>
                <input
                  type="text"
                  value={formData.medications}
                  onChange={(e) => handleInputChange('medications', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Pre-existing Conditions:
                </label>
                <input
                  type="text"
                  value={formData.conditions}
                  onChange={(e) => handleInputChange('conditions', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
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
                <input
                  type="text"
                  value={formData.requestingPhysician}
                  onChange={(e) => handleInputChange('requestingPhysician', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Department:
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div className="flex gap-3 items-end print:gap-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Signature:
                  </label>
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="................................................................................"
                  />
                </div>
                <div className="flex gap-2 items-end print:gap-1">
                  <div className="w-32 print:w-24">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Phone:
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                      placeholder="...................................."
                    />
                  </div>
                  <div className="w-32 print:w-24">
                    <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                      Email/Fax:
                    </label>
                    <input
                      type="text"
                      value={formData.emailFax}
                      onChange={(e) => handleInputChange('emailFax', e.target.value)}
                      className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                      placeholder="......................................."
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Referring Facility Name & Location:
                </label>
                <input
                  type="text"
                  value={formData.referringFacility}
                  onChange={(e) => handleInputChange('referringFacility', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
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
                <input
                  type="text"
                  value={formData.sampleType}
                  onChange={(e) => handleInputChange('sampleType', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Container/Preservative Used:
                </label>
                <input
                  type="text"
                  value={formData.containerPreservative}
                  onChange={(e) => handleInputChange('containerPreservative', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div className="flex gap-3 print:gap-1">
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Date of Collection:
                  </label>
                  <input
                    type="text"
                    value={formData.collectionDate}
                    onChange={(e) => handleInputChange('collectionDate', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="........................"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Time:
                  </label>
                  <input
                    type="text"
                    value={formData.collectionTime}
                    onChange={(e) => handleInputChange('collectionTime', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="........................"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Collection Location:
                  </label>
                  <input
                    type="text"
                    value={formData.collectionLocation}
                    onChange={(e) => handleInputChange('collectionLocation', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="........................"
                  />
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
                <input
                  type="text"
                  value={formData.requestedTests1}
                  onChange={(e) => handleInputChange('requestedTests1', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0 mb-1 print:mb-0"
                  placeholder="................................................................................"
                />
                <input
                  type="text"
                  value={formData.requestedTests2}
                  onChange={(e) => handleInputChange('requestedTests2', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0 mb-1 print:mb-0"
                  placeholder="................................................................................"
                />
                <input
                  type="text"
                  value={formData.requestedTests3}
                  onChange={(e) => handleInputChange('requestedTests3', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0 mb-1 print:mb-0"
                  placeholder="................................................................................"
                />
                <input
                  type="text"
                  value={formData.requestedTests4}
                  onChange={(e) => handleInputChange('requestedTests4', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0 mb-1 print:mb-0"
                  placeholder="................................................................................"
                />
                <input
                  type="text"
                  value={formData.requestedTests5}
                  onChange={(e) => handleInputChange('requestedTests5', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Clinical Indication (Symptoms/Diagnosi):
                </label>
                <input
                  type="text"
                  value={formData.clinicalIndication1}
                  onChange={(e) => handleInputChange('clinicalIndication1', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0 mb-1 print:mb-0"
                  placeholder="................................................................................"
                />
                <input
                  type="text"
                  value={formData.clinicalIndication2}
                  onChange={(e) => handleInputChange('clinicalIndication2', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
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
                  <input
                    type="text"
                    value={formData.submissionDate}
                    onChange={(e) => handleInputChange('submissionDate', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="........................"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                    Time:
                  </label>
                  <input
                    type="text"
                    value={formData.submissionTime}
                    onChange={(e) => handleInputChange('submissionTime', e.target.value)}
                    className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                    placeholder="........................"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-black mb-0 print:text-[9px] leading-none">
                  Any special Instructions:
                </label>
                <input
                  type="text"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="form-field-line w-full bg-transparent border-none outline-none text-black text-[11px] print:text-[9px] leading-none p-0"
                  placeholder="................................................................................"
                />
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

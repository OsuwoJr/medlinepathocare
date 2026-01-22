'use client';

import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Users, MessageSquare, BookOpen, FileText, Phone, Mail, CheckCircle, Clock, Target, Lightbulb, Calendar, X, Loader2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConsultativeServicesPage() {
  const [showPhoneOptions, setShowPhoneOptions] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    phone: '',
    facility: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'In-Person Consultation',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const services = [
    {
      icon: BookOpen,
      title: 'Test Selection Consultation',
      description: 'Expert guidance on selecting the most appropriate tests for specific clinical scenarios and patient presentations.',
      details: [
        'Review of patient history and clinical presentation',
        'Recommendation of optimal test panels',
        'Cost-effective test selection strategies',
        'Understanding test limitations and alternatives',
        'Sequential testing approaches for complex cases'
      ],
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-500'
    },
    {
      icon: FileText,
      title: 'Result Interpretation',
      description: 'Comprehensive assistance in understanding and interpreting complex laboratory results for clinical decision-making.',
      details: [
        'Detailed explanation of test results',
        'Clinical significance and implications',
        'Reference ranges and normal values',
        'Abnormal result interpretation',
        'Follow-up testing recommendations'
      ],
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500'
    },
    {
      icon: MessageSquare,
      title: 'Clinical Consultation',
      description: 'Direct access to our laboratory experts for case discussions and clinical guidance.',
      details: [
        'Case-by-case consultation with pathologists',
        'Complex case review and discussion',
        'Multi-disciplinary case coordination',
        'Urgent result clarification',
        'Treatment monitoring guidance'
      ],
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-500'
    },
    {
      icon: Target,
      title: 'Quality Improvement Support',
      description: 'Assistance with laboratory utilization review and quality improvement initiatives.',
      details: [
        'Test utilization analysis',
        'Quality metrics and benchmarking',
        'Protocol development support',
        'Continuing education resources',
        'Best practice recommendations'
      ],
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-500'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Expert Guidance',
      description: 'Access to experienced laboratory scientists and pathologists for clinical decision support.'
    },
    {
      icon: Clock,
      title: 'Timely Response',
      description: 'Rapid consultation availability for urgent clinical questions and result interpretation.'
    },
    {
      icon: Lightbulb,
      title: 'Educational Resources',
      description: 'Comprehensive educational materials and training to enhance your understanding of diagnostic testing.'
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'Building long-term relationships to support optimal patient care through effective laboratory utilization.'
    }
  ];

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '+254796168900';
  const emailAddress = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'medlinepathocarelab@gmail.com';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254796168900';

  const handlePhoneClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPhoneOptions(true);
  }, []);

  const handleEmailClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Open email client with mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=Email Consultation Request`;
    
    // Create a temporary anchor element to trigger mailto
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Email client should open automatically via mailto link
  }, [emailAddress]);

  const handleScheduleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowScheduleModal(true);
  }, []);

  const validateScheduleForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!scheduleForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!scheduleForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(scheduleForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!scheduleForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!scheduleForm.preferredDate.trim()) {
      newErrors.preferredDate = 'Preferred date is required';
    }
    if (!scheduleForm.preferredTime.trim()) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateScheduleForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formPayload = {
        _subject: `In-Person Consultation Request from ${scheduleForm.name}`,
        name: scheduleForm.name,
        email: scheduleForm.email,
        phone: scheduleForm.phone,
        facility: scheduleForm.facility,
        preferredDate: scheduleForm.preferredDate,
        preferredTime: scheduleForm.preferredTime,
        consultationType: scheduleForm.consultationType,
        message: scheduleForm.message
      };

      const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_CONSULTATION_ENDPOINT;
      
      if (!formspreeEndpoint) {
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setScheduleForm({
          name: '',
          email: '',
          phone: '',
          facility: '',
          preferredDate: '',
          preferredTime: '',
          consultationType: 'In-Person Consultation',
          message: ''
        });
        setTimeout(() => {
          setShowScheduleModal(false);
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      // Secure error handling - only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Form submission error:', error);
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <Users className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Consultative Services
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Expert support for test selection, result interpretation, and optimal patient care
              </p>
            </div>
          </div>
          <div className="w-24 h-1 bg-primary-600"></div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border-l-4 border-primary-600">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            At Medline Pathocare, we understand that effective laboratory testing goes beyond simply performing 
            tests and reporting results. Our consultative services are designed to support healthcare providers 
            throughout the entire diagnostic process—from selecting the most appropriate tests for their patients 
            to interpreting complex results and making informed clinical decisions. We are committed to being 
            your trusted partner in diagnostic medicine, providing expert guidance, educational resources, and 
            collaborative support to ensure optimal patient care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
            Our Consultative Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 ${service.borderColor} hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`${service.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <IconComponent className={service.color} size={32} />
                  </div>
                  <h3 className={`text-2xl font-bold ${service.color} mb-3`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">What We Offer:</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className={`${service.color} flex-shrink-0 mt-0.5`} size={16} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
            Benefits of Our Consultative Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="text-primary-600 dark:text-primary-400" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consultation Methods */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-8 text-center">
            How to Access Our Consultative Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Consultation */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPhoneOptions(true);
              }}
              type="button"
              aria-label="Open phone consultation options"
              className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg shadow-lg p-6 border border-primary-200 dark:border-primary-800 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] relative z-10"
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4 pointer-events-none">
                <Phone className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3 pointer-events-none">
                Phone Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 pointer-events-none">
                Direct phone access to our laboratory experts during business hours for immediate consultation needs.
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-primary-700 pointer-events-none">
                <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 text-center">
                  {phoneNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  Click for options
                </p>
              </div>
            </button>

            {/* Email Consultation */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg shadow-lg p-6 border border-primary-200 dark:border-primary-800">
              <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                Email Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Send detailed case information via email for comprehensive review and written consultation response.
              </p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent('Email Consultation Request')}&body=${encodeURIComponent('Hello, I would like to request an email consultation.')}`;
                    // Open mailto link
                    window.location.href = mailtoLink;
                  }}
                  type="button"
                  className="w-full block p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-center cursor-pointer active:scale-[0.98]"
                  aria-label={`Send email to ${emailAddress}`}
                >
                  <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 break-all">
                    {emailAddress}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Click to open email client
                  </p>
                </button>
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try {
                      await navigator.clipboard.writeText(emailAddress);
                      alert(`Email address copied to clipboard: ${emailAddress}`);
                    } catch (err) {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = emailAddress;
                      textArea.style.position = 'fixed';
                      textArea.style.opacity = '0';
                      document.body.appendChild(textArea);
                      textArea.select();
                      try {
                        document.execCommand('copy');
                        alert(`Email address copied to clipboard: ${emailAddress}`);
                      } catch (fallbackErr) {
                        alert(`Please copy this email address: ${emailAddress}`);
                      }
                      document.body.removeChild(textArea);
                    }
                  }}
                  type="button"
                  className="w-full p-2 bg-primary-600 dark:bg-primary-500 text-white text-xs font-semibold rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                >
                  Copy Email Address
                </button>
              </div>
            </div>

            {/* In-Person Consultation */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowScheduleModal(true);
              }}
              type="button"
              aria-label="Schedule an in-person consultation"
              className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg shadow-lg p-6 border border-primary-200 dark:border-primary-800 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:scale-[0.98] relative z-10"
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4 pointer-events-none">
                <MessageSquare className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3 pointer-events-none">
                In-Person Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 pointer-events-none">
                Schedule in-person meetings with our pathologists for complex case discussions and collaborative planning.
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-primary-700 pointer-events-none">
                <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 text-center">
                  Contact us to schedule
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  Click to schedule
                </p>
              </div>
            </button>

            {/* WhatsApp Consultation */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello, I would like to request a consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg shadow-lg p-6 border border-primary-200 dark:border-primary-800 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 block"
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                WhatsApp Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Quick and convenient consultation via WhatsApp for immediate responses and easy communication.
              </p>
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-primary-700">
                <p className="text-sm font-semibold text-primary-700 dark:text-primary-400 text-center">
                  {phoneNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                  Click to message
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Phone Options Modal */}
        {showPhoneOptions && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPhoneOptions(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="phone-modal-title"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 id="phone-modal-title" className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                  Contact Options
                </h3>
                <button
                  onClick={() => setShowPhoneOptions(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-3">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border-2 border-primary-200 dark:border-primary-700 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  <div className="bg-primary-600 dark:bg-primary-500 p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary-700 dark:text-primary-400">Call Now</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{phoneNumber}</p>
                  </div>
                </a>
                <a
                  href={`sms:${phoneNumber}`}
                  className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-full">
                    <MessageSquare className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-700 dark:text-blue-400">Send SMS</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Text message</p>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hello, I would like to request a consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <div className="bg-green-600 dark:bg-green-500 p-3 rounded-full">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-700 dark:text-green-400">WhatsApp</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Message on WhatsApp</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4 overflow-y-auto"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowScheduleModal(false);
                setSubmitStatus('idle');
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="schedule-modal-title"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 my-8 relative z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 id="schedule-modal-title" className="text-2xl font-bold text-primary-700 dark:text-primary-400 flex items-center gap-2">
                  <Calendar className="text-primary-600 dark:text-primary-400" size={28} />
                  Schedule In-Person Consultation
                </h3>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    setSubmitStatus('idle');
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                  <p className="text-green-800 dark:text-green-300 font-semibold">
                    ✓ Consultation request submitted successfully! We&apos;ll contact you shortly to confirm.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                  <p className="text-red-800 dark:text-red-300 font-semibold">
                    There was an error submitting your request. Please try again or contact us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={scheduleForm.name}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={scheduleForm.email}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={scheduleForm.phone}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, phone: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+254 700 000 000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="facility" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Facility/Organization
                    </label>
                    <input
                      type="text"
                      id="facility"
                      value={scheduleForm.facility}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, facility: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Facility name (optional)"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      value={scheduleForm.preferredDate}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      id="preferredTime"
                      value={scheduleForm.preferredTime}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, preferredTime: e.target.value })}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                        errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.preferredTime && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    value={scheduleForm.message}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                    placeholder="Please provide any additional details about your consultation needs, topics to discuss, or special requirements..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowScheduleModal(false);
                      setSubmitStatus('idle');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Calendar size={20} />
                        Schedule Consultation
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* When to Consult */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6">
            When to Request a Consultation
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                Test Selection Scenarios
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Uncertain about which tests to order for a specific condition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Need guidance on test panels vs. individual tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Want to optimize cost-effectiveness of testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Require specialized testing for rare conditions</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                Result Interpretation Scenarios
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Unclear or conflicting test results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Results outside expected ranges without clear explanation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Need clarification on clinical significance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                  <span>Complex cases requiring expert interpretation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary-600 dark:bg-primary-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Access Our Consultative Services?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contact us today to discuss your consultation needs or schedule a meeting with our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="tel:+254796168900"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

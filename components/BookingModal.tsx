'use client';

import { useState, FormEvent, useRef } from 'react';
import { X } from 'lucide-react';
import { bookingSchema, type BookingFormData } from '@/lib/validation';

interface Test {
  id: string;
  title: string;
  price: number;
}

interface BookingModalProps {
  tests: Test[];
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ tests, isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email' as 'email' | 'whatsapp',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Rate limiting
  const lastSubmitTime = useRef<number>(0);
  const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds

  if (!isOpen) return null;

  const normalizedTests = (tests || []).filter(Boolean);
  const totalPrice = normalizedTests.reduce((sum, t) => sum + (Number.isFinite(t.price) ? t.price : 0), 0);
  const plural = normalizedTests.length === 1 ? '' : 's';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime.current < MIN_SUBMIT_INTERVAL) {
      alert('Please wait a few seconds before submitting again.');
      setIsSubmitting(false);
      return;
    }
    lastSubmitTime.current = now;

    // Validate input
    const validationResult = bookingSchema.safeParse(formData);
    if (!validationResult.success) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      // Only log validation errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Validation errors:', validationResult.error.issues);
      }
      return;
    }

    try {
      if (formData.preferredContact === 'whatsapp') {
        // Sanitize inputs before using
        const sanitizedName = formData.name.trim().substring(0, 100);
        const sanitizedEmail = formData.email?.trim().substring(0, 255) || '';
        const sanitizedPhone = formData.phone.trim().substring(0, 15);
        const sanitizedMessage = formData.message?.trim().substring(0, 1000) || '';

        const testsBlock =
          normalizedTests.length > 0
            ? normalizedTests
                .map(
                  (t) =>
                    `• ${t.title} (ID: ${t.id}) - KES ${t.price.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
                )
                .join('\n')
            : '• (No tests selected)';

        const whatsappMessage = `*Test Booking Request*

*Test Details:*
${testsBlock}

*Total:*
KES ${totalPrice.toLocaleString('en-KE', { minimumFractionDigits: 2 })}

*Customer Details:*
• Name: ${sanitizedName}
• Email: ${sanitizedEmail}
• Phone: ${sanitizedPhone}

${sanitizedMessage ? `*Additional Message:*\n${sanitizedMessage}\n\n` : ''}Booking Date: ${new Date().toLocaleString('en-KE', { 
          dateStyle: 'full', 
          timeStyle: 'short' 
        })}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '254796168900';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredContact: 'email',
          message: '',
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
        
        if (!formspreeEndpoint) {
          setSubmitStatus('error');
          setIsSubmitting(false);
          return;
        }
        
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tests: normalizedTests.map((t) => ({
              id: t.id,
              title: t.title,
              price: t.price,
            })),
            testNames: normalizedTests.map((t) => t.title).join(', '),
            testIds: normalizedTests.map((t) => t.id).join(', '),
            totalPrice,
            customerName: formData.name.trim(),
            customerEmail: formData.email?.trim() || '',
            customerPhone: formData.phone.trim(),
            preferredContact: formData.preferredContact,
            message: formData.message?.trim() || '',
            bookingDate: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            phone: '',
            preferredContact: 'email',
            message: '',
          });
          setTimeout(() => {
            onClose();
            setSubmitStatus('idle');
          }, 2000);
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      // Secure error handling - only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Booking submission error:', error);
      }
      // In production, don't expose error details
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400">
            {normalizedTests.length <= 1 ? 'Book Test' : `Book Test${plural}`} {normalizedTests.length === 1 ? `: ${normalizedTests[0]?.title}` : ''}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {normalizedTests.length <= 1 ? 'Selected Test' : `Selected Tests (${normalizedTests.length})`}
                </p>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {normalizedTests.length === 0 ? (
                    <p>No tests selected.</p>
                  ) : (
                    normalizedTests.slice(0, 6).map((t) => (
                      <p key={t.id} className="flex items-center justify-between gap-3">
                        <span className="truncate">{t.title}</span>
                        <span className="shrink-0 font-medium text-primary-700 dark:text-primary-400">
                          KES {t.price.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                        </span>
                      </p>
                    ))
                  )}
                  {normalizedTests.length > 6 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">+ {normalizedTests.length - 6} more…</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
                <p className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                  KES {totalPrice.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                maxLength={100}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                maxLength={255}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                maxLength={15}
                pattern="^(0[17]\d{8}|0[2-9]\d{8}|\+254[17]\d{8}|\+254[2-9]\d{8}|254[17]\d{8}|254[2-9]\d{8})$"
                placeholder="0751406993 or +254751406993"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Contact Method *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'whatsapp' })}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Email</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="whatsapp"
                    checked={formData.preferredContact === 'whatsapp'}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as 'email' | 'whatsapp' })}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">WhatsApp</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Message (Optional)
              </label>
              <textarea
                id="message"
                rows={3}
                maxLength={1000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Any special requests or notes..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                  Booking request submitted successfully! We&apos;ll contact you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                  There was an error submitting your booking. Please try again or contact us directly.
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : normalizedTests.length <= 1 ? 'Book Test' : `Book Test${plural}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

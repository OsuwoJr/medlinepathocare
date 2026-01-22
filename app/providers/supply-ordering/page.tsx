'use client';

import { useState } from 'react';
import { ArrowLeft, Package, CheckCircle, AlertCircle, Loader2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface SupplyItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

export default function SupplyOrderingPage() {
  const [formData, setFormData] = useState({
    facilityName: '',
    requestingPhysician: '',
    department: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    postalCode: '',
    preferredDeliveryDate: '',
    specialInstructions: '',
  });

  const [supplyItems, setSupplyItems] = useState<SupplyItem[]>([
    { id: '1', name: 'Specimen Labels', description: 'Standard specimen identification labels', quantity: 0 },
    { id: '2', name: 'Blood Collection Tubes - Red Cap', description: 'Plain / Clot Activator tubes', quantity: 0 },
    { id: '3', name: 'Blood Collection Tubes - Yellow Cap (SST)', description: 'Serum Separator Tubes', quantity: 0 },
    { id: '4', name: 'Blood Collection Tubes - Purple/Lavender Cap', description: 'EDTA tubes for CBC', quantity: 0 },
    { id: '5', name: 'Blood Collection Tubes - Light Blue Cap', description: 'Sodium Citrate for coagulation', quantity: 0 },
    { id: '6', name: 'Blood Collection Tubes - Green Cap', description: 'Heparin tubes', quantity: 0 },
    { id: '7', name: 'Blood Collection Tubes - Grey Cap', description: 'Sodium Fluoride for glucose', quantity: 0 },
    { id: '8', name: 'Shipping Containers', description: 'Specimen shipping boxes', quantity: 0 },
    { id: '9', name: 'Coolant Packs', description: 'Temperature control packs', quantity: 0 },
    { id: '10', name: 'Bubble Wrap / Padding', description: 'Protective packaging materials', quantity: 0 },
    { id: '11', name: 'Specimen Bags', description: 'Biohazard specimen transport bags', quantity: 0 },
    { id: '12', name: 'Request Forms', description: 'Printed referral/request forms', quantity: 0 },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateQuantity = (id: string, change: number) => {
    setSupplyItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.facilityName.trim()) {
      newErrors.facilityName = 'Facility name is required';
    }
    if (!formData.requestingPhysician.trim()) {
      newErrors.requestingPhysician = 'Requesting physician is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const totalQuantity = supplyItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity === 0) {
      newErrors.supplies = 'Please select at least one supply item';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const selectedItems = supplyItems.filter(item => item.quantity > 0);
      
      const formPayload = {
        _subject: `Supply Order Request from ${formData.facilityName}`,
        facilityName: formData.facilityName,
        requestingPhysician: formData.requestingPhysician,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        city: formData.city,
        postalCode: formData.postalCode,
        preferredDeliveryDate: formData.preferredDeliveryDate,
        specialInstructions: formData.specialInstructions,
        supplyItems: selectedItems.map(item => 
          `${item.name} (${item.description}): Quantity - ${item.quantity}`
        ).join('\n'),
        totalItems: selectedItems.length,
        totalQuantity: selectedItems.reduce((sum, item) => sum + item.quantity, 0),
      };

      const response = await fetch('https://formspree.io/f/maqqnbao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          facilityName: '',
          requestingPhysician: '',
          department: '',
          email: '',
          phone: '',
          deliveryAddress: '',
          city: '',
          postalCode: '',
          preferredDeliveryDate: '',
          specialInstructions: '',
        });
        setSupplyItems(items => items.map(item => ({ ...item, quantity: 0 })));
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedItemsCount = supplyItems.filter(item => item.quantity > 0).length;
  const totalQuantity = supplyItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
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
              <Package className="text-primary-600 dark:text-primary-400" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                Supply Ordering
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Order specimen labels, collection tubes, shipping materials, and other supplies
              </p>
            </div>
          </div>
          <div className="w-24 h-1 bg-primary-600"></div>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-1">
                Order Submitted Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-400">
                Your supply order has been received. We&apos;ll process it and contact you shortly to confirm delivery details.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">
                Submission Error
              </h3>
              <p className="text-red-700 dark:text-red-400">
                There was an error submitting your order. Please try again or contact us directly.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Facility Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6 flex items-center gap-2">
              <Package className="text-primary-600 dark:text-primary-400" size={24} />
              Facility Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="facilityName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Facility Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="facilityName"
                  value={formData.facilityName}
                  onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.facilityName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter facility name"
                />
                {errors.facilityName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.facilityName}</p>
                )}
              </div>

              <div>
                <label htmlFor="requestingPhysician" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Requesting Physician <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="requestingPhysician"
                  value={formData.requestingPhysician}
                  onChange={(e) => setFormData({ ...formData, requestingPhysician: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.requestingPhysician ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Physician name"
                />
                {errors.requestingPhysician && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.requestingPhysician}</p>
                )}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Department name (optional)"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@facility.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+254 700 000 000"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6">
              Delivery Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="deliveryAddress" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Street address, building name, etc."
                />
                {errors.deliveryAddress && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deliveryAddress}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Postal code (optional)"
                />
              </div>

              <div>
                <label htmlFor="preferredDeliveryDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  id="preferredDeliveryDate"
                  value={formData.preferredDeliveryDate}
                  onChange={(e) => setFormData({ ...formData, preferredDeliveryDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {/* Supply Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 flex items-center gap-2">
                <ShoppingCart className="text-primary-600 dark:text-primary-400" size={24} />
                Select Supplies
              </h2>
              {selectedItemsCount > 0 && (
                <div className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-400">
                    {selectedItemsCount} item{selectedItemsCount !== 1 ? 's' : ''} • {totalQuantity} total
                  </span>
                </div>
              )}
            </div>

            {errors.supplies && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.supplies}</p>
              </div>
            )}

            <div className="space-y-4">
              {supplyItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg transition-all ${
                    item.quantity > 0
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity === 0}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus size={18} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-800 dark:text-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Plus size={18} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-6">
              Additional Information
            </h2>
            <div>
              <label htmlFor="specialInstructions" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Special Instructions or Notes
              </label>
              <textarea
                id="specialInstructions"
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                placeholder="Any special delivery instructions, urgent requirements, or additional notes..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/#providers"
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <Package size={20} />
                  Submit Order
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

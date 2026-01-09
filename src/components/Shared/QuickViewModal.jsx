import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ImageWithSkeleton from './ImageWithSkeleton';
import Button from './Button';
import useCartStore from '../../stores/cartStore';
import useAuthStore from '../../stores/authStore';
import { X } from 'lucide-react';

export default function QuickViewModal({ isOpen, onClose, product }) {
  const { addItem, expressCheckout } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, 1);
    onClose();
  };

  const handleOneClick = () => {
    if (!isAuthenticated) {
      // let caller handle redirect; close modal for now
      onClose();
      return;
    }
    const customer = { email: user.email, name: `${user.firstName || ''} ${user.lastName || ''}`.trim() };
    const order = expressCheckout(customer);
    // navigate is not available here; we'll just close and rely on caller if needed
    // but we can open order-success in window
    window.location.href = `/order-success/${order.id}`;
  };

  return (
    <Transition show={isOpen} as={Fragment} appear>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 dark:text-gray-100">{product.name}</Dialog.Title>
                  <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"><X className="w-5 h-5" /></button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <ImageWithSkeleton src={product.images[0]} alt={product.name} className="rounded-lg aspect-square" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-700 dark:text-gray-200 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">${product.price}</div>
                    <div className="mt-auto flex gap-3">
                      <Button onClick={handleAdd} leftIcon={<svg className="w-4 h-4" />} fullWidth> Add to Cart </Button>
                      {isAuthenticated && user?.savedPayments && user.savedPayments.length > 0 ? (
                        <Button variant="primary" onClick={handleOneClick} fullWidth>One-Click Buy</Button>
                      ) : (
                        <Button variant="secondary" onClick={() => { window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname); }}>Login to buy</Button>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

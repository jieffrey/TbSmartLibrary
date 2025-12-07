// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { QrCode, CheckCircle } from "lucide-react";

// export default function QrBerhasil({ bookId, open, onClose }) {
//   const [success, setSuccess] = useState(false);

//   const handleScan = () => {
//     // simulasi scan berhasil
//     setTimeout(() => {
//       setSuccess(true);
//     }, 1000);
//   };

//   const goToBorrowPage = () => {
//     window.location.href = `/user/peminjaman?id=${bookId}`;
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-xl w-80 space-y-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {!success ? (
//               <>
//                 <div className="flex flex-col items-center text-center space-y-3">
//                   <QrCode size={60} className="text-blue-500" />
//                   <h2 className="text-xl font-semibold">Scan QR Buku</h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     Arahkan QR scanner ke kode QR buku ini.
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleScan}
//                   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Mulai Scan
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col items-center text-center space-y-3">
//                   <CheckCircle size={60} className="text-green-500" />
//                   <h2 className="text-xl font-semibold">Scan Berhasil!</h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-300">
//                     Buku berhasil dikenali. Lanjut ke halaman peminjaman?
//                   </p>
//                 </div>

//                 <button
//                   onClick={goToBorrowPage}
//                   className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//                 >
//                   Lanjut ke Peminjaman
//                 </button>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// export default function AuthRedirect({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const supabase = createClient();
//   const [isChecking, setIsChecking] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Cek apakah user sudah login
//         const { data: { session } } = await supabase.auth.getSession();

//         if (session) {
//           // Ambil profile untuk cek role
//           const { data: profile } = await supabase
//             .from("profiles")
//             .select("role")
//             .eq("id", session.user.id)
//             .single();

//           // Redirect berdasarkan role
//           if (profile?.role === "admin") {
//             router.push("/admin");
//           } else {
//             router.push("/user");
//           }
//         } else {
//           // Tidak login, boleh akses signin page
//           setIsChecking(false);
//         }
//       } catch (error) {
//         console.error("Error checking auth:", error);
//         setIsChecking(false);
//       }
//     };

//     checkAuth();
//   }, [router, supabase]);

//   // Show loading sementara check auth
//   if (isChecking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7] dark:bg-gray-900">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC248] mx-auto"></div>
//           <p className="mt-4 text-gray-600 dark:text-gray-400">Memeriksa sesi...</p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
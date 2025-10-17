"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAccount } from "wagmi";

export default function CreateLayout({ children }) {
 const { address } = useAccount();
 if (!address) {
  return (
   <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
   >
    <main className="min-h-screen pt-20 pb-12 px-4">
     <div className="container mx-auto max-w-4xl">
      <Card className="border-white/10 bg-gradient-to-br from-white/5 to-white/10">
       <CardContent className="pt-12 pb-12 text-center">
        <p className="text-gray-400 text-lg">
         Connect your wallet to create your survey.
        </p>
       </CardContent>
      </Card>
     </div>
    </main>
   </motion.div>
  );
 }
 return (
  <main className="min-h-screen pt-20 pb-12 px-4">
   <div className="container mx-auto max-w-3xl">{children}</div>
  </main>
 );
}

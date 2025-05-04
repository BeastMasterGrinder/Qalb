'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";

export default function DonatePage() {
    const [amount, setAmount] = useState<string>('10');
    const [loading, setLoading] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4 py-8 max-w-4xl mt-20"
        >
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 text-primary">Support Qalb</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Your support helps keep Qalb running and enables me to develop new features.
                    Every contribution, no matter how small, makes a difference.
                </p>
            </div>

            <Card className="mx-auto max-w-2xl">
                <CardHeader>
                    <CardTitle>Choose Payment Method</CardTitle>
                    <CardDescription>Select your preferred way to donate</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="card" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="card">Card Payment</TabsTrigger>
                            <TabsTrigger value="easypaisa">EasyPaisa</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="card" aria-disabled={true}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <form action="/api/checkout-sessions" method="POST" className="space-y-4 mt-4">
                                    <input type="hidden" name="amount" value={amount} />
                                    <div className="space-y-2">
                                        <Label>Donation Amount (USD)</Label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['5', '10', '20', '50', '100'].map((value) => (
                                                <Button
                                                    key={value}
                                                    type="button"
                                                    variant={amount === value ? "default" : "outline"}
                                                    onClick={() => setAmount(value)}
                                                    className="flex-1 min-w-[80px]"
                                                >
                                                    ${value}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Custom Amount</Label>
                                        <div className="flex gap-2">
                                            <span className="flex items-center bg-muted px-3 rounded-l-md">$</span>
                                            <Input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Enter amount"
                                                className="rounded-l-none"
                                            />
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full" 
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Sorry, this is not available yet. Use Easypaisa instead!" : "Donate with Card"}
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <Image src="/stripe.svg" alt="Stripe" width={50} height={25} />
                                        <span className="text-sm text-muted-foreground">Secure payments by Stripe</span>
                                    </div>
                                </form>
                            </Suspense>
                        </TabsContent>
                        
                        <TabsContent value="easypaisa">
                            <div className="space-y-4 mt-4">
                                <div className="p-4 bg-muted rounded-lg">
                                    <h3 className="font-semibold mb-2">EasyPaisa Account Details</h3>
                                    <p className="text-muted-foreground">Account Title: Muhammad Farjad</p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <Image 
                                        src="/images/payment/easypaisa-qr.png" 
                                        alt="EasyPaisa QR Code" 
                                        width={200} 
                                        height={200}
                                        className="rounded-lg"
                                    />
                                </div>
                                <p className="text-sm text-center text-muted-foreground">
                                    Scan the QR code with your EasyPaisa app to donate
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
                    <p>Your donation helps keep Qalb free for everyone.</p>
                    <p>For any issues, please contact support at qalb@farjad.me</p>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
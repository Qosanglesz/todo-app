import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider"
import "./globals.css";
import React from "react";
import Navbar from "@/components/navbar-footer/Navbar";
import Footer from "@/components/navbar-footer/Footer";


export const metadata: Metadata = {
    title: "Todo List",
    description: "Produced by Wissarut Kanasub",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar isAuthenticated={false}/>
                    <div className="mx-32 my-5">
                        {children}
                    </div>
                    <Footer />
                </ThemeProvider>
                </body>
            </html>
        </>
    );
}
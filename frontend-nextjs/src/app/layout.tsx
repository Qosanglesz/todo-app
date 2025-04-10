import type {Metadata} from "next";
import {ThemeProvider} from "@/components/theme-provider"
import "./globals.css";
import React from "react";


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
                    {children}
                </ThemeProvider>
                </body>
            </html>
        </>
    );
}
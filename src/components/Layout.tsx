import { type ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {/* Logo */}
                                <a href="/" className="flex items-center">
                                    <span className="text-2xl font-bold text-orange-600">UP648</span>
                                </a>
                            </div>
                            {/* Navigation */}
                            <div className="hidden md:block">
                                <Navigation />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div className="border-b bg-white md:hidden">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <Navigation />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <div className="w-full h-full">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white">
                <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        UP648 - Unified Platform Geospatial Agile Board
                    </p>
                </div>
            </footer>
        </div>
    );
}
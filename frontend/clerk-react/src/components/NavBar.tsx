import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function NavBar() { 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navigationItems = [
        {
            title: "Home",
            href: "/",
            description: "",
        },
        {
            title: "Product",
            description: "Explore our powerful features and tools",
            items: [
                { title: "Reports", href: "/reports" },
                { title: "Analytics", href: "/analytics" },
                { title: "Dashboards", href: "/dashboards" },
                { title: "Integrations", href: "/integrations" },
            ],
        },
        {
            title: "Company",
            description: "Learn more about our mission and team",
            items: [
                { title: "About us", href: "/about" },
                { title: "Careers", href: "/careers" },
                { title: "Team", href: "/team" },
                { title: "Contact", href: "/contact" },
            ],
        },
        {
            title: "Resources",
            href: "/resources",
            description: "",
        },
    ];

    // ✅ Added: Click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        if (activeDropdown !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeDropdown]);

    // ✅ Added: Close mobile menu when screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDropdownToggle = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center">
                            {/* Web3 Blockchain-inspired Logo */}
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
                                    {/* Interconnected nodes representing blockchain */}
                                    <circle cx="6" cy="6" r="2" fill="currentColor" />
                                    <circle cx="14" cy="6" r="2" fill="currentColor" />
                                    <circle cx="6" cy="14" r="2" fill="currentColor" />
                                    <circle cx="14" cy="14" r="2" fill="currentColor" />
                                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                                    {/* Connecting lines */}
                                    <line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                                    <line x1="14" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                                    <line x1="6" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                                    <line x1="14" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
                                    <line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                                    <line x1="6" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                                </svg>
                            </div>
                            <span className="ml-3 text-xl font-bold text-black">TraceLogic</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8" ref={dropdownRef}>
                            {navigationItems.map((item, index) => (
                                <div key={item.title} className="relative">
                                    {item.items ? (
                                        <div className="relative">
                                            <button
                                                onClick={() => handleDropdownToggle(index)}
                                                className="flex items-center text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
                                            >
                                                {item.title}
                                                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            {activeDropdown === index && (
                                                <div className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6 animate-in fade-in-0 zoom-in-95">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <h3 className="font-semibold text-black">{item.title}</h3>
                                                            <p className="text-sm text-gray-600">{item.description}</p>
                                                            <button className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                                                                Book a demo
                                                            </button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {item.items.map((subItem) => (
                                                                <a
                                                                    key={subItem.title}
                                                                    href={subItem.href}
                                                                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    <span className="text-sm text-gray-700">{subItem.title}</span>
                                                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors duration-200"
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
                            Book a demo
                        </button>
                        <div className="w-px h-6 bg-gray-300"></div>
                        
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Sign in
                                </button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                    Get started
                                </button>
                            </SignInButton>
                        </SignedOut>
                        
                        <SignedIn>
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        {navigationItems.map((item) => (
                            <div key={item.title} className="space-y-1">
                                {item.items ? (
                                    <div>
                                        <div className="text-black font-medium py-2 text-base">
                                            {item.title}
                                        </div>
                                        <div className="pl-4 space-y-1">
                                            {item.items.map((subItem) => (
                                                <a
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="flex items-center justify-between text-gray-600 hover:text-black block py-2 text-sm transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <span>{subItem.title}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={item.href}
                                        className="flex items-center justify-between text-black hover:text-gray-600 block py-2 text-base font-medium transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span>{item.title}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        ))}
                        
                        {/* Mobile CTA Buttons */}
                        <div className="pt-4 space-y-2">
                            <button className="w-full text-left text-gray-700 hover:text-black block py-2 text-base font-medium transition-colors">
                                Book a demo
                            </button>
                            
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-black py-2 rounded-md text-sm font-medium transition-colors">
                                        Sign in
                                    </button>
                                </SignInButton>
                                <SignInButton mode="modal">
                                    <button className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded-md text-sm font-medium transition-colors">
                                        Get started
                                    </button>
                                </SignInButton>
                            </SignedOut>
                            
                            <SignedIn>
                                <div className="flex justify-center pt-2">
                                    <UserButton 
                                        afterSignOutUrl="/"
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8"
                                            }
                                        }}
                                    />
                                </div>
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
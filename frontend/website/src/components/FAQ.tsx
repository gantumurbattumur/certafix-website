"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Do I need to provide supplies or equipment?",
        answer:
            "No, our professional teams arrive fully equipped with premium, eco-friendly supplies and top-tier tools. If you have specific products you'd prefer us to use, just let us know!",
    },
    {
        question: "Are your professionals insured and background checked?",
        answer:
            "Absolutely. Every member of our team undergoes a rigorous background check, in-person interviews, and extensive training. We are fully bonded and insured for your peace of mind.",
    },
    {
        question: "Do I need to be home during the service?",
        answer:
            "It's entirely up to you! Many of our clients provide a spare key or door code. Your home's security is our top priority.",
    },
    {
        question: "What is your cancellation policy?",
        answer:
            "We understand life happens. We simply ask for 48 hours notice if you need to cancel or reschedule to avoid a late cancellation fee.",
    },
    {
        question: "How do I get a quote?",
        answer:
            "You can get a free, no-obligation quote by clicking the 'Get Free Quote' button or entering your zip code on the home page. We'll provide transparent pricing with no hidden fees.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-forest/10 h-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-amber/10 rounded-full flex items-center justify-center text-amber">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-serif font-bold text-charcoal">FAQ</h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-xl transition-colors ${openIndex === index
                                ? "border-forest bg-cream/30"
                                : "border-gray-200 hover:border-forest/30"
                            }`}
                    >
                        <button
                            className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                            onClick={() => toggleFAQ(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-semibold text-charcoal pr-4">{faq.question}</span>
                            <ChevronDown
                                size={20}
                                className={`text-forest shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <div className="px-6 pb-5 text-charcoal-light leading-relaxed">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

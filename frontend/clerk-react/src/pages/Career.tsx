import React, { useEffect } from "react";
import { Code,CheckCircle,Github, GitBranch, GitPullRequest, Users, Terminal, BookOpen, Globe } from "lucide-react";

const ContributePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contributionAreas = [
    { title: "Smart Contract Development", desc: "Help improve our Solidity contracts and blockchain integrations" },
    { title: "Frontend Development", desc: "Enhance our Web3 interface and user experience" },
    { title: "Documentation", desc: "Help us improve developer and user documentation" },
    { title: "Testing & QA", desc: "Contribute to automated testing and smart contract auditing" },
    { title: "Security Auditing", desc: "Help identify and fix potential security vulnerabilities" },
    { title: "Community Support", desc: "Assist users and triage GitHub issues" },
  ];

  const benefits = [
    "Gain real-world blockchain development experience",
    "Receive mentorship from core maintainers",
    "Get featured in our contributor hall of fame",
    "Eligible for swag and recognition",
    "Improve your public portfolio",
    "Impact supply chain transparency globally",
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <GitBranch className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h1 className="text-4xl font-bold text-gray-900">Contribute to TraceLogic</h1>
        <p className="text-gray-700 mt-3 max-w-3xl mx-auto">
          Join our open source community building transparent blockchain-based product traceability solutions. Whether you're a blockchain developer, frontend engineer, or documentation writer, your contributions matter.
        </p>
      </div>

      {/* Why Contribute */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Why Contribute</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 cursor-pointer text-center">
            <Users className="w-10 h-10 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Impact</h3>
            <p className="text-gray-700">
              Your code directly improves supply chain transparency and product authenticity verification worldwide.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 cursor-pointer text-center">
            <Terminal className="w-10 h-10 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Blockchain Expertise</h3>
            <p className="text-gray-700">
              Work on cutting-edge Web3 technology using Solidity, Hardhat, and modern DeFi protocols.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:scale-[1.03] transform transition-all duration-300 cursor-pointer text-center">
            <Globe className="w-10 h-10 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Decentralized Values</h3>
            <p className="text-gray-700">
              Be part of a community that believes in transparency, immutability, and decentralized governance.
            </p>
          </div>
        </div>
      </section>

      {/* Contribution Process */}
      <section className="max-w-5xl mx-auto mb-20 bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">How to Contribute</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 max-w-3xl mx-auto">
          <li><strong>Fork the repository</strong> on GitHub</li>
          <li><strong>Clone your fork</strong> and create a new branch</li>
          <li><strong>Make your changes</strong> following coding guidelines</li>
          <li><strong>Test your changes</strong> and update documentation</li>
          <li><strong>Submit a Pull Request</strong> with clear description</li>
        </ol>
      </section>

      {/* Contribution Areas */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Contribution Areas</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {contributionAreas.map((area, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 cursor-pointer">
              <Code className="w-8 h-8 mb-3 text-green-600" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{area.title}</h3>
              <p className="text-gray-700">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contribution Benefits */}
      <section className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Contributor Benefits</h2>
        <ul className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:bg-green-50 transition-all duration-300 cursor-pointer">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* GitHub CTA */}
      <section className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Get Started Now</h2>
        <p className="text-gray-700 mb-6">
          Ready to make your first contribution? Start with these resources:
        </p>
        <div className="flex flex-col space-y-4 items-center">
          <a 
            href="https://github.com/neutron420/producttrace" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Github className="w-5 h-5" />
            View Repository
          </a>
          <a 
            href="https://github.com/neutron420/producttrace/issues"
            className="text-green-600 hover:underline"
          >
            Explore Good First Issues →
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContributePage;
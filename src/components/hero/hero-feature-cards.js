import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

const FeatureCard = ({ title, subtitle, description, dark = false }) => (
  <div 
    className={`
      relative flex items-center justify-between p-8 rounded-full cursor-pointer
      transition-all duration-300
      ${dark ? 'bg-black text-white' : 'bg-white border border-gray-100'}
    `}
  >
    <div className="flex items-start gap-4">
      <CheckCircle className="w-6 h-6 mt-1 text-blue-500" />
      <div>
        <h3 className="text-xl font-medium">{title}</h3>
        {/* <p className="text-lg text-gray-400 mt-1">{subtitle}</p> */}
      </div>
    </div>
    <div className="flex items-center gap-8">
      <p className={`text-sm ${dark ? 'text-white/70' : ''}`}>{description}</p>
      <ChevronRight className={`w-5 h-5 ${dark ? 'text-white' : 'text-white/70'}`} />
    </div>
  </div>
);

const FeatureSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-32">
      {/* Header */}
      <div className="text-center mb-24">
        <h1 className="text-5xl font-medium mb-8">
          <span className="text-black">Automated </span>
          <span className="text-gray-400">Payroll</span>
          <br />
          <span className="text-gray-400">Distribution </span>
          <span className="text-black">System</span>
        </h1>
        
        {/* Tags */}
        <div className="flex items-center justify-center gap-3">
          <span className="px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            Privacy
          </span>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-500 rounded-full text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Efficiency
          </span>
          <span className="px-4 py-1.5 bg-green-50 text-green-500 rounded-full text-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Automation
          </span>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <FeatureCard
          title="Tailored payroll solutions"
          subtitle="Web3 Integration"
          description="Seamless integration with Web3 and blockchain platforms."
        />
        <FeatureCard
          title="Employee payment portal"
          subtitle="Secure Access"
          description="A secure portal for employees to view payroll details."
          dark
        />
        <FeatureCard
          title="Encrypted global payouts"
          subtitle="On-chain transfers"
          description="Efficient and encrypted payouts across borders."
        />
        <FeatureCard
          title="Automated payment retries"
          subtitle="Smart Solutions"
          description="Retry systems for failed transactions, ensuring accuracy."
        />
        <FeatureCard
          title="Detailed payroll reporting"
          subtitle="Custom insights"
          description="Comprehensive reporting tailored for business needs."
        />
      </div>
    </div>
  );
};

export default FeatureSection;

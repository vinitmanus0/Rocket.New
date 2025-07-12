import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import MainSidebar from 'components/ui/MainSidebar';
import NavigationHeader from 'components/ui/NavigationHeader';
import QuickActionMenu from 'components/ui/QuickActionMenu';
import Image from '../../components/AppImage';



const ProfileSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [activeSection, setActiveSection] = useState('personal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    marketNews: true,
    portfolioUpdates: true,
    aiInsights: true,
    emailNotifications: true,
    smsNotifications: false
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '15/03/1985',
    occupation: 'Software Engineer',
    experience: '5-10 years',
    annualIncome: '10-25 Lakhs'
  });

  const [investmentPreferences, setInvestmentPreferences] = useState({
    riskTolerance: 'moderate',
    investmentGoal: 'wealth_creation',
    preferredSectors: ['technology', 'banking', 'healthcare'],
    investmentHorizon: 'long_term',
    tradingStyle: 'swing_trading'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30_minutes'
  });

  const mockSubscriptionData = {
    currentPlan: 'Premium',
    planType: 'Monthly',
    amount: '₹999',
    nextBilling: '15/02/2024',
    features: [
      'Real-time data access',
      'AI-powered insights',
      'Advanced charting tools',
      'Portfolio analytics',
      'Priority support'
    ],
    usage: {
      apiCalls: { used: 8500, limit: 10000 },
      alerts: { used: 45, limit: 100 },
      exports: { used: 12, limit: 50 }
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Information', icon: 'User' },
    { id: 'investment', label: 'Investment Preferences', icon: 'TrendingUp' },
    { id: 'display', label: 'Display Settings', icon: 'Monitor' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'subscription', label: 'Subscription', icon: 'CreditCard' },
    { id: 'privacy', label: 'Data & Privacy', icon: 'Lock' }
  ];

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPersonalInfo(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    console.log('Saving profile changes...');
    // Mock save success
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = () => {
    console.log('Opening password change modal...');
    alert('Password change functionality would open here');
  };

  const handleExportData = () => {
    console.log('Exporting user data...');
    alert('Data export initiated. You will receive an email with download link.');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      console.log('Account deletion requested...');
      alert('Account deletion request submitted. You will receive confirmation email.');
    }
  };

  const PersonalInformationSection = () => (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Personal Information</h3>
        <button
          onClick={handleSaveChanges}
          className="btn-primary px-4 py-2 rounded-lg text-sm font-medium"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={personalInfo.profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 p-2 bg-primary text-white rounded-full hover:bg-primary-700 transition-colors duration-150 ease-out"
            >
              <Icon name="Camera" size={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Profile Photo</p>
            <p className="text-xs text-text-secondary">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Date of Birth</label>
            <input
              type="text"
              value={personalInfo.dateOfBirth}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              placeholder="DD/MM/YYYY"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Occupation</label>
            <select
              value={personalInfo.occupation}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, occupation: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Annual Income</label>
            <select
              value={personalInfo.annualIncome}
              onChange={(e) => setPersonalInfo(prev => ({ ...prev, annualIncome: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            >
              <option value="Below 5 Lakhs">Below ₹5 Lakhs</option>
              <option value="5-10 Lakhs">₹5-10 Lakhs</option>
              <option value="10-25 Lakhs">₹10-25 Lakhs</option>
              <option value="25-50 Lakhs">₹25-50 Lakhs</option>
              <option value="Above 50 Lakhs">Above ₹50 Lakhs</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const InvestmentPreferencesSection = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Investment Preferences</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Risk Tolerance</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {['conservative', 'moderate', 'aggressive'].map((risk) => (
              <button
                key={risk}
                onClick={() => setInvestmentPreferences(prev => ({ ...prev, riskTolerance: risk }))}
                className={`p-4 rounded-lg border-2 transition-all duration-150 ease-out ${
                  investmentPreferences.riskTolerance === risk
                    ? 'border-primary bg-primary-50 text-primary-700' :'border-border hover:border-secondary-300'
                }`}
              >
                <div className="text-center">
                  <Icon
                    name={risk === 'conservative' ? 'Shield' : risk === 'moderate' ? 'TrendingUp' : 'Zap'}
                    size={24}
                    className="mx-auto mb-2"
                  />
                  <p className="font-medium capitalize">{risk}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Investment Goal</label>
          <select
            value={investmentPreferences.investmentGoal}
            onChange={(e) => setInvestmentPreferences(prev => ({ ...prev, investmentGoal: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
          >
            <option value="wealth_creation">Wealth Creation</option>
            <option value="retirement_planning">Retirement Planning</option>
            <option value="tax_saving">Tax Saving</option>
            <option value="short_term_gains">Short Term Gains</option>
            <option value="income_generation">Income Generation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">Preferred Sectors</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['technology', 'banking', 'healthcare', 'energy', 'consumer', 'automotive'].map((sector) => (
              <label key={sector} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={investmentPreferences.preferredSectors.includes(sector)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setInvestmentPreferences(prev => ({
                        ...prev,
                        preferredSectors: [...prev.preferredSectors, sector]
                      }));
                    } else {
                      setInvestmentPreferences(prev => ({
                        ...prev,
                        preferredSectors: prev.preferredSectors.filter(s => s !== sector)
                      }));
                    }
                  }}
                  className="rounded border-border text-primary focus:ring-primary-500"
                />
                <span className="text-sm text-text-primary capitalize">{sector}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Investment Horizon</label>
            <select
              value={investmentPreferences.investmentHorizon}
              onChange={(e) => setInvestmentPreferences(prev => ({ ...prev, investmentHorizon: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            >
              <option value="short_term">Short Term (1-3 years)</option>
              <option value="medium_term">Medium Term (3-7 years)</option>
              <option value="long_term">Long Term (7+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Trading Style</label>
            <select
              value={investmentPreferences.tradingStyle}
              onChange={(e) => setInvestmentPreferences(prev => ({ ...prev, tradingStyle: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            >
              <option value="buy_hold">Buy & Hold</option>
              <option value="swing_trading">Swing Trading</option>
              <option value="day_trading">Day Trading</option>
              <option value="scalping">Scalping</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const DisplaySettingsSection = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Display Settings</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Dark Mode</p>
            <p className="text-sm text-text-secondary">Switch between light and dark themes</p>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-out ${
              isDarkMode ? 'bg-primary' : 'bg-secondary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-out ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी (Hindi)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Currency Format</label>
          <select
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
            defaultValue="inr"
          >
            <option value="inr">Indian Rupee (₹)</option>
            <option value="usd">US Dollar ($)</option>
          </select>
        </div>

        <div>
          <p className="font-medium text-text-primary mb-3">Notification Preferences</p>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ease-out ${
                    value ? 'bg-primary' : 'bg-secondary-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ease-out ${
                      value ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySection = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Security Settings</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-background rounded-lg">
          <div>
            <p className="font-medium text-text-primary">Password</p>
            <p className="text-sm text-text-secondary">Last changed 30 days ago</p>
          </div>
          <button
            onClick={handlePasswordChange}
            className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Two-Factor Authentication</p>
            <p className="text-sm text-text-secondary">Add an extra layer of security to your account</p>
          </div>
          <button
            onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-out ${
              securitySettings.twoFactorEnabled ? 'bg-primary' : 'bg-secondary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-out ${
                securitySettings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-text-primary">Login Alerts</p>
            <p className="text-sm text-text-secondary">Get notified of new login attempts</p>
          </div>
          <button
            onClick={() => setSecuritySettings(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-out ${
              securitySettings.loginAlerts ? 'bg-primary' : 'bg-secondary-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-out ${
                securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Session Timeout</label>
          <select
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 ease-out"
          >
            <option value="15_minutes">15 minutes</option>
            <option value="30_minutes">30 minutes</option>
            <option value="1_hour">1 hour</option>
            <option value="4_hours">4 hours</option>
          </select>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warning-800">Active Sessions</p>
              <p className="text-sm text-warning-700 mb-3">You are currently logged in on 2 devices</p>
              <button className="text-sm text-warning-800 hover:text-warning-900 font-medium underline">
                Manage Active Sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SubscriptionSection = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Subscription Management</h3>

      <div className="space-y-6">
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-primary-800">{mockSubscriptionData.currentPlan} Plan</p>
              <p className="text-sm text-primary-600">{mockSubscriptionData.planType} - {mockSubscriptionData.amount}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-600">Next billing</p>
              <p className="font-medium text-primary-800">{mockSubscriptionData.nextBilling}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm font-medium text-primary-800 mb-2">Plan Features:</p>
            <ul className="text-sm text-primary-700 space-y-1">
              {mockSubscriptionData.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-primary-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-3">
            <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium">
              Upgrade Plan
            </button>
            <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
              Manage Billing
            </button>
          </div>
        </div>

        <div>
          <p className="font-medium text-text-primary mb-4">Usage Statistics</p>
          <div className="space-y-4">
            {Object.entries(mockSubscriptionData.usage).map(([key, data]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-text-secondary">{data.used} / {data.limit}</span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(data.used / data.limit) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacySection = () => (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Data & Privacy</h3>

      <div className="space-y-6">
        <div className="p-4 bg-background rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-text-primary">Data Sharing</p>
            <button className="text-sm text-primary hover:text-primary-700 font-medium">
              Manage Preferences
            </button>
          </div>
          <p className="text-sm text-text-secondary">
            Control how your data is used for personalized recommendations and market insights.
          </p>
        </div>

        <div className="p-4 bg-background rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-text-primary">Export Your Data</p>
            <button
              onClick={handleExportData}
              className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
            >
              Request Export
            </button>
          </div>
          <p className="text-sm text-text-secondary">
            Download a copy of your account data, including portfolio history and preferences.
          </p>
        </div>

        <div className="p-4 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-error-800 mb-2">SEBI Compliance Notice</p>
              <p className="text-sm text-error-700 mb-3">
                Your financial data is protected under SEBI regulations. We maintain strict compliance with data protection standards for Indian financial markets.
              </p>
              <button className="text-sm text-error-800 hover:text-error-900 font-medium underline">
                View Privacy Policy
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="p-4 bg-error-50 rounded-lg border border-error-200">
            <p className="font-medium text-error-800 mb-2">Delete Account</p>
            <p className="text-sm text-error-700 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-error text-white hover:bg-error-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ease-out"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInformationSection />;
      case 'investment':
        return <InvestmentPreferencesSection />;
      case 'display':
        return <DisplaySettingsSection />;
      case 'security':
        return <SecuritySection />;
      case 'subscription':
        return <SubscriptionSection />;
      case 'privacy':
        return <PrivacySection />;
      default:
        return <PersonalInformationSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <MainSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <NavigationHeader />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-text-primary mb-2">Profile & Settings</h1>
              <p className="text-text-secondary">
                Manage your account preferences and customize your investment experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="card p-4 sticky top-6">
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ease-out ${
                          activeSection === section.id
                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary' :'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                        }`}
                      >
                        <Icon name={section.icon} size={18} />
                        <span className="truncate">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </main>
      </div>

      <QuickActionMenu />
    </div>
  );
};

export default ProfileSettings;
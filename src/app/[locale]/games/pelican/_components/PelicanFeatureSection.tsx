'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import FeatureSection, { FeatureCategory } from '@/components/FeatureSection';
import { 
  FaServer, 
  FaUsers, 
  FaShieldAlt, 
  FaRocket, 
  FaChartLine, 
  FaCogs, 
  FaDatabase, 
  FaClock, 
  FaFileAlt,
  FaTerminal,
  FaNetworkWired,
  FaLock,
  FaGlobe,
  FaMobile,
  FaDesktop,
  FaCloud,
  FaSync,
  FaEye,
  FaBell,
  FaKey,
  FaUserCog,
  FaHistory,
  FaDownload,
  FaUpload,
  FaTrash,
  FaRedo,
  FaSearch,
  FaLink,
  FaFileCode,
  FaCheck
} from 'react-icons/fa';

const PelicanFeatureSection = () => {
  const t = useTranslations('pelican');

  const serverManagementFeatures = [
    {
      title: t('features.serverManagement.serverDashboard.title'),
      description: t('features.serverManagement.serverDashboard.description'),
      icon: <FaServer className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    },
    {
      title: t('features.serverManagement.oneClickOperations.title'),
      description: t('features.serverManagement.oneClickOperations.description'),
      icon: <FaRocket className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    },
    {
      title: t('features.serverManagement.consoleAccess.title'),
      description: t('features.serverManagement.consoleAccess.description'),
      icon: <FaTerminal className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    },
    {
      title: t('features.serverManagement.performanceMonitoring.title'),
      description: t('features.serverManagement.performanceMonitoring.description'),
      icon: <FaChartLine className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    },
    {
      title: t('features.serverManagement.scheduledTasks.title'),
      description: t('features.serverManagement.scheduledTasks.description'),
      icon: <FaClock className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    },
    {
      title: t('features.serverManagement.powerManagement.title'),
      description: t('features.serverManagement.powerManagement.description'),
      icon: <FaCogs className="text-xl" />,
      category: t('features.categories.serverManagement.title')
    }
  ];

  const fileManagementFeatures = [
    {
      title: t('features.fileManagement.fileManager.title'),
      description: t('features.fileManagement.fileManager.description'),
      icon: <FaFileAlt className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    },
    {
      title: t('features.fileManagement.codeEditor.title'),
      description: t('features.fileManagement.codeEditor.description'),
      icon: <FaFileCode className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    },
    {
      title: t('features.fileManagement.fileUploadDownload.title'),
      description: t('features.fileManagement.fileUploadDownload.description'),
      icon: <FaUpload className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    },
    {
      title: t('features.fileManagement.fileSearch.title'),
      description: t('features.fileManagement.fileSearch.description'),
      icon: <FaSearch className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    },
    {
      title: t('features.fileManagement.filePermissions.title'),
      description: t('features.fileManagement.filePermissions.description'),
      icon: <FaLock className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    },
    {
      title: t('features.fileManagement.fileHistory.title'),
      description: t('features.fileManagement.fileHistory.description'),
      icon: <FaHistory className="text-xl" />,
      category: t('features.categories.fileManagement.title')
    }
  ];

  const databaseFeatures = [
    {
      title: t('features.databaseManagement.databaseManagement.title'),
      description: t('features.databaseManagement.databaseManagement.description'),
      icon: <FaDatabase className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    },
    {
      title: t('features.databaseManagement.databaseBackups.title'),
      description: t('features.databaseManagement.databaseBackups.description'),
      icon: <FaDownload className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    },
    {
      title: t('features.databaseManagement.databaseUsers.title'),
      description: t('features.databaseManagement.databaseUsers.description'),
      icon: <FaUsers className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    },
    {
      title: t('features.databaseManagement.databaseMonitoring.title'),
      description: t('features.databaseManagement.databaseMonitoring.description'),
      icon: <FaEye className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    },
    {
      title: t('features.databaseManagement.databaseMigration.title'),
      description: t('features.databaseManagement.databaseMigration.description'),
      icon: <FaSync className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    },
    {
      title: t('features.databaseManagement.databaseSecurity.title'),
      description: t('features.databaseManagement.databaseSecurity.description'),
      icon: <FaShieldAlt className="text-xl" />,
      category: t('features.categories.databaseManagement.title')
    }
  ];

  const userManagementFeatures = [
    {
      title: t('features.userManagement.multiUserSupport.title'),
      description: t('features.userManagement.multiUserSupport.description'),
      icon: <FaUsers className="text-xl" />,
      category: t('features.categories.userManagement.title')
    },
    {
      title: t('features.userManagement.subuserManagement.title'),
      description: t('features.userManagement.subuserManagement.description'),
      icon: <FaUserCog className="text-xl" />,
      category: t('features.categories.userManagement.title')
    },
    {
      title: t('features.userManagement.apiAccess.title'),
      description: t('features.userManagement.apiAccess.description'),
      icon: <FaKey className="text-xl" />,
      category: t('features.categories.userManagement.title')
    },
    {
      title: t('features.userManagement.activityLogging.title'),
      description: t('features.userManagement.activityLogging.description'),
      icon: <FaHistory className="text-xl" />,
      category: t('features.categories.userManagement.title')
    },
    {
      title: t('features.userManagement.twoFactorAuthentication.title'),
      description: t('features.userManagement.twoFactorAuthentication.description'),
      icon: <FaLock className="text-xl" />,
      category: t('features.categories.userManagement.title')
    },
    {
      title: t('features.userManagement.sessionManagement.title'),
      description: t('features.userManagement.sessionManagement.description'),
      icon: <FaGlobe className="text-xl" />,
      category: t('features.categories.userManagement.title')
    }
  ];

  const backupFeatures = [
    {
      title: t('features.backupRecovery.automatedBackups.title'),
      description: t('features.backupRecovery.automatedBackups.description'),
      icon: <FaDownload className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    },
    {
      title: t('features.backupRecovery.incrementalBackups.title'),
      description: t('features.backupRecovery.incrementalBackups.description'),
      icon: <FaSync className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    },
    {
      title: t('features.backupRecovery.backupScheduling.title'),
      description: t('features.backupRecovery.backupScheduling.description'),
      icon: <FaClock className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    },
    {
      title: t('features.backupRecovery.backupRetention.title'),
      description: t('features.backupRecovery.backupRetention.description'),
      icon: <FaTrash className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    },
    {
      title: t('features.backupRecovery.backupRestoration.title'),
      description: t('features.backupRecovery.backupRestoration.description'),
      icon: <FaRedo className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    },
    {
      title: t('features.backupRecovery.backupVerification.title'),
      description: t('features.backupRecovery.backupVerification.description'),
      icon: <FaCheck className="text-xl" />,
      category: t('features.categories.backupRecovery.title')
    }
  ];

  const securityFeatures = [
    {
      title: t('features.securityFeatures.ddosProtection.title'),
      description: t('features.securityFeatures.ddosProtection.description'),
      icon: <FaShieldAlt className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    },
    {
      title: t('features.securityFeatures.firewallManagement.title'),
      description: t('features.securityFeatures.firewallManagement.description'),
      icon: <FaNetworkWired className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    },
    {
      title: t('features.securityFeatures.sslCertificates.title'),
      description: t('features.securityFeatures.sslCertificates.description'),
      icon: <FaLock className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    },
    {
      title: t('features.securityFeatures.accessControl.title'),
      description: t('features.securityFeatures.accessControl.description'),
      icon: <FaKey className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    },
    {
      title: t('features.securityFeatures.securityMonitoring.title'),
      description: t('features.securityFeatures.securityMonitoring.description'),
      icon: <FaEye className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    },
    {
      title: t('features.securityFeatures.complianceTools.title'),
      description: t('features.securityFeatures.complianceTools.description'),
      icon: <FaCheck className="text-xl" />,
      category: t('features.categories.securityFeatures.title')
    }
  ];

  const monitoringFeatures = [
    {
      title: t('features.monitoringAnalytics.realTimeMonitoring.title'),
      description: t('features.monitoringAnalytics.realTimeMonitoring.description'),
      icon: <FaChartLine className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    },
    {
      title: t('features.monitoringAnalytics.performanceAnalytics.title'),
      description: t('features.monitoringAnalytics.performanceAnalytics.description'),
      icon: <FaChartLine className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    },
    {
      title: t('features.monitoringAnalytics.alertSystem.title'),
      description: t('features.monitoringAnalytics.alertSystem.description'),
      icon: <FaBell className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    },
    {
      title: t('features.monitoringAnalytics.resourceTracking.title'),
      description: t('features.monitoringAnalytics.resourceTracking.description'),
      icon: <FaEye className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    },
    {
      title: t('features.monitoringAnalytics.healthChecks.title'),
      description: t('features.monitoringAnalytics.healthChecks.description'),
      icon: <FaCheck className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    },
    {
      title: t('features.monitoringAnalytics.reportingTools.title'),
      description: t('features.monitoringAnalytics.reportingTools.description'),
      icon: <FaFileAlt className="text-xl" />,
      category: t('features.categories.monitoringAnalytics.title')
    }
  ];

  const integrationFeatures = [
    {
      title: t('features.integrations.apiIntegration.title'),
      description: t('features.integrations.apiIntegration.description'),
      icon: <FaLink className="text-xl" />,
      category: t('features.categories.integrations.title')
    },
    {
      title: t('features.integrations.webhookSupport.title'),
      description: t('features.integrations.webhookSupport.description'),
      icon: <FaGlobe className="text-xl" />,
      category: t('features.categories.integrations.title')
    },
    {
      title: t('features.integrations.thirdPartyTools.title'),
      description: t('features.integrations.thirdPartyTools.description'),
      icon: <FaCogs className="text-xl" />,
      category: t('features.categories.integrations.title')
    },
    {
      title: t('features.integrations.cloudIntegration.title'),
      description: t('features.integrations.cloudIntegration.description'),
      icon: <FaCloud className="text-xl" />,
      category: t('features.categories.integrations.title')
    },
    {
      title: t('features.integrations.mobileAccess.title'),
      description: t('features.integrations.mobileAccess.description'),
      icon: <FaMobile className="text-xl" />,
      category: t('features.categories.integrations.title')
    },
    {
      title: t('features.integrations.desktopApp.title'),
      description: t('features.integrations.desktopApp.description'),
      icon: <FaDesktop className="text-xl" />,
      category: t('features.categories.integrations.title')
    }
  ];

  const categories: FeatureCategory[] = [
    {
      title: t('features.categories.serverManagement.title'),
      description: t('features.categories.serverManagement.description'),
      features: serverManagementFeatures
    },
    {
      title: t('features.categories.fileManagement.title'),
      description: t('features.categories.fileManagement.description'),
      features: fileManagementFeatures
    },
    {
      title: t('features.categories.databaseManagement.title'),
      description: t('features.categories.databaseManagement.description'),
      features: databaseFeatures
    },
    {
      title: t('features.categories.userManagement.title'),
      description: t('features.categories.userManagement.description'),
      features: userManagementFeatures
    },
    {
      title: t('features.categories.backupRecovery.title'),
      description: t('features.categories.backupRecovery.description'),
      features: backupFeatures
    },
    {
      title: t('features.categories.securityFeatures.title'),
      description: t('features.categories.securityFeatures.description'),
      features: securityFeatures
    },
    {
      title: t('features.categories.monitoringAnalytics.title'),
      description: t('features.categories.monitoringAnalytics.description'),
      features: monitoringFeatures
    },
    {
      title: t('features.categories.integrations.title'),
      description: t('features.categories.integrations.description'),
      features: integrationFeatures
    }
  ];

  return (
    <FeatureSection
      title={t('features.title')}
      description={t('features.description')}
      categories={categories}
      showCTA={true}
      ctaTitle={t('features.cta.title')}
      ctaDescription={t('features.cta.description')}
      ctaButtons={[
        {
          label: t('features.cta.getStarted'),
          variant: 'primary'
        },
        {
          label: t('features.cta.learnMore'),
          variant: 'secondary'
        }
      ]}
      translationNamespace="pelican"
    />
  );
};

export default PelicanFeatureSection;

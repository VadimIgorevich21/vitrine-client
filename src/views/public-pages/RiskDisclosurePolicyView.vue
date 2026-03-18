<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const lastUpdated = '2025-02-20'
</script>

<template>
  <div class="public-layout-content">
    <article class="default-container">
      <h1 class="page-title-h1 mb-10">Risk Disclosure Policy</h1>

      <div class="mb-8">
        <div class="space-y-4">
          <h3 class="page-title-h3 mb-3">IRONBIT Sp. z o.o.</h3>
          <p class="page-content-text">
            KRS: 0001013919 | NIP: 5252939713 | REGON: 524214646<br>
            Address: ul. Żurawia 6/12, 00-503 Warszawa, Poland<br>
            E-mail: <a href="mailto:info@ironbit.net"><strong>info@ironbit.net</strong></a>
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Introduction and Purpose</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Risk Disclosure Policy (“Policy”) is established to provide users of IronBit (“the Platform”) with clear, comprehensive information regarding the risks associated with the use of custodial cryptocurrency wallet services, digital asset transactions, and related features offered by IronBit. The purpose of this Policy is to ensure that all users are fully informed of the potential risks inherent in engaging with digital assets and to promote transparency, responsible usage, and informed decision-making.
          </p>
          <p class="page-content-text">
            Cryptocurrency markets and technologies are subject to significant volatility, regulatory developments, and operational uncertainties. By outlining these risks, IronBit seeks to protect its users and to comply with applicable legal and regulatory standards. Users are strongly encouraged to review this Policy carefully and to consider the risks described herein before utilizing any services provided by IronBit.
          </p>
          <p class="page-content-text">
            This Policy forms an integral part of the user agreement between  IronBit and its users. By accessing or using the Platform, users acknowledge their understanding of, and agreement to, the terms and disclosures set forth in this Policy.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Scope of the Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Policy applies to all users of  IronBit and governs the use of all products, services, and features provided by the Platform. The scope of this Policy includes, but is not limited to:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Custodial storage of digital assets within IronBit-managed wallets;</li>
            <li>Execution of digital asset transactions, including deposits, withdrawals, and internal transfers;</li>
            <li>Crypto-to-crypto conversion and swap functionalities utilizing internal and external liquidity sources;</li>
            <li>Real-time Anti-Money Laundering (AML) risk screening and compliance checks performed at various transaction stages;</li>
            <li>User support services, including recovery assistance for victims of crypto-related fraud;</li>
            <li>Any other ancillary or future services offered by IronBit that involve the custody, transfer, or management of digital assets.</li>
          </ul>
          <p class="page-content-text">
            This Policy applies to all digital asset transactions and activities conducted through the Platform, regardless of the user’s jurisdiction, the type of digital asset involved, or the method of access (including web, mobile, or integrated applications). The Policy is binding upon all users, employees, contractors, and any third parties acting on behalf of  IronBit in connection with the provision of its services.
          </p>
          <p class="page-content-text">
            By accessing or using any aspect of the Platform, users acknowledge that they are subject to the terms and disclosures set forth in this Policy.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Nature of Risks</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            Users of  IronBit should be aware that engaging in digital asset custody, transactions, and related services involves significant risks. The following subsections describe the principal risks associated with the use of the Platform. This list is not exhaustive, and users are encouraged to conduct their own due diligence and seek independent advice as appropriate.
          </p>

          <p class="page-content-text"><strong>1. Market and Price Volatility</strong><br>
            Digital assets, including cryptocurrencies, are subject to extreme price fluctuations and market volatility. The value of digital assets can increase or decrease rapidly and unpredictably, and past performance is not indicative of future results. Users may experience substantial or total loss of their invested capital.
          </p>

          <p class="page-content-text"><strong>2. Cybersecurity and Technology Risks</strong><br>
            The security of digital assets depends on the integrity of cryptographic protocols, software, hardware, and network infrastructure. Risks include, but are not limited to:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Unauthorized access, hacking, or theft of private keys or wallet credentials;</li>
            <li>Malware, phishing, or other cyberattacks targeting users or the Platform;</li>
            <li>Vulnerabilities in smart contracts, blockchain protocols, or third-party integrations;</li>
            <li>Service interruptions or data loss due to system failures, bugs, or technical errors.</li>
          </ul>
          <p class="page-content-text">
            While IronBit implements robust security measures, no system is immune to cyber threats or technical failures.
          </p>

          <p class="page-content-text"><strong>3. Regulatory and Legal Risks</strong><br>
            The legal and regulatory environment for digital assets is rapidly evolving and may vary by jurisdiction. Risks include:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Changes in laws, regulations, or government policies that may restrict, prohibit, or otherwise impact the use, transfer, or custody of digital assets;</li>
            <li>Regulatory actions that may require IronBit to modify, suspend, or terminate certain services;</li>
            <li>Uncertainty regarding the classification and treatment of digital assets under applicable law.</li>
          </ul>
          <p class="page-content-text">
            Users are responsible for understanding and complying with all laws and regulations applicable to their activities.
          </p>

          <p class="page-content-text"><strong>4. Operational Risks</strong><br>
            Operational risks may arise from the internal processes, personnel, or systems of IronBit or its service providers. These include:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Errors or delays in processing transactions, deposits, or withdrawals;</li>
            <li>Failures in internal controls, compliance procedures, or risk management systems;</li>
            <li>Disruptions due to force majeure events, such as natural disasters, political instability, or pandemics.</li>
          </ul>

          <p class="page-content-text"><strong>5. Counterparty and Third-Party Risks</strong><br>
            IronBit may rely on third-party service providers, such as liquidity providers, custodians, or technology vendors, to deliver certain features. Risks include:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Insolvency, default, or failure of third-party providers;</li>
            <li>Delays or losses resulting from third-party actions or omissions;</li>
            <li>Limited recourse in the event of third-party failure.</li>
          </ul>

          <p class="page-content-text"><strong>6. Technology and Blockchain Risks</strong><br>
            The operation of digital assets depends on underlying blockchain networks, which may be subject to:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Network congestion, delays, or failures in transaction processing;</li>
            <li>Forks, rollbacks, or changes to consensus mechanisms that may affect asset availability or value;</li>
            <li>Irreversibility of blockchain transactions, which may result in permanent loss if errors occur.</li>
          </ul>

          <p class="page-content-text"><strong>7. Other Risks</strong><br>
            Additional risks may include, but are not limited to:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Loss of access to accounts or assets due to forgotten credentials or loss of authentication devices;</li>
            <li>Exposure to fraud, scams, or deceptive practices by third parties;</li>
            <li>Taxation or reporting obligations arising from digital asset transactions.</li>
          </ul>
          <p class="page-content-text">
            Users should recognize that the risks described above may interact or compound, and that new or unforeseen risks may emerge as the digital asset ecosystem evolves.
          </p>
        </div>
      </div>


      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">User Responsibilities</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            All users of IronBit are expected to take an active role in understanding and managing the risks associated with the use of digital assets and the Platform’s services. By accessing or utilizing any aspect of IronBit, users expressly acknowledge and accept the following responsibilities:
          </p>

          <p class="page-content-text"><strong>1. Understanding and Acceptance of Risks</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users must carefully review this Risk Disclosure Policy and ensure they fully understand the nature and extent of the risks described herein.</li>
            <li>Users are responsible for remaining informed about the evolving risks associated with digital assets, blockchain technology, and the regulatory environment.</li>
          </ul>

          <p class="page-content-text"><strong>2. Conducting Due Diligence</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users are expected to conduct their own independent research and due diligence before engaging in any transaction or utilizing any service offered by IronBit.</li>
            <li>Users should seek independent legal, financial, or tax advice as appropriate to their individual circumstances and jurisdiction.</li>
          </ul>

          <p class="page-content-text"><strong>3. Safeguarding Access Credentials</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users are solely responsible for maintaining the confidentiality and security of their account credentials, private keys, authentication devices, and any other means of accessing the Platform.</li>
            <li>IronBit is not liable for any loss or unauthorized access resulting from the user’s failure to adequately protect their access information.</li>
          </ul>

          <p class="page-content-text"><strong>4. Compliance with Laws and Regulations</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users are responsible for ensuring that their use of IronBit complies with all applicable laws, regulations, and reporting obligations in their jurisdiction.</li>
            <li>Users must not use the Platform for any unlawful, fraudulent, or prohibited activities.</li>
          </ul>

          <p class="page-content-text"><strong>5. Monitoring Account Activity</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users are expected to regularly monitor their account activity and promptly report any suspicious, unauthorized, or erroneous transactions to IronBit’s support team.</li>
            <li>Users should cooperate fully with any investigations or compliance reviews initiated by IronBit in connection with risk management or regulatory obligations.</li>
          </ul>

          <p class="page-content-text"><strong>6. Acceptance of Platform Limitations</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users acknowledge and accept the technical, operational, and legal limitations of the Platform as described in this Policy and related user agreements.</li>
            <li>Users understand that certain risks may be outside the control of IronBit, including but not limited to market volatility, third-party failures, and regulatory changes.</li>
          </ul>

          <p class="page-content-text">
            By continuing to use IronBit, users confirm that they have read, understood, and accepted their responsibilities as outlined above, and that they are prepared to bear the risks inherent in digital asset transactions and custody.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Platform Limitations and Disclaimers</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            Users of IronBit should be aware of the following limitations and disclaimers regarding the Platform’s services, features, and operational scope. These limitations are fundamental to understanding the risks associated with the use of IronBit and form an integral part of the user agreement.
          </p>

          <p class="page-content-text"><strong>1. Technical and Operational Limitations</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>No Guarantee of Uninterrupted Service:</strong> IronBit strives to provide continuous access to its services; however, the Platform may experience interruptions, delays, or downtime due to maintenance, technical failures, cyberattacks, or other unforeseen events. IronBit does not guarantee uninterrupted or error-free operation of the Platform.</li>
            <li><strong>Security Measures:</strong> While IronBit implements industry-standard security protocols to protect user assets and data, no system is immune to cyber threats, unauthorized access, or technical vulnerabilities. Users acknowledge that absolute security cannot be guaranteed.</li>
            <li><strong>Irreversibility of Transactions:</strong> Digital asset transactions, once confirmed on the relevant blockchain, are generally irreversible. IronBit cannot reverse, cancel, or modify transactions that have been broadcast to the blockchain, even in cases of user error or unauthorized activity.</li>
          </ul>

          <p class="page-content-text"><strong>2. Reliance on Third-Party Providers</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Third-Party Services:</strong> IronBit may utilize third-party service providers, including but not limited to liquidity providers, custodians, technology vendors, and compliance solution providers, to deliver certain features and functionalities. The performance, reliability, and availability of these services are outside the direct control of IronBit.</li>
            <li><strong>No Endorsement or Guarantee:</strong> IronBit does not endorse, guarantee, or assume responsibility for the accuracy, completeness, or reliability of information, services, or products provided by third parties. Any reliance on third-party services is at the user’s own risk.</li>
            <li><strong>Third-Party Failures:</strong> In the event of insolvency, default, or operational failure of a third-party provider, users may experience delays, losses, or disruptions in service. IronBit’s liability in such circumstances is limited as set forth in the user agreement and this Policy.</li>
          </ul>

          <p class="page-content-text"><strong>3. Platform Guarantees and Exclusions</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>No Investment Advice:</strong> IronBit does not provide investment, legal, tax, or financial advice. All information and materials provided through the Platform are for informational purposes only and should not be construed as a recommendation or endorsement of any digital asset or transaction.</li>
            <li><strong>No Guarantee of Asset Value or Availability:</strong> IronBit does not guarantee the value, liquidity, or continued availability of any digital asset supported on the Platform. Asset listings and supported features may be modified, suspended, or removed at any time without prior notice.</li>
            <li><strong>Exclusion of BTC Transaction History Tracking:</strong> Due to technical limitations, IronBit does not track or verify the transaction history of Bitcoin (BTC) or other assets where such tracking is not feasible. Users are solely responsible for ensuring the legitimacy and compliance of their assets.</li>
          </ul>

          <p class="page-content-text"><strong>4. Limitations of Recovery Support</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Scope of Recovery Assistance:</strong> IronBit may offer support to users affected by crypto-related fraud through integration with third-party recovery tools or services. However, IronBit does not guarantee the success, timeliness, or outcome of any recovery efforts.</li>
            <li><strong>No Guarantee of Fund Recovery:</strong> The recovery of lost or stolen digital assets is inherently uncertain and may be subject to legal, technical, or jurisdictional constraints. IronBit’s role is limited to providing access to available tools and support, without assuming responsibility for the recovery process or its results.</li>
          </ul>

          <p class="page-content-text"><strong>5. Limitation of Liability</strong></p>
          <p class="page-content-text">
            <strong>No Liability for Certain Losses:</strong> To the maximum extent permitted by law, IronBit disclaims all liability for any direct, indirect, incidental, consequential, or special losses or damages arising from:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Use or inability to use the Platform.</li>
            <li>Reliance on information or services provided by IronBit or third parties.</li>
            <li>Technical failures, security breaches, or unauthorized access.</li>
            <li>Regulatory changes or legal restrictions affecting digital assets or services.</li>
            <li>Any other circumstances beyond the reasonable control of IronBit.</li>
          </ul>
          <p class="page-content-text">
            Users are encouraged to review the full terms and conditions of the Platform for additional disclaimers and limitations of liability.
          </p>
        </div>
      </div>








      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Risk Management Measures</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IronBit is committed to implementing robust risk management measures designed to mitigate the diverse risks associated with digital asset custody, transactions, and platform operations. The following subsections outline the principal controls, protocols, and procedures in place to safeguard user assets, ensure regulatory compliance, and maintain the integrity of the Platform.
          </p>

          <p class="page-content-text"><strong>1. Security Protocols</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Encryption and Data Protection:</strong> All sensitive user data, including personal information and private keys, is protected using industry-standard encryption both in transit and at rest. Access to critical systems is restricted through multi-factor authentication and role-based access controls.</li>
            <li><strong>Infrastructure Security:</strong> The Platform’s infrastructure is regularly tested for vulnerabilities through penetration testing, security audits, and continuous monitoring. Firewalls, intrusion detection systems, and anti-malware solutions are deployed to prevent unauthorized access and mitigate cyber threats.</li>
            <li><strong>Wallet Management:</strong> Custodial wallets are managed using secure, segregated storage solutions, with private keys stored in hardware security modules (HSMs) or equivalent secure environments. Operational procedures are in place to minimize the risk of key compromise or unauthorized transactions.</li>
          </ul>

          <p class="page-content-text"><strong>2. Anti-Money Laundering (AML) and Sanctions Compliance</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Real-Time Screening:</strong> All users and transactions are subject to real-time AML and sanctions screening against relevant international lists. This includes onboarding checks, ongoing monitoring, and transaction-level reviews to detect and prevent illicit activity.</li>
            <li><strong>Enhanced Due Diligence:</strong> Users identified as higher risk, or transactions exhibiting suspicious characteristics, are subject to enhanced due diligence and additional verification procedures.</li>
            <li><strong>Escalation and Reporting:</strong> Any positive matches or suspected violations are escalated to the Compliance Officer for investigation. Where required, suspicious activity is reported to the appropriate authorities in accordance with law and international standards.</li>
            <li><strong>Staff Training:</strong> All relevant personnel receive regular training on AML, sanctions compliance, and the identification of suspicious activity.</li>
          </ul>

          <p class="page-content-text"><strong>3. Internal Controls and Compliance Procedures</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Segregation of Duties:</strong> Key operational functions are segregated to prevent conflicts of interest and reduce the risk of internal fraud or error.</li>
            <li><strong>Audit and Oversight:</strong> Regular internal and external audits are conducted to assess the effectiveness of risk management controls, compliance with policies, and adherence to legal requirements.</li>
            <li><strong>Policy Review:</strong> All risk management policies, including this Risk Disclosure Policy, are reviewed and updated at least annually or in response to significant changes in the regulatory environment or business operations.</li>
          </ul>

          <p class="page-content-text"><strong>4. Third-Party Risk Management</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Due Diligence:</strong> IronBit conducts thorough due diligence on all third-party service providers, including liquidity providers, custodians, and technology vendors, to assess their security, reliability, and compliance posture.</li>
            <li><strong>Contractual Safeguards:</strong> Agreements with third parties include provisions requiring adherence to security standards, data protection, and compliance with applicable laws and regulations.</li>
            <li><strong>Ongoing Monitoring:</strong> The performance and risk profile of third-party providers are monitored on an ongoing basis, with contingency plans in place to address potential failures or disruptions.</li>
          </ul>

          <p class="page-content-text"><strong>5. Incident Response and Business Continuity</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Incident Response Plan:</strong> IronBit maintains a documented incident response plan to address security breaches, system failures, or other emergencies. The plan includes procedures for containment, investigation, notification, and remediation.</li>
            <li><strong>Business Continuity Planning:</strong> Measures are in place to ensure the continuity of critical services in the event of operational disruptions, including data backups, redundant systems, and disaster recovery protocols.</li>
          </ul>

          <p class="page-content-text"><strong>6. User Education and Support</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Risk Awareness:</strong> IronBit provides users with educational materials and guidance on the risks associated with digital assets, safe security practices, and how to recognize and avoid scams or fraudulent activity.</li>
            <li><strong>Support Services:</strong> A dedicated support team is available to assist users with security concerns, account recovery, and reporting of suspicious activity.</li>
          </ul>

          <p class="page-content-text"><strong>7. Continuous Improvement</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Monitoring and Review:</strong> Risk management measures are continuously monitored and evaluated for effectiveness. Feedback from users, regulatory developments, and emerging threats are incorporated into ongoing improvements of the Platform’s risk management framework.</li>
          </ul>

          <p class="page-content-text">
            By implementing these measures, IronBit seeks to provide a secure, compliant, and resilient environment for digital asset custody and transactions. Users are encouraged to familiarize themselves with these controls and to actively participate in maintaining the security and integrity of their accounts and activities.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Legal Disclaimers</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            The following legal disclaimers apply to all users of IronBit and form an integral part of the user agreement governing the use of the Platform. By accessing or utilizing any service or feature provided by IronBit, users expressly acknowledge and accept the limitations and exclusions of liability set forth below.
          </p>

          <p class="page-content-text"><strong>1. No Guarantee of Performance or Results</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>IronBit does not guarantee the uninterrupted, error-free, or secure operation of the Platform or any of its services. Access to the Platform may be subject to delays, interruptions, or failures beyond the control of IronBit.</li>
            <li>The availability, value, and liquidity of digital assets are not guaranteed. IronBit does not warrant that any digital asset will retain value, remain supported, or be available for withdrawal or conversion at any time.</li>
          </ul>

          <p class="page-content-text"><strong>2. Limitation of Liability</strong></p>
          <p class="page-content-text">
            To the maximum extent permitted by applicable law, IronBit, its affiliates, directors, officers, employees, agents, and contractors shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages, including but not limited to:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Loss of funds, profits, revenue, or data;</li>
            <li>Loss or theft of digital assets due to unauthorized access, hacking, or cyberattacks;</li>
            <li>Losses resulting from market volatility, price fluctuations, or changes in asset value;</li>
            <li>Losses or damages arising from technical failures, system errors, or service interruptions;</li>
            <li>Losses due to regulatory changes, legal restrictions, or government actions affecting digital assets or the Platform;</li>
            <li>Losses or damages resulting from reliance on information, services, or products provided by third parties, including but not limited to liquidity providers, custodians, or technology vendors;</li>
            <li>Losses resulting from user error, including but not limited to incorrect transaction details, loss of access credentials, or failure to comply with security recommendations.</li>
          </ul>





          <p class="page-content-text"><strong>3. No Investment, Legal, or Tax Advice</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>IronBit does not provide investment, legal, tax, or financial advice. All information and materials made available through the Platform are for informational purposes only and should not be construed as a recommendation or endorsement of any digital asset, transaction, or strategy.</li>
            <li>Users are solely responsible for obtaining independent advice and making informed decisions regarding their use of the Platform and digital asset transactions.</li>
          </ul>

          <p class="page-content-text"><strong>4. Exclusion of Certain Warranties</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>IronBit expressly disclaims all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, title, and non-infringement.</li>
            <li>No oral or written information or advice provided by IronBit or its representatives shall create any warranty not expressly stated in this Policy or the user agreement.</li>
          </ul>

          <p class="page-content-text"><strong>5. Third-Party Services and Content</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>The Platform may provide access to, or integrate with, third-party services, products, or content. IronBit does not control, endorse, or assume responsibility for the accuracy, reliability, or legality of any third-party information or services.</li>
            <li>Any reliance on third-party services or content is at the user’s own risk, and IronBit disclaims all liability for losses or damages arising from third-party actions, omissions, or failures.</li>
          </ul>

          <p class="page-content-text"><strong>6. Force Majeure</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>IronBit shall not be liable for any failure or delay in performing its obligations under the user agreement or this Policy due to circumstances beyond its reasonable control, including but not limited to natural disasters, war, civil unrest, regulatory actions, or technological failures.</li>
          </ul>

          <p class="page-content-text"><strong>7. Binding Effect</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>These disclaimers are binding upon all users of IronBit and apply to the fullest extent permitted by law. Certain jurisdictions may not allow the exclusion or limitation of liability for certain types of damages; in such cases, IronBit’s liability shall be limited to the maximum extent permitted by applicable law.</li>
          </ul>

          <p class="page-content-text">
            Users are strongly encouraged to review the full terms and conditions of the Platform for additional disclaimers, limitations of liability, and user obligations. By continuing to use IronBit, users confirm their understanding and acceptance of these legal disclaimers.
          </p>
        </div>
      </div>







      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Changes to Risks and Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            The risks associated with digital assets, blockchain technology, and the use of the IronBit platform are dynamic and may evolve over time due to changes in technology, market conditions, regulatory requirements, and other external factors. IronBit is committed to maintaining transparency and keeping users informed of any material changes that may affect the risk profile of its services.
          </p>

          <p class="page-content-text"><strong>1. Evolution of Risks</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>The nature, scope, and severity of risks described in this Policy may change as the digital asset ecosystem develops, new threats emerge, or regulatory frameworks are updated.</li>
            <li>Users should be aware that additional risks not currently identified in this Policy may arise in the future, and that existing risks may be mitigated or exacerbated by changes in the operating environment.</li>
          </ul>

          <p class="page-content-text"><strong>2. Policy Updates</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>IronBit reserves the right to amend, update, or revise this Risk Disclosure Policy at any time to reflect changes in applicable laws, regulations, industry standards, or the Platform’s services and features.</li>
            <li>Material changes to this Policy will be communicated to users through appropriate channels, which may include email notifications, in-platform alerts, or updates posted on the IronBit website.</li>
            <li>The effective date of the most recent version of this Policy will be indicated at the beginning of the document.</li>
          </ul>

          <p class="page-content-text"><strong>3. User Notification and Continued Use</strong></p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Users are responsible for regularly reviewing this Policy to stay informed of any updates or changes.</li>
            <li>Continued access to or use of the Platform following the publication of an updated Policy constitutes acceptance of the revised terms and disclosures.</li>
            <li>If users do not agree with any changes to this Policy, they should discontinue use of the Platform and may contact IronBit for further clarification or to close their account.</li>
          </ul>

          <p class="page-content-text">
            By maintaining an adaptive approach to risk disclosure and policy management, IronBit seeks to ensure that users are consistently informed and able to make responsible decisions regarding their engagement with digital assets and the Platform.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">User Acknowledgment</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            By accessing or using any service, feature, or product provided by IronBit, users expressly acknowledge, confirm, and agree to the following:
          </p>

          <ul class="list-decimal pl-5 space-y-4 page-content-text">
            <li>
              <strong>Review and Understanding of Risks</strong><br>
              Users have carefully read, fully understood, and accept all risks described in this Risk Disclosure Policy, including but not limited to those related to digital asset custody, transactions, market volatility, cybersecurity, regulatory changes, and operational limitations.
            </li>
            <li>
              <strong>Acceptance as Condition of Use</strong><br>
              Acceptance of the risks outlined in this Policy is a mandatory condition for the use of IronBit. Users may be required to provide explicit acknowledgment of this Policy, such as by checking a box or providing a digital signature during the account registration or onboarding process.
            </li>
            <li>
              <strong>Ongoing Responsibility:</strong><br>
              Users acknowledge their ongoing responsibility to remain informed about the risks associated with digital assets and the IronBit platform, including any updates or amendments to this Policy. Continued use of the Platform following any changes to this Policy constitutes renewed acceptance of the updated terms and risk disclosures.
            </li>
            <li>
              <strong>Binding Effect:</strong><br>
              This acknowledgment is binding upon all users and forms an integral part of the user agreement between each user and IronBit. Users who do not agree with the terms of this Policy or any subsequent updates must discontinue use of the Platform and may contact IronBit for further clarification or to close their account.
            </li>
          </ul>

          <p class="page-content-text">
            By proceeding to access or use IronBit, users confirm their understanding and acceptance of the risks and responsibilities set forth in this Policy.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Governing Law and Dispute Resolution</h3>
        <div class="space-y-4">
          <p class="page-content-text"><strong>1. Governing Law</strong></p>
          <p class="page-content-text">
            This Risk Disclosure Policy, together with all rights, obligations, and disputes arising from or relating to the use of IronBit, shall be governed by and construed in accordance with the laws of Poland, without regard to its conflict of law principles. The application of any mandatory consumer protection laws of the user’s jurisdiction is not excluded to the extent such exclusion is not permitted by law.
          </p>

          <p class="page-content-text"><strong>2. Dispute Resolution Procedures</strong></p>
          <p class="page-content-text">
            <strong class="italic">a. Good Faith Negotiation:</strong> The parties shall first attempt to resolve any dispute through good faith negotiations. Users are encouraged to contact IronBit to seek an amicable resolution.
          </p>
          <p class="page-content-text">
            <strong class="italic">b. Mediation or Arbitration:</strong> If the dispute cannot be resolved through negotiation within [insert number] days, either party may refer the matter to mediation or binding arbitration in Poland, in accordance with the rules of [insert body], or such other procedure as may be agreed by the parties in writing.
          </p>
          <p class="page-content-text">
            <strong class="italic">c. Jurisdiction and Venue:</strong> Subject to the above, the courts of Poland shall have exclusive jurisdiction over any unresolved disputes arising from or relating to this Policy, the user agreement, or the use of IronBit. Users expressly consent to the personal and exclusive jurisdiction of such courts.
          </p>

          <p class="page-content-text"><strong>3. Notice of Dispute</strong></p>
          <p class="page-content-text">
            Any notice of dispute must be provided in writing and delivered to IronBit at [insert registered address or designated contact], specifying the nature of the dispute, the relief sought, and any relevant supporting documentation.
          </p>

          <p class="page-content-text"><strong>4. Severability</strong></p>
          <p class="page-content-text">
            If any provision of this section is found to be invalid or unenforceable under applicable law, such provision shall be severed, and the remaining provisions shall remain in full force and effect.
          </p>

          <p class="page-content-text">
            By using IronBit, users acknowledge and agree to the governing law and dispute resolution procedures set forth in this section.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Contact and Clarification</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            Users who have questions, require clarification, or wish to report concerns regarding the risks described in this Risk Disclosure Policy are encouraged to contact IronBit using the information provided below. IronBit is committed to transparency and user support, and will make reasonable efforts to respond to all inquiries in a timely and comprehensive manner.
          </p>

          <p class="page-content-text">
            <strong>Contact Information:</strong><br />
            Email: <a href="compliance@ironbit.io"><strong>compliance@ironbit.io</strong></a>
          </p>

          <p class="page-content-text">
            For all inquiries related to risk disclosures, users should include their full name, account information (if applicable), and a detailed description of the question or concern. IronBit may request additional information as necessary to address the inquiry effectively.
          </p>

          <p class="page-content-text">
            If you believe you have identified a risk, vulnerability, or issue not addressed in this Policy, or if you require further explanation of any aspect of the risks associated with the Platform, please contact the Compliance Officer at the email address above.
          </p>

          <p class="page-content-text italic">
            IronBit values user feedback and is dedicated to maintaining open channels of communication to ensure that all users are fully informed and supported in their use of the Platform.
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

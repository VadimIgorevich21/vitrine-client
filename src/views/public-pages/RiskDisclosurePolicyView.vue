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
    </article>














    <!-- Main Content -->
    <article class="default-container">
      <h1 class="page-title-h1 mb-3">{{ t('privacy.title') }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-8">
        {{ t('privacy.lastUpdated', { date: lastUpdated }) }}
      </p>

      <div class="space-y-6">
        <p class="page-content-text">
          {{ t('privacy.intro') }}
        </p>
        <!-- Block 1 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section1Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section1Text') }}
          </p>
        </div>
        <!-- Block 2 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section2Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section2Text') }}
          </p>
        </div>
        <!-- Block 3 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section3Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section3Text') }}
          </p>
        </div>
        <!-- Block 4 -->
        <div>
          <h2 class="page-title-h2">{{ t('privacy.section4Title') }}</h2>
          <p class="page-content-text">
            {{ t('privacy.section4Text') }}
          </p>
        </div>

        <p class="page-content-text mb-8">
          {{ t('privacy.contact') }}
        </p>

        <RouterLink
          to="/"
          class="inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          {{ t('common.backToHome') }}
        </RouterLink>
      </div>
    </article>
  </div>
</template>

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
            E-mail: info@ironbit.io
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Introduction and Purpose</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Risk Disclosure Policy (“Policy”) is established to provide users of IronBit (“the Platform”) with clear, comprehensive information regarding the risks associated with the use of custodial cryptocurrency wallet services, digital asset transactions, and related features offered by IronBit.
          </p>
          <p class="page-content-text">
            The purpose of this Policy is to ensure that all users are fully informed of the potential risks inherent in engaging with digital assets and to promote transparency, responsible usage, and informed decision-making. Cryptocurrency markets and technologies are subject to significant volatility, regulatory developments, and operational uncertainties.
          </p>
          <p class="page-content-text">
            By outlining these risks, IronBit seeks to protect its users and to comply with applicable legal and regulatory standards. Users are strongly encouraged to review this Policy carefully and to consider the risks described herein before utilizing any services provided by IronBit.
          </p>
          <p class="page-content-text">
            This Policy forms an integral part of the user agreement between IronBit and its users. By accessing or using the Platform, users acknowledge their understanding of, and agreement to, the terms and disclosures set forth in this Policy.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Scope of the Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Policy applies to all users of IronBit and governs the use of all products, services, and features provided by the Platform. The scope of this Policy includes, but is not limited to:
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
            This Policy applies to all digital asset transactions and activities conducted through the Platform, regardless of the user’s jurisdiction, the type of digital asset involved, or the method of access (including web, mobile, or integrated applications).
          </p>
          <p class="page-content-text">
            The Policy is binding upon all users, employees, contractors, and any third parties acting on behalf of IronBit in connection with the provision of its services.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">Nature of Risks</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            Users of IronBit should be aware that engaging in digital asset custody, transactions, and related services involves significant risks. The following subsections describe the principal risks associated with the use of the Platform. This list is not exhaustive, and users are encouraged to conduct their own due diligence and seek independent advice as appropriate.
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

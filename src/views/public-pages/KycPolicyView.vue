<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()

const lastUpdated = '2025-02-20'
</script>

<template>
  <div class="public-layout-content">
    <!-- Main Content -->
    <article class="default-container">
      <h1 class="page-title-h1 mb-10">Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy</h1>

      <div class="mb-8">
        <div class="space-y-4">
          <h3 class="page-title-h3 mb-3">IRONBIT Spółka z ograniczoną odpowiedzialnością (IRONBIT Sp. z o.o.)</h3>
          <p class="last-updated-text">Last updated: 12 November 2025</p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">1. Policy Statement</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT Spółka z ograniczoną odpowiedzialnością ("IRONBIT", "we", "our", or "us") is committed to preventing the use of its services for money laundering, terrorist financing, or any other illegal financial activity.
          </p>
          <p class="page-content-text">
            This AML/KYC Policy establishes the principles and procedures designed to ensure compliance with applicable Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) regulations in Poland and the European Union.
          </p>
          <p class="page-content-text">
            IRONBIT actively monitors transactions, verifies customer identities, and maintains transparency to protect the integrity of the financial system and our platform.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">2. Purpose of the Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">The purpose of this Policy is to:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Prevent and detect money laundering and terrorism financing activities;</li>
            <li>Ensure that IRONBIT's services are not used to conceal or transfer proceeds of crime;</li>
            <li>Comply with applicable AML/CTF obligations and industry best practices;</li>
            <li>Promote a risk-based approach to customer identification and monitoring.</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">3. Responsibilities</h3>
        <div class="space-y-4">
          <p class="page-content-text"><strong>3.1 Management Responsibilities:</strong></p>
          <p class="page-content-text">The management of IRONBIT bears the ultimate responsibility for the establishment and maintenance of an effective AML/CTF framework.</p>
          <p class="page-content-text"><strong>3.2 Compliance Officer (MLRO):</strong></p>
          <p class="page-content-text">A designated <strong>Money Laundering Reporting Officer (MLRO)</strong> is responsible for:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Implementing and updating this Policy;</li>
            <li>Ensuring staff training and awareness; </li>
            <li>Overseeing customer due diligence (CDD) processes;</li>
            <li>Reviewing and reporting suspicious transactions to competent authorities;</li>
            <li>Maintaining all AML-related records and communications. </li>
          </ul>
          <p class="page-content-text"><strong>The MLRO reports directly to the company’s management board. </strong></p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">4. Risk-Based Approach</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT applies a <strong>risk-based approach (RBA)</strong> to prevent money laundering and terrorist financing. This means that the level of KYC and monitoring applied to each customer depends on the level of risk posed by that customer, based on factors such as:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Country of residence or incorporation;</li>
            <li>Type of transaction or service used;</li>
            <li>Source of funds and wealth;</li>
            <li>Customer behavior and transaction patterns;</li>
          </ul>
          <p class="page-content-text">
            Customers classified as high-risk are subject to enhanced due diligence procedures (EDD).
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">5. Customer Identification and Verification (KYC)</h3>
        <div class="space-y-4">
          <p class="page-content-text"><strong>5.1 Individual Customers</strong><br>Each customer must provide:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Full name</li>
            <li>Date of birth</li>
            <li>Residential address</li>
            <li>Valid government-issued ID (passport, national ID card, or equivalent)</li>
            <li>PESEL</li>
            <li>Proof of address (utility bill or bank statement not older than 3 months)</li>
          </ul>

          <p class="page-content-text"><strong>5.2 Corporate Customers</strong><br>Corporate clients must provide:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Certificate of incorporation and company details (KRS, NIP, REGON if Polish entity)</li>
            <li>Memorandum and Articles of Association</li>
            <li>Proof of registered office address</li>
            <li>List of directors and shareholders</li>
            <li>Identification of Ultimate Beneficial Owners (UBOs) holding 25% or more of the company's shares or voting rights</li>
            <li>Identity documents of UBOs and authorized signatories</li>
          </ul>

          <p class="page-content-text"><strong>5.3 Verification Methods</strong></p>
          <p class="page-content-text">
            IRONBIT may use third-party verification providers, public registries, and internal verification systems to confirm the authenticity of documents and information submitted.
          </p>
        </div>
      </div>


      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">6. Ongoing Monitoring</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT continuously monitors all transactions and customer behavior to identify unusual or suspicious activities.
          </p>
          <p class="page-content-text">Monitoring includes:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Automated screening against sanction and PEP (Politically Exposed Person) lists;</li>
            <li>Transaction pattern analysis;</li>
            <li>Regular review of customer data and documentation;</li>
          </ul>
          <p class="page-content-text">
            If suspicious activity is detected, the MLRO will evaluate and report it to competent authorities, in accordance with applicable law.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">7. Enhanced Due Diligence (EDD)</h3>
        <div class="space-y-4">
          <p class="page-content-text">IRONBIT applies enhanced due diligence to:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>High-risk jurisdictions;</li>
            <li>Customers involved in complex or large transactions;</li>
            <li>Transactions with unclear economic purpose;</li>
            <li>Customers or entities listed on sanctions or PEP lists;</li>
          </ul>
          <p class="page-content-text">
            EDD measures may include requesting additional documents, proof of source of funds, and managerial approval before proceeding with transactions.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">8. Record Keeping</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            All identification documents, transaction data, and internal reports related to AML/KYC are securely stored for a period of <strong>five (5) years</strong> after the end of the customer relationship or the completion of the transaction, in accordance with applicable law.
          </p>
          <p class="page-content-text">
            Records are stored in digital form with restricted access and may be shared with competent authorities upon lawful request.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">9. Reporting Suspicious Activities</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            If IRONBIT suspects that a transaction may be linked to criminal activity, terrorism financing, or any other unlawful purpose, the MLRO must immediately prepare and submit a Suspicious Activity Report (SAR) to the relevant authority, as required by Polish law.
          </p>
          <p class="page-content-text">
            All employees are required to promptly report any suspicious behavior or transaction to the MLRO.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">10. Employee Training and Awareness</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT ensures that all relevant employees receive AML/CTF training upon hiring and regularly thereafter.
          </p>
          <p class="page-content-text">Training includes:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Recognizing suspicious transactions;</li>
            <li>Understanding AML/CTF laws and obligations;</li>
            <li>Reporting procedures and confidentiality obligations;</li>
          </ul>
          <p class="page-content-text">
            Employees are required to sign a confirmation of training completion.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">11. Data Protection and Confidentiality</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            All personal and transaction data collected under this Policy is processed in accordance with IRONBIT’s <a href="/privacy-policy"><strong>Privacy Policy</strong></a> and applicable data protection laws (GDPR).
          </p>
          <p class="page-content-text">
            Confidentiality is maintained at all times, except when disclosures are made to competent authorities as required by law.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">12. Policy Review and Updates</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Policy is reviewed at least annually or whenever there are significant changes to AML/CTF laws or IRONBIT’s business model.
          </p>
          <p class="page-content-text">
            The MLRO ensures that updates are implemented promptly and communicated to all relevant employees.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">13. Contact Information</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            For questions regarding this AML/KYC Policy, please contact:
          </p>
          <p class="page-content-text">
            <strong>IRONBIT Sp. z o.o.</strong><br>
            ul. Żurawia 6, lok. 12, 00-503 Warszawa, Poland<br>
            Email: <a href="mailto:info@ironbit.net"><strong>info@ironbit.net</strong></a>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

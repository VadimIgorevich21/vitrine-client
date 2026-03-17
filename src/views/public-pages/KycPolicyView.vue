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
            IRONBIT applies a Risk-Based Approach (RBA) to assess the risks of money laundering and terrorist financing. We categorize customers and transactions into different risk levels (Low, Medium, High) based on factors such as country of residence, transaction volume, and business type. Enhanced Due Diligence (EDD) is applied to high-risk customers.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">5. Customer Due Diligence (CDD)</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT identifies and verifies every customer before providing services. The CDD process includes:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li><strong>Identification:</strong> Collecting full name, date of birth, nationality, and residential address.</li>
            <li><strong>Verification:</strong> Requiring a valid government-issued ID (passport, national ID card) and proof of residence (utility bill or bank statement).</li>
            <li><strong>Liveness Check:</strong> Using facial recognition or video verification tools to ensure the person is real.</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">6. Enhanced Due Diligence (EDD)</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            For customers identified as high-risk, including Politically Exposed Persons (PEPs) or those from high-risk jurisdictions, IRONBIT performs additional checks, such as verifying the Source of Wealth (SoW) and Source of Funds (SoF).
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">7. Sanctions and PEP Screening</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            All customers are screened against international sanctions lists (UN, EU, OFAC) and PEP databases. IRONBIT does not provide services to individuals or entities subject to financial sanctions.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">8. Transaction Monitoring</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT monitors all transactions in real-time to detect unusual patterns, such as:
          </p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Transactions of unusually high value;</li>
            <li>Frequent transactions in a short period;</li>
            <li>Structuring (breaking down large transactions into smaller ones).</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">9. Suspicious Activity Reporting (SAR)</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            If there is a suspicion that a transaction may be linked to criminal activity or terrorism financing, the MLRO must prepare and submit a Suspicious Activity Report (SAR) to the relevant authority, as required by Polish law. Employees are prohibited from "tipping off" customers about such reports.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">10. Employee Training and Awareness</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            IRONBIT ensures that all relevant employees receive AML/CTF training upon hiring and regularly thereafter to recognize suspicious behavior and understand reporting procedures.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">11. Data Protection and Record Keeping</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            All personal and transaction data is processed in accordance with IRONBIT's Privacy Policy and GDPR. Records are maintained for at least five (5) years after the termination of the business relationship.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">12. Policy Review and Updates</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            This Policy is reviewed at least annually or whenever there are significant changes to AML/CTF laws or IRONBIT's business model.
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
            Email: <strong>info@ironbit.net</strong>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

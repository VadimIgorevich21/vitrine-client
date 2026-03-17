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
      <h1 class="page-title-h1 mb-10">Refund Policy</h1>

      <div class="mb-8">
        <div class="space-y-4">
          <h3 class="page-title-h3 mb-3">IRONBIT Spółka z ograniczoną odpowiedzialnością (IRONBIT Sp. z o.o.)</h3>
          <p class="last-updated-text">Last updated: 12 November 2025</p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">1. General Principles</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            1.1 This Refund Policy (“Policy”) describes the rules and conditions under which IRONBIT Sp. z o.o. (“IRONBIT”, “we”, “our”, or “us”) may issue refunds to customers (“you”, “your”).
          </p>
          <p class="page-content-text">
            1.2 IRONBIT provides cryptocurrency exchange services between virtual and fiat currencies. Due to the nature of cryptocurrency transactions, <strong>all completed transactions are final and non-reversible</strong> once processed and confirmed on the blockchain.
          </p>
          <p class="page-content-text">
            1.3 Refunds are possible only for transactions that have not yet been completed, or for which the Service has failed to process the exchange correctly.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">2. Eligibility for Refund</h3>
        <div class="space-y-4">
          <p class="page-content-text">2.1 A refund may be requested if:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>The transaction was not executed or processed;</li>
            <li>The funds have not yet been converted into cryptocurrency;</li>
            <li>The customer account was charged but the transaction could not be fulfilled due to a technical or operational issue.</li>
          </ul>
          <p class="page-content-text">2.2 Refunds <strong>cannot be issued</strong> if:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>The cryptocurrency has already been transferred to the customer’s wallet;</li>
            <li>The exchange transaction has been completed and confirmed;</li>
            <li>The customer provided incorrect or incomplete payment or wallet details;</li>
            <li>The customer violated these Terms or engaged in fraudulent or illegal activity.</li>
          </ul>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">3. How to Request a Refund</h3>
        <div class="space-y-4">
          <p class="page-content-text">3.1 To request a refund, you must contact IRONBIT by email at <a href="mailto:info@ironbit.net"><strong>info@ironbit.net</strong></a> and include:</p>
          <ul class="list-disc pl-5 space-y-2 page-content-text">
            <li>Full name and registered email;</li>
            <li>Transaction ID or reference number;</li>
            <li>Amount and date of payment;</li>
            <li>Explanation of the refund reason.</li>
          </ul>
          <p class="page-content-text">
            3.2 In some cases, you may also cancel a pending transaction directly from your account interface if it has not yet been completed.
          </p>
          <p class="page-content-text">
            3.3 Refund requests are reviewed within <strong>24 hours</strong> of receipt during business days. Depending on the complexity of verification, additional time may be required.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">4. Processing Time and Method of Refund</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            4.1 Refunds are typically processed within <strong>five (5) business days</strong> after confirmation and approval by IRONBIT.
          </p>
          <p class="page-content-text">
            4.2 Refunds will be issued using the same payment method used for the original transaction (bank transfer, card, or e-wallet).
          </p>
          <p class="page-content-text">
            4.3 Refunds to cryptocurrency wallets will be made only to the wallet address provided during the original transaction, after identity verification.
          </p>
          <p class="page-content-text">
            4.4 The completion time of refunds depends on external payment processors and banking institutions.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">5. Verification and Documentation</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            5.1 IRONBIT reserves the right to request additional documentation to verify your identity or confirm the source of payment before processing a refund.
          </p>
          <p class="page-content-text">
            5.2 If the requested information is not provided within <strong>two (2) business days</strong>, refund processing may be delayed or denied.
          </p>
          <p class="page-content-text">
            5.3 IRONBIT may temporarily <strong>freeze funds</strong> related to a refund request if fraudulent activity or payment disputes are suspected.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">6. Transaction Errors</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            6.1 If you believe that an error has occurred during your transaction, you must notify IRONBIT immediately by email at <a href="mailto:info@ironbit.net"><strong>info@ironbit.net</strong></a>.
          </p>
          <p class="page-content-text">
            6.2 We will investigate each case individually and inform you of the outcome as soon as reasonably possible.
          </p>
          <p class="page-content-text">
            6.3 Refunds related to transaction errors will be made only after full verification and confirmation of the issue.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">7. Fees and Deductions</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            7.1 Any costs or fees incurred in processing a refund (including banking or network fees) are borne by the customer and may be deducted from the refund amount.
          </p>
          <p class="page-content-text">
            7.2 IRONBIT is not responsible for any exchange rate differences between the initial purchase and refund times.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">8. Chargeback Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            8.1 IRONBIT encourages customers to contact our support team directly before initiating any chargeback request with their bank or payment provider.
          </p>
          <p class="page-content-text">
            8.2 Filing a chargeback without first contacting IRONBIT may result in the suspension of your account and delays in resolving the issue.
          </p>
          <p class="page-content-text">
            8.3 IRONBIT reserves the right to dispute unjustified chargeback claims and provide evidence to the respective payment institution.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">9. Fraud and Misuse</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            9.1 Any attempt to misuse refund procedures or submit false refund requests constitutes a violation of this Policy and may lead to account suspension and reporting to authorities.
          </p>
          <p class="page-content-text">
            9.2 IRONBIT reserves the right to freeze or confiscate funds involved in suspected fraudulent activities pending investigation.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">10. Amendments to This Policy</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            10.1 IRONBIT may modify or update this Refund Policy at any time. Changes will be published on the official website and become effective immediately upon publication.
          </p>
          <p class="page-content-text">
            10.2 Continued use of the Service after changes to this Policy constitutes acceptance of the updated terms.
          </p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="page-title-h3 mb-3">11. Contact Information</h3>
        <div class="space-y-4">
          <p class="page-content-text">
            If you have questions or concerns regarding this Refund Policy, please contact us:
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

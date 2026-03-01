<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import FormError from "@/components/FormError.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { getGoogleAuthUrl } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import logoShine from "@/assets/img/logo-shine.png";
import bgImage from "@/assets/img/background.png";
import BaseButton from "@/components/ui/BaseButton.vue"

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

const otpEmail = ref("");
const otpDigits = ref<string[]>(["", "", "", "", "", ""]);
const otpSent = ref(false);

const OTP_LENGTH = 6;
const digitRefs = ref<HTMLInputElement[]>([]);

const redirectPath = computed(() => (route.query.redirect as string) || "/cabinet");
const loading = computed(() => authStore.loading);
const authError = computed(() => authStore.error);
const hasError = computed(() => !!authStore.error);

const otpCode = computed(() => otpDigits.value.join(""));

// ── OTP send ────────────────────────────────────────────────────────────────
async function sendOtp() {
  if (!otpEmail.value.trim()) return;
  try {
    await authStore.sendOtp(otpEmail.value);
    otpSent.value = true;
    otpDigits.value = Array(OTP_LENGTH).fill("");
    await nextTick();
    digitRefs.value[0]?.focus();
  } catch {
    // error in store
  }
}

// ── OTP verify ───────────────────────────────────────────────────────────────
async function submitOtp() {
  if (otpCode.value.length < OTP_LENGTH) return;
  try {
    await authStore.verifyOtp(otpEmail.value, otpCode.value, redirectPath.value);
  } catch {
    // error in store — shake + highlight handled via hasError
    // clear digits so user can retype
    otpDigits.value = Array(OTP_LENGTH).fill("");
    await nextTick();
    digitRefs.value[0]?.focus();
  }
}

// ── Per-digit input handling ─────────────────────────────────────────────────
function onDigitInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const raw = target.value.replace(/\D/g, "");

  // Handle pasting a full code
  if (raw.length > 1) {
    const chars = raw.slice(0, OTP_LENGTH).split("");
    chars.forEach((c, i) => {
      otpDigits.value[i] = c;
    });
    const next = Math.min(chars.length, OTP_LENGTH - 1);
    nextTick(() => digitRefs.value[next]?.focus());
    if (chars.length === OTP_LENGTH) submitOtp();
    return;
  }

  otpDigits.value[index] = raw;
  if (raw && index < OTP_LENGTH - 1) {
    nextTick(() => digitRefs.value[index + 1]?.focus());
  }
  if (otpCode.value.length === OTP_LENGTH) submitOtp();
}

function onDigitKeydown(index: number, event: KeyboardEvent) {
  if (event.key === "Backspace") {
    if (otpDigits.value[index]) {
      otpDigits.value[index] = "";
    } else if (index > 0) {
      otpDigits.value[index - 1] = "";
      nextTick(() => digitRefs.value[index - 1]?.focus());
    }
  } else if (event.key === "ArrowLeft" && index > 0) {
    digitRefs.value[index - 1]?.focus();
  } else if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
    digitRefs.value[index + 1]?.focus();
  }
}

function onDigitFocus(index: number) {
  digitRefs.value[index]?.select();
}

// ── Back to email step ────────────────────────────────────────────────────────
function goBack() {
  otpSent.value = false;
  otpDigits.value = Array(OTP_LENGTH).fill("");
  authStore.error = null;
}

// ── Resend ────────────────────────────────────────────────────────────────────
async function resendOtp() {
  otpDigits.value = Array(OTP_LENGTH).fill("");
  authStore.error = null;
  try {
    await authStore.sendOtp(otpEmail.value);
    await nextTick();
    digitRefs.value[0]?.focus();
  } catch {
    // error in store
  }
}

// ── Google ────────────────────────────────────────────────────────────────────
function goGoogle() {
  if (typeof window === "undefined") return;
  const redirectUri = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectPath.value)}`;
  window.location.href = getGoogleAuthUrl(redirectUri);
}
</script>

<template>
  <div
    class="auth-page"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <!-- Logo -->
    <div class="auth-logo">
      <a href="/">
        <img :src="logoShine" alt="Logo" class="auth-logo__img" />
      </a>
    </div>

    <!-- ── Step 1: Email ───────────────────────────────────────────── -->
    <div v-if="!otpSent" class="auth-card">
      <h1 class="auth-card__title">{{ t("login.connectTitle") }}</h1>
      <div v-if="authError" class="text-center font-14px">
        <FormError :error="authError" />
      </div>
      <p v-else class="auth-card__subtitle">{{ t("login.connectSubtitle") }}</p>

      <div class="auth-input-wrap">
        <svg class="auth-input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 7L2 7" />
        </svg>
        <input
          id="auth-otp-email"
          v-model="otpEmail"
          type="email"
          autocomplete="email"
          :placeholder="t('login.emailPlaceholder')"
          class="auth-input"
          :disabled="loading"
          @keyup.enter="sendOtp"
        />
      </div>

      <BaseButton :loading="loading" :disabled="!otpEmail.trim()" @click="sendOtp">
        {{ t("login.otpSendCode") }}
      </BaseButton>

      <!-- Divider -->
      <div class="auth-divider">
        <span class="auth-divider__line" />
        <span class="auth-divider__text">{{ t("login.or") }}</span>
        <span class="auth-divider__line" />
      </div>

      <!-- Google -->
      <button
        type="button"
        class="auth-btn-google"
        :disabled="loading"
        @click="goGoogle"
      >
        <svg class="auth-btn-google__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        {{ t("login.loginWithGoogle") }}
      </button>
    </div>

    <!-- ── Step 2: OTP Verification ────────────────────────────────── -->
    <div v-else class="auth-card">
      <!-- Back arrow -->
      <button type="button" class="auth-back-arrow" :disabled="loading" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <h1 class="auth-card__title">{{ t("login.verifyTitle") }}</h1>

      <p class="auth-card__subtitle">
        {{ t("login.verifySentTo") }}<br />
        <strong class="auth-card__email">{{ otpEmail }}</strong>
      </p>

      <!-- Error message -->
      <p v-if="hasError" class="auth-otp-error">{{ t("login.invalidCode") }}</p>

      <!-- 6-digit boxes -->
      <div class="auth-otp-boxes" :class="{ 'auth-otp-boxes--error': hasError }">
        <input
          v-for="(_, i) in otpDigits"
          :key="i"
          :ref="(el) => { if (el) digitRefs[i] = el as HTMLInputElement }"
          v-model="otpDigits[i]"
          type="text"
          inputmode="numeric"
          maxlength="6"
          autocomplete="one-time-code"
          class="auth-otp-box"
          :class="{
            'auth-otp-box--filled': !!otpDigits[i],
            'auth-otp-box--error': hasError,
          }"
          :disabled="loading"
          @input="onDigitInput(i, $event)"
          @keydown="onDigitKeydown(i, $event)"
          @focus="onDigitFocus(i)"
        />
      </div>

      <div v-if="loading" class="auth-otp-loading">
        <span class="auth-btn-spinner auth-btn-spinner--dark" />
      </div>

      <!-- Resend -->
      <button type="button" class="auth-resend-btn" :disabled="loading" @click="resendOtp">
        {{ t("login.resendCode") }}
      </button>
    </div>

    <!-- Footer -->
    <footer class="auth-footer">
      <div class="auth-footer__container">
        <span class="auth-footer__copy">© 2026 IronBit. All rights reserved.</span>
        <nav class="auth-footer__nav">
          <a href="#" class="auth-footer__link">{{ t("footer.buySell") }}</a>
          <a href="#" class="auth-footer__link">{{ t("footer.contactUs") }}</a>
          <a href="#" class="auth-footer__link">{{ t("footer.terms") }}</a>
        </nav>
        <div class="auth-footer__right">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ── Page ──────────────────────────────────────────────── */
.auth-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center top;
  background-position: 0 -150px;
  background-repeat: no-repeat;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 0 16px;
}

/* ── Logo ──────────────────────────────────────────────── */
.auth-logo {
  margin-top: 48px;
  margin-bottom: 40px;
}

.auth-logo__img {
  height: 80px;
  object-fit: contain;
}

/* ── Card ──────────────────────────────────────────────── */
.auth-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 44px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.10);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
}

.auth-card__title {
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  color: #111827;
  text-align: center;
  margin: 0;
}

.auth-card__subtitle {
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  margin: 0;
  line-height: 1.6;
}

.auth-card__email {
  color: #374151;
  font-weight: 600;
}

/* ── Back arrow ────────────────────────────────────────── */
.auth-back-arrow {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: #6B7280;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  padding: 0;
}

.auth-back-arrow:hover:not(:disabled) {
  background: #F3F4F6;
  color: #111827;
}

/* ── Input ─────────────────────────────────────────────── */
.auth-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: #9CA3AF;
  pointer-events: none;
  flex-shrink: 0;
}

.auth-input {
  width: 100%;
  padding: 13px 16px 13px 42px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  font-size: 14px;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border-color 0.18s;
  box-sizing: border-box;
}

.auth-input:focus {
  border-color: #F97316;
}

.auth-input:disabled {
  background: #F9FAFB;
  color: #9CA3AF;
}

.auth-input::placeholder {
  color: #9CA3AF;
}

/* ── OTP error message ─────────────────────────────────── */
.auth-otp-error {
  color: #EC4899;
  font-size: 13px;
  text-align: center;
  margin: 0;
}

/* ── OTP 6-box grid ────────────────────────────────────── */
.auth-otp-boxes {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.auth-otp-box {
  width: 52px;
  height: 56px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 600;
  color: #111827;
  text-align: center;
  background: #fff;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
  caret-color: transparent;
  box-sizing: border-box;
}

.auth-otp-box:focus {
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}

.auth-otp-box--filled {
  border-color: #D1D5DB;
}

.auth-otp-box--error {
  border-color: #F9A8D4 !important;
  color: #EC4899;
}

/* ── OTP loading ───────────────────────────────────────── */
.auth-otp-loading {
  display: flex;
  justify-content: center;
  margin: -4px 0;
}

/* ── Resend ────────────────────────────────────────────── */
.auth-resend-btn {
  background: none;
  border: none;
  color: #6366F1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-align: center;
  transition: color 0.15s, opacity 0.15s;
}

.auth-resend-btn:hover:not(:disabled) {
  color: #4F46E5;
  text-decoration: underline;
}

.auth-resend-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Primary button ────────────────────────────────────── */
.auth-btn-primary {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(90deg, #F97316 0%, #EA580C 100%);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: opacity 0.18s, transform 0.12s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.auth-btn-primary:hover:not(:disabled) {
  opacity: 0.92;
  transform: translateY(-1px);
}

.auth-btn-primary:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.auth-btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
  flex-shrink: 0;
}

.auth-btn-spinner--dark {
  border-color: rgba(99, 102, 241, 0.25);
  border-top-color: #6366F1;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ── Divider ───────────────────────────────────────────── */
.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 2px 0;
}

.auth-divider__line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.auth-divider__text {
  font-size: 13px;
  color: #9CA3AF;
}

/* ── Google button ─────────────────────────────────────── */
.auth-btn-google {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  background: #fff;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.15s, border-color 0.15s;
}

.auth-btn-google:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.auth-btn-google:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.auth-btn-google__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* ── Footer ────────────────────────────────────────────── */
.auth-footer {
  margin-top: auto;
  width: 100%;
}
.auth-footer__container {
  max-width: 1300px; /* Ваше ограничение */
  margin: 0 auto;    /* Центрирование контейнера */
  padding: 20px 16px 28px;
  width: 100%;
  /* 3-column grid: copyright | links-centered | lang */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px 0;
  box-sizing: border-box;
}

.auth-footer__copy {
  font-size: 12px;
  color: #6B7280;
  justify-self: start;
}

.auth-footer__nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 20px;
}

.auth-footer__link {
  font-size: 13px;
  color: #374151;
  text-decoration: none;
  transition: color 0.15s;
  white-space: nowrap;
}

.auth-footer__link:hover {
  color: #F97316;
}

.auth-footer__right {
  display: flex;
  justify-content: flex-end;
}

/* ══════════ RESPONSIVE ══════════════════════════════════ */

/* ≤ 480px – phones */
@media (max-width: 480px) {
  .auth-logo {
    margin-top: 28px;
    margin-bottom: 20px;
  }

  .auth-logo__img {
    height: 36px;
  }

  .auth-card {
    padding: 28px 20px;
    border-radius: 16px;
    gap: 14px;
  }

  .auth-card__title {
    font-size: 19px;
  }

  .auth-card__subtitle {
    font-size: 13px;
  }

  /* font-size: 16px prevents iOS auto-zoom on focus */
  .auth-input {
    padding: 11px 14px 11px 40px;
    font-size: 16px;
  }

  .auth-btn-primary {
    padding: 13px;
    font-size: 14px;
  }

  .auth-btn-google {
    padding: 11px 14px;
    font-size: 13px;
  }

  .auth-otp-boxes {
    gap: 6px;
  }

  .auth-otp-box {
    width: 42px;
    height: 48px;
    font-size: 18px;
    border-radius: 8px;
  }

  /* Footer collapses to column */
  .auth-footer__container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    padding: 16px 12px 20px;
  }

  .auth-footer__copy {
    justify-self: center;
    order: 2;
  }

  .auth-footer__nav {
    order: 1;
  }

  .auth-footer__right {
    justify-self: center;
    order: 3;
  }

  .auth-footer__link {
    font-size: 12px;
  }
}

/* ≤ 360px */
@media (max-width: 360px) {
  .auth-card {
    padding: 24px 14px;
    gap: 12px;
  }

  .auth-card__title {
    font-size: 17px;
  }

  .auth-otp-boxes {
    gap: 5px;
  }

  .auth-otp-box {
    width: 36px;
    height: 44px;
    font-size: 16px;
    border-radius: 7px;
  }

  .auth-footer__nav {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
}

/* ≤ 320px */
@media (max-width: 320px) {
  .auth-page {
    padding: 0 8px;
  }

  .auth-logo__img {
    height: 30px;
  }

  .auth-card {
    padding: 20px 12px;
    border-radius: 14px;
  }

  .auth-card__title {
    font-size: 16px;
  }

  .auth-otp-boxes {
    gap: 4px;
  }

  .auth-otp-box {
    width: 32px;
    height: 40px;
    font-size: 15px;
    border-radius: 6px;
  }

  .auth-btn-primary {
    font-size: 13px;
    padding: 11px;
  }
}
</style>

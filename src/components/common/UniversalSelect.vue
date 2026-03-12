<template>
  <div class="select-root" :class="{ 'width-auto': borderless, 'width-full': !borderless }" ref="container" style="min-width: 0;">
    <!-- Selected Item Button -->
    <div 
      @click="isOpen = !isOpen"
      :class="['selected-item-button', borderless ? 'borderless' : 'normal']"
    >
      <div class="selected-content">
        <div v-if="selectedItemIcon" 
             class="item-icon" 
             :class="{ 'is-fiat': isFiat, 'is-crypto': !isFiat, 'rounded-full': rounded && !isFiat, 'selected-rounded': rounded && isFiat }"
             :style="{ backgroundImage: `url(${getIconPath(selectedItemIcon)})` }">
        </div>
        <span class="item-label">{{ selectedItemLabel || placeholder }}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" :class="['arrow-icon', { 'is-open': isOpen }]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Dropdown -->
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-panel">
        <!-- Search -->
        <div class="search-container">
          <div class="search-input-wrapper">
            <input
              v-model="searchQuery"
              ref="searchInput"
              type="text"
              :placeholder="searchPlaceholder"
              class="search-input"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- List -->
        <div class="items-list custom-scrollbar">
          <div 
            v-for="item in filteredItems" 
            :key="item[itemKey]"
            @click="selectItem(item)"
            :class="['list-item', { 'is-selected': modelValue === item[itemKey], 'is-fiat': isFiat }]"
          >
            <div 
              v-if="iconPath && item[iconPath]"
              class="item-list-icon-container"
            >
                <img :src="getIconPath(item[iconPath])" class="item-list-icon object-contain" />
            </div>
            <div class="item-text-container">
              <span class="item-main-text">{{ item[labelPath] }}</span>
              <span v-if="sublabelPath && item[sublabelPath]" class="item-sub-text">{{ item[sublabelPath] }}</span>
            </div>
            <div v-if="modelValue === item[itemKey]" class="check-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div v-if="filteredItems.length === 0" class="no-results">
            Ничего не найдено
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

const props = withDefaults(defineProps<{
  modelValue: string | number;
  items: any[];
  itemKey?: string;
  labelPath?: string;
  sublabelPath?: string;
  iconPath?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  rounded?: boolean;
  borderless?: boolean;
  isFiat?: boolean;
}>(), {
  itemKey: 'code',
  labelPath: 'code',
  placeholder: 'Выберите...',
  searchPlaceholder: 'Поиск...',
  rounded: false,
  borderless: false,
  isFiat: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const container = ref<HTMLElement | null>(null);

const selectedItem = computed(() => {
  return props.items.find(item => item[props.itemKey] === props.modelValue);
});

const selectedItemLabel = computed(() => {
  return selectedItem.value ? selectedItem.value[props.labelPath] : '';
});

const selectedItemIcon = computed(() => {
  return (props.iconPath && selectedItem.value) ? selectedItem.value[props.iconPath] : null;
});

const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return props.items;
  return props.items.filter(item => {
    const label = String(item[props.labelPath] || '').toLowerCase();
    const sublabel = props.sublabelPath ? String(item[props.sublabelPath] || '').toLowerCase() : '';
    return label.includes(query) || sublabel.includes(query);
  });
});

const selectItem = (item: any) => {
  const val = item[props.itemKey];
  emit('update:modelValue', val);
  emit('change', val);
  isOpen.value = false;
  searchQuery.value = '';
};

const getIconPath = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/')) {
    return path;
  }
  return `/${path}`;
};

const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});
</script>

<style scoped>
.select-root {
  position: relative;
}

.width-auto {
  width: auto;
}

.width-full {
  width: 100%;
}

.selected-item-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #929AAA; /* text-gray-700 */
  font-size: 14px;
  min-width: 0; /* Important for accessibility in small containers */
}

:deep(.dark) .selected-item-button {
  color: white;
}

.selected-item-button.normal {
  background-color: #FAFAFA;
  border: 1px solid #F2F2F6;
  border-radius: 6px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  min-height: 44px;
}

:deep(.dark) .selected-item-button.normal {
  background-color: #1f2937;
  border-color: #374151;
}

.selected-item-button.normal:hover {
  background-color: #f9fafb;
}

:deep(.dark) .selected-item-button.normal:hover {
  background-color: #374151;
}

.selected-item-button.borderless {
  background-color: transparent;
  border: none;
  box-shadow: none;
  padding: 4px 8px;
}

.selected-content {
  display: flex;
  align-items: center;
  min-width: 0;
}

.item-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  flex-shrink: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.item-icon.is-fiat {
  background-size: cover;
}

.item-icon.is-crypto {
  background-size: contain;
}

.selected-rounded {
  border-radius: 24px;
}

.item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow-icon {
  height: 16px;
  width: 16px;
  margin-left: 4px;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.arrow-icon.is-open {
  transform: rotate(180deg);
}

/* Dropdown Panel */
.dropdown-panel {
  position: absolute;
  z-index: 50;
  margin-top: 8px;
  width: 100%;
  min-width: 280px;
  right: 0;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #f3f4f6;
  overflow: hidden;
}

:deep(.dark) .dropdown-panel {
  background-color: #1f2937;
  border-color: #374151;
}

.search-container {
  padding: 12px;
}

.search-input-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 16px;
  background-color: white;
  border: 2px solid #FFD200;
  border-radius: 12px;
  outline: none;
  font-size: 14px;
  font-weight: 500;
}

:deep(.dark) .search-input {
  background-color: #111827;
  color: white;
}

.search-icon {
  height: 20px;
  width: 20px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

/* Items List */
.items-list {
  max-height: 256px;
  overflow-y: auto;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: #f9fafb;
}

:deep(.dark) .list-item:hover {
  background-color: #374151;
}

.list-item.is-selected {
  background-color: #f9fafb;
}

:deep(.dark) .list-item.is-selected {
  background-color: #374151;
}

.item-list-icon-container {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: transparent !important;
}

:deep(.dark) .item-list-icon-container {
  background-color: transparent;
}

.item-list-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.item-text-container {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.item-main-text {
  font-weight: 900;
  color: #111827;
}

:deep(.dark) .item-main-text {
  color: white;
}

.item-sub-text {
  color: #9ca3af;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.check-icon-container {
  margin-left: auto;
  flex-shrink: 0;
}

.check-icon {
  height: 20px;
  width: 20px;
  color: #3b82f6;
}

.no-results {
  padding: 32px 16px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}

/* Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4a5568;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>

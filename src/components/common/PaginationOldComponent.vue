<template>
  <nav v-if="total > perPage">
    <ul class="pagination m-0 mt-5">
      <!-- PREVIOUS -->
      <li v-if="current > 1" class="page-item" @click="p(current - 1)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current - 1)"
          tabindex="-1"
        >
          Назад
        </router-link>
      </li>

      <!-- ... -->
      <li v-if="current > 3" class="page-item" @click="p(1)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(1)"
        >
          {{ 1 }}
        </router-link>
      </li>

      <!-- -2 current +2 -->
      <li v-if="current > 4" class="page-item" @click="p(current - 3)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current - 3)"
          @click="p(current + 1)"
        >
          ...
        </router-link>
      </li>
      <li v-if="current > 2" class="page-item" @click="p(current - 2)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current - 2)"
        >
          {{ current - 2 }}
        </router-link>
      </li>
      <li v-if="current > 1" class="page-item" @click="p(current - 1)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current - 1)"
        >
          {{ current - 1 }}
        </router-link>
      </li>

      <li class="page-item active">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current)"
        >
          {{ current }}
        </router-link>
      </li>

      <li
        v-if="current < lastPage - 1"
        class="page-item"
        @click="p(current + 1)"
      >
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current + 1)"
        >
          {{ current + 1 }}
        </router-link>
      </li>
      <li
        v-if="current < lastPage - 2"
        class="page-item"
        @click="p(current + 2)"
      >
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current + 2)"
        >
          {{ current + 2 }}
        </router-link>
      </li>
      <li
        v-if="current < lastPage - 3"
        class="page-item"
        @click="p(current + 3)"
      >
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current + 3)"
        >
          ...
        </router-link>
      </li>

      <!-- ... -->
      <li v-if="current !== lastPage" class="page-item" @click="p(lastPage)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(lastPage)"
        >
          {{ lastPage }}
        </router-link>
      </li>

      <!-- NEXT -->
      <li v-if="current !== lastPage" class="page-item" @click="p(current + 1)">
        <router-link
          class="page-link bg-white hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-300"
          :to="to(current + 1)"
        >
          Вперед
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: null,
    },
    perPage: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      current: 1,
    };
  },

  computed: {
    lastPage() {
      return this.total > this.perPage
        ? Math.ceil(this.total / this.perPage)
        : 1;
    },
  },

  mounted() {
    this.current = Number(this.$route.query.page) || 1;
  },

  methods: {
    p(newCurrent) {
      this.current = newCurrent;
    },

    to(page) {
      return {
        name: this.$route.name,
        params: this.$route.params,
        query: { ...this.$route.query, page: page },
      };
    },
  },
};
</script>

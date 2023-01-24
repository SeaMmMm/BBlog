<script setup>
const props = defineProps({
  size: {
    type: Number,
    unique: true
  }
})
</script>

<template>
  <n-icon :size="props.size"
    ><svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M-2.62268e-07 17C-1.17422e-07 20.3137 2.68629 23 6 23L17 23C20.3137 23 23 20.3137 23 17L23 11.2454C21.6304 12.3433 19.8919 13 18 13C13.5817 13 10 9.41828 10 5C10 3.10811 10.6567 1.3696 11.7546 -5.13811e-07L6 -2.62268e-07C2.68629 -1.17422e-07 -8.8794e-07 2.68629 -7.43093e-07 6L-2.62268e-07 17Z"
        fill="#AF51C5"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M-2.62268e-07 17C-1.17422e-07 20.3137 2.68629 23 6 23L17 23C20.3137 23 23 20.3137 23 17L23 11.2454C21.6304 12.3433 19.8919 13 18 13C13.5817 13 10 9.41828 10 5C10 3.10811 10.6567 1.3696 11.7546 -5.13811e-07L6 -2.62268e-07C2.68629 -1.17422e-07 -8.8794e-07 2.68629 -7.43093e-07 6L-2.62268e-07 17Z"
        fill="url(#paint0_linear_1_4)"
      />
      <circle
        cx="18"
        cy="5"
        r="4"
        transform="rotate(-90 18 5)"
        fill="#AF51C5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_4"
          x1="-10"
          y1="15.5"
          x2="35.8187"
          y2="4.7287"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2F79CB" />
          <stop offset="1" stop-color="#AF51C5" />
        </linearGradient>
      </defs></svg
  ></n-icon>
</template>

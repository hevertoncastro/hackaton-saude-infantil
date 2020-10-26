<template>
  <div class="container">
    <div class="card">
      <div class="card__percent">
        <svg>
          <defs>
            <radialGradient
              id="gradient"
              cx="50%"
              cy="50%"
              r="60%"
              fx="50%"
              fy="50%"
            >
              <stop offset="30%" stop-color="#008ada" />
              <stop offset="100%" stop-color="#39ddfa" />
            </radialGradient>
          </defs>
          <circle
            ref="circle"
            cx="65"
            cy="65"
            r="65"
            stroke="url(#gradient)"
          />
        </svg>
        <div class="circle" />
        <div class="circle circle__medium" />
        <div class="circle circle__small" />
        <div class="card__number">
          <p ref="number" class="card__amount">
            50%
          </p>
          <p class="card__text">
            completo
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    amount () {
      this.updateAmount();
    }
  },
  mounted () {
    this.updateAmount();
  },
  methods: {
    updateAmount () {
      this.$refs.number.innerHTML = this.amount + "%";

      const change = 405 - (405 * this.amount) / 100;
      this.$refs.circle.style.strokeDashoffset = change;
    }
  }
};
</script>

<style lang="scss" scoped>
$primary-light: #39ddfa;
$primary: #00abdf;
$primary-dark: #008ada;

$white: #FFFFFF;
$greyLight-1: #ebf5fc;
$greyLight-2: #d5e0f3;
$greyLight-3: #c1d9f0;
$greyDark: #646b8c;

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-font-smoothing: antialiased;
    letter-spacing: .5px;
    line-height: 1.4;
    box-sizing: border-box;

    & *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }
}

.card {
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 10px;

    &__percent {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__number {
        position: absolute;
        color: $greyDark;
        font-size: 28px;
        font-weight: 600;

        & {
          .card__amount {
            text-align: center;
          }

          .card__text {
            font-size: 14px;
            text-align: center;
          }
        }
    }
}

svg {
    position: relative;
    width: 180px;
    height: 180px;
    z-index: 10;
    transform: rotate(-90deg);
}

svg circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-linecap: round;
    transform: translate(25px, 25px);
    stroke-dasharray: 405; // 2 * PI * radius
    stroke-dashoffset: 282.75;
    transition: all 1s ease;
    stroke-width: 18;
}
.circle {
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 6px 6px 8px $greyLight-2,
                -6px -6px 8px $white;
    background: $greyLight-1;

    &__medium {
        width: 150px;
        height: 150px;
        box-shadow: inset 8px 8px 10px $greyLight-2,
                    inset -4px -4px 8px $white;
    }
    &__small {
        width: 110px;
        height: 110px;
        box-shadow: 6px 6px 8px $greyLight-2,
                    -2px -2px 8px $white;
    }
}

@keyframes fadeIn {
    0% {
      transform: translateY(-40px) scale(.5);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }
</style>

<template>
  <FrostCard>
    <div class="type-pill" :class="`type-pill--${type}`">
      <Icon class="type-pill__icon" :name="`type-${type}`" />
      <span class="type-pill__copy">{{ type }} </span>
    </div>
  </FrostCard>
</template>

<script setup lang="ts">
import FrostCard from '@/components/atoms/FrostCard.vue'
import Icon from '@/components/atoms/Icon.vue'

defineProps<{ type: string }>()
</script>

<style scoped lang="scss">
.type-pill {
  $self: &;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: inherit;
  padding: gap(1) gap(4) gap(1) gap(3);
  &__icon {
    width: 25px;
    height: 25px;
    fill: rgba(white, 0.85);
    @include larger-than-mobile {
      filter: drop-shadow(1px 1px 4px rgba(black, 0.3));
    }
  }
  &__copy {
    line-height: 1;
    text-transform: capitalize;
    color: rgba(white, 0.85);
    text-shadow: 1px 1px 4px rgba(black, 0.3);
    font-size: $font-size-2;
  }

  @mixin gradient-bg($color-1, $color-2) {
    #{$self}__copy {
      color: $color-2;
    }
    #{$self}__icon {
      fill: $color-2;
    }
    background: linear-gradient(
      40deg,
      rgba($color-1, 0.8) 30%,
      rgba(255, 255, 255, 0.3) 100%
    );
  }
  @each $type, $colors in $pokemon-types {
    &--#{$type} {
      @include gradient-bg(nth($colors, 1), nth($colors, 2));
    }
  }
}
</style>

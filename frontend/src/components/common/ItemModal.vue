<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper item">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> </slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
            <slot name="fav"></slot>
            <slot name="player"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style></style>

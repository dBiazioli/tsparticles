<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { tsParticles } from "tsparticles";
import type { Container, ISourceOptions } from "tsparticles";

export type IParticlesProps = ISourceOptions;
export type IParticlesParams = IParticlesProps;

@Options({
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Object as () => IParticlesProps
    },
    particlesContainer: {
      type: Object as () => Container
    }
  }
})
export default class Particles extends Vue {
  private id!: string;
  private options?: IParticlesProps;
  private particlesContainer?: Container;

  public mounted(): void {
    nextTick(() => {
      if (!this.id) {
        throw new Error("Prop 'id' is required!");
      }

      tsParticles
          .load(this.id, this.options ?? {})
          .then(container => this.particlesContainer = container);
    });
  }

  public beforeDestroy(): void {
    if (this.particlesContainer) {
      this.particlesContainer.destroy();
    }
  }
}
</script>

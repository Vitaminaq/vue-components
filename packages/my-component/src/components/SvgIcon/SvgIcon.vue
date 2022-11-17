<template>
	<svg>
		<use
			:xlink:href="props.name"
		/>
	</svg>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue-demi";

const useCount: any = {
	arrow: 10,
	btn: 1,
	help_btn: 0
}

const props = defineProps({
	name: {
		type: Object as PropType<any>,
		default: ''
	}
});

const inline = computed(() => {
	return useCount[props.name] > 1;
});
</script>

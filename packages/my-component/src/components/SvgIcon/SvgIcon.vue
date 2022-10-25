<template>
	<svg
		class="ed-svg-icon"
		:class="{
			'ed-svg-icon__circle': props.circle,
			'ed-svg-icon__hover': props.hoverChange,
			'ed-svg-icon__active': props.hoverActive,
			'ed-svg-icon__pointer': props.hoverPointer
		}"
		:style="{
			width: iconWidth + 'px',
			height: iconHeight + 'px',
			color: props.color
		}"
	>
		<use
			:xlink:href="svgName"
			:fill="props.color"
		/>
	</svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue-demi";

export default defineComponent({
	name: "EdSvgIcon",
	props: {
		name: {
			type: String,
			required: true,
			default: "move"
		},
		color: {
			type: String,
			default: ""
		},
		enterColor: {
			type: String,
			default: ""
		},
		activeColor: {
			type: String,
			default: ""
		},
		width: {
			type: Number,
			default: 0
		},
		height: {
			type: Number,
			default: 0
		},
		size: {
			type: Number,
			default: -1
		},
		circle: {
			type: Boolean,
			default: false
		},
		hoverChange: {
			type: Boolean,
			default: false
		},
		hoverActive: {
			type: Boolean,
			default: false
		},
		hoverPointer: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const iconWidth = computed(() => {
			if (props.width) {
				return props.width;
			}
			return props.size;
		});

		const iconHeight = computed(() => {
			if (props.height) {
				return props.height;
			}
			return props.size;
		});

		const svgName = computed(() => {
			return `#icon-${props.name}`;
		});

		return {
			props,
			iconWidth,
			iconHeight,
			svgName
		};
	}
});
</script>

<template>
	<button
		:class="[...getClass]"
		:style="getStyle"
		@click="handleClick"
		:disabled="disabled"
	>
		<span
			v-if="!operate && iconName"
			class="icon"
			:style="`margin-right: ${iconMarginRight}px`"
		><SvgIcon
			:size="iconSize"
			:width="iconWidth"
			:height="iconHeight"
			:name="iconName"
		/></span>

		<slot />

		<div
			v-if="operate && iconName"
			class="com-btn__operate-box"
			@click.stop="handleOperate"
		>
			<SvgIcon
				:size="iconSize"
				:width="iconWidth"
				:height="iconHeight"
				:name="iconName"
			/>
		</div>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
import SvgIcon from "../SvgIcon/SvgIcon.vue";

export default defineComponent({
	name: "ButtonColor",
	components: {
		SvgIcon
	},
	props: {
		// 大小
		size: {
			type: String as PropType<"large" | "default" | "small">,
			default: "large"
		},
		// 类型
		type: {
			type: String as PropType<
				| "default"
				| "primary"
				| "secondary"
				| "text"
				| "success"
				| "warning"
				| "error"
			>,
			default: "default"
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否展示边框
		showBorder: {
			type: Boolean,
			default: true
		},
		// 是否展示圆角
		showRadius: {
			type: Boolean,
			default: true
		},
		// 按钮 左右 pandding
		padding: {
			type: Number,
			default: 0
		},
		// 按钮高度
		height: {
			type: Number,
			default: 0
		},
		// 按钮样式
		btnStyle: {
			type: String,
			default: ""
		},
		// 图标
		icon: {
			type: String,
			default: ""
		},
		// 图标名称
		iconName: {
			type: String,
			default: ""
		},
		// 图标大小
		iconSize: {
			type: Number,
			default: 16
		},
		// 图标宽度
		iconWidth: {
			type: Number,
			default: 0
		},
		// 图标高度
		iconHeight: {
			type: Number,
			default: 0
		},
		iconMarginRight: {
			type: Number,
			default: 4
		},
		// 可操作（例如下拉图标）
		operate: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		getClass(): string[] {
			const {
				size,
				type,
				disabled,
				showBorder,
				showRadius,
				operate
			} = this;
			const sizeMap = {
				large: "lg",
				default: "def",
				small: "sm"
			};
			const klass = [
				"com-btn",
				`com-btn__${sizeMap[size]}`,
				`com-btn__${type}`
			];

			type === "primary"
				? klass.push("t-title-14")
				: klass.push("t-body-14");
			disabled && klass.push("com-btn__disable");
			!showBorder && klass.push("com-btn__no_border");
			!showRadius && klass.push("com-btn__no_radius");
			operate && klass.push("com-btn__operate");
			return klass;
		},
		getStyle(): string {
			const { btnStyle, padding, height } = this;
			let str = btnStyle;
			if (padding) {
				str = str + `padding: 0 ${padding}px;`;
			}
			if (height) {
				str = str + `height: ${height}px;`;
			}
			return str;
		}
	},
	setup() {
		return {};
	},
	methods: {
		handleClick(evt: MouseEvent) {
			this.$emit("click", evt);
		},
		handleOperate(evt: MouseEvent) {
			this.$emit("operate", evt);
		}
	}
});
</script>

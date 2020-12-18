<template>
	<div class="app-header">
		<div class="header-left" :class="{ heidden: heiddenBack }">
			<!-- <i class="iconfont iconfanhui" /> -->
		</div>
		<div class="header-title">{{ title }}</div>

		<div class="header-right" :class="{ heidden: heiddenBack }">更多</div>
	</div>
</template>

<script>
export default {
	name: "AppHeader",
	data() {
		return {};
	},
	props: {
		title: {
			// default: "首页",
			title: String,
		},
		heiddenBack: {
			type: Boolean,
			default: true,
		},
		heiddenExtend: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.app-header {
	position: fixed;

	top: 0;
	left: 0;
	width: 100%;
	height: 48px;
	// border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
	//   父级字体设为0，避免空格占有宽度影响布局
	font-size: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
// 隐藏组件
.heidden {
	visibility: heidden;
}
.header-left {
	font-size: 20px;
	flex-basis: 40px;
	i {
		font-size: 20px;
	}
}
.header-title {
	flex-grow: 1;
	font-size: 1.75rem;
	font-family: "微软雅黑";
	color: #c39862;
}
.header-right {
	width: 40px;
	flex-basis: 40px;
}
</style>

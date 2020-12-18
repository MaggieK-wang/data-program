<template>
	<div class="cart-control-container">
		<div class="decrease" @click.stop="decrease" v-show="this.good.count > 0">
			<i class="iconfont iconicon_decrease"></i>
		</div>
		<div class="count" v-show="this.good.count > 0">{{ this.good.count }}</div>
		<div class="increase" @click.stop="increase">
			<i class="iconfont iconadd-circle"></i>
		</div>
	</div>
</template>

<script>
import { addCart, deleteCart } from "@/api";
export default {
	name: "CartControl",
	data() {
		return {};
	},
	props: {
		good: {
			type: Object,
		},
	},
	created() {
		//console.log(this.good);
		this.decrease();
	},
	methods: {
		decrease() {
			var _parma = {
				skuCode: this.good.skuCode,
				shopNum: this.good.shopNum,
				businessCode: this.good.businessCode,
			};
			addCart(_parma).then((response) => {
				if (!this.good.count) {
					this.$set(this.good, "count", 1);
				} else {
					this.good.count--;
				}
			});
		},
		//改变父级组件的数据
		increase() {
			var _parma = {
				skuCode: this.good.skuCode,
				shopNum: this.good.count,
				businessCode: this.good.businessCode,
			};
			addCart(_parma).then((response) => {
				//如果第一次选择商品，则没有count计数
				if (!this.good.count) {
					this.$set(this.good, "count", 1);
				} else {
					this.good.count++;
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.cart-control-container {
	.decrease,
	.count,
	.increase {
		display: inline-block;
		padding: 6px;
		color: chocolate;
		i {
			font-size: 1rem;
			font-weight: normal;
		}
	}
	.count {
		color: black;
		font-size: 1rem;
	}
}
</style>

<template>
  <el-row class="sub-filter">
    <el-collapse v-model="activeNames" class="filter-collapse">
      <!-- 品牌筛选 -->
      <el-collapse-item title="品牌" name="brands">
        <div class="filter-options">
          <!-- 独立的全选复选框 -->
          <el-checkbox
            v-if="filterData?.brands?.length"
            v-model="allChecked['brands']"
            @change="handleAllChange('brands', $event as boolean)"
            class="filter-option"
          >
            全部
          </el-checkbox>
          <!-- 具体选项组 -->
          <el-checkbox-group
            v-model="checkedValues['brands']"
            @change="handleGroupChange('brands', $event as string[])"
          >
            <el-checkbox
              v-for="brand in filterData?.brands || []"
              :key="brand.id"
              :value="brand.id"
              class="filter-option"
            >
              {{ brand.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-collapse-item>

      <!-- 销售属性筛选 -->
      <el-collapse-item
        v-for="property in filterData?.saleProperties || []"
        :key="property.id"
        :title="property.name"
        :name="property.id"
      >
        <div class="filter-options">
          <!-- 独立的全选复选框 -->
          <el-checkbox
            v-if="property.properties?.length"
            v-model="allChecked[property.id]"
            @change="handleAllChange(property.id, $event as boolean)"
            class="filter-option"
          >
            全部
          </el-checkbox>
          <!-- 具体选项组 -->
          <el-checkbox-group
            v-model="checkedValues[property.id]"
            @change="handleGroupChange(property.id, $event as string[])"
          >
            <el-checkbox
              v-for="option in property.properties"
              :key="option.id"
              :value="option.id"
              class="filter-option"
            >
              {{ option.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </el-collapse-item>

      <!-- 重置按钮 -->
      <el-collapse-item>
        <template #title>
          <el-row @click.stop>
            <el-button @click.stop="resetFilters" type="default" size="small">
              重置
            </el-button>
          </el-row>
        </template>
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getSubCategoryApi } from '~/apis/category';
import type { ProductDetailResult } from '~/types/subcategory';

const props = defineProps<{ categoryId: string }>();
const emit = defineEmits<{
  (e: 'filterChange', filters: Record<string, string[]>): void;
}>();

// 状态
const activeNames = ref<string[]>(['brands']);
const filterData = ref<ProductDetailResult | null>(null);
const loading = ref(false);

// 存储每个组的选项ID列表（用于全选）
const optionIds = reactive<Record<string, string[]>>({});
// 存储每个组实际选中的ID
const checkedValues = reactive<Record<string, string[]>>({});
// 存储每个组是否全选
const allChecked = reactive<Record<string, boolean>>({});

// 获取筛选数据
const fetchFilterData = async () => {
  loading.value = true;
  try {
    const response = await getSubCategoryApi(props.categoryId);
    if (response) {
      filterData.value = response;

      // 初始化品牌组
      if (response.brands) {
        const brandIds = response.brands.map((b) => b.id);
        optionIds['brands'] = brandIds;
        checkedValues['brands'] = brandIds; // 默认全选
        allChecked['brands'] = true;
      }

      // 初始化销售属性组
      response.saleProperties.forEach((property) => {
        const propIds = property.properties.map((p) => p.id);
        optionIds[property.id] = propIds;
        checkedValues[property.id] = propIds; // 默认全选
        allChecked[property.id] = true;
      });
    }
  } catch (error) {
    console.error('获取筛选数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 全选/全不选
const handleAllChange = (groupId: string, checked: boolean) => {
  if (checked) {
    checkedValues[groupId] = optionIds[groupId]!;
  } else {
    checkedValues[groupId] = [];
  }
  emit('filterChange', checkedValues);
};

// 具体选项变化
const handleGroupChange = (groupId: string, value: string[]) => {
  // 更新全选状态
  allChecked[groupId] = value.length === optionIds[groupId]!.length;
  emit('filterChange', checkedValues);
};

// 重置筛选
const resetFilters = () => {
  // 品牌
  if (optionIds['brands']) {
    checkedValues['brands'] = optionIds['brands'];
    allChecked['brands'] = true;
  }
  // 销售属性
  filterData.value?.saleProperties.forEach((property) => {
    if (optionIds[property.id]) {
      checkedValues[property.id] = optionIds[property.id]!;
      allChecked[property.id] = true;
    }
  });
  emit('filterChange', checkedValues);
};

onMounted(() => {
  fetchFilterData();
});
</script>

<style lang="scss" scoped>
.sub-filter {
  width: 100%;
}

.filter-collapse {
  width: 100%;
  margin-bottom: 15px;

  :deep(.el-collapse-item__header) {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    padding-left: 8px;
  }

  :deep(.el-collapse-item__content) {
    padding: 15px 8px;
  }

  :last-child {
    :deep(.el-collapse-item__arrow) {
      display: none;
    }
  }
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-option {
  margin-right: 10px;
  margin-bottom: 10px;

  :deep(.el-checkbox__label) {
    font-size: 14px;
    color: #666;
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: var(--theme-color);
    border-color: var(--theme-color);
  }

  :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: var(--theme-color);
  }
}
</style>

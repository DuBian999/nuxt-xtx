// 商品信息类型
export interface GoodsItem {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  desc: string;
  /** 商品价格 */
  price: string;
  /** 商品图片URL */
  picture: string;
  /** 订单数量（销量） */
  orderNum: number;
}

// 分类信息类型（用于 categories 数组）
export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类层级 */
  layer: number;
  /** 父级分类 */
  parent: null | Category;
}

// 品牌信息类型
export interface Brand {
  /** 品牌ID */
  id: string;
  /** 品牌名称 */
  name: string;
  /** 品牌英文名称 */
  nameEn: string;
  /** 品牌Logo */
  logo: string;
  /** 品牌图片 */
  picture: string;
  /** 品牌类型（可能为null） */
  type: null | string;
  /** 品牌描述 */
  desc: string;
  /** 品牌所在地 */
  place: string;
}

// 销售属性值类型
export interface PropertyValue {
  /** 属性值ID */
  id: string;
  /** 属性值名称 */
  name: string;
}

// 销售属性类型
export interface SaleProperty {
  /** 销售属性ID */
  id: string;
  /** 销售属性名称（如：规格、数量、类型） */
  name: string;
  /** 属性值列表 */
  properties: PropertyValue[];
}

// 商品详情结果类型
export interface ProductDetailResult {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品图片（可能为null） */
  picture: string | null;
  /** 父级分类ID */
  parentId: string;
  /** 父级分类名称 */
  parentName: string;
  /** 商品列表 */
  goods: GoodsItem[];
  /** 分类列表 */
  categories: Category[];
  /** 品牌列表 */
  brands: Brand[];
  /** 销售属性列表 */
  saleProperties: SaleProperty[];
}

// 筛选属性项
interface FilterAttr {
  /** 属性组名称（如：规格、颜色等） */
  groupName: string;
  /** 具体属性名称 */
  propertyName: string;
}

// 商品筛选参数
interface ProductFilterParams {
  /** 当前页码，默认1 */
  page: number;
  /** 每页条数，默认20 */
  pageSize: number;
  /** 二级分类ID */
  categoryId: string;
  /** 是否只显示有货商品 */
  inventory: boolean;
  /** 是否只显示特惠商品 */
  onlyDiscount: boolean;
  /** 排序字段（如：publishTime-发布时间，saleCount-销量，price-价格） */
  sortField: string | null;
  /** 排序方式（asc-升序，desc-降序） */
  sortMethod: 'asc' | 'desc' | null;
  /** 品牌ID筛选 */
  brandId: string | null;
  /** 销售属性筛选条件数组 */
  attrs: FilterAttr[];
}

/**
 * 商品基础信息
 */
export interface ProductItem {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  desc: string;
  /** 商品价格（字符串类型，保留两位小数） */
  price: string;
  /** 商品图片URL */
  picture: string;
  /** 订单数量/销量 */
  orderNum: number;
}

/**
 * 分页结果
 */
export interface PaginatedResult {
  /** 总记录数 */
  counts: number;
  /** 每页条数 */
  pageSize: number;
  /** 总页数 */
  pages: number;
  /** 当前页码 */
  page: number;
  /** 当前页数据列表 */
  items: ProductItem[];
}

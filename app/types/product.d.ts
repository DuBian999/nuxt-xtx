// types/product-detail.ts

/**
 * 品牌信息
 */
export interface Brand {
  /** 品牌ID */
  id: string;
  /** 品牌名称 */
  name: string;
  /** 品牌英文名 */
  nameEn: string | null;
  /** 品牌logo */
  logo: string | null;
  /** 品牌图片 */
  picture: string | null;
  /** 品牌类型 */
  type: string | null;
  /** 品牌描述 */
  desc: string | null;
  /** 品牌所在地 */
  place: string | null;
}

/**
 * 规格值
 */
export interface SpecValue {
  /** 规格值名称 */
  name: string;
  /** 规格值图片 */
  picture: string | null;
  /** 规格值描述 */
  desc: string;
}

/**
 * 商品规格
 */
export interface Spec {
  /** 规格名称（如：颜色、尺码） */
  name: string;
  /** 规格ID */
  id: string;
  /** 规格值列表 */
  values: SpecValue[];
}

/**
 * SKU规格
 */
export interface SkuSpec {
  /** 规格名称 */
  name: string;
  /** 规格值名称 */
  valueName: string;
}

/**
 * SKU信息
 */
export interface Sku {
  /** SKU ID */
  id: string;
  /** SKU编码 */
  skuCode: string;
  /** 当前价格 */
  price: string;
  /** 原价 */
  oldPrice: string;
  /** 库存 */
  inventory: number;
  /** SKU图片 */
  picture: string;
  /** SKU规格组合 */
  specs: SkuSpec[];
}

/**
 * 分类信息
 */
export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类层级 */
  layer: number;
  /** 父级分类 */
  parent: Category | null;
}

/**
 * 商品详情属性
 */
export interface Property {
  /** 属性名称 */
  name: string;
  /** 属性值 */
  value: string;
}

/**
 * 商品详情图片
 */
export interface ProductDetails {
  /** 详情图片列表 */
  pictures: string[];
  /** 商品属性列表 */
  properties: Property[];
}

/**
 * 推荐商品
 */
export interface RecommendProduct {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  desc: string;
  /** 商品价格 */
  price: string;
  /** 商品图片 */
  picture: string;
  /** 订单数量/销量 */
  orderNum: number;
}

/**
 * 商品详情结果
 */
export interface ProductDetailResult {
  /** 商品ID */
  id: string;
  /** 商品名称 */
  name: string;
  /** 商品SPU编码 */
  spuCode: string;
  /** 商品描述 */
  desc: string;
  /** 当前价格 */
  price: string;
  /** 原价 */
  oldPrice: string;
  /** 折扣率 */
  discount: number;
  /** 总库存 */
  inventory: number;
  /** 品牌信息 */
  brand: Brand;
  /** 销量 */
  salesCount: number;
  /** 评论数量 */
  commentCount: number;
  /** 收藏数量 */
  collectCount: number;
  /** 主图视频 */
  mainVideos: any[];
  /** 视频比例 */
  videoScale: number;
  /** 主图列表 */
  mainPictures: string[];
  /** 商品规格 */
  specs: Spec[];
  /** SKU列表 */
  skus: Sku[];
  /** 商品分类（包含父级） */
  categories: Category[];
  /** 商品详情（图文+属性） */
  details: ProductDetails;
  /** 是否预售 */
  isPreSale: boolean;
  /** 当前用户是否收藏 */
  isCollect: boolean | null;
  /** 推荐商品列表 */
  recommends: RecommendProduct[] | null;
  /** 用户地址 */
  userAddresses: any[] | null;
  /** 相似商品 */
  similarProducts: RecommendProduct[];
  /** 热门商品（按日） */
  hotByDay: RecommendProduct[];
  /** 评价信息 */
  evaluationInfo: any | null;
}

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

// 子分类信息类型
export interface ChildCategory {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图片URL */
  picture: string | null;
  /** 父级分类ID */
  parentId: string | null;
  /** 父级分类名称 */
  parentName: string | null;
  /** 商品列表 */
  goods: GoodsItem[];
  /** 子分类列表（可能为null） */
  categories: null;
  /** 品牌列表（可能为null） */
  brands: null;
  /** 销售属性（可能为null） */
  saleProperties: null;
}

// 主分类信息类型
export interface CategoryResult {
  /** 主分类ID */
  id: string;
  /** 主分类名称 */
  name: string;
  /** 主分类图片URL（可能为null） */
  picture: string | null;
  /** 子分类列表 */
  children: ChildCategory[];
}
